"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Search, MoreVertical, Phone, Video, Smile, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useRealtime } from "@/lib/realtime-context";

export default function MessagesContent() {
  const { user, loading: authLoading } = useAuth();
  const { sendMessage: sendRealtime, onMessage } = useRealtime();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(searchParams.get("user"));
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [typingUsers, setTypingUsers] = useState<Map<string, { name: string; timeout: NodeJS.Timeout }>>(new Map());
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !user) { router.push("/auth/login"); return; }
    loadConversations();
  }, [user, authLoading]);

  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [selectedUser]);

  useEffect(() => {
    const unsub1 = onMessage("online-status", (msg: any) => {
      const { userId, online } = msg.payload;
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        if (online) next.add(userId); else next.delete(userId);
        return next;
      });
    });

    const unsub2 = onMessage("typing", (msg: any) => {
      const { userId, name, typing } = msg.payload;
      if (userId === user?.id) return;
      setTypingUsers((prev) => {
        const next = new Map(prev);
        if (typing) {
          if (next.has(userId)) clearTimeout(next.get(userId)!.timeout);
          const timeout = setTimeout(() => {
            setTypingUsers((p) => { const n = new Map(p); n.delete(userId); return n; });
          }, 3000);
          next.set(userId, { name, timeout });
        } else {
          if (next.has(userId)) clearTimeout(next.get(userId)!.timeout);
          next.delete(userId);
        }
        return next;
      });
    });

    const unsub3 = onMessage("connected", (msg: any) => {
      if (msg.payload.onlineUsers) setOnlineUsers(new Set(msg.payload.onlineUsers));
    });

    return () => { unsub1(); unsub2(); unsub3(); };
  }, [onMessage, user?.id]);

  const loadConversations = async () => {
    try {
      const convs = await api.getConversations();
      setConversations(convs);
    } catch {}
    setLoading(false);
  };

  const loadMessages = async (userId: string) => {
    try {
      const msgs = await api.getMessages(userId);
      setMessages(msgs);
      api.markConversationRead(userId).catch(() => {});
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {}
  };

  const handleTyping = useCallback(() => {
    if (!selectedUser) return;
    sendRealtime("typing", { receiverId: selectedUser, typing: true });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendRealtime("typing", { receiverId: selectedUser, typing: false });
    }, 3000);
  }, [selectedUser, sendRealtime]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;
    setSending(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    sendRealtime("typing", { receiverId: selectedUser, typing: false });
    try {
      await api.sendMessage({ receiverId: selectedUser, content: newMessage.trim() });
      setNewMessage("");
      await loadMessages(selectedUser);
      loadConversations();
    } catch {}
    setSending(false);
  };

  const isUserOnline = (userId: string) => onlineUsers.has(userId);
  const getTypingName = (userId: string) => typingUsers.get(userId)?.name;

  const filteredConversations = conversations.filter((conv: any) =>
    !searchQuery || conv.otherUser?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(c => c.otherUser?.id === selectedUser);

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  if (authLoading || loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-6rem)]">
        <div className="rounded-2xl h-full flex overflow-hidden border border-hairline bg-canvas">
          {/* Conversations Sidebar */}
          <div className={`w-full md:w-80 border-r border-hairline flex flex-col ${selectedUser ? "hidden md:flex" : "flex"}`}>
            <div className="p-4 border-b border-hairline">
              <h2 className="text-lg font-semibold mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-9 h-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-12">
                  <Send className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No conversations yet</p>
                </div>
              ) : filteredConversations.map((conv: any) => {
                const isSelected = selectedUser === conv.otherUser?.id;
                const isOnline = isUserOnline(conv.otherUser?.id);
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedUser(conv.otherUser?.id)}
                    className={`w-full text-left p-4 border-b border-hairline transition-colors hover:bg-surface-soft ${
                      isSelected ? "bg-surface-soft" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-sm font-bold">
                          {conv.otherUser?.name?.[0] || "?"}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-canvas ${isOnline ? "bg-green-500" : "bg-gray-400"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-sm truncate">{conv.otherUser?.name}</p>
                          <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{formatTime(conv.lastMessageAt)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage || "No messages yet"}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${selectedUser ? "flex" : "hidden md:flex"}`}>
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-hairline flex items-center gap-3 bg-canvas">
                  <button onClick={() => setSelectedUser(null)} className="md:hidden p-2 hover:bg-surface-soft rounded-lg transition-colors" aria-label="Back to conversations">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-xs font-bold">
                      {selectedConv?.otherUser?.name?.[0] || "?"}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-canvas ${isUserOnline(selectedUser) ? "bg-green-500" : "bg-gray-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{selectedConv?.otherUser?.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {typingUsers.has(selectedUser)
                        ? `${getTypingName(selectedUser)} is typing...`
                        : isUserOnline(selectedUser) ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-soft/30">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 rounded-2xl bg-surface-soft flex items-center justify-center mb-4">
                        <Send className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="font-medium">Start a conversation</p>
                      <p className="text-sm text-muted-foreground mt-1">Send a message to {selectedConv?.otherUser?.name}</p>
                    </div>
                  )}
                  {messages.map((msg: any, i: number) => {
                    const isOwn = msg.senderId === user?.id;
                    const showAvatar = !isOwn && (i === 0 || messages[i - 1]?.senderId !== msg.senderId);
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${isOwn ? "justify-end" : "justify-start"} ${showAvatar ? "mt-4" : ""}`}
                      >
                        <div className={`max-w-[70%] ${isOwn ? "" : "flex gap-2"}`}>
                          {!isOwn && showAvatar && (
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">
                              {selectedConv?.otherUser?.name?.[0]}
                            </div>
                          )}
                          {!isOwn && !showAvatar && <div className="w-7 shrink-0" />}
                          <div>
                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                              isOwn
                                ? "bg-primary text-primary-foreground rounded-br-md"
                                : "bg-canvas border border-hairline rounded-bl-md"
                            }`}>
                              <p>{msg.content}</p>
                            </div>
                            <p className={`text-[10px] mt-1 ${isOwn ? "text-right" : "text-left"} text-muted-foreground`}>
                              {formatTime(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                  {typingUsers.has(selectedUser) && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 items-end">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-[10px] font-bold">
                          {selectedConv?.otherUser?.name?.[0]}
                        </div>
                        <div className="bg-canvas border border-hairline px-4 py-3 rounded-2xl rounded-bl-md">
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <form onSubmit={handleSend} className="p-3 border-t border-hairline bg-canvas flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={e => { setNewMessage(e.target.value); handleTyping(); }}
                      className="pr-10"
                    />
                  </div>
                  <Button type="submit" size="icon" disabled={sending || !newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-surface-soft/20">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-surface-soft flex items-center justify-center mx-auto mb-4">
                    <Send className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-ink">Select a conversation</p>
                  <p className="text-sm text-muted-foreground mt-1">Choose from your existing conversations or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

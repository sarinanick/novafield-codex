import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio";
import { Switch } from "@/components/ui/switch";
import { SearchInput } from "@/components/ui/search-input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar } from "@/components/ui/skeleton";
import { ServiceCard } from "@/components/marketplace/service-card";
import { CategoryCard } from "@/components/marketplace/category-card";
import {
  Film, Image, MessageSquare, Zap,
  ArrowRight, ArrowLeft, Search, Plus, Save,
  Trash2, Edit, CheckCircle, AlertCircle, Info, AlertTriangle
} from "lucide-react";

const sections = [
  { id: "tokens", title: "توکن‌های طراحی" },
  { id: "typography", title: "تایپوگرافی" },
  { id: "buttons", title: "دکمه‌ها" },
  { id: "forms", title: "فرم‌ها" },
  { id: "cards", title: "کارت‌ها" },
  { id: "marketplace", title: "بازارگاه" },
  { id: "feedback", title: "وضعیت‌ها و بازخورد" },
  { id: "rtl", title: "تست RTL" },
  { id: "mobile", title: "پیش‌نمایش موبایل" },
];

export default function UIKitPage() {
  return (
    <div lang="fa" dir="rtl" className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-hairline">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-headline text-ink">کیت رابط کاربری NovaField</h1>
              <p className="text-body-sm text-muted-foreground mt-1">مرجع کامپوننت‌ها، حالت‌ها و الگوهای طراحی</p>
            </div>
            <Badge variant="secondary">نسخه ۱.۰</Badge>
          </div>
          <nav className="flex gap-2 mt-4 overflow-x-auto pb-1" aria-label="ناوبری بخش‌ها">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="text-caption text-muted-foreground hover:text-ink px-3 py-1.5 rounded-md hover:bg-surface-soft transition-colors whitespace-nowrap">
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {/* Design Tokens */}
        <section id="tokens" aria-labelledby="tokens-title">
          <h2 id="tokens-title" className="text-display-lg text-ink mb-8">توکن‌های طراحی</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-card-title text-ink mb-4">رنگ‌ها</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { name: "زمینه", class: "bg-canvas", text: "text-ink" },
                  { name: "سطح", class: "bg-surface-soft", text: "text-ink" },
                  { name: "مرکب", class: "bg-ink", text: "text-surface-soft" },
                  { name: "خط", class: "bg-hairline", text: "text-ink" },
                  { name: "اصلی", class: "bg-ink", text: "text-surface-soft" },
                  { name: "تأکید", class: "bg-accent-orange", text: "text-white" },
                  { name: "موفقیت", class: "bg-semantic-success", text: "text-white" },
                  { name: "هشدار", class: "bg-semantic-warning", text: "text-white" },
                  { name: "خطا", class: "bg-destructive", text: "text-white" },
                  { name: "اطلاعات", class: "bg-semantic-info", text: "text-white" },
                ].map(c => (
                  <div key={c.name} className="space-y-1.5">
                    <div className={`h-16 rounded-lg border border-hairline ${c.class} ${c.text} flex items-end p-2`}>
                      <span className="text-caption">{c.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-card-title text-ink mb-4">فاصله‌گذاری</h3>
              <div className="flex items-end gap-2">
                {["۴", "۸", "۱۲", "۱۶", "۲۴", "۳۲", "۴۸"].map((s, i) => (
                  <div key={s} className="flex flex-col items-center gap-1">
                    <div className="bg-ink/10 rounded" style={{ width: 24, height: [4, 8, 12, 16, 24, 32, 48][i] }} />
                    <span className="text-caption text-muted-foreground">{s}px</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-card-title text-ink mb-4">گوشه‌گردی</h3>
              <div className="flex items-end gap-4">
                {[
                  { cls: "rounded-sm", label: "۶px" },
                  { cls: "rounded-md", label: "۸px" },
                  { cls: "rounded-lg", label: "۱۲px" },
                  { cls: "rounded-xl", label: "۱۶px" },
                  { cls: "rounded-xxl", label: "۲۴px" },
                  { cls: "rounded-full", label: "کامل" },
                ].map(r => (
                  <div key={r.cls} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 bg-ink/10 border border-hairline ${r.cls}`} />
                    <span className="text-caption text-muted-foreground">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section id="typography" aria-labelledby="typography-title">
          <h2 id="typography-title" className="text-display-lg text-ink mb-8">تایپوگرافی فارسی</h2>
          <div className="space-y-3 bg-surface-soft border border-hairline rounded-lg p-6">
            <p className="text-display-xl text-ink">عنوان صفحه</p>
            <p className="text-display-lg text-ink">عنوان بخش</p>
            <p className="text-headline text-ink">عنوان کارت</p>
            <p className="text-body-lg text-ink">متن بزرگ</p>
            <p className="text-body text-ink">متن اصلی - این یک پاراگراف تستی برای بررسی تایپوگرافی فارسی است.</p>
            <p className="text-body-sm text-ink">متن کوچک</p>
            <p className="text-caption text-muted-foreground">برچسب و اطلاعات فرعی</p>
          </div>
        </section>

        {/* Buttons */}
        <section id="buttons" aria-labelledby="buttons-title">
          <h2 id="buttons-title" className="text-display-lg text-ink mb-8">دکمه‌ها</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-card-title text-ink mb-4">گونه‌ها</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default">پیش‌فرض</Button>
                <Button variant="secondary">ثانویه</Button>
                <Button variant="outline">خطی</Button>
                <Button variant="ghost">شبح</Button>
                <Button variant="subtle">ملایم</Button>
                <Button variant="accent">تأکید</Button>
                <Button variant="destructive">حذف</Button>
                <Button variant="link">پیوند</Button>
              </div>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">اندازه‌ها</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">کوچک</Button>
                <Button size="md">پیش‌فرض</Button>
                <Button size="lg">بزرگ</Button>
                <Button size="xl">خیلی بزرگ</Button>
                <Button size="icon"><Plus className="w-4 h-4" /></Button>
              </div>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">حالت‌ها</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button disabled>غیرفعال</Button>
                <Button isLoading>در حال بارگذاری</Button>
                <Button><Save className="w-4 h-4 ms-2" />ذخیره</Button>
                <Button variant="destructive"><Trash2 className="w-4 h-4 ms-2" />حذف</Button>
                <Button variant="secondary"><Edit className="w-4 h-4 ms-2" />ویرایش</Button>
              </div>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">تمام عرض</h3>
              <Button className="w-full" size="lg">مشاهده خدمات</Button>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section id="forms" aria-labelledby="forms-title">
          <h2 id="forms-title" className="text-display-lg text-ink mb-8">فرم‌ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader><CardTitle>ورودی‌ها</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input label="نام کامل" placeholder="نام خود را وارد کنید" />
                <Input label="ایمیل" type="email" placeholder="you@example.com" leftIcon={<span className="text-muted-foreground">@</span>} />
                <Input label="رمز عبور" type="password" placeholder="حداقل ۶ کاراکتر" helperText="۸ کاراکتر یا بیشتر بهتر است" />
                <Input label="خطا" placeholder="متن خطا" error errorMessage="لطفاً ایمیل معتبر وارد کنید" />
                <Input label="غیرفعال" placeholder="غیرفعال" disabled />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>سایر فرم‌ها</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Textarea label="توضیحات" placeholder="توضیحات خود را بنویسید..." rows={3} />
                <Select label="دسته‌بندی" placeholder="انتخاب کنید" options={[
                  { value: "video", label: "ویدئو و تبلیغات" },
                  { value: "image", label: "تصویرسازی" },
                  { value: "chatbot", label: "چت‌بات" },
                  { value: "automation", label: "اتوماسیون" },
                ]} />
                <SearchInput placeholder="جست‌وجوی خدمات، ابزارها یا فریلنسرها..." />
                <Checkbox label="شرایط را می‌پذیرم" description="با ثبت‌نام، شرایط استفاده را می‌پذیرید." />
                <RadioGroup name="role" value="client" options={[
                  { value: "client", label: "می‌خواهم خدمات بخرم", description: "فریلنسرهای AI را پیدا و مقایسه کنید." },
                  { value: "freelancer", label: "می‌خواهم خدمات بفروشم", description: "خدمت خود را منتشر کنید و سفارش بگیرید." },
                ]} />
                <Switch label="اعلان‌ها" description="دریافت اعلان از سفارش‌های جدید" checked />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section id="cards" aria-labelledby="cards-title">
          <h2 id="cards-title" className="text-display-lg text-ink mb-8">کارت‌ها</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>کارت پیش‌فرض</CardTitle>
                <CardDescription>توضیحات کارت با متن کوتاه</CardDescription>
              </CardHeader>
              <CardContent><p className="text-body-sm text-muted-foreground">محتوای کارت اینجا قرار می‌گیرد.</p></CardContent>
              <CardFooter><Button size="sm">عملیات</Button></CardFooter>
            </Card>
            <Card className="bg-ink text-surface-soft border-ink">
              <CardHeader>
                <CardTitle className="text-surface-soft">کارت تیره</CardTitle>
                <CardDescription className="text-surface-soft/70">کارت با پس‌زمینه تیره</CardDescription>
              </CardHeader>
              <CardContent><p className="text-body-sm text-surface-soft/80">محتوای کارت تیره.</p></CardContent>
            </Card>
            <Card className="bg-accent-orange text-white border-accent-orange">
              <CardHeader>
                <CardTitle className="text-white">کارت رنگی</CardTitle>
                <CardDescription className="text-white/70">کارت با رنگ تأکید</CardDescription>
              </CardHeader>
              <CardContent><p className="text-body-sm text-white/80">محتوای کارت رنگی.</p></CardContent>
            </Card>
          </div>
        </section>

        {/* Marketplace */}
        <section id="marketplace" aria-labelledby="marketplace-title">
          <h2 id="marketplace-title" className="text-display-lg text-ink mb-8">کامپوننت‌های بازارگاه</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-card-title text-ink mb-4">کارت خدمت</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ServiceCard title="ساخت ویدئوی تبلیغاتی" category="ویدئو و تبلیغات" sellerName="سارا ک." sellerInitials="SK" rating={4.9} reviews={127} price={150} deliveryDays={3} tools={["Sora", "Runway"]} />
                <ServiceCard title="طراحی عکس محصول" category="تصویرسازی" sellerName="مرسل ل." sellerInitials="ML" rating={4.8} reviews={89} price={75} deliveryDays={2} tools={["Midjourney", "DALL-E"]} />
                <ServiceCard title="ساخت چت‌بات برند" category="چت‌بات و ایجنت" sellerName="آیکو ت." sellerInitials="AT" rating={5.0} reviews={64} price={200} deliveryDays={5} tools={["GPT", "Claude"]} />
              </div>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">کارت دسته‌بندی</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <CategoryCard icon={Film} title="ویدئو و تبلیغات" description="ویدئوهای تبلیغاتی و محتوای اجتماعی" serviceCount={42} />
                <CategoryCard icon={Image} title="تصویرسازی" description="عکس محصول و تصاویر برند" serviceCount={38} />
                <CategoryCard icon={MessageSquare} title="چت‌بات و ایجنت" description="چت‌بات‌های سفارشی و دستیارهای AI" serviceCount={27} />
                <CategoryCard icon={Zap} title="اتوماسیون" description="اتوماسیون فرآیند و اتصال ابزارها" serviceCount={19} />
              </div>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section id="feedback" aria-labelledby="feedback-title">
          <h2 id="feedback-title" className="text-display-lg text-ink mb-8">وضعیت‌ها و بازخورد</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-card-title text-ink mb-4">هشدارها</h3>
              <div className="space-y-3">
                <Alert variant="default"><Info className="h-4 w-4" /><AlertTitle>اطلاعات</AlertTitle><AlertDescription>این یک پیام اطلاعاتی است.</AlertDescription></Alert>
                <Alert variant="success"><CheckCircle className="h-4 w-4" /><AlertTitle>موفق</AlertTitle><AlertDescription>عملیات با موفقیت انجام شد.</AlertDescription></Alert>
                <Alert variant="warning"><AlertTriangle className="h-4 w-4" /><AlertTitle>هشدار</AlertTitle><AlertDescription>لطفاً قبل از ادامه بررسی کنید.</AlertDescription></Alert>
                <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>خطا</AlertTitle><AlertDescription>مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.</AlertDescription></Alert>
              </div>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">اسکلتون</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SkeletonCard />
                <div className="space-y-4">
                  <SkeletonAvatar size={48} />
                  <SkeletonText lines={3} />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">پیشرفت</h3>
              <div className="space-y-4 max-w-md">
                <Progress value={75} label="پیشرفت سفارش" showPercentage />
                <Progress value={40} size="sm" />
                <Progress value={90} size="lg" />
              </div>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">برچسب‌ها</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>پیش‌فرض</Badge>
                <Badge variant="secondary">ثانویه</Badge>
                <Badge variant="accent">تأکید</Badge>
                <Badge variant="success">موفقیت</Badge>
                <Badge variant="warning">هشدار</Badge>
                <Badge variant="destructive">خطا</Badge>
                <Badge variant="outline">خطی</Badge>
                <Badge variant="tool">GPT</Badge>
                <Badge variant="tool">Sora</Badge>
                <Badge variant="tool">Midjourney</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">آواتار</h3>
              <div className="flex items-center gap-4">
                <Avatar initials="SK" size="sm" />
                <Avatar initials="ML" size="md" />
                <Avatar initials="AT" size="lg" />
                <Avatar initials="DP" size="xl" status="online" />
                <Avatar initials="RM" size="lg" status="busy" />
                <Avatar initials="JW" size="md" status="offline" />
              </div>
            </div>
          </div>
        </section>

        {/* RTL Test */}
        <section id="rtl" aria-labelledby="rtl-title">
          <h2 id="rtl-title" className="text-display-lg text-ink mb-8">تست RTL</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>متن بلند فارسی</CardTitle></CardHeader>
              <CardContent>
                <p className="text-body text-ink leading-relaxed">
                  این یک متن تستی برای بررسی راست به چپ بودن رابط کاربری است. متن‌های فارسی باید از سمت راست شروع شوند و به سمت چپ ادامه پیدا کنند. اعداد و ارقام باید به درستی نمایش داده شوند.
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>ترکیب فارسی و انگلیسی</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-body-sm text-ink">ابزار: <Badge variant="tool">GPT</Badge> <Badge variant="tool">Claude</Badge></p>
                  <p className="text-body-sm text-ink">پلتفرم: <Badge variant="tool">Sora</Badge> <Badge variant="tool">Midjourney</Badge></p>
                  <p className="text-body-sm text-ink">اتصال: <Badge variant="tool">Zapier</Badge> <Badge variant="tool">Figma</Badge></p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>قیمت‌ها و اعداد</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-body-sm text-ink">قیمت: از ۱۵۰ دلار</p>
                  <p className="text-body-sm text-ink">امتیاز: ۴.۹ از ۱۲۷ نظر</p>
                  <p className="text-body-sm text-ink">مهلت: ۳ روز</p>
                  <p className="text-body-sm text-ink">تاریخ: ۱۴۰۳/۰۴/۰۱</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="text-card-title text-ink mb-4">آیکون‌ها و جهت‌ها</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-body-sm text-ink">
                  <ArrowRight className="w-4 h-4 rotate-180" aria-hidden="true" />
                  <span>بازگشت</span>
                </div>
                <div className="flex items-center gap-2 text-body-sm text-ink">
                  <span>ادامه</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 text-body-sm text-ink">
                  <Search className="w-4 h-4" aria-hidden="true" />
                  <span>جست‌وجو</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Preview */}
        <section id="mobile" aria-labelledby="mobile-title">
          <h2 id="mobile-title" className="text-display-lg text-ink mb-8">پیش‌نمایش موبایل</h2>
          <div className="max-w-[375px] border border-hairline rounded-lg overflow-hidden bg-canvas">
            <div className="p-4 space-y-4">
              <h3 className="text-headline text-ink">مشاهده خدمات</h3>
              <SearchInput placeholder="جست‌وجو..." />
              <div className="space-y-3">
                <ServiceCard title="ساخت ویدئوی تبلیغاتی" category="ویدئو و تبلیغات" sellerName="سارا ک." sellerInitials="SK" rating={4.9} reviews={127} price={150} deliveryDays={3} tools={["Sora"]} />
              </div>
              <Button className="w-full" size="lg">مشاهده خدمات</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-caption text-muted-foreground">کیت رابط کاربری NovaField - نسخه ۱.۰</p>
        </div>
      </footer>
    </div>
  );
}

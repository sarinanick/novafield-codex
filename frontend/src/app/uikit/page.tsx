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
import { SellerCard } from "@/components/marketplace/seller-card";
import { OrderCard } from "@/components/marketplace/order-card";
import {
  Film, Image, MessageSquare, Zap, Globe, Palette, BarChart3, PenTool,
  ArrowRight, ArrowLeft, Search, Star, Clock, User, Mail, Lock, Save,
  Trash2, Edit, Eye, Plus, CheckCircle, AlertCircle, Info, AlertTriangle, X
} from "lucide-react";

const sections = [
  { id: "tokens", title: "توکن‌های طراحی" },
  { id: "buttons", title: "دکمه‌ها" },
  { id: "forms", title: "فرم‌ها" },
  { id: "cards", title: "کارت‌ها" },
  { id: "marketplace", title: "بازارگاه" },
  { id: "feedback", title: "بازخورد" },
  { id: "data", title: "نمایش داده" },
  { id: "rtl", title: "تست RTL" },
];

export default function UIKitPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-xl border-b border-hairline">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-headline text-ink">کیت رابط کاربری NovaField</h1>
              <p className="text-body-sm text-muted-foreground mt-1">مرجع کامپوننت‌ها، حالت‌ها و الگوهای طراحی</p>
            </div>
            <Badge variant="secondary">v1.0</Badge>
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
            {/* Colors */}
            <div>
              <h3 className="text-card-title text-ink mb-4">رنگ‌ها</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { name: "Canvas", class: "bg-canvas", text: "text-ink" },
                  { name: "Surface", class: "bg-surface-soft", text: "text-ink" },
                  { name: "Ink", class: "bg-ink", text: "text-surface-soft" },
                  { name: "Hairline", class: "bg-hairline", text: "text-ink" },
                  { name: "Primary", class: "bg-ink", text: "text-surface-soft" },
                  { name: "Accent", class: "bg-accent-magenta", text: "text-white" },
                  { name: "Success", class: "bg-semantic-success", text: "text-white" },
                  { name: "Warning", class: "bg-semantic-warning", text: "text-white" },
                  { name: "Error", class: "bg-destructive", text: "text-white" },
                  { name: "Info", class: "bg-semantic-info", text: "text-white" },
                ].map(c => (
                  <div key={c.name} className="space-y-1.5">
                    <div className={`h-16 rounded-lg border border-hairline ${c.class} ${c.text} flex items-end p-2`}>
                      <span className="text-caption">{c.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-card-title text-ink mb-4">تایپوگرافی</h3>
              <div className="space-y-3 bg-surface-soft border border-hairline rounded-xl p-6">
                <p className="text-display-xl text-ink">عنوان صفحه (Display XL)</p>
                <p className="text-display-lg text-ink">عنوان بخش (Display LG)</p>
                <p className="text-headline text-ink">عنوان کارت (Headline)</p>
                <p className="text-body-lg text-ink">متن بزرگ (Body LG)</p>
                <p className="text-body text-ink">متن اصلی (Body)</p>
                <p className="text-body-sm text-ink">متن کوچک (Body SM)</p>
                <p className="text-caption text-muted-foreground">برچسب (Caption)</p>
              </div>
            </div>

            {/* Spacing */}
            <div>
              <h3 className="text-card-title text-ink mb-4">فاصله‌گذاری</h3>
              <div className="flex items-end gap-2">
                {["xxs", "xs", "sm", "md", "lg", "xl", "xxl"].map(s => (
                  <div key={s} className="flex flex-col items-center gap-1">
                    <div className="bg-ink/10 rounded" style={{ width: 24, height: [4, 8, 12, 16, 24, 32, 48][["xxs", "xs", "sm", "md", "lg", "xl", "xxl"].indexOf(s)] }} />
                    <span className="text-caption text-muted-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Radius */}
            <div>
              <h3 className="text-card-title text-ink mb-4">گوشه‌گردی</h3>
              <div className="flex items-end gap-4">
                {["rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-pill", "rounded-full"].map(r => (
                  <div key={r} className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 bg-ink/10 border border-hairline ${r}`} />
                    <span className="text-caption text-muted-foreground">{r.replace("rounded-", "")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section id="buttons" aria-labelledby="buttons-title">
          <h2 id="buttons-title" className="text-display-lg text-ink mb-8">دکمه‌ها</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-card-title text-ink mb-4">variants</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default">پیش‌فرض</Button>
                <Button variant="secondary">ثانویه</Button>
                <Button variant="outline">خطی</Button>
                <Button variant="ghost">شبح</Button>
                <Button variant="subtle">ملایم</Button>
                <Button variant="accent">لهجه</Button>
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
              <h3 className="text-card-title text-ink mb-4"> تمام عرض</h3>
              <Button className="w-full" size="lg">مشاهده خدمات</Button>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section id="forms" aria-labelledby="forms-title">
          <h2 id="forms-title" className="text-display-lg text-ink mb-8">فرم‌ها</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>ورودی‌ها</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input label="نام کامل" placeholder="نام خود را وارد کنید" />
                <Input label="ایمیل" type="email" placeholder="you@example.com" leftIcon={<Mail className="w-4 h-4" />} />
                <Input label="رمز عبور" type="password" placeholder="حداقل ۶ کاراکتر" leftIcon={<Lock className="w-4 h-4" />} helperText="۸ کاراکتر یا بیشتر بهتر است" />
                <Input label="خطا" placeholder="متن خطا" error errorMessage="لطفاً ایمیل معتبر وارد کنید" />
                <Input label="غیرفعال" placeholder="غیرفعال" disabled />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>سایر فرم‌ها</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea label="توضیحات" placeholder="توضیحات خود را بنویسید..." rows={3} />
                <Select
                  label="دسته‌بندی"
                  placeholder="انتخاب کنید"
                  options={[
                    { value: "video", label: "ویدئو و تبلیغات" },
                    { value: "image", label: "تصویرسازی" },
                    { value: "chatbot", label: "چت‌بات" },
                    { value: "automation", label: "اتوماسیون" },
                  ]}
                />
                <SearchInput placeholder="جست‌وجوی خدمات، ابزارها یا فریلنسرها..." />
                <Checkbox label="شرایط را می‌پذیرم" description="با ثبت‌نام، شرایط استفاده را می‌پذیرید." />
                <RadioGroup
                  name="role"
                  value="client"
                  options={[
                    { value: "client", label: "می‌خواهم خدمات بخرم", description: "فریلنسرهای AI را پیدا و مقایسه کنید." },
                    { value: "freelancer", label: "می‌خواهم خدمات بفروشم", description: "خدمت خود را منتشر کنید و سفارش بگیرید." },
                  ]}
                />
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
              <CardContent>
                <p className="text-body-sm text-muted-foreground">محتوای کارت اینجا قرار می‌گیرد.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">عملیات</Button>
              </CardFooter>
            </Card>

            <Card className="bg-ink text-surface-soft border-ink">
              <CardHeader>
                <CardTitle className="text-surface-soft">کارت تیره</CardTitle>
                <CardDescription className="text-surface-soft/70">کارت با پس‌زمینه تیره</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-surface-soft/80">محتوای کارت تیره.</p>
              </CardContent>
            </Card>

            <Card className="bg-accent-magenta text-white border-accent-magenta">
              <CardHeader>
                <CardTitle className="text-white">کارت رنگی</CardTitle>
                <CardDescription className="text-white/70">کارت با رنگ لهجه</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-white/80">محتوای کارت رنگی.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Marketplace */}
        <section id="marketplace" aria-labelledby="marketplace-title">
          <h2 id="marketplace-title" className="text-display-lg text-ink mb-8">بازارگاه</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-card-title text-ink mb-4">کارت خدمت</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ServiceCard title="ساخت ویدئوی تبلیغاتی" category="ویدئو و تبلیغات" sellerName="سارا ک." sellerInitials="SK" sellerGradient="from-blue-500 to-purple-600" rating={4.9} reviews={127} price={150} deliveryDays={3} tools={["Sora", "Runway"]} />
                <ServiceCard title="طراحی عکس محصول" category="تصویرسازی" sellerName="مرسل ل." sellerInitials="ML" sellerGradient="from-emerald-500 to-teal-600" rating={4.8} reviews={89} price={75} deliveryDays={2} tools={["Midjourney", "DALL-E"]} />
                <ServiceCard title="ساخت چت‌بات برند" category="چت‌بات و ایجنت" sellerName="آیکو ت." sellerInitials="AT" sellerGradient="from-orange-500 to-red-600" rating={5.0} reviews={64} price={200} deliveryDays={5} tools={["GPT", "Claude"]} />
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

            <div>
              <h3 className="text-card-title text-ink mb-4">کارت فروشنده</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SellerCard name="سارا کریمی" initials="SK" specialty="سازنده ویدئو" rating={4.9} completedOrders={127} responseTime="کمتر از ۱ ساعت" />
                <SellerCard name="مرسل لطیفی" initials="ML" specialty="طراح گرافیک" rating={4.8} completedOrders={89} responseTime="کمتر از ۲ ساعت" />
                <SellerCard name="آیکو تاناکا" initials="AT" specialty="توسعه‌دهنده چت‌بات" rating={5.0} completedOrders={64} responseTime="کمتر از ۱ ساعت" />
              </div>
            </div>

            <div>
              <h3 className="text-card-title text-ink mb-4">کارت سفارش</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <OrderCard title="ساخت ویدئوی تبلیغاتی اینستاگرام" status="در حال انجام" price="۱۵۰ دلار" deadline="۳ روز" counterparty="سارا ک." />
                <OrderCard title="طراحی لوگو برای استارتاپ" status="تکمیل‌شده" price="۲۰۰ دلار" deadline="تمام شده" counterparty="مرسل ل." />
              </div>
            </div>
          </div>
        </section>

        {/* Feedback */}
        <section id="feedback" aria-labelledby="feedback-title">
          <h2 id="feedback-title" className="text-display-lg text-ink mb-8">بازخورد</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-card-title text-ink mb-4">Alert</h3>
              <div className="space-y-3">
                <Alert variant="default">
                  <Info className="h-4 w-4" />
                  <AlertTitle>اطلاعات</AlertTitle>
                  <AlertDescription>این یک پیام اطلاعاتی است.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>موفق</AlertTitle>
                  <AlertDescription>عملیات با موفقیت انجام شد.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>هشدار</AlertTitle>
                  <AlertDescription>لطفاً قبل از ادامه بررسی کنید.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>خطا</AlertTitle>
                  <AlertDescription>مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.</AlertDescription>
                </Alert>
              </div>
            </div>

            <div>
              <h3 className="text-card-title text-ink mb-4">Skeleton</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <SkeletonCard />
                <div className="space-y-4">
                  <SkeletonAvatar size={48} />
                  <SkeletonText lines={3} />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-card-title text-ink mb-4">Progress</h3>
              <div className="space-y-4 max-w-md">
                <Progress value={75} label="پیشرفت سفارش" showPercentage />
                <Progress value={40} size="sm" />
                <Progress value={90} size="lg" />
              </div>
            </div>

            <div>
              <h3 className="text-card-title text-ink mb-4">Badge</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>پیش‌فرض</Badge>
                <Badge variant="secondary">ثانویه</Badge>
                <Badge variant="accent">لهجه</Badge>
                <Badge variant="success">موفق</Badge>
                <Badge variant="warning">هشدار</Badge>
                <Badge variant="destructive">حذف</Badge>
                <Badge variant="outline">خطی</Badge>
                <Badge variant="tool">GPT</Badge>
                <Badge variant="tool">Sora</Badge>
                <Badge variant="tool">Midjourney</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-card-title text-ink mb-4">Avatar</h3>
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

        {/* Data Display */}
        <section id="data" aria-labelledby="data-title">
          <h2 id="data-title" className="text-display-lg text-ink mb-8">نمایش داده</h2>

          <Card>
            <CardHeader>
              <CardTitle>سفارش‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-body-sm">
                  <thead>
                    <tr className="border-b border-hairline">
                      <th className="text-start py-3 px-4 text-muted-foreground font-medium">عنوان</th>
                      <th className="text-start py-3 px-4 text-muted-foreground font-medium">مبلغ</th>
                      <th className="text-start py-3 px-4 text-muted-foreground font-medium">وضعیت</th>
                      <th className="text-start py-3 px-4 text-muted-foreground font-medium">تاریخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { title: "ساخت ویدئوی تبلیغاتی", price: "۱۵۰ دلار", status: "در حال انجام", date: "۱۴۰۳/۰۴/۰۱", statusVariant: "warning" as const },
                      { title: "طراحی لوگو", price: "۲۰۰ دلار", status: "تکمیل‌شده", date: "۱۴۰۳/۰۳/۲۸", statusVariant: "success" as const },
                      { title: "ساخت چت‌بات", price: "۳۰۰ دلار", status: "جدید", date: "۱۴۰۳/۰۴/۰۲", statusVariant: "info" as const },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-hairline-soft hover:bg-canvas/50">
                        <td className="py-3 px-4 text-ink font-medium">{row.title}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.price}</td>
                        <td className="py-3 px-4"><Badge variant={row.statusVariant}>{row.status}</Badge></td>
                        <td className="py-3 px-4 text-muted-foreground">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Stress Test */}
        <section id="rtl" aria-labelledby="rtl-title">
          <h2 id="rtl-title" className="text-display-lg text-ink mb-8">تست RTL</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>متن بلند فارسی</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-body text-ink leading-relaxed">
                  این یک متن تستی برای بررسی راست به چپ بودن رابط کاربری است. متن‌های فارسی باید از سمت راست شروع شوند و به سمت چپ ادامه پیدا کنند. اعداد و ارقام باید به درستی نمایش داده شوند.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>ترکیب فارسی و انگلیسی</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-body-sm text-ink">ابزار: <Badge variant="tool">GPT</Badge> <Badge variant="tool">Claude</Badge></p>
                  <p className="text-body-sm text-ink">پلتفرم: <Badge variant="tool">Sora</Badge> <Badge variant="tool">Midjourney</Badge></p>
                  <p className="text-body-sm text-ink">اتصال: <Badge variant="tool">Zapier</Badge> <Badge variant="tool">Figma</Badge></p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>قیمت‌ها و اعداد</CardTitle>
                </CardHeader>
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
      </main>

      <footer className="border-t border-hairline py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-caption text-muted-foreground">کیت رابط کاربری NovaField - نسخه ۱.۰</p>
        </div>
      </footer>
    </div>
  );
}

# NovaField UI Design System

**Version:** 1.0  
**Purpose:** This file is the single source of truth for NovaField's frontend visual design, Persian RTL interface, UX behavior, and copy rules.

Every AI agent, developer, or designer working on NovaField must read and follow this file before changing any UI.

---

## 1. Product Identity

NovaField is a **Persian-first AI services marketplace**.

It is not primarily:
- an AI video generator,
- a generic SaaS dashboard,
- a metaverse product,
- a meeting tool,
- or a colorful AI playground.

NovaField helps two groups:

### Clients / Buyers
People and businesses who want to hire AI freelancers for:
- AI video and ads
- AI image generation
- chatbots and agents
- automation
- content and copywriting
- design and branding
- AI web apps
- data and research

### Freelancers / Sellers
AI freelancers who want to:
- create a profile
- publish AI services
- get discovered
- receive orders
- manage messages and projects

The UI must always support these two paths clearly.

---

## 2. Design Direction

NovaField should feel:

- calm
- premium
- editorial
- product-led
- Persian-native
- marketplace-focused
- trustworthy
- not noisy
- not overly colorful
- not template-like

The visual identity should be inspired by **Intercom's calm marketing system**, while using **Material Design principles** for interaction, accessibility, forms, density, and RTL behavior.

### Rule
Use:

```text
Intercom-inspired visual system = visual foundation
Material Design = UX behavior and interaction principles
Persian RTL = language and content architecture
```

Do not blindly mix Intercom and Material visuals.

Do not make the site look like default Google Material UI.

---

## 3. Visual Foundation

The visual foundation is based on a calm Intercom-like system:

- cream canvas
- white cards
- charcoal text
- restrained accent
- thin borders
- minimal shadows
- modest radius
- short copy
- product/service cards as the main visual focus

### Do
- Use warm cream as the page background.
- Use white cards lifted from the cream canvas.
- Use charcoal buttons and headlines.
- Use thin borders instead of heavy shadows.
- Use short Persian copy.
- Use consistent spacing and rhythm.
- Make service/product cards the visual hero.

### Don't
- Do not use pure white as the full page background.
- Do not use blue/purple/pink gradients as main surfaces.
- Do not use neon colors.
- Do not use heavy glow effects.
- Do not use excessive decorative blobs.
- Do not use huge pill buttons everywhere.
- Do not use many accent colors in one viewport.
- Do not create long marketing paragraphs.
- Do not use fake stats.
- Do not use fake links.

---

## 4. Color System

Use these tokens globally. Prefer CSS variables or Tailwind tokens. Do not hardcode random colors in components.

```css
--color-canvas: #f5f1ec;
--color-surface: #ffffff;
--color-surface-muted: #ebe7e1;

--color-ink: #111111;
--color-ink-muted: #626260;
--color-ink-subtle: #7b7b78;
--color-ink-tertiary: #9c9fa5;

--color-hairline: #d3cec6;
--color-hairline-soft: #ebe7e1;

--color-primary: #111111;
--color-on-primary: #ffffff;

--color-accent: #ff5600;

--color-error: #c41c1c;
--color-success: #0b8f3a;
```

### Color Rules

#### Canvas
Use `#f5f1ec` as the default background.

#### Cards
Use `#ffffff` cards on cream canvas.

#### Text
Use `#111111` for primary text.  
Use `#626260` for secondary text.

#### Borders
Use `#d3cec6` for card borders and UI separators.

#### Accent
Use `#ff5600` very sparingly:
- small badges
- one key emphasis
- small product accent

Do not use orange as every primary CTA.

#### Primary CTA
Use charcoal:
- background: `#111111`
- text: `#ffffff`

---

## 5. Typography

The UI must be Persian-friendly.

### Preferred Font
Use **Vazirmatn**.

Alternative:
- Estedad
- system sans fallback

Do not use proprietary fonts such as Saans.

Recommended font stack:

```css
font-family: Vazirmatn, Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Type Scale

Use readable Persian sizes.

| Use | Desktop | Mobile | Weight |
|---|---:|---:|---:|
| Hero headline | 44–56px | 32–38px | 600 |
| Section title | 32–40px | 26–30px | 600 |
| Card title | 18–22px | 17–20px | 600 |
| Body | 15–17px | 15–16px | 400 |
| Small text | 12–13px | 12–13px | 400 |
| Button | 14–15px | 14–15px | 600 |

### Typography Rules

- Persian text must not be too small.
- Line-height should be generous: 1.7–1.9 for Persian body text.
- Avoid long all-caps English labels.
- Avoid letter-spacing tricks on Persian text.
- Use short headings.
- Use short paragraphs.
- Do not create dense walls of text.

---

## 6. Persian and RTL Rules

The entire active user-facing UI must be Persian and RTL.

Set globally:

```tsx
<html lang="fa" dir="rtl">
```

### RTL Layout Rules

- Text aligns right by default.
- Form icons should appear on the right side.
- Input padding must account for right-side icons.
- Navigation order should feel natural in Persian.
- Cards should align text right.
- Tables, filters, and pagination must support RTL.
- Icons should not collide with text.
- Directional icons must be reviewed:
  - arrows
  - chevrons
  - next/previous
  - back buttons

### English Exceptions

Keep these names in English:
- NovaField
- GPT
- Claude
- Sora
- Midjourney
- Runway
- Zapier
- Figma
- API
- AI if it is part of a tool name

But translate surrounding labels.

---

## 7. Copywriting Rules

The biggest copy problem to avoid is **long Persian text**.

### Main Rule
After translating or writing UI copy, reduce it by **30–50%**.

### Hero Copy

Hero headline must be short.

Good:
```text
بازار خدمات هوش مصنوعی
```

Bad:
```text
پلتفرمی برای اتصال کسب‌وکارها و خلاقان به متخصصان حرفه‌ای هوش مصنوعی برای ساخت انواع خروجی‌های خلاقانه و فنی
```

### Paragraph Rules

- Hero subtitle: max 1–2 short lines.
- Section description: max 1 sentence.
- Card description: max 1 line or 2 short lines.
- Button text: max 2–3 words.
- Error text: direct and short.

### Avoid
- excessive hype
- fake statistics
- generic SaaS copy
- mixed English/Persian buttons
- long explanatory paragraphs
- unimplemented promises

---

## 8. Preferred Persian Copy

### Homepage Hero

Headline:
```text
بازار خدمات هوش مصنوعی
```

Subtitle:
```text
متخصص‌های هوش مصنوعی را برای ساخت ویدئو، تصویر، چت‌بات، اتوماسیون و محتوای حرفه‌ای پیدا کنید.
```

Primary CTA:
```text
مشاهده خدمات
```

Secondary CTA:
```text
شروع فروش
```

Trust chips:
```text
پروژه‌محور
مناسب کسب‌وکارها
مناسب فریلنسرهای AI
```

---

## 9. Information Architecture

Homepage must answer these questions quickly:

1. NovaField چیست؟
2. برای خریدار چه کاری می‌کند؟
3. برای فریلنسر چه کاری می‌کند؟
4. از کجا شروع کنم؟

### Homepage Section Order

Use this order:

1. Navbar
2. Hero
3. Marketplace preview / example service cards
4. Service categories
5. How it works
6. Featured services
7. Trust / workflow
8. Simple marketplace model
9. Final CTA
10. Footer

### Section Responsibilities

#### Hero
What NovaField is + primary action.

#### Marketplace Preview
Show example services to make the marketplace tangible.

#### Categories
Show what users can buy or sell.

#### How It Works
Explain client and freelancer flows.

#### Featured Services
Show marketplace proof.

#### Trust
Reduce uncertainty.

#### Pricing / Business Model
Clarify how money works without overpromising.

#### CTA
Convert the user.

---

## 10. Components

## Buttons

### Primary Button

Use for main CTA.

Style:
- background: charcoal
- text: white
- radius: 8px
- height: 40–44px normal
- height: 48px hero
- no gradient
- no glow
- no heavy shadow

Persian examples:
```text
مشاهده خدمات
ثبت‌نام
ورود
```

### Secondary Button

Style:
- background: white
- text: charcoal
- border: 1px warm gray
- radius: 8px

Persian examples:
```text
شروع فروش
بیشتر بدانید
```

### Tertiary Button

Use for low-priority actions:
- no filled background
- clear hover state
- short text

### Button Don'ts

Do not use:
```text
Create account and browse services
Create account and publish service
Start Creating Free
```

Use:
```text
ثبت‌نام
شروع فروش
مشاهده خدمات
```

---

## 11. Cards

### Card Style

Use:
- background: white
- border: 1px solid hairline
- radius: 12px
- padding: 20–24px
- no heavy shadow
- subtle hover border
- subtle hover background only if needed

### Service Card Must Include

- service title
- category
- seller name or initials
- rating
- starting price
- delivery time
- tool chips

Persian examples:
```text
ساخت ویدئوی تبلیغاتی
از ۱۵۰ دلار
۳ روزه
۴.۹ از ۱۲۷ نظر
```

### Card Interaction

If a card looks clickable, it must be clickable.

Do not use `cursor-pointer` on non-clickable cards.

Use real `<Link>` or `<button>`.

---

## 12. Forms

Forms should follow Material Design UX behavior but Intercom visual calmness.

### Inputs

Use:
- white background
- charcoal text
- warm border
- 8px radius
- height at least 44px
- clear focus ring
- helper text below field
- error text below field

### Persian Form Labels

Register:
```text
نام کامل
ایمیل
رمز عبور
تکرار رمز عبور
```

Login:
```text
ایمیل
رمز عبور
```

### Error Messages

Use Persian:

```text
لطفاً نام خود را وارد کنید.
لطفاً ایمیل معتبر وارد کنید.
رمز عبور باید حداقل ۶ کاراکتر باشد.
رمزهای عبور یکسان نیستند.
ثبت‌نام ناموفق بود.
ورود ناموفق بود.
```

### Password Helper

Use:
```text
حداقل ۶ کاراکتر
۸ کاراکتر یا بیشتر بهتر است
```

Do not block signup at 8 unless backend requires it.

---

## 13. Auth/Register Page

### Goal
Let the user choose between buying services and selling services.

### Structure

1. Brand
2. Title
3. Role choice
4. Short role helper
5. Form
6. Login link

### Persian Copy

Title:
```text
ساخت حساب کاربری
```

Subtitle:
```text
برای خرید یا فروش خدمات هوش مصنوعی ثبت‌نام کنید.
```

Role card 1:
```text
می‌خواهم خدمات بخرم
فریلنسرهای AI را پیدا و مقایسه کنید.
```

Role card 2:
```text
می‌خواهم خدمات بفروشم
خدمت خود را منتشر کنید و سفارش بگیرید.
```

Helper for client:
```text
بعد از ثبت‌نام وارد بازار خدمات می‌شوید.
```

Helper for freelancer:
```text
بعد از ثبت‌نام اولین خدمت خود را می‌سازید.
```

Submit button:
```text
ثبت‌نام
```

Do not use long submit button text.

### URL Behavior

`/auth/register?role=freelancer` must preselect freelancer.

`/auth/register` defaults to client.

---

## 14. Auth/Login Page

### Persian Copy

Title:
```text
ورود به حساب
```

Subtitle:
```text
برای ادامه وارد حساب NovaField شوید.
```

Fields:
```text
ایمیل
رمز عبور
```

Button:
```text
ورود
```

Loading:
```text
در حال ورود...
```

Register link:
```text
حساب ندارید؟ ثبت‌نام کنید
```

---

## 15. Marketplace Page

Translate visible UI to Persian.

### Search

Placeholder:
```text
جست‌وجوی خدمات، ابزارها یا فریلنسرها...
```

Button:
```text
جست‌وجو
```

### Filters

```text
دسته‌بندی‌ها
همه دسته‌ها
مرتب‌سازی
فیلترها
```

### Sort

```text
جدیدترین
محبوب‌ترین
بالاترین امتیاز
ارزان‌ترین
گران‌ترین
```

### Empty State

```text
خدمتی پیدا نشد
عبارت جست‌وجو یا فیلترها را تغییر دهید.
```

### Card Labels

```text
از
روز
نظر
سفارش
فروشنده جدید
فروشنده فعال
```

---

## 16. Navigation

### Public Navbar

Use:
```text
بازار خدمات
روش کار
فروش خدمات
ورود
ثبت‌نام
```

Routes:
- بازار خدمات → `/marketplace`
- روش کار → `/#how-it-works`
- فروش خدمات → `/auth/register?role=freelancer`
- ورود → `/auth/login`
- ثبت‌نام → `/auth/register`

### Authenticated User Menu

Include:
```text
داشبورد
سفارش‌ها
پیام‌ها
بازار خدمات
ساخت خدمت
پروفایل
مدیریت
خروج
```

Only show:
- ساخت خدمت for freelancer
- مدیریت for admin

---

## 17. Footer

Minimal footer only.

Links:
```text
بازار خدمات
روش کار
فروش خدمات
ورود
ثبت‌نام
```

No fake links.

No `href="#"`.

No social links unless actual brand URLs exist.

---

## 18. Accessibility and Material UX Rules

Follow these rules everywhere:

- minimum touch target: 44px
- visible focus states
- clear hover states
- clear disabled states
- accessible form labels
- error messages connected to fields when possible
- no icon-only buttons without aria-label
- keyboard navigation must work
- tab order must be logical
- no non-clickable clickable-looking elements
- respect reduced motion
- no autoplay motion that distracts
- avoid low-contrast text

---

## 19. Motion

Use motion sparingly.

Do:
- subtle fade
- subtle translate
- hover border
- small button state

Don't:
- animate every section
- use parallax by default
- use glowing animated backgrounds
- use heavy Framer Motion for static content

Static sections should not be client components just for animation.

---

## 20. Technical Rules

### Prefer Global Tokens

Before editing individual components, inspect:
- `frontend/src/app/globals.css`
- Tailwind config
- button component
- input component

Implement design tokens globally.

Avoid hardcoding random colors across components.

### Server vs Client Components

Remove `"use client"` from components that do not need:
- hooks
- browser APIs
- client-only events
- local state

Keep `"use client"` for:
- Navbar
- forms
- tabs using state
- components with browser events

---

## 21. Active Pages To Review

Every UI change must check these routes:

```text
/
/auth/register
/auth/register?role=freelancer
/auth/login
/marketplace
/dashboard
/create-gig
/orders
/messages
```

Also check:
- error page
- not-found page

---

## 22. QA Checklist

Before opening or merging a PR, verify:

### Build
```bash
cd frontend
npm install
npm run build
```

### Browser QA

Check:
- no console errors
- no hydration errors
- no Radix Slot errors
- no horizontal overflow
- no broken routes
- no fake links
- no `href="#"`
- no mixed English/Persian UI except tool names
- no too-long buttons
- no tiny Persian text
- no bright visual noise

### Responsive

Check:
- 375px mobile
- 768px tablet
- 1440px desktop

### RTL

Check:
- form icons
- input padding
- navigation order
- card alignment
- filters
- dropdown menus
- modal direction
- arrow icons

---

## 23. Implementation Policy For AI Agents

Every agent must:

1. Read this file before making UI changes.
2. Follow it for every new component.
3. Use Persian RTL by default.
4. Use Intercom-inspired visual tokens.
5. Use Material UX behavior.
6. Keep copy short.
7. Avoid fake claims.
8. Avoid fake links.
9. Avoid unnecessary animations.
10. Run build before reporting completion.

If a requested change conflicts with this file, the agent must mention the conflict and ask whether to update the design system first.

---

## 24. PR Rules

Every design PR must include:

```text
## Design System Compliance
- Read NOVAFIELD_DESIGN_SYSTEM.md
- Used Persian RTL
- Used cream canvas / white cards / charcoal CTA
- Reduced copy length
- Removed visual noise
- Checked form and button states
- Checked responsive layouts

## Validation
- npm install
- npm run build
- Checked browser console
- Checked mobile/tablet/desktop
```

Do not merge if:
- build fails
- UI is partly English
- `href="#"` exists
- buttons are visually inconsistent
- the design ignores this file
- text is too long
- RTL is broken

---

## 25. Final Principle

NovaField should feel like:

```text
یک بازار حرفه‌ای، آرام و فارسی برای خرید و فروش خدمات هوش مصنوعی
```

Not like:

```text
یک قالب رنگارنگ AI SaaS با متن‌های طولانی و دکمه‌های شلوغ
```

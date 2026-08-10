# Backend Integrations — Hướng dẫn gắn sau

Mọi tính năng cần backend đều đang ở dạng stub có cấu trúc, chỉ cần edit 1 file để swap thật. Grep `TODO_BACKEND` để liệt kê.

| # | Tính năng         | File                                       | Schema                                              | Hướng dẫn gắn                                                                                |
| - | ----------------- | ------------------------------------------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1 | Contact form      | `src/lib/integrations/contact-form.ts`     | `{ name, phone, email, company?, message }`        | Formspree: set `NEXT_PUBLIC_FORMSPREE_ID`, swap fetch URL. Hoặc tạo API route `/api/contact`. |
| 2 | Newsletter        | `src/lib/integrations/newsletter.ts`       | `{ email }`                                         | Mailchimp/ConvertKit/SendGrid — set provider ID env và replace body.                         |
| 3 | Analytics         | `src/lib/integrations/analytics.ts`        | event name + params                                 | GA4: set `NEXT_PUBLIC_GA_ID`, mount `<Script>` trong layout. FB Pixel tương tự.              |
| 4 | Livechat          | `src/lib/integrations/livechat.ts`         | Zalo OA / Crisp / Tawk                              | Set `LIVECHAT_PROVIDER_ID` env, import widget script trong layout.                            |
| 5 | Search blog       | (để vào Phase 7)                           | client-side index từ MDX                            | Tạo `lib/integrations/search.ts` đọc `_audit/sitemap-discovery.json` + `content/`.            |

## Env variables cần khai báo (`.env.local`)

```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_FB_PIXEL_ID=
NEXT_PUBLIC_FORMSPREE_ID=
ZALO_OA_ID=
LIVECHAT_PROVIDER_ID=
```

## Cách test stub đang chạy

1. Submit contact form → check console: phải thấy `[STUB] Contact form submitted: {...}` rồi UI show toast “Cảm ơn bạn đã liên hệ.”
2. Click các nút Zalo / WhatsApp / Hotline ở `FloatingButtons` → mở đúng URL từ `livechat.ts`.
3. Khi gắn backend xong, xóa `console.log` + dòng `await new Promise(...)` để bỏ delay giả.

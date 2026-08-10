import { z } from "zod";

// TODO_BACKEND: Contact form submission
// Schema: { name, phone, email, company?, message }
// Hướng dẫn gắn:
//   Option A — Formspree: thay return body bằng
//     const res = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Accept: "application/json" },
//       body: JSON.stringify(parsed.data),
//     });
//     return { success: res.ok, message: res.ok ? "..." : "..." };
//   Option B — API route riêng: POST tới `/api/contact` (tự tạo route handler).

export const contactSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  company: z.string().optional(),
  message: z.string().min(10, "Vui lòng mô tả nhu cầu chi tiết hơn"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactForm(
  raw: unknown,
): Promise<{ success: boolean; message: string }> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ",
    };
  }
  // STUB — replace with real backend (see comments above)
  console.log("[STUB] Contact form submitted:", parsed.data);
  await new Promise((r) => setTimeout(r, 800));
  return {
    success: true,
    message: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
  };
}

import { z } from "zod";

// TODO_BACKEND: Newsletter subscription
// Hướng dẫn gắn: Mailchimp / SendGrid / ConvertKit — set NEWSLETTER_PROVIDER_ID env và replace body.

export const newsletterSchema = z.object({ email: z.string().email() });
export type NewsletterData = z.infer<typeof newsletterSchema>;

export async function subscribeNewsletter(
  raw: unknown,
): Promise<{ success: boolean; message: string }> {
  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) return { success: false, message: "Email không hợp lệ" };
  console.log("[STUB] Newsletter subscribe:", parsed.data);
  await new Promise((r) => setTimeout(r, 600));
  return { success: true, message: "Đã đăng ký nhận tin." };
}

"use server";

import { contactFormSchema, type ContactFormValues } from "@/features/contact/contact-form.schema";

export interface ContactActionResult {
  success: boolean;
  message: string;
}

export async function submitContactForm(values: ContactFormValues): Promise<ContactActionResult> {
  const parsed = contactFormSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "اطلاعات وارد شده معتبر نیست." };
  }

  // No inquiries/leads collection exists yet, so log for now instead of dropping the message silently.
  console.info("New contact inquiry received:", parsed.data);

  return {
    success: true,
    message: "پیام شما با موفقیت ارسال شد. به‌زودی با شما تماس خواهیم گرفت.",
  };
}

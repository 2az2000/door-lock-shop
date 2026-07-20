import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  phone: z.string().min(8, "شماره تماس معتبر نیست"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ حرف باشد"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

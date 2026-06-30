"use server";

import { Resend } from "resend";

// Initialize Resend with the environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  source: string;
}) {
  try {
    const { name, email, subject, message, source } = formData;

    if (!name || !email || !subject || !message) {
      return { success: false, error: "All required fields must be filled." };
    }

    // Send email using Resend
    // From: sacrivox@gmail.com (verified email/domain in Resend)
    // To: manzisonny81@gmail.com
    const { data, error } = await resend.emails.send({
      from: "Sonny Portfolio <sacrivox@gmail.com>",
      to: "manzisonny81@gmail.com",
      subject: `Portfolio Inquiry: ${subject}`,
      reply_to: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4ff; border-radius: 12px; background-color: #0a0a0f; color: #f8fafc;">
          <h2 style="color: #6260FF; border-b: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Found via:</strong> ${source}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: rgba(255, 255, 255, 0.02); border-left: 4px solid #6260FF; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; font-style: italic; line-height: 1.6;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.06); margin: 30px 0;" />
          <p style="font-size: 11px; color: #94A3B8; text-align: center;">Sent from sonnydev.vercel.app</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Resend Server Action Unexpected Error:", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

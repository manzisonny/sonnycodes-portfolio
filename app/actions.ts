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

    const emailTemplate = `
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
    `;

    // Attempt 1: Send to primary email manzisonny81@gmail.com
    console.log("Attempting to send email to manzisonny81@gmail.com...");
    let response = await resend.emails.send({
      from: "Sonny Portfolio <onboarding@resend.dev>",
      to: "manzisonny81@gmail.com",
      subject: `Portfolio Inquiry: ${subject}`,
      reply_to: email,
      html: emailTemplate,
    });

    // If Attempt 1 fails (e.g. because Resend key belongs to sacrivox@gmail.com and only allows sending to its registered account address during onboarding)
    if (response.error) {
      console.warn("Primary email failed. Error detail:", response.error.message);
      console.log("Attempting to send email to fallback sacrivox@gmail.com...");
      
      response = await resend.emails.send({
        from: "Sonny Portfolio <onboarding@resend.dev>",
        to: "sacrivox@gmail.com",
        subject: `Portfolio Inquiry (Fallback): ${subject}`,
        reply_to: email,
        html: emailTemplate,
      });
    }

    if (response.error) {
      console.error("Resend API Error (all recipients failed):", response.error);
      return { success: false, error: response.error.message };
    }

    return { success: true, data: response.data };
  } catch (err: any) {
    console.error("Resend Server Action Unexpected Error:", err);
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

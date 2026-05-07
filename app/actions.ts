"use server";

import { getSupabaseServer } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function submitMessage(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  source: string;
}) {
  try {
    const supabase = getSupabaseServer();
    const { error, data } = await supabase
      .from("messages")
      .insert([formData])
      .select();

    if (error) {
      console.error("Server Action Error (messages):", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/messages");
    return { success: true, data };
  } catch (err: any) {
    console.error("Unexpected Server Error:", err);
    return { success: false, error: err.message || "Internal Server Error" };
  }
}

export async function submitCollaboration(formData: {
  name: string;
  company?: string;
  email: string;
  idea: string;
  budget: string;
  timeline: string;
  tech_stack: string[];
}) {
  try {
    const supabase = getSupabaseServer();
    const { error, data } = await supabase
      .from("collaborations")
      .insert([formData])
      .select();

    if (error) {
      console.error("Server Action Error (collaborations):", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/collabs");
    return { success: true, data };
  } catch (err: any) {
    console.error("Unexpected Server Error:", err);
    return { success: false, error: err.message || "Internal Server Error" };
  }
}

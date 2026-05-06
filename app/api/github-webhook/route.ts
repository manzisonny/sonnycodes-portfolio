import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";
import { fetchRepos } from "@/lib/github";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const signature = request.headers.get("x-hub-signature-256");

  // TODO: Verify signature with GITHUB_WEBHOOK_SECRET
  // For production, always verify webhooks!

  console.log("GitHub Webhook received:", body.repository?.name);

  const supabase = getSupabaseServer();
  const repos = await fetchRepos();

  if (repos.length > 0) {
    const upsertData = repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      topics: repo.topics || [],
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      account: repo.account_type,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
    }));

    await supabase.from("projects").upsert(upsertData, { onConflict: 'name' });
    
    // Trigger ISR revalidation
    revalidatePath("/projects");
    revalidatePath("/home");
  }

  return NextResponse.json({ received: true });
}

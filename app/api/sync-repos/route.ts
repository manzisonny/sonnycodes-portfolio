import { NextResponse } from "next/server";
import { fetchRepos } from "@/lib/github";
import { getSupabaseServer } from "@/lib/supabase";

export async function POST(request: Request) {
  const supabase = getSupabaseServer();
  
  // Verify admin token (optional, but recommended)
  // For now, we'll just allow it if the secret header matches or it's a manual trigger from admin
  
  const repos = await fetchRepos();

  if (!repos.length) {
    return NextResponse.json({ error: "No repos found or error fetching" }, { status: 500 });
  }

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

  const { error } = await supabase
    .from("projects")
    .upsert(upsertData, { onConflict: 'name' }); // Assuming 'name' is unique enough or use GitHub ID

  if (error) {
    console.error("Supabase upsert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: `Successfully synced ${repos.length} repositories.` });
}

export async function GET() {
  return NextResponse.json({ message: "Use POST to sync repos." });
}

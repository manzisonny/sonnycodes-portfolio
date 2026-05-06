import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
  };
}

export async function fetchRepos() {
  const personalAccount = "manzisonny";
  const companyAccount = "fullstacksoftwareltdrwanda";

  try {
    // Fetch personal repos
    const personalResponse = await octokit.rest.repos.listForUser({
      username: personalAccount,
      sort: "updated",
      per_page: 100,
    });

    // Fetch company repos
    const companyResponse = await octokit.rest.repos.listForUser({
      username: companyAccount,
      sort: "updated",
      per_page: 100,
    });

    const personalRepos = personalResponse.data.map(repo => ({
      ...repo,
      account_type: 'personal'
    }));

    const companyRepos = companyResponse.data.map(repo => ({
      ...repo,
      account_type: 'company'
    }));

    return [...personalRepos, ...companyRepos];
  } catch (error) {
    console.error("Error fetching repos from GitHub:", error);
    return [];
  }
}

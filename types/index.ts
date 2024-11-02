export interface GitHubRepository {
	id: number;
	name: string;
	full_name: string;
	private: boolean;
}

export interface GitHubItem {
	name: string;
	path: string;
	html_url: string;
	repository: GitHubRepository;
}

export interface GitHubResponse {
	total_count: number;
	incomplete_results: boolean;
	items: GitHubItem[];
}

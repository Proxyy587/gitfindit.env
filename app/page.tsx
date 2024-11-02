"use client";

import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GitHubResponse } from "@/types";
import RecentViews from "@/components/shared/RecentViews";

interface Response {
	data: GitHubResponse;
	roast: string;
}

export default function Home() {
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async () => {
		try {
			if (!username) {
				toast.error("Write yo username lil bro how hard is that? 🤦");
				return;
			}
			setLoading(true);
			router.push(`/analysis/${username}`);
		} catch (error: any) {
			console.error("Navigation Error:", error);
			toast.error("Failed to analyze user");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center p-12">
			<div className="z-10 w-full max-w-3xl font-mono text-sm flex flex-col items-center justify-center bg-zinc-900 rounded-xl p-12 shadow-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
				<Link
					href="/hall-of-shame"
					className="mb-12 px-8 py-4 bg-red-600/20 border-2 border-red-500 rounded-lg hover:bg-red-500/30 transition-all duration-300"
				>
					<div className="text-center">
						<span className="text-2xl font-bold text-red-500">
							🏆 HALL OF SHAME 🏆
						</span>
						<p className="mt-2 text-red-400 text-sm">
							Meet the daily vloggers, privacy ki mkc
						</p>
					</div>
				</Link>
				<h1 className="text-3xl font-bold mb-8 text-emerald-400">
					All the API keys you&apos;ve leaked
				</h1>
				<div className="relative w-full max-w-md">
					<input
						type="text"
						placeholder="Type your GitHub username, you incompetent shit"
						className="w-full px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-6 text-zinc-100 placeholder-zinc-400"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						disabled={loading}
					/>
					<button
						onClick={handleSubmit}
						className="w-full px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all duration-300 font-semibold shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={loading}
					>
						{loading ? "Analyzing..." : "Expose Your Dumbass Mistakes"}
					</button>
				</div>
				<p className="mt-6 text-center text-zinc-500 text-xs max-w-xl hover:text-zinc-300 transition-all duration-300">
					Check how many API keys you&apos;ve leaked, you absolute fucking moron. Bet
					you pushed to main branch too, didn&apos;t you? 💀
				</p>
			</div>
			<RecentViews />
			<footer className="py-5 text-zinc-500 text-sm">
				Made with 💀 by{" "}
				<a
					href="https://x.com/proxyxd_s"
					className="text-emerald-400 hover:text-emerald-300 transition-all duration-300"
				>
					Proxy
				</a>
			</footer>
		</main>
	);
}

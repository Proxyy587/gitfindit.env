"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Output from "@/components/shared/Output";
import { toast } from "sonner";
import { GitHubResponse } from "@/types";
import { useRouter } from "next/navigation";
import { saveUser } from "@/actions/saveUser";

interface Response {
	data: GitHubResponse;
	roast: string;
}

export default function AnalysisPage() {
	const params = useParams();
	const router = useRouter();
	const username = params.username as string;
	const [data, setData] = useState<Response | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!username || username.trim() === "") {
					toast.error("Invalid username provided");
					router.push("/");
					return;
				}

				const res = await axios.post<Response>("/api/getenvfiles", {
					username,
				});

				if (!res.data) {
					throw new Error("No data received from API");
				}

				setData(res.data);

				const userData = {
					username,
					leakedCount: res.data.data.total_count,
					lastChecked: new Date(),
				};

				try {
					await saveUser(userData);
				} catch (error) {
					console.error("Failed to save user:", error);
				}

				if (res.data.data.total_count > 0) {
					toast.success("Lmao Got the data you absolute piece of lawra! 🤡");
				} else {
					toast.info(
						"No leaks? What are you, some kind of responsible developer? Get tf outta here! 🤮"
					);
				}
			} catch (error: any) {
				console.error("API Error:", {
					message: error.message,
					response: error.response?.data,
					status: error.response?.status,
				});

				if (error.response?.status === 404) {
					toast.error(
						"User not found. Are you sure that's a real GitHub user? 🤔"
					);
					router.push("/");
					return;
				}

				if (error.response?.status === 403) {
					toast.error("Rate limit exceeded. Please try again later.");
					return;
				}

				if (error.response?.status === 401) {
					toast.error("Authentication failed. Please try again later.");
					return;
				}

				toast.error(
					error.response?.data?.error ||
						error.response?.data?.details ||
						"Failed to fetch your embarrassing mistakes"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [username, router]);

	if (loading) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black">
				<div className="relative">
					<div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-emerald-400 text-xl">💀</span>
					</div>
				</div>
				<div className="text-emerald-400 text-xl text-center max-w-md">
					<p className="animate-pulse">
						Scanning your pathetic GitHub history... (My free-tier CPU is crying
						just looking at your code.)
					</p>
					<p className="text-sm text-zinc-500 mt-2">
						This might take a moment, just like how long it took you to realize
						.env shouldn't be public
					</p>
				</div>
				<div className="flex gap-4">
					<button
						onClick={() => window.location.reload()}
						className="px-6 py-3 bg-zinc-900 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-all duration-300 font-medium border border-zinc-800 hover:border-zinc-700 shadow-lg hover:shadow-zinc-800/20"
					>
						Try Again
					</button>
					<a
						href="/"
						className="px-6 py-3 bg-zinc-900 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-all duration-300 font-medium border border-zinc-800 hover:border-zinc-700 shadow-lg hover:shadow-zinc-800/20"
					>
						Back Home
					</a>
				</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black font-mono">
				<div className="text-red-500 text-xl text-center max-w-md">
					Nigga u managed to break something thats already broken! 💀 Congrats
					yo failyuh.
				</div>
				<div className="flex gap-4">
					<button
						onClick={() => window.location.reload()}
						className="px-6 py-3 bg-zinc-900 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-all duration-300 font-medium border border-zinc-800 hover:border-zinc-700 shadow-lg hover:shadow-zinc-800/20 hover:text-zinc-100"
					>
						Expose Yourself Again
					</button>
					<a
						href="/"
						className="px-6 py-3 bg-zinc-900 text-zinc-300 rounded-lg hover:bg-zinc-800 transition-all duration-300 font-medium border border-zinc-800 hover:border-zinc-700 shadow-lg hover:shadow-zinc-800/20 hover:text-zinc-100"
					>
						BACK HOME
					</a>
				</div>
			</div>
		);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black">
			<div className="z-10 w-full max-w-2xl">
				<Output data={data.data} roast={data.roast} />
			</div>
		</main>
	);
}

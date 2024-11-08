"use client";

import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import Link from "next/link";

interface RecentView {
	username: string;
	lastChecked: Date;
	viewCount: number;
	createdAt: Date;
}

export default function RecentViews() {
	const [recentViews, setRecentViews] = useState<RecentView[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecentViews = async () => {
			try {
				const response = await fetch("/api/recent-views");
				const data = await response.json();
				const viewsWithDates = data.map((view: RecentView) => ({
					...view,
					lastChecked: new Date(view.lastChecked),
					createdAt: new Date(view.createdAt),
				}));
				const sortedViews = viewsWithDates.sort(
					(a: RecentView, b: RecentView) =>
						b.createdAt.getTime() - a.createdAt.getTime()
				);
				setRecentViews(sortedViews);
			} catch (error) {
				console.error("Failed to fetch recent views:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchRecentViews();
	}, []);

	if (loading) {
		return (
			<div className="w-full max-w-3xl mt-8 bg-zinc-900/80 rounded-xl p-6 border border-zinc-800">
				<h2 className="text-xl font-bold text-emerald-400 mb-4">
					Recent Victims 💀
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className="flex flex-col p-4 bg-zinc-800/50 rounded-lg animate-pulse"
						>
							<div className="h-4 bg-zinc-700 rounded w-3/4 mb-2"></div>
							<div className="flex justify-between items-center mt-2">
								<div className="h-3 bg-zinc-700 rounded w-1/3"></div>
								<div className="h-3 bg-zinc-700 rounded w-1/4"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-3xl mt-8 bg-zinc-900/80 rounded-xl p-6 border border-zinc-800">
			<h2 className="text-xl font-bold text-emerald-400 mb-4">
				Recent Victims 💀
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{recentViews.map((view) => (
					<Link
						key={view.username}
						href={`/analysis/${view.username}`}
						className="flex flex-col p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-700/50 transition-all duration-300 group"
					>
						<span className="text-zinc-300 font-medium truncate">
							{view.username}
						</span>
						<div className="flex justify-between items-center mt-2">
							<span className="text-xs text-zinc-500">
								{view.createdAt && <TimeAgo date={view.createdAt} />}
							</span>
							<span className="text-emerald-400 text-sm">
								{view.viewCount} view{view.viewCount === 1 ? "" : "s"}
							</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

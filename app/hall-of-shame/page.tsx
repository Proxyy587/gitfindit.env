"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHallOfShame } from "@/actions/getHallOfShame";

interface LeaderboardEntry {
	username: string;
	leakedCount: number;
	auraPoints?: number;
}

const getRankBadge = (rank: number) => {
	switch (rank) {
		case 1:
			return "👑1";
		case 2:
			return "🥈2";
		case 3:
			return "🥉3";
		default:
			return `#${rank}`;
	}
};

export default function HallOfShame() {
	const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getHallOfShame();
			setLeaderboard(data as LeaderboardEntry[]);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-center p-12 font-mono">
				<div className="flex flex-col items-center gap-4">
					<div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-zinc-400">Loading Hall of Shame...</p>
				</div>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-12 font-mono">
			<div className="w-full max-w-3xl flex flex-col items-center gap-8">
				<div className="flex items-start w-full gap-2">
					<Link
						href="/"
						className="px-3 py-2 items-start bg-zinc-900 rounded-full hover:bg-zinc-800 transition-all duration-300 text-zinc-400 hover:text-zinc-200 flex gap-2 border border-zinc-800 hover:border-zinc-700"
					>
						← Back to Home
					</Link>
				</div>

				<div className="text-center space-y-2">
					<h1 className="text-5xl font-bold text-red-500">
						🏆 HALL OF SHAME 🏆
					</h1>
					<p className="text-zinc-400">
						Where security nightmares become legends
					</p>
				</div>

				<div className="w-full bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 shadow-xl hover:border-zinc-700 transition-all duration-300">
					<div className="overflow-hidden">
						<table className="w-full">
							<thead>
								<tr className="border-b-2 border-zinc-800">
									<th className="text-left py-4 text-zinc-400 font-medium">
										RANK
									</th>
									<th className="text-left py-4 text-zinc-400 font-medium">
										USERNAME
									</th>
									<th className="text-right py-4 text-zinc-400 font-medium">
										LEAKED ENVS
									</th>
									<th className="text-right py-4 text-zinc-400 font-medium">
										AURA (💖)
									</th>
								</tr>
							</thead>
							<tbody>
								{leaderboard.map((entry, index) => (
									<tr
										key={entry.username}
										className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all duration-300 cursor-pointer group ${
											index === 0
												? "bg-yellow-500/5 hover:bg-yellow-500/10"
												: index === 1
												? "bg-white/5 hover:bg-white/10"
												: index === 2
												? "bg-amber-500/5 hover:bg-amber-500/10"
												: ""
										}`}
									>
										<td className="py-6">
											<span
												className={`font-bold text-lg ${
													index === 0
														? "text-yellow-300 "
														: index === 1
														? "text-gray-300"
														: index === 2
														? "text-amber-600"
														: "text-muted-foreground text-sm"
												}`}
											>
												{getRankBadge(index + 1)}
											</span>
										</td>
										<td className="py-6">
											<span className="text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors">
												{entry.username}
											</span>
										</td>
										<td className="py-6">
											<span className="text-red-500 font-bold text-right block group-hover:text-red-400 transition-colors">
												{entry.leakedCount}
											</span>
										</td>
										<td className="py-6">
											<span className="text-purple-400 font-bold text-right block group-hover:text-purple-300 transition-colors">
												{entry.auraPoints || 0}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	);
}

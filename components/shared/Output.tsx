"use client";

import { GitHubResponse } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface OutputProps {
	data: GitHubResponse;
	roast: string;
}

interface GithubUser {
	avatar_url: string;
	name: string;
	bio: string;
	public_repos: number;
	followers: number;
	following: number;
	html_url: string;
}

const getAuraPoints = (leakCount: number) => {
	if (leakCount === 0) {
		return 1000;
	}
	if (leakCount === 1) {
		return -69;
	}
	if (leakCount === 2) {
		return -420;
	}
	if (leakCount === 3) {
		return -666;
	}
	if (leakCount === 4) {
		return -1337;
	}
	return -9000 - leakCount * 1000;
};

const getRank = (points: number) => {
	if (points >= 1000) return "SECURITY SAINT 😇";
	if (points >= 0) return "SECURITY NEWBIE 🤡";
	if (points >= -100) return "CASUAL LEAKER 🤪";
	if (points >= -500) return "SECURITY RISK 💩";
	if (points >= -1000) return "ONLYENV MODEL 🗑️";
	if (points >= -5000) return "HUMAN THREAT 🤮";
	return "CERTIFIED CLOWN 🎪";
};

export default function Output({ data, roast }: OutputProps) {
	const [userDetails, setUserDetails] = useState<GithubUser | null>(null);
	const [error, setError] = useState<string | null>(null);
	const auraPoints = getAuraPoints(data.total_count || 0);
	const rank = getRank(auraPoints);

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				let username;
				if (data.items && data.items.length > 0) {
					// @ts-ignore
					username = data.items[0].repository.owner.login;
				} else {
					const urlParts = data.items?.[0]?.repository?.full_name?.split("/");
					username = urlParts?.[0];
				}

				if (!username) {
					username = window.location.pathname.split("/").pop();
				}

				if (!username) {
					setError("No user found or invalid username");
					return;
				}

				const response = await axios.get(
					`https://api.github.com/users/${username}`
				);
				setUserDetails(response.data);

				await axios.post("/api/update-aura", {
					username,
					leakCount: data.total_count || 0,
					auraPoints,
				});
			} catch (error) {
				console.error("Failed to fetch user details:", error);
				setError("Failed to fetch user details. User may not exist.");
			}
		};
		fetchUserDetails();
	}, [data, auraPoints]);

	if (error) {
		return (
			<div className="flex flex-col gap-6">
				<Link
					href="/"
					className="px-4 py-2 text-sm w-fit bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-all duration-300 font-medium border border-zinc-700 hover:border-zinc-600"
				>
					← Back Home
				</Link>
				<div className="w-full max-w-4xl bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 shadow-2xl backdrop-blur-lg font-mono">
					<div className="flex flex-col items-center space-y-4">
						<span className="text-4xl">🤡</span>
						<h2 className="text-xl font-bold text-red-500">{error}</h2>
						<p className="text-zinc-400 text-center">
							Can&apos;t even provide a valid username? Peak clownery right here 🎪
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<Link
				href="/"
				className="px-4 py-2 text-sm w-fit bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-all duration-300 font-medium border border-zinc-700 hover:border-zinc-600"
			>
				← Back Home
			</Link>
			<div className="w-full max-w-4xl bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 shadow-2xl backdrop-blur-lg font-mono">
				<div className="flex flex-col items-center space-y-8">
					{userDetails && (
						<div className="flex flex-col items-center space-y-4 w-full">
							<div className="relative">
								<Image
									src={userDetails.avatar_url}
									alt="Profile"
									width={120}
									height={120}
									className="rounded-full border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
								/>
								<div className="absolute -bottom-2 -right-2 text-4xl animate-bounce">
									🤡
								</div>
							</div>
							<div className="text-center">
								<h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
									{userDetails.name || "Anonymous Clown"}
								</h1>
								<p className="text-zinc-400 text-sm mt-1 max-w-lg">
									{userDetails.bio || "Professional API Key Distributor 🎪"}
								</p>
							</div>
							<div className="flex gap-6 text-center">
								<div className="px-4 py-2 bg-zinc-800/50 rounded-lg">
									<div className="text-emerald-400 font-bold">
										{userDetails.public_repos}
									</div>
									<div className="text-xs text-zinc-400">Repos of Shame</div>
								</div>
								<div className="px-4 py-2 bg-zinc-800/50 rounded-lg">
									<div className="text-purple-400 font-bold">
										{userDetails.followers}
									</div>
									<div className="text-xs text-zinc-400">Fellow Clowns</div>
								</div>
								<div className="px-4 py-2 bg-zinc-800/50 rounded-lg">
									<div className="text-blue-400 font-bold">
										{userDetails.following}
									</div>
									<div className="text-xs text-zinc-400">Security Threats</div>
								</div>
							</div>
						</div>
					)}
					<div className="text-center space-y-2 bg-red-400/20 px-4 py-2 rounded-lg">
						<h2 className="text-2xl font-medium text-red-500">
							{data.total_count || 0} ENV FILES LEAKED
						</h2>
					</div>

					<div className="w-full bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
						<div className="flex justify-between items-center mb-4">
							<span className="text-zinc-400 font-medium">CLOWN RANK</span>
							<span className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
								{rank}
							</span>
						</div>
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<span className="text-zinc-400 font-medium">AURA POINTS</span>
								<span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
									{auraPoints}
								</span>
							</div>
							<div className="w-full h-4 bg-zinc-700 overflow-hidden">
								<div
									className="h-full bg-gradient-to-r from-red-500 to-pink-700 transition-all duration-300"
									style={{
										width: `${Math.min((auraPoints / 1000) * 100, 100)}%`,
									}}
								/>
							</div>
						</div>
					</div>

					<div className="w-full bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
						<div className="flex items-center gap-2 mb-2">
							<span className="text-2xl">🔥</span>
							<span className="text-zinc-400 font-medium">AI VIOLATION</span>
						</div>
						<code className="text-zinc-300 italic">{roast}</code>
					</div>

					{data.items && data.items.length > 0 && (
						<div className="w-full">
							<h3 className="text-xl font-bold text-zinc-300 mb-4 flex items-center gap-2">
								<span className="text-2xl">🎪</span> Hall of Shame Entries
							</h3>
							<div className="space-y-3">
								{data.items.map((item, index) => (
									<Link
										key={`${item.repository.full_name}-${index}`}
										href={item.html_url}
										target="_blank"
										className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-700/50 transition-all duration-300 border border-zinc-700 hover:border-zinc-600 group"
									>
										<span className="text-zinc-300 truncate font-medium">
											{item.repository.full_name} 🤡
										</span>
										<span className="text-emerald-400 transform group-hover:translate-x-1 transition-transform duration-300">
											→
										</span>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

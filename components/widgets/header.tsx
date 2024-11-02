"use client";
import { Github } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Header() {
	return (
		<nav className="sticky top-0 left-0 right-0 z-50 max-w-3xl mx-auto backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex items-center justify-between h-16 border-b border-zinc-800">
					<Link href="/" className="flex items-center group">
						<span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-blue-400 transition-all duration-300">
							.env
						</span>
					</Link>
					<div className="flex items-center space-x-4">
						<Link
							href="/"
							className="px-4 py-2 text-sm text-zinc-300 hover:text-white transition-all duration-300 hover:bg-zinc-800/50 rounded-lg"
						>
							Home
						</Link>
						<Link
							href="/hall-of-shame"
							className={`${buttonVariants({ variant: "destructive" })}`}
						>
							Hall of Shame
						</Link>
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							className="p-2.5 text-sm rounded-full bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 transition-all duration-300 border border-zinc-700/50 hover:border-zinc-600 hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/20"
						>
							<Github className="w-4 h-4" />
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
}

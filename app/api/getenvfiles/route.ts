import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const generateRoast = async (userData: any, leakCount: number) => {
	const prompt = `You're a ruthless internet troll with the darkest sense of humor. Absolutely obliterate this GitHub user with the most savage, hilarious roast possible. Use their stats to create devastating jokes that will haunt them forever. Go full villain mode:

		Name: ${userData.name}
		Bio: ${userData.bio}
		Followers: ${userData.followers} 
		Following: ${userData.following}
		ENV Files Leaked: ${leakCount}

		Create brutal jokes about:
		- How they have more leaked secrets than brain cells
		- Their GitHub profile being a bigger disaster than their love life
		- Their bio screaming "I peaked in high school"
		- How their code is probably as secure as a paper lock
		- Their follower ratio being more tragic than their commit history
		- Their future in tech being as non-existent as their girlfriend
		- Sprinkle in dark humor about their complete life failures
		- Use 💀☠️🤡😭 emojis generously for maximum emotional damage
		
		Make it absolutely hilarious but devastatingly brutal. No mercy.`;

	const response = await openai.chat.completions.create({
		model: "gpt-4-turbo-preview",
		messages: [
			{
				role: "system",
				content:
					"You are the most savage roaster on the internet. Use dark humor, devastating jokes, and Gen Z slang to create the funniest yet most brutal roasts possible. Make them laugh while questioning all their life choices. go wild with everything.",
			},
			{ role: "user", content: prompt },
		],
		temperature: 1.0,
		max_tokens: 350,
	});

	return (
		response.choices[0].message.content ||
		"Your GitHub profile is like your love life - full of rejected commits and abandoned projects 💀"
	);
};

export const POST = async (req: NextRequest) => {
	try {
		const { username } = await req.json();

		console.log("Processing request for username:", username);

		if (!username || typeof username !== "string") {
			return NextResponse.json(
				{ error: "Invalid username provided" },
				{ status: 400 }
			);
		}

		if (username.toLowerCase() === "proxyy587") {
			return NextResponse.json(
				{ error: "LMFAO! YOU CANT SEE MINE NIGGA! 🤣" },
				{ status: 400 }
			);
		}

		if (!process.env.GITHUB_TOKEN) {
			console.error("GitHub token missing");
			return NextResponse.json(
				{ error: "Server configuration error: GitHub token missing" },
				{ status: 500 }
			);
		}

		if (!process.env.OPENAI_API_KEY) {
			console.error("OpenAI API key missing");
			return NextResponse.json(
				{ error: "Server configuration error: OpenAI API key missing" },
				{ status: 500 }
			);
		}

		const headers = {
			Authorization: `token ${process.env.GITHUB_TOKEN}`,
			Accept: "application/vnd.github.v3+json",
		};

		let userDetails;
		try {
			console.log("Fetching user details from GitHub...");
			const userResponse = await axios.get(
				`https://api.github.com/users/${username}`,
				{ headers }
			);
			userDetails = userResponse.data;
			console.log("User details fetched successfully");
		} catch (error: any) {
			console.error(
				"GitHub user fetch error:",
				error.response?.data || error.message
			);
			if (error.response?.status === 404) {
				return NextResponse.json(
					{ error: "User not found on GitHub" },
					{ status: 404 }
				);
			}
			throw error;
		}

		let searchData;
		try {
			console.log("Searching for env files...");
			const searchResponse = await axios.request({
				url: `https://api.github.com/search/code?q=filename:.env+user:${username}+NOT+filename:.env.example+NOT+filename:.env.sample`,
				headers,
			});
			searchData = searchResponse.data;
			console.log("Search completed successfully");
		} catch (error: any) {
			console.error(
				"GitHub search error:",
				error.response?.data || error.message
			);
			throw error;
		}

		let roast;
		try {
			console.log("Generating roast...");
			roast = await generateRoast(userDetails, searchData.total_count);
			console.log("Roast generated successfully");
		} catch (error: any) {
			console.error("OpenAI error:", error);
			roast =
				"You're so basic, even dont wanna waste my openai credits on you. 🥱";
		}

		return NextResponse.json({
			data: searchData,
			roast,
		});
	} catch (error: any) {
		console.error("API Error Details:", {
			message: error.message,
			response: error.response?.data,
			status: error.response?.status,
			stack: error.stack,
		});

		if (error.response?.status === 403) {
			return NextResponse.json(
				{ error: "GitHub API rate limit exceeded. Please try again later." },
				{ status: 403 }
			);
		}

		if (error.response?.status === 401) {
			return NextResponse.json(
				{ error: "GitHub API authentication failed. Please check the token." },
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{
				error: "An unexpected error occurred",
				details:
					process.env.NODE_ENV === "development" ? error.message : undefined,
			},
			{ status: 500 }
		);
	}
};

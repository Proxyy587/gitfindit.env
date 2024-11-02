import { NextResponse } from "next/server";
import { User } from "@/lib/user.model";
import { connectToDatabase } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		await connectToDatabase();

		const recentViews = await User.find()
			.sort({ lastChecked: -1 })
			.limit(15)
			.select("username lastChecked viewCount createdAt");

		return NextResponse.json(recentViews);
	} catch (error) {
		console.error("Error fetching recent views:", error);
		return NextResponse.json(
			{ error: "Failed to fetch recent views" },
			{ status: 500 }
		);
	}
}

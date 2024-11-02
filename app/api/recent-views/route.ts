import { NextResponse } from "next/server";
import { User } from "@/lib/user.model";

export const dynamic = 'force-dynamic';

export async function GET() {
	try {
		const recentViews = await User.find()
			.sort({ lastChecked: -1 })
			.limit(15)
			.select("username lastChecked viewCount createdAt");

		return NextResponse.json(recentViews);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch recent views" },
			{ status: 500 }
		);
	}
}

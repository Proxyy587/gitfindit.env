import { NextRequest, NextResponse } from "next/server";
import { saveUser } from "@/actions/saveUser";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	try {
		const { username, leakCount, auraPoints } = await req.json();

		if (!username) {
			return NextResponse.json(
				{ error: "Username is required" },
				{ status: 400 }
			);
		}

		const userData = {
			username,
			leakedCount: leakCount,
			auraPoints: auraPoints,
			lastChecked: new Date()
		};

		await saveUser(userData);

		return NextResponse.json({ success: true });

	} catch (error: any) {
		console.error("Error updating aura:", error);
		return NextResponse.json(
			{ error: "Failed to update aura" },
			{ status: 500 }
		);
	}
}

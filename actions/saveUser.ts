"use server";

import { User } from "@/lib/user.model";
import { connectToDatabase } from "@/lib/db";

export const saveUser = async (userData: {
	username: string;
	leakedCount: number;
	lastChecked: Date;
}) => {
	try {
		await connectToDatabase();
		
		// Use findOneAndUpdate to handle both creation and updates
		await User.findOneAndUpdate(
			{ username: userData.username },
			userData,
			{ upsert: true, new: true }
		);
	} catch (error) {
		console.error("Error saving user:", error);
		throw error;
	}
};

"use server";

import { User } from "@/lib/user.model";
import { connectToDatabase } from "@/lib/db";

export const getHallOfShame = async () => {
	await connectToDatabase();
	const users = await User.find()
		.sort({ leakedCount: -1 })
		.limit(10)
		.select("username leakedCount lastChecked");
    
	return users;
};

"use server";

import { User } from "@/lib/user.model";

export const getHallOfShame = async () => {
	const users = await User.find().sort({ leakedCount: -1 });
    
	return users;
};

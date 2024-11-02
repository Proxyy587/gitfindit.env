import mongoose from "mongoose";

export const connectToDatabase = async () => {
	try {
		if (!process.env.DATABASE_URL) {
			throw new Error(
				"DATABASE_URL is not defined in the environment variables"
			);
		}
		await mongoose.connect(process.env.DATABASE_URL as string);
		console.log("Connected to database");
	} catch (error) {
		console.error("Failed to connect to database:", error);
		throw error;
	}
};

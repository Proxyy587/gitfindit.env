import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		leakedCount: { type: Number, default: 0 },
		lastChecked: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

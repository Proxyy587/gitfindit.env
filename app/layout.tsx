import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/widgets/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: ".env - Save yourself from getting clowned",
	description:
		"Find out how many API keys you've leaked on GitHub. Reason why you never got job and girlfriend! 💀",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				{children}
				<Toaster richColors position="top-center" />
			</body>
		</html>
	);
}

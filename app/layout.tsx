import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Lead Conversion Systems - AI Dashboard",
	description:
		"Monitor your AI agent performance and business impact in real-time"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="min-h-screen bg-background">
						<Navigation />
						<main className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
							{children}
						</main>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}

"use client";

import { Button } from "@/components/ui/button";
import { actionItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	Grid3x3,
	LayoutDashboard,
	Menu,
	MessageSquare,
	Moon,
	Settings,
	Sun,
	X
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const navigation = [
	{ name: "Dashboard", href: "/", icon: LayoutDashboard },
	{ name: "Interactions", href: "/interactions", icon: MessageSquare },
	{ name: "Action Items", href: "/action-items", icon: AlertCircle },
	{ name: "Catalog", href: "/catalog", icon: Grid3x3 },
	{ name: "Settings", href: "/settings", icon: Settings }
];

export function Navigation() {
	const pathname = usePathname();
	const { setTheme, theme } = useTheme();
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

	// Calculate pending action items count
	const pendingCount = actionItems.filter(
		(item) => item.status === "pending"
	).length;

	return (
		<nav className="border-b bg-card">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<div className="flex items-center gap-2">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							<LayoutDashboard className="h-6 w-6" />
						</div>
						<div className="hidden md:block">
							<h1 className="text-lg font-bold">Lead Conversion Systems</h1>
							<p className="text-xs text-muted-foreground">AI Dashboard</p>
						</div>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex md:items-center md:gap-1">
						{navigation.map((item) => {
							const isActive = pathname === item.href;
							const Icon = item.icon;
							const showBadge =
								item.name === "Action Items" && pendingCount > 0;
							return (
								<Link key={item.name} href={item.href}>
									<Button
										variant={isActive ? "default" : "ghost"}
										className={cn(
											"gap-2 relative",
											isActive && "bg-primary text-primary-foreground"
										)}
									>
										<Icon className="h-4 w-4" />
										{item.name}
										{showBadge && (
											<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
												{pendingCount}
											</span>
										)}
									</Button>
								</Link>
							);
						})}
					</div>

					{/* Theme Toggle & Mobile Menu */}
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						>
							<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						>
							{mobileMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<div className="border-t py-4 md:hidden">
						<div className="flex flex-col gap-2">
							{navigation.map((item) => {
								const isActive = pathname === item.href;
								const Icon = item.icon;
								const showBadge =
									item.name === "Action Items" && pendingCount > 0;
								return (
									<Link
										key={item.name}
										href={item.href}
										onClick={() => setMobileMenuOpen(false)}
									>
										<Button
											variant={isActive ? "default" : "ghost"}
											className={cn(
												"w-full justify-start gap-2 relative",
												isActive && "bg-primary text-primary-foreground"
											)}
										>
											<Icon className="h-4 w-4" />
											{item.name}
											{showBadge && (
												<span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
													{pendingCount}
												</span>
											)}
										</Button>
									</Link>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}

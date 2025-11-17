"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capabilities } from "@/lib/mock-data";
import {
	BarChart3,
	Briefcase,
	Check,
	Grid3x3,
	Star,
	TrendingUp,
	Zap
} from "lucide-react";
import * as React from "react";

const categoryIcons: Record<string, React.ElementType> = {
	"Voice AI": Zap,
	Automation: TrendingUp,
	"Sales AI": Briefcase,
	Analytics: BarChart3,
	Enterprise: Star
};

export default function CatalogPage() {
	const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

	const categories = [
		"all",
		...Array.from(new Set(capabilities.map((c) => c.category)))
	];

	const filteredCapabilities = React.useMemo(() => {
		if (selectedCategory === "all") return capabilities;
		return capabilities.filter((c) => c.category === selectedCategory);
	}, [selectedCategory]);

	const handleSubscribe = (capabilityId: string, capabilityName: string) => {
		// In a real implementation, this would integrate with Stripe
		alert(
			`Subscribing to ${capabilityName}. This would redirect to Stripe checkout.`
		);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Capability Catalog
				</h1>
				<p className="text-muted-foreground">
					Browse and subscribe to AI-powered business capabilities.
				</p>
			</div>

			{/* Category Filter */}
			<Card>
				<CardHeader>
					<CardTitle>Categories</CardTitle>
					<CardDescription>Filter capabilities by category</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
						<TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
							{categories.map((category) => (
								<TabsTrigger
									key={category}
									value={category}
									className="capitalize"
								>
									{category === "all" ? "All" : category}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</CardContent>
			</Card>

			{/* Results */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					{filteredCapabilities.length}{" "}
					{filteredCapabilities.length === 1 ? "capability" : "capabilities"}{" "}
					available
				</p>
			</div>

			{/* Capabilities Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredCapabilities.map((capability) => {
					const CategoryIcon = categoryIcons[capability.category] || Grid3x3;
					return (
						<Card
							key={capability.id}
							className={`flex flex-col ${
								!capability.isActive ? "opacity-60" : ""
							}`}
						>
							<CardHeader>
								<div className="flex items-start justify-between">
									<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
										<CategoryIcon className="h-6 w-6 text-primary" />
									</div>
									<div className="flex flex-col items-end gap-2">
										<Badge variant="outline">{capability.category}</Badge>
										{!capability.isActive && (
											<Badge variant="secondary">Coming Soon</Badge>
										)}
									</div>
								</div>
								<CardTitle className="mt-4">{capability.name}</CardTitle>
								<CardDescription className="min-h-[2.5rem]">
									{capability.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-1">
								<div className="space-y-4">
									<div>
										<div className="flex items-baseline gap-1">
											<span className="text-3xl font-bold">
												${capability.price}
											</span>
											<span className="text-muted-foreground">
												/{capability.priceInterval}
											</span>
										</div>
									</div>
									<div className="space-y-2">
										<p className="text-sm font-medium">Features:</p>
										<ul className="space-y-2">
											{capability.features.map((feature, index) => (
												<li
													key={index}
													className="flex items-start gap-2 text-sm"
												>
													<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full"
									disabled={!capability.isActive}
									onClick={() =>
										handleSubscribe(capability.id, capability.name)
									}
								>
									{capability.isActive ? "Subscribe Now" : "Notify Me"}
								</Button>
							</CardFooter>
						</Card>
					);
				})}
			</div>

			{filteredCapabilities.length === 0 && (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Grid3x3 className="h-12 w-12 text-muted-foreground" />
						<h3 className="mt-4 text-lg font-semibold">
							No capabilities found
						</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Try selecting a different category
						</p>
					</CardContent>
				</Card>
			)}

			{/* Enterprise CTA */}
			<Card className="border-primary/50 bg-primary/5">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Star className="h-5 w-5" />
						Need Custom Solutions?
					</CardTitle>
					<CardDescription>
						Our enterprise team can create custom AI capabilities tailored to
						your specific business needs.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button variant="outline">Contact Sales</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

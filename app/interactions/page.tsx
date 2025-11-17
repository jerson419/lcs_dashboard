"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { callInteractions } from "@/lib/mock-data";
import { format } from "date-fns";
import {
	Calendar,
	CheckCircle,
	Clock,
	Frown,
	Meh,
	Phone,
	PhoneCall,
	PhoneOff,
	Search,
	Smile
} from "lucide-react";
import * as React from "react";

export default function InteractionsPage() {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [outcomeFilter, setOutcomeFilter] = React.useState<string>("all");

	const filteredInteractions = React.useMemo(() => {
		return callInteractions.filter((interaction) => {
			const matchesSearch =
				interaction.callerName
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				interaction.callerId.includes(searchQuery) ||
				interaction.notes.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesOutcome =
				outcomeFilter === "all" || interaction.outcome === outcomeFilter;

			return matchesSearch && matchesOutcome;
		});
	}, [searchQuery, outcomeFilter]);

	const getSentimentIcon = (sentiment: string) => {
		switch (sentiment) {
			case "positive":
				return <Smile className="h-4 w-4 text-green-500" />;
			case "neutral":
				return <Meh className="h-4 w-4 text-gray-500" />;
			case "negative":
				return <Frown className="h-4 w-4 text-red-500" />;
		}
	};

	const getOutcomeIcon = (outcome: string) => {
		switch (outcome) {
			case "appointment":
				return <Calendar className="h-4 w-4" />;
			case "callback":
				return <PhoneCall className="h-4 w-4" />;
			case "completed":
				return <CheckCircle className="h-4 w-4" />;
			case "no-answer":
				return <PhoneOff className="h-4 w-4" />;
		}
	};

	const getOutcomeBadgeVariant = (outcome: string) => {
		switch (outcome) {
			case "appointment":
				return "default";
			case "callback":
				return "secondary";
			case "completed":
				return "outline";
			case "no-answer":
				return "outline";
			default:
				return "outline";
		}
	};

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Interaction History
				</h1>
				<p className="text-muted-foreground">
					View and analyze all customer interactions and call outcomes.
				</p>
			</div>

			{/* Filters */}
			<Card>
				<CardHeader>
					<CardTitle>Filters</CardTitle>
					<CardDescription>
						Search and filter interaction history
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative">
						<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search by name, phone, or notes..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-9"
						/>
					</div>
					<Tabs defaultValue="all" onValueChange={setOutcomeFilter}>
						<TabsList className="grid w-full grid-cols-5">
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="appointment">Appointments</TabsTrigger>
							<TabsTrigger value="callback">Callbacks</TabsTrigger>
							<TabsTrigger value="completed">Completed</TabsTrigger>
							<TabsTrigger value="no-answer">No Answer</TabsTrigger>
						</TabsList>
					</Tabs>
				</CardContent>
			</Card>

			{/* Results Summary */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Showing {filteredInteractions.length} of {callInteractions.length}{" "}
					interactions
				</p>
			</div>

			{/* Desktop Table View */}
			<Card className="hidden md:block">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Caller</TableHead>
								<TableHead>Phone</TableHead>
								<TableHead>Date & Time</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead>Outcome</TableHead>
								<TableHead>Sentiment</TableHead>
								<TableHead>Notes</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredInteractions.map((interaction) => (
								<TableRow key={interaction.id}>
									<TableCell className="font-medium">
										{interaction.callerName}
									</TableCell>
									<TableCell className="font-mono text-xs">
										{interaction.callerId}
									</TableCell>
									<TableCell className="text-sm">
										<div className="flex flex-col">
											<span>
												{format(new Date(interaction.timestamp), "MMM d, yyyy")}
											</span>
											<span className="text-xs text-muted-foreground">
												{format(new Date(interaction.timestamp), "h:mm a")}
											</span>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-1">
											<Clock className="h-3 w-3 text-muted-foreground" />
											<span className="text-sm">
												{formatDuration(interaction.duration)}
											</span>
										</div>
									</TableCell>
									<TableCell>
										<Badge
											variant={getOutcomeBadgeVariant(interaction.outcome)}
											className="gap-1"
										>
											{getOutcomeIcon(interaction.outcome)}
											{interaction.outcome.replace("-", " ")}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											{getSentimentIcon(interaction.sentiment)}
											<span className="text-sm capitalize">
												{interaction.sentiment}
											</span>
										</div>
									</TableCell>
									<TableCell className="max-w-xs">
										<p className="truncate text-sm text-muted-foreground">
											{interaction.notes}
										</p>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Mobile Card View */}
			<div className="space-y-4 md:hidden">
				{filteredInteractions.map((interaction) => (
					<Card key={interaction.id}>
						<CardHeader className="pb-3">
							<div className="flex items-start justify-between">
								<div>
									<CardTitle className="text-base">
										{interaction.callerName}
									</CardTitle>
									<CardDescription className="font-mono text-xs">
										{interaction.callerId}
									</CardDescription>
								</div>
								{getSentimentIcon(interaction.sentiment)}
							</div>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-center justify-between text-sm">
								<div className="flex items-center gap-1 text-muted-foreground">
									<Phone className="h-3 w-3" />
									<span>
										{format(new Date(interaction.timestamp), "MMM d, h:mm a")}
									</span>
								</div>
								<div className="flex items-center gap-1 text-muted-foreground">
									<Clock className="h-3 w-3" />
									<span>{formatDuration(interaction.duration)}</span>
								</div>
							</div>
							<Badge
								variant={getOutcomeBadgeVariant(interaction.outcome)}
								className="gap-1"
							>
								{getOutcomeIcon(interaction.outcome)}
								{interaction.outcome.replace("-", " ")}
							</Badge>
							<p className="text-sm text-muted-foreground">
								{interaction.notes}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{filteredInteractions.length === 0 && (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Phone className="h-12 w-12 text-muted-foreground" />
						<h3 className="mt-4 text-lg font-semibold">
							No interactions found
						</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							Try adjusting your search or filter criteria
						</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

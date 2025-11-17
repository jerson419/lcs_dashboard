"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { actionItems } from "@/lib/mock-data";
import { format } from "date-fns";
import {
	AlertCircle,
	Calendar,
	CheckCircle2,
	Clock,
	Plus,
	Search,
	User
} from "lucide-react";
import * as React from "react";

export default function ActionItemsPage() {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [statusFilter, setStatusFilter] = React.useState<string>("all");
	const [items, setItems] = React.useState(actionItems);

	const filteredItems = React.useMemo(() => {
		return items.filter((item) => {
			const matchesSearch =
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesStatus =
				statusFilter === "all" || item.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [items, searchQuery, statusFilter]);

	const toggleItemStatus = (id: string) => {
		setItems((prev) =>
			prev.map((item) =>
				item.id === id
					? {
							...item,
							status: item.status === "completed" ? "pending" : "completed"
					  }
					: item
			)
		);
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "bg-red-500";
			case "medium":
				return "bg-yellow-500";
			case "low":
				return "bg-blue-500";
			default:
				return "bg-gray-500";
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "pending":
				return (
					<Badge variant="outline" className="gap-1">
						<Clock className="h-3 w-3" />
						Pending
					</Badge>
				);
			case "in-progress":
				return (
					<Badge className="gap-1 bg-blue-500">
						<AlertCircle className="h-3 w-3" />
						In Progress
					</Badge>
				);
			case "completed":
				return (
					<Badge className="gap-1 bg-green-500">
						<CheckCircle2 className="h-3 w-3" />
						Completed
					</Badge>
				);
			default:
				return <Badge variant="outline">{status}</Badge>;
		}
	};

	const isOverdue = (dueDate: string, status: string) => {
		return status !== "completed" && new Date() > new Date(dueDate);
	};

	const stats = {
		total: items.length,
		pending: items.filter((i) => i.status === "pending").length,
		inProgress: items.filter((i) => i.status === "in-progress").length,
		completed: items.filter((i) => i.status === "completed").length
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Action Items</h1>
					<p className="text-muted-foreground">
						Manage and track all follow-up tasks and action items.
					</p>
				</div>
				<Button className="gap-2">
					<Plus className="h-4 w-4" />
					New Action Item
				</Button>
			</div>

			{/* Stats */}
			<div className="grid gap-4 md:grid-cols-4">
				<Card>
					<CardHeader className="pb-2">
						<CardDescription>Total Items</CardDescription>
						<CardTitle className="text-3xl">{stats.total}</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardDescription>Pending</CardDescription>
						<CardTitle className="text-3xl text-gray-500">
							{stats.pending}
						</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardDescription>In Progress</CardDescription>
						<CardTitle className="text-3xl text-blue-500">
							{stats.inProgress}
						</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardDescription>Completed</CardDescription>
						<CardTitle className="text-3xl text-green-500">
							{stats.completed}
						</CardTitle>
					</CardHeader>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardHeader>
					<CardTitle>Filters</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative">
						<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search action items..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-9"
						/>
					</div>
					<Tabs defaultValue="all" onValueChange={setStatusFilter}>
						<TabsList className="grid w-full grid-cols-4">
							<TabsTrigger value="all">All</TabsTrigger>
							<TabsTrigger value="pending">Pending</TabsTrigger>
							<TabsTrigger value="in-progress">In Progress</TabsTrigger>
							<TabsTrigger value="completed">Completed</TabsTrigger>
						</TabsList>
					</Tabs>
				</CardContent>
			</Card>

			{/* Results */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Showing {filteredItems.length} of {items.length} items
				</p>
			</div>

			{/* Action Items List */}
			<div className="space-y-4">
				{filteredItems.map((item) => {
					const overdue = isOverdue(item.dueDate, item.status);
					return (
						<Card key={item.id} className={overdue ? "border-red-500" : ""}>
							<CardContent className="p-6">
								<div className="flex items-start gap-4">
									<Checkbox
										checked={item.status === "completed"}
										onCheckedChange={() => toggleItemStatus(item.id)}
										className="mt-1"
									/>
									<div className="flex-1 space-y-3">
										<div className="flex items-start justify-between gap-4">
											<div className="flex items-start gap-3">
												<div
													className={`mt-1.5 h-2 w-2 rounded-full ${getPriorityColor(
														item.priority
													)}`}
												/>
												<div>
													<h3
														className={`font-semibold ${
															item.status === "completed"
																? "line-through text-muted-foreground"
																: ""
														}`}
													>
														{item.title}
													</h3>
													<p
														className={`mt-1 text-sm ${
															item.status === "completed"
																? "line-through text-muted-foreground"
																: "text-muted-foreground"
														}`}
													>
														{item.description}
													</p>
												</div>
											</div>
											<div className="flex flex-col items-end gap-2">
												{getStatusBadge(item.status)}
												<Badge variant="outline" className="capitalize">
													{item.priority}
												</Badge>
											</div>
										</div>

										<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
											<div className="flex items-center gap-1">
												<User className="h-3 w-3" />
												<span>{item.assignedTo}</span>
											</div>
											<div className="flex items-center gap-1">
												<Calendar className="h-3 w-3" />
												<span>
													Created{" "}
													{format(new Date(item.createdAt), "MMM d, yyyy")}
												</span>
											</div>
											<div
												className={`flex items-center gap-1 ${
													overdue ? "text-red-500 font-medium" : ""
												}`}
											>
												<Calendar className="h-3 w-3" />
												<span>
													Due {format(new Date(item.dueDate), "MMM d, yyyy")}
												</span>
												{overdue && <AlertCircle className="h-3 w-3" />}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{filteredItems.length === 0 && (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<CheckCircle2 className="h-12 w-12 text-muted-foreground" />
						<h3 className="mt-4 text-lg font-semibold">
							No action items found
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

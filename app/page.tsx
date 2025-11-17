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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import {
	actionItems,
	callVolumeByHour,
	dashboardMetrics,
	sentimentData
} from "@/lib/mock-data";
import axios from "axios";
import { format } from "date-fns";
import {
	AlertCircle,
	ArrowRight,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Phone,
	TrendingDown,
	TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

function MetricCard({
	title,
	value,
	change,
	subtitle,
	icon: Icon
}: {
	title: string;
	value: string | number;
	change?: number;
	subtitle: string;
	icon: React.ElementType;
}) {
	const isPositive = change !== undefined && change > 0;
	const isNegative = change !== undefined && change < 0;

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				{change !== undefined && (
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						{isPositive && <TrendingUp className="h-3 w-3 text-green-500" />}
						{isNegative && <TrendingDown className="h-3 w-3 text-green-500" />}
						<span className={isPositive || isNegative ? "text-green-500" : ""}>
							{isPositive ? "+" : ""}
							{change}% {subtitle}
						</span>
					</div>
				)}
				{change === undefined && (
					<p className="text-xs text-muted-foreground">{subtitle}</p>
				)}
			</CardContent>
		</Card>
	);
}

function DashboardContent() {
	const searchParams = useSearchParams();
	const [apiData, setApiData] = useState<any>(null);
	const [callLogsData, setCallLogsData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingCallLogs, setLoadingCallLogs] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState<{
		type: "summary" | "transcript";
		content: string;
	} | null>(null);

	const recentActionItems = actionItems
		.filter((item) => item.status !== "completed")
		.slice(0, 3);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setLoading(true);
				const PIPEDREAM_API_PASSTHROUGH =
					"https://eof4qrhh5ohc1u5.m.pipedream.net";
				// Get locationId from URL params, fallback to default
				const locationId =
					searchParams.get("locationId") || "F9E20zuOVfJZhEspuZ8h";

				// Calculate start and end times dynamically
				// Default to current month
				const now = new Date();
				const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
				const endOfMonth = new Date(
					now.getFullYear(),
					now.getMonth() + 1,
					0,
					23,
					59,
					59,
					999
				);

				const startTime =
					searchParams.get("startTime") || startOfMonth.getTime().toString();
				const endTime =
					searchParams.get("endTime") || endOfMonth.getTime().toString();
				const timePeriod = searchParams.get("timePeriod") || "THIS_MONTH";
				const direction = searchParams.get("direction") || "INBOUND";
				const timezone = searchParams.get("timezone") || "Asia/Singapore";

				const apiUrl = `${PIPEDREAM_API_PASSTHROUGH}/${locationId}/voice-ai/dashboard/agents?locationId=${locationId}&startTime=${startTime}&endTime=${endTime}&timePeriod=${timePeriod}&direction=${direction}&timezone=${timezone}`;

				const response = await axios.get(apiUrl);
				setApiData(response.data);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, [searchParams]);

	useEffect(() => {
		const fetchCallLogs = async () => {
			try {
				setLoadingCallLogs(true);
				const PIPEDREAM_API_PASSTHROUGH =
					"https://eof4qrhh5ohc1u5.m.pipedream.net";
				const locationId =
					searchParams.get("locationId") || "F9E20zuOVfJZhEspuZ8h";

				// Calculate start and end dates dynamically
				const now = new Date();
				const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
				const endOfMonth = new Date(
					now.getFullYear(),
					now.getMonth() + 1,
					0,
					23,
					59,
					59,
					999
				);

				const startDate =
					searchParams.get("startDate") || startOfMonth.getTime().toString();
				const endDate =
					searchParams.get("endDate") || endOfMonth.getTime().toString();
				const timezone = searchParams.get("timezone") || "Asia/Singapore";

				const apiUrl = `${PIPEDREAM_API_PASSTHROUGH}/${locationId}/voice-ai/dashboard/call-logs?locationId=${locationId}&pageSize=10&page=1&timezone=${encodeURIComponent(
					timezone
				)}&startDate=${startDate}&endDate=${endDate}&sortBy=createdAt&sort=descend&callType=LIVE&direction=INBOUND`;

				const response = await axios.get(apiUrl);
				console.log("Call Logs Response:", response.data);
				setCallLogsData(response.data?.data?.callLogs || []);
			} catch (error) {
				console.error("Error fetching call logs:", error);
				setCallLogsData([]);
			} finally {
				setLoadingCallLogs(false);
			}
		};

		fetchCallLogs();
	}, [searchParams]);

	// Calculate values from API or use mock data as fallback
	const totalCalls =
		apiData?.data?.current?.totalCalls ?? dashboardMetrics.totalCallsHandled;
	const actionsTriggered =
		apiData?.data?.current?.actionsTriggered ??
		dashboardMetrics.appointmentsBooked;
	const positiveSentimentPercentage =
		apiData?.data?.current?.totalCalls > 0
			? Math.round(
					(apiData.data.current.positiveSentimentCallCount /
						apiData.data.current.totalCalls) *
						100
			  )
			: 62; // fallback to mock data percentage
	const negativeSentimentPercentage =
		apiData?.data?.current?.totalCalls > 0
			? Math.round(
					(apiData.data.current.negativeSentimentCallCount /
						apiData.data.current.totalCalls) *
						100
			  )
			: 38; // fallback to mock data percentage

	// Update sentiment data based on API response
	const updatedSentimentData =
		apiData?.data?.current?.totalCalls > 0
			? [
					{
						name: "Positive",
						value: positiveSentimentPercentage,
						color: "#10b981"
					},
					{
						name: "Negative",
						value: negativeSentimentPercentage,
						color: "#ef4444"
					}
			  ]
			: sentimentData;
	console.log("call logs Data:", callLogsData);
	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Business Value Dashboard
				</h1>
				<p className="text-muted-foreground">
					Monitor your AI agent performance and business impact in real-time.
				</p>
			</div>

			{/* Metrics Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<MetricCard
					title="Total Calls Handled"
					value={loading ? "Loading..." : totalCalls.toLocaleString()}
					change={dashboardMetrics.callsGrowth}
					subtitle="from last month"
					icon={Phone}
				/>
				<MetricCard
					title="Actions Triggered"
					value={loading ? "Loading..." : actionsTriggered.toLocaleString()}
					change={dashboardMetrics.conversionRate}
					subtitle="conversion rate"
					icon={Calendar}
				/>
				<MetricCard
					title="Average Response Time"
					value={`${dashboardMetrics.averageResponseTime}s`}
					change={dashboardMetrics.responseTimeImprovement}
					subtitle="improvement"
					icon={Clock}
				/>
				<MetricCard
					title="Cost Savings"
					value={`$${dashboardMetrics.costSavings.toLocaleString()}`}
					change={dashboardMetrics.costReduction}
					subtitle="operational cost reduction"
					icon={DollarSign}
				/>
			</div>

			{/* Second Row Metrics */}
			<div className="grid gap-4 md:grid-cols-2">
				<MetricCard
					title="First Call Resolution"
					value={`${dashboardMetrics.firstCallResolution}%`}
					change={dashboardMetrics.fcrGrowth}
					subtitle="this month"
					icon={CheckCircle}
				/>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Action Items
						</CardTitle>
						<AlertCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{dashboardMetrics.activeActionItems}
						</div>
						<div className="mt-2 flex gap-2 text-xs">
							<Badge variant="destructive">
								{dashboardMetrics.actionItemsPending} pending
							</Badge>
							<Badge className="bg-yellow-500">
								{dashboardMetrics.actionItemsInProgress} in progress
							</Badge>
							<Badge className="bg-green-500">
								{dashboardMetrics.actionItemsResolved} resolved this week
							</Badge>
						</div>
						<Link href="/action-items" className="mt-3 inline-block">
							<Button variant="link" className="h-auto p-0 text-xs">
								View all <ArrowRight className="ml-1 h-3 w-3" />
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row */}
			<div className="grid gap-4 md:grid-cols-2">
				{/* Sentiment Analysis */}
				<Card>
					<CardHeader>
						<CardTitle>Customer Sentiment Overview</CardTitle>
						<CardDescription>
							{loading
								? "Loading..."
								: `Past 30 Days - ${positiveSentimentPercentage}% Positive`}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{loading ? (
							<div className="flex h-[300px] items-center justify-center text-muted-foreground">
								Loading sentiment data...
							</div>
						) : (
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={updatedSentimentData}
										cx="50%"
										cy="50%"
										labelLine={false}
										label={({ name, value }) => `${name}: ${value}%`}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
									>
										{updatedSentimentData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.color} />
										))}
									</Pie>
									<Tooltip />
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						)}
					</CardContent>
				</Card>

				{/* Call Volume */}
				<Card>
					<CardHeader>
						<CardTitle>Call Volume by Hour</CardTitle>
						<CardDescription>Past 7 Days</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={callVolumeByHour}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis
									dataKey="hour"
									fontSize={12}
									tickFormatter={(value) => value.split(":")[0]}
								/>
								<YAxis fontSize={12} />
								<Tooltip />
								<Bar
									dataKey="calls"
									fill="hsl(var(--primary))"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Call Logs Table */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Recent Call Logs</CardTitle>
						<CardDescription>Latest voice AI interactions</CardDescription>
					</div>
					<Link href="/interactions">
						<Button variant="outline" size="sm">
							View All
						</Button>
					</Link>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Agent Name</TableHead>
								<TableHead>Contact Name</TableHead>
								<TableHead>From Number</TableHead>
								<TableHead>Date and Time</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead>Actions Triggered</TableHead>
								<TableHead></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loadingCallLogs ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className="text-center py-8 text-muted-foreground"
									>
										Loading call logs...
									</TableCell>
								</TableRow>
							) : callLogsData.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={7}
										className="text-center py-8 text-muted-foreground"
									>
										No call logs available
									</TableCell>
								</TableRow>
							) : (
								callLogsData.map((call: any, i: number) => {
									// Format duration from seconds to MM:SS
									const formatDuration = (seconds: number) => {
										const mins = Math.floor(seconds / 60);
										const secs = seconds % 60;
										return `${mins.toString().padStart(2, "0")}:${secs
											.toString()
											.padStart(2, "0")}`;
									};

									// Join executed call actions
									const actions =
										call.executedCallActions
											?.map((action: any) => action.actionName)
											.join(", ") || "-";

									return (
										<TableRow key={i}>
											<TableCell>
												<div className="flex items-center gap-2">
													<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
														{call.agentName
															? call.agentName
																	.split(" ")
																	.map((n: string) => n[0])
																	.join("")
															: "NA"}
													</div>
													<span className="font-medium">
														{call.agentName || "-"}
													</span>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex items-center gap-2">
													<div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
														{call.contactName
															? call.contactName
																	.split(" ")
																	.map((n: string) => n[0])
																	.join("")
															: "NA"}
													</div>
													<span>{call.contactName || "-"}</span>
												</div>
											</TableCell>
											<TableCell className="font-mono text-sm">
												{call.fromNumber || "-"}
											</TableCell>
											<TableCell>
												<div className="flex flex-col">
													<span className="text-sm">
														{call.createdAt
															? format(new Date(call.createdAt), "d MMM yyyy")
															: "-"}
													</span>
													<span className="text-xs text-muted-foreground">
														{call.createdAt
															? format(new Date(call.createdAt), "h:mm a")
															: "-"}
													</span>
												</div>
											</TableCell>
											<TableCell>
												{formatDuration(call.duration || 0)}
											</TableCell>
											<TableCell>
												<div className="max-w-xs truncate text-sm text-muted-foreground">
													{actions}
												</div>
											</TableCell>
											<TableCell>
												<div className="flex gap-2">
													<Button
														variant="outline"
														size="sm"
														onClick={() => {
															setDialogContent({
																type: "summary",
																content: call.summary || "No summary available"
															});
															setDialogOpen(true);
														}}
													>
														Summary
													</Button>
													<Button
														variant="outline"
														size="sm"
														onClick={() => {
															setDialogContent({
																type: "transcript",
																content:
																	call.transcript || "No transcript available"
															});
															setDialogOpen(true);
														}}
													>
														Transcript
													</Button>
												</div>
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Summary/Transcript Dialog */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>
							{dialogContent?.type === "summary"
								? "Call Summary"
								: "Call Transcript"}
						</DialogTitle>
						<DialogDescription className="sr-only">
							{dialogContent?.type === "summary"
								? "View the summary of this call"
								: "View the transcript of this call"}
						</DialogDescription>
					</DialogHeader>
					<div className="mt-4 space-y-4">
						<div className="text-sm leading-relaxed whitespace-pre-wrap">
							{dialogContent?.content}
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Activity Summary</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{recentActionItems.map((item) => (
						<div
							key={item.id}
							className="flex items-start justify-between rounded-lg border p-4"
						>
							<div className="flex items-start gap-3">
								<div
									className={`mt-0.5 h-2 w-2 rounded-full ${
										item.priority === "high"
											? "bg-red-500"
											: item.priority === "medium"
											? "bg-yellow-500"
											: "bg-blue-500"
									}`}
								/>
								<div>
									<h4 className="font-medium">{item.title}</h4>
									<p className="text-sm text-muted-foreground">
										{item.description}
									</p>
									<div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
										<span>{item.assignedTo}</span>
										<span>•</span>
										<span>
											Due {format(new Date(item.dueDate), "MMM d, yyyy")}
										</span>
									</div>
								</div>
							</div>
							<Badge
								variant={item.status === "in-progress" ? "default" : "outline"}
							>
								{item.status.replace("-", " ")}
							</Badge>
						</div>
					))}
					<Link href="/action-items">
						<Button variant="outline" className="w-full">
							View All Action Items
						</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}

export default function DashboardPage() {
	return (
		<Suspense
			fallback={
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Business Value Dashboard
						</h1>
						<p className="text-muted-foreground">Loading dashboard data...</p>
					</div>
				</div>
			}
		>
			<DashboardContent />
		</Suspense>
	);
}

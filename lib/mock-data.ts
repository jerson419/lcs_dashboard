export interface CallInteraction {
	id: string;
	callerId: string;
	callerName: string;
	timestamp: string;
	duration: number;
	outcome: "appointment" | "callback" | "no-answer" | "completed";
	sentiment: "positive" | "neutral" | "negative";
	notes: string;
	agentName: string;
}

export interface ActionItem {
	id: string;
	title: string;
	description: string;
	status: "pending" | "in-progress" | "completed";
	priority: "low" | "medium" | "high";
	createdAt: string;
	dueDate: string;
	assignedTo: string;
}

export interface Capability {
	id: string;
	name: string;
	description: string;
	category: string;
	price: number;
	priceInterval: "monthly" | "yearly";
	features: string[];
	isActive: boolean;
}

export const callInteractions: CallInteraction[] = [
	{
		id: "1",
		callerId: "+1234567890",
		callerName: "John Smith",
		timestamp: "2025-11-13T10:30:00",
		duration: 180,
		outcome: "appointment",
		sentiment: "positive",
		notes:
			"Customer interested in enterprise plan. Scheduled demo for next week.",
		agentName: "AI Agent"
	},
	{
		id: "2",
		callerId: "+1234567891",
		callerName: "Sarah Johnson",
		timestamp: "2025-11-13T09:15:00",
		duration: 120,
		outcome: "callback",
		sentiment: "neutral",
		notes: "Asked about pricing. Will call back after discussing with team.",
		agentName: "AI Agent"
	},
	{
		id: "3",
		callerId: "+1234567892",
		callerName: "Michael Brown",
		timestamp: "2025-11-13T08:45:00",
		duration: 240,
		outcome: "appointment",
		sentiment: "positive",
		notes: "Existing customer upgrade inquiry. Booked consultation.",
		agentName: "AI Agent"
	},
	{
		id: "4",
		callerId: "+1234567893",
		callerName: "Emily Davis",
		timestamp: "2025-11-12T16:20:00",
		duration: 90,
		outcome: "completed",
		sentiment: "negative",
		notes: "Complaint about service delay. Issue escalated to support team.",
		agentName: "AI Agent"
	},
	{
		id: "5",
		callerId: "+1234567894",
		callerName: "David Wilson",
		timestamp: "2025-11-12T14:10:00",
		duration: 150,
		outcome: "appointment",
		sentiment: "positive",
		notes: "New lead from website. Interested in AI capabilities.",
		agentName: "AI Agent"
	},
	{
		id: "6",
		callerId: "+1234567895",
		callerName: "Lisa Anderson",
		timestamp: "2025-11-12T11:30:00",
		duration: 60,
		outcome: "no-answer",
		sentiment: "neutral",
		notes: "Voicemail left. Will attempt callback.",
		agentName: "AI Agent"
	},
	{
		id: "7",
		callerId: "+1234567896",
		callerName: "Robert Taylor",
		timestamp: "2025-11-11T15:45:00",
		duration: 200,
		outcome: "appointment",
		sentiment: "positive",
		notes: "Partnership opportunity discussion. Meeting scheduled.",
		agentName: "AI Agent"
	},
	{
		id: "8",
		callerId: "+1234567897",
		callerName: "Jennifer Martinez",
		timestamp: "2025-11-11T13:20:00",
		duration: 110,
		outcome: "completed",
		sentiment: "neutral",
		notes: "General inquiry about services. Information provided.",
		agentName: "AI Agent"
	}
];

export const actionItems: ActionItem[] = [
	{
		id: "1",
		title: "Follow up with John Smith",
		description: "Send enterprise plan details and demo link",
		status: "pending",
		priority: "high",
		createdAt: "2025-11-13T10:35:00",
		dueDate: "2025-11-14T17:00:00",
		assignedTo: "Sales Team"
	},
	{
		id: "2",
		title: "Prepare pricing proposal for Sarah Johnson",
		description: "Create customized pricing based on team size",
		status: "in-progress",
		priority: "medium",
		createdAt: "2025-11-13T09:20:00",
		dueDate: "2025-11-15T17:00:00",
		assignedTo: "Sales Team"
	},
	{
		id: "3",
		title: "Schedule Michael Brown consultation",
		description: "Coordinate with product team for upgrade options",
		status: "in-progress",
		priority: "high",
		createdAt: "2025-11-13T08:50:00",
		dueDate: "2025-11-14T12:00:00",
		assignedTo: "Customer Success"
	},
	{
		id: "4",
		title: "Resolve Emily Davis service issue",
		description: "Investigate delay and provide resolution timeline",
		status: "in-progress",
		priority: "high",
		createdAt: "2025-11-12T16:25:00",
		dueDate: "2025-11-13T18:00:00",
		assignedTo: "Support Team"
	},
	{
		id: "5",
		title: "Send AI capabilities overview to David Wilson",
		description: "Include case studies and ROI examples",
		status: "pending",
		priority: "medium",
		createdAt: "2025-11-12T14:15:00",
		dueDate: "2025-11-14T17:00:00",
		assignedTo: "Sales Team"
	},
	{
		id: "6",
		title: "Callback Lisa Anderson",
		description: "Attempt second contact regarding initial inquiry",
		status: "pending",
		priority: "low",
		createdAt: "2025-11-12T11:35:00",
		dueDate: "2025-11-13T16:00:00",
		assignedTo: "AI Agent"
	},
	{
		id: "7",
		title: "Partnership meeting with Robert Taylor",
		description: "Prepare partnership proposal and terms",
		status: "pending",
		priority: "high",
		createdAt: "2025-11-11T15:50:00",
		dueDate: "2025-11-18T10:00:00",
		assignedTo: "Business Development"
	},
	{
		id: "8",
		title: "Update CRM integration documentation",
		description: "Documentation needs to reflect recent API changes",
		status: "completed",
		priority: "medium",
		createdAt: "2025-11-10T09:00:00",
		dueDate: "2025-11-13T17:00:00",
		assignedTo: "Technical Team"
	}
];

export const capabilities: Capability[] = [
	{
		id: "1",
		name: "AI Call Handler",
		description:
			"Automated call answering and routing with natural language understanding",
		category: "Voice AI",
		price: 299,
		priceInterval: "monthly",
		features: [
			"24/7 call handling",
			"Natural language processing",
			"Multi-language support",
			"Call transcription",
			"Sentiment analysis"
		],
		isActive: true
	},
	{
		id: "2",
		name: "Appointment Scheduler",
		description: "Intelligent scheduling system with calendar integration",
		category: "Automation",
		price: 199,
		priceInterval: "monthly",
		features: [
			"Calendar sync (Google, Outlook)",
			"Automated reminders",
			"Timezone handling",
			"Conflict resolution",
			"Custom booking rules"
		],
		isActive: true
	},
	{
		id: "3",
		name: "Lead Qualification",
		description: "AI-powered lead scoring and qualification system",
		category: "Sales AI",
		price: 399,
		priceInterval: "monthly",
		features: [
			"Intelligent lead scoring",
			"Automated qualification",
			"CRM integration",
			"Predictive analytics",
			"Custom criteria"
		],
		isActive: true
	},
	{
		id: "4",
		name: "Customer Insights",
		description:
			"Advanced analytics and sentiment analysis for customer interactions",
		category: "Analytics",
		price: 499,
		priceInterval: "monthly",
		features: [
			"Sentiment analysis",
			"Trend detection",
			"Custom dashboards",
			"Export capabilities",
			"Real-time insights"
		],
		isActive: true
	},
	{
		id: "5",
		name: "Voice Analytics",
		description:
			"Deep analysis of voice conversations for quality and compliance",
		category: "Analytics",
		price: 349,
		priceInterval: "monthly",
		features: [
			"Call quality scoring",
			"Compliance monitoring",
			"Keyword detection",
			"Agent performance",
			"Custom alerts"
		],
		isActive: false
	},
	{
		id: "6",
		name: "Enterprise Integration",
		description: "Full API access and custom integrations for enterprise needs",
		category: "Enterprise",
		price: 999,
		priceInterval: "monthly",
		features: [
			"Full API access",
			"Custom webhooks",
			"SSO integration",
			"Dedicated support",
			"SLA guarantee"
		],
		isActive: true
	}
];

export const dashboardMetrics = {
	totalCallsHandled: 2847,
	callsGrowth: 12.3,
	appointmentsBooked: 1246,
	conversionRate: 43.8,
	averageResponseTime: 3.2,
	responseTimeImprovement: -0.8,
	costSavings: 48392,
	costReduction: 35,
	firstCallResolution: 87.4,
	fcrGrowth: 3.2,
	activeActionItems: 12,
	actionItemsPending: 8,
	actionItemsInProgress: 3,
	actionItemsResolved: 1
};

export const sentimentData = [
	{ name: "Positive", value: 62, color: "#10b981" },
	{ name: "Neutral", value: 28, color: "#6b7280" },
	{ name: "Negative", value: 10, color: "#ef4444" }
];

export const callVolumeByHour = [
	{ hour: "00:00", calls: 12 },
	{ hour: "01:00", calls: 8 },
	{ hour: "02:00", calls: 5 },
	{ hour: "03:00", calls: 3 },
	{ hour: "04:00", calls: 6 },
	{ hour: "05:00", calls: 15 },
	{ hour: "06:00", calls: 28 },
	{ hour: "07:00", calls: 42 },
	{ hour: "08:00", calls: 65 },
	{ hour: "09:00", calls: 87 },
	{ hour: "10:00", calls: 95 },
	{ hour: "11:00", calls: 102 },
	{ hour: "12:00", calls: 78 },
	{ hour: "13:00", calls: 88 },
	{ hour: "14:00", calls: 92 },
	{ hour: "15:00", calls: 85 },
	{ hour: "16:00", calls: 72 },
	{ hour: "17:00", calls: 58 },
	{ hour: "18:00", calls: 45 },
	{ hour: "19:00", calls: 32 },
	{ hour: "20:00", calls: 25 },
	{ hour: "21:00", calls: 18 },
	{ hour: "22:00", calls: 15 },
	{ hour: "23:00", calls: 10 }
];

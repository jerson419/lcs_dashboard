# Component Documentation

## UI Components (shadcn/ui)

All base UI components are located in `components/ui/` and follow shadcn/ui conventions.

### Badge

Display status or category labels.

```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

### Button

Interactive button component with multiple variants.

```tsx
import { Button } from "@/components/ui/button";

<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Card

Container component for grouping related content.

```tsx
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";

<Card>
	<CardHeader>
		<CardTitle>Title</CardTitle>
		<CardDescription>Description text</CardDescription>
	</CardHeader>
	<CardContent>Main content here</CardContent>
	<CardFooter>
		<Button>Action</Button>
	</CardFooter>
</Card>;
```

### Checkbox

Checkbox input with label.

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox id="terms" />
<label htmlFor="terms">Accept terms</label>
```

### Input

Text input field.

```tsx
import { Input } from "@/components/ui/input";

<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Password" />
```

### Table

Data table components.

```tsx
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";

<Table>
	<TableHeader>
		<TableRow>
			<TableHead>Header 1</TableHead>
			<TableHead>Header 2</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		<TableRow>
			<TableCell>Cell 1</TableCell>
			<TableCell>Cell 2</TableCell>
		</TableRow>
	</TableBody>
</Table>;
```

### Tabs

Tabbed navigation component.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
	<TabsList>
		<TabsTrigger value="tab1">Tab 1</TabsTrigger>
		<TabsTrigger value="tab2">Tab 2</TabsTrigger>
	</TabsList>
	<TabsContent value="tab1">Content 1</TabsContent>
	<TabsContent value="tab2">Content 2</TabsContent>
</Tabs>;
```

### Skeleton

Loading placeholder component.

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-12 w-full" />
<Skeleton className="h-4 w-[250px]" />
```

## Custom Components

### Navigation

Main navigation component with theme toggle.

Located in: `components/navigation.tsx`

Features:

- Responsive mobile menu
- Active route highlighting
- Dark/light theme toggle
- Logo and branding

To add a new navigation item:

```tsx
const navigation = [
	// ... existing items
	{ name: "New Page", href: "/new-page", icon: IconComponent }
];
```

### ThemeProvider

Wrapper component for theme management.

Located in: `components/theme-provider.tsx`

Usage in `layout.tsx`:

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
	{children}
</ThemeProvider>
```

## Page Components

### Dashboard (app/page.tsx)

Main dashboard with metrics and charts.

**Key Components:**

- `MetricCard`: Reusable metric display with trend indicator
- `PieChart`: Customer sentiment visualization
- `BarChart`: Call volume by hour

**Metrics Displayed:**

- Total Calls Handled
- Appointments Booked
- Average Response Time
- Cost Savings
- First Call Resolution
- Active Action Items

### Interactions (app/interactions/page.tsx)

Call history and interaction logs.

**Features:**

- Search by name, phone, notes
- Filter by outcome type
- Responsive layouts (table/cards)
- Sentiment icons
- Duration formatting

**Helper Functions:**

- `getSentimentIcon()`: Returns appropriate sentiment icon
- `getOutcomeIcon()`: Returns outcome-specific icon
- `formatDuration()`: Formats seconds to MM:SS

### Action Items (app/action-items/page.tsx)

Task management interface.

**Features:**

- Status filtering
- Priority color coding
- Checkbox completion toggle
- Overdue highlighting
- Statistics dashboard

**Helper Functions:**

- `getPriorityColor()`: Returns color class for priority
- `getStatusBadge()`: Returns status badge component
- `isOverdue()`: Checks if task is overdue

### Catalog (app/catalog/page.tsx)

Service marketplace for AI capabilities.

**Features:**

- Category filtering
- Pricing display
- Feature lists
- Subscribe buttons
- Enterprise CTA

**Category Icons:**

- Voice AI: Zap
- Automation: TrendingUp
- Sales AI: Briefcase
- Analytics: BarChart3
- Enterprise: Star

### Settings (app/settings/page.tsx)

Account and preference management.

**Sections:**

- Profile Settings
- Notification Preferences
- Security Options
- Billing & Subscription

## Charts (Recharts)

### Pie Chart Example

```tsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
	{ name: "Category A", value: 400, color: "#8884d8" },
	{ name: "Category B", value: 300, color: "#82ca9d" }
];

<PieChart width={400} height={300}>
	<Pie data={data} dataKey="value" nameKey="name">
		{data.map((entry, index) => (
			<Cell key={`cell-${index}`} fill={entry.color} />
		))}
	</Pie>
	<Tooltip />
	<Legend />
</PieChart>;
```

### Bar Chart Example

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
	{ name: "Jan", value: 400 },
	{ name: "Feb", value: 300 }
];

<BarChart width={600} height={300} data={data}>
	<CartesianGrid strokeDasharray="3 3" />
	<XAxis dataKey="name" />
	<YAxis />
	<Tooltip />
	<Bar dataKey="value" fill="#8884d8" />
</BarChart>;
```

## Styling Utilities

### cn() Function

Utility for combining Tailwind classes.

```tsx
import { cn } from "@/lib/utils";

<div
	className={cn("base-class", condition && "conditional-class", className)}
/>;
```

### Common Tailwind Patterns

**Responsive Grid:**

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
```

**Flex Container:**

```tsx
<div className="flex items-center justify-between">
```

**Card Spacing:**

```tsx
<div className="space-y-6">
```

**Text Styles:**

```tsx
<h1 className="text-3xl font-bold tracking-tight">
<p className="text-muted-foreground">
```

## Icons (Lucide React)

Import icons from lucide-react:

```tsx
import { Icon1, Icon2 } from "lucide-react";

<Icon1 className="h-4 w-4" />
<Icon2 className="h-5 w-5 text-primary" />
```

Common icons used:

- LayoutDashboard, Phone, Calendar, Clock, DollarSign
- CheckCircle, AlertCircle, Settings, User, Bell
- TrendingUp, TrendingDown, Search, Menu, X
- Sun, Moon, Plus, Minus, Edit, Trash

## Best Practices

1. **Always use TypeScript**: Define proper types for props
2. **Use 'use client' directive**: Only for interactive components
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Accessibility**: Include aria labels and semantic HTML
5. **Consistent Spacing**: Use space-y-_ and gap-_ utilities
6. **Theme Support**: Use CSS variables for colors
7. **Component Reusability**: Extract common patterns
8. **Performance**: Use React.memo() for expensive components

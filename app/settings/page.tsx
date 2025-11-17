"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, CreditCard, Lock, User } from "lucide-react";

export default function SettingsPage() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Settings</h1>
				<p className="text-muted-foreground">
					Manage your account settings and preferences.
				</p>
			</div>

			{/* Settings Sections */}
			<div className="grid gap-6">
				{/* Profile Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="h-5 w-5" />
							Profile Settings
						</CardTitle>
						<CardDescription>Update your personal information</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<label className="text-sm font-medium">First Name</label>
								<Input placeholder="John" />
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Last Name</label>
								<Input placeholder="Doe" />
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Email</label>
							<Input type="email" placeholder="john.doe@example.com" />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Company</label>
							<Input placeholder="Lead Conversion Systems" />
						</div>
						<Button>Save Changes</Button>
					</CardContent>
				</Card>

				{/* Notifications */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Bell className="h-5 w-5" />
							Notification Preferences
						</CardTitle>
						<CardDescription>
							Configure how you receive notifications
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Email Notifications</p>
								<p className="text-sm text-muted-foreground">
									Receive email alerts for important events
								</p>
							</div>
							<Button variant="outline" size="sm">
								Configure
							</Button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Action Item Reminders</p>
								<p className="text-sm text-muted-foreground">
									Get notified about upcoming deadlines
								</p>
							</div>
							<Button variant="outline" size="sm">
								Configure
							</Button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Performance Reports</p>
								<p className="text-sm text-muted-foreground">
									Weekly summary of key metrics
								</p>
							</div>
							<Button variant="outline" size="sm">
								Configure
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Security */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Lock className="h-5 w-5" />
							Security
						</CardTitle>
						<CardDescription>Manage your security settings</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Change Password</p>
								<p className="text-sm text-muted-foreground">
									Update your password regularly
								</p>
							</div>
							<Button variant="outline">Change</Button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Two-Factor Authentication</p>
								<p className="text-sm text-muted-foreground">
									Add an extra layer of security
								</p>
							</div>
							<Button variant="outline">Enable</Button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Active Sessions</p>
								<p className="text-sm text-muted-foreground">
									View and manage your active sessions
								</p>
							</div>
							<Button variant="outline">Manage</Button>
						</div>
					</CardContent>
				</Card>

				{/* Billing */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CreditCard className="h-5 w-5" />
							Billing & Subscription
						</CardTitle>
						<CardDescription>
							Manage your billing information and subscriptions
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="rounded-lg border p-4">
							<div className="flex items-center justify-between">
								<div>
									<p className="font-medium">Current Plan: Enterprise</p>
									<p className="text-sm text-muted-foreground">
										$999/month - Billed annually
									</p>
								</div>
								<Button variant="outline">Manage Plan</Button>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Payment Method</p>
								<p className="text-sm text-muted-foreground">
									•••• •••• •••• 4242
								</p>
							</div>
							<Button variant="outline">Update</Button>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Billing History</p>
								<p className="text-sm text-muted-foreground">
									View past invoices and receipts
								</p>
							</div>
							<Button variant="outline">View</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

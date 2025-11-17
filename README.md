# Lead Conversion Systems - AI Dashboard

A modern, professional business dashboard built with Next.js, Tailwind CSS, and shadcn/ui components. This application provides real-time monitoring of AI agent performance and business impact.

## Features

### 📊 Business Value Dashboard

- **Key Performance Metrics**: Track calls handled, appointments booked, response times, and cost savings
- **Visual Analytics**: Interactive charts showing customer sentiment and call volume patterns
- **Real-time Updates**: Monitor your AI agent's performance with up-to-date metrics
- **Recent Activity**: Quick view of recent action items and their status

### 💬 Interaction History

- **Comprehensive Call Logs**: View all customer interactions with detailed information
- **Advanced Filtering**: Filter by outcome type (appointments, callbacks, completed, no-answer)
- **Search Functionality**: Quickly find specific interactions by name, phone, or notes
- **Sentiment Analysis**: Track customer sentiment (positive, neutral, negative) across all calls
- **Responsive Design**: Optimized table view for desktop, card view for mobile

### ✅ Action Items Management

- **Task Tracking**: Manage follow-up tasks with status indicators (pending, in-progress, completed)
- **Priority Levels**: Color-coded priority system (high, medium, low)
- **Due Date Tracking**: Visual indicators for overdue items
- **Quick Actions**: Mark items complete with a single click
- **Statistics Dashboard**: View counts by status at a glance

### 🎯 Capability Catalog

- **Service Marketplace**: Browse available AI capabilities and business services
- **Category Filtering**: Filter capabilities by type (Voice AI, Automation, Analytics, etc.)
- **Pricing Information**: Clear pricing display with monthly/yearly options
- **Feature Lists**: Detailed feature breakdown for each capability
- **Stripe Integration**: Ready for subscription payments (demo implementation)

### 🎨 Design Features

- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern design following shadcn/ui standards
- **Consistent Branding**: Purple/blue color scheme inspired by reference designs
- **Accessible**: Built with accessibility best practices

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd LCS_Dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
LCS_Dashboard/
├── app/                          # Next.js App Router pages
│   ├── action-items/            # Action items management page
│   ├── catalog/                 # Capability catalog page
│   ├── interactions/            # Interaction history page
│   ├── settings/                # Settings page
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Dashboard home page
│   └── globals.css              # Global styles and theme variables
├── components/                   # React components
│   ├── ui/                      # shadcn/ui base components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── tabs.tsx
│   ├── navigation.tsx           # Main navigation component
│   └── theme-provider.tsx       # Theme context provider
├── lib/                          # Utility functions and data
│   ├── mock-data.ts             # Sample data for demo
│   └── utils.ts                 # Utility functions
└── public/                       # Static assets
```

## Pages

### Dashboard (/)

Main landing page featuring:

- 6 key metric cards with trend indicators
- Customer sentiment pie chart
- Call volume by hour bar chart
- Recent activity summary

### Interactions (/interactions)

Call history view with:

- Search and filter capabilities
- Tabbed filtering by outcome type
- Desktop table and mobile card layouts
- Detailed call information including duration, sentiment, and notes

### Action Items (/action-items)

Task management interface with:

- Status-based filtering
- Priority indicators
- Due date tracking
- Checkbox completion toggle
- Statistics overview

### Catalog (/catalog)

Service marketplace featuring:

- Category-based navigation
- Pricing cards with feature lists
- Subscription buttons (Stripe integration ready)
- Enterprise contact section

### Settings (/settings)

Configuration page with:

- Profile settings
- Notification preferences
- Security options
- Billing and subscription management

## Customization

### Theme Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
	--primary: 221.2 83.2% 53.3%; /* Primary blue */
	--secondary: 210 40% 96.1%; /* Secondary gray */
	/* ... other variables */
}
```

### Mock Data

Modify `lib/mock-data.ts` to update sample data or connect to a real API:

```typescript
// Replace with API calls
export const callInteractions = await fetchInteractions();
```

### Stripe Integration

To enable real Stripe payments in the Catalog:

1. Install Stripe SDK:

```bash
npm install @stripe/stripe-js stripe
```

2. Add your Stripe keys to `.env.local`:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

3. Update the `handleSubscribe` function in `app/catalog/page.tsx`

## Responsive Design

The application is fully responsive with breakpoints:

- Mobile: < 768px (card layouts, stacked navigation)
- Tablet: 768px - 1024px (hybrid layouts)
- Desktop: > 1024px (full table layouts, expanded navigation)

## Performance

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Built-in Next.js image optimization
- **CSS Optimization**: Tailwind CSS purges unused styles
- **Client Components**: Only interactive components use 'use client'

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Real-time data updates with WebSocket
- [ ] Export functionality (CSV, PDF)
- [ ] Advanced filtering and sorting
- [ ] User authentication and authorization
- [ ] Multi-tenant support
- [ ] Email notifications
- [ ] API integration
- [ ] Data visualization customization

## License

This project is proprietary software for Lead Conversion Systems.

## Support

For support, please contact the development team at support@leadconversionsystems.com

# Quick Start Guide - LCS Dashboard

## Running the Application

### Development Mode

```bash
npm run dev
```

Access at: http://localhost:3000

### Production Build

```bash
npm run build
npm start
```

## Navigation

The application has 5 main sections accessible from the top navigation:

1. **Dashboard** (/) - Main overview with metrics and charts
2. **Interactions** (/interactions) - Call history and logs
3. **Action Items** (/action-items) - Task management
4. **Catalog** (/catalog) - Service marketplace
5. **Settings** (/settings) - Account configuration

## Key Features

### Dashboard Page

- View 6 key performance metrics with trend indicators
- Analyze customer sentiment with pie chart
- Monitor call volume patterns with bar chart
- Review recent action items

### Interactions Page

- Search by name, phone, or notes
- Filter by outcome: All, Appointments, Callbacks, Completed, No Answer
- View detailed call information including duration and sentiment
- Responsive design (table on desktop, cards on mobile)

### Action Items Page

- Filter by status: All, Pending, In Progress, Completed
- Mark items complete with checkbox
- Color-coded priority levels (red=high, yellow=medium, blue=low)
- Overdue items highlighted in red

### Catalog Page

- Browse AI capabilities by category
- View pricing and features
- Subscribe to services (demo Stripe integration)
- Contact sales for custom solutions

### Theme Toggle

- Click the sun/moon icon in the top-right
- Automatically detects system preference
- Persists across sessions

## Mock Data

All data is currently mock data defined in `lib/mock-data.ts`. To connect to a real backend:

1. Create API routes in `app/api/`
2. Replace mock data imports with API calls
3. Update state management as needed

## Customization Tips

### Change Colors

Edit `app/globals.css` - modify CSS variables under `:root` and `.dark`

### Add New Pages

1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Update navigation in `components/navigation.tsx`

### Add New Metrics

1. Update `dashboardMetrics` in `lib/mock-data.ts`
2. Add new `MetricCard` components in `app/page.tsx`

### Modify Charts

Edit chart configurations in `app/page.tsx` using Recharts documentation

## Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Troubleshooting

### Port 3000 already in use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### TypeScript errors

```bash
# Delete .next folder and rebuild
rm -rf .next
npm run dev
```

### Dependencies issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## File Structure Overview

```
app/
  ├── page.tsx              # Dashboard home
  ├── layout.tsx            # Root layout
  ├── globals.css           # Global styles
  ├── interactions/         # Interactions page
  ├── action-items/         # Action items page
  ├── catalog/              # Catalog page
  └── settings/             # Settings page

components/
  ├── ui/                   # Base UI components
  ├── navigation.tsx        # Main navigation
  └── theme-provider.tsx    # Theme context

lib/
  ├── mock-data.ts          # Sample data
  └── utils.ts              # Utilities
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
# Upload .next/, public/, package.json
npm start
```

## Support

For questions or issues, refer to the main README.md or contact the development team.

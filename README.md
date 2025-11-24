# Project Voyager - AI-Powered Travel Planner

A modern Next.js travel planning application with AI-powered flight and hotel recommendations using Google's Gemini AI.

## Features

-  **AI-Powered Recommendations** - Uses Google Gemini to generate realistic flight and hotel options
-  **Flexible Search** - Multiple departure airports, optional destinations, one-way or return trips
-  **Modern UI** - Beautiful design with Tailwind CSS
-  **React & TypeScript** - Type-safe components with React hooks
-  **Real-time Updates** - Smooth loading animations and state management
-  **Responsive Design** - Works perfectly on mobile and desktop

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google AI API Key

Create a `.env.local` file in the root directory:

```bash
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

**To get your API key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key and paste it in your `.env.local` file

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Enter Departure Airport(s)** - e.g., "London Heathrow, Manchester"
2. **Destination** (Optional) - Leave blank for AI suggestions, or specify like "Paris"
3. **Trip Type** - Choose one-way or return
4. **Duration** - Number of days for your trip
5. **Additional Info** - Budget, preferences, special requirements
6. **Click "Generate AI-Powered Itinerary"**

The AI will analyse your request and provide:
- Realistic flight options with pricing
- Hotel recommendations with ratings
- Total cost estimate
- Reasoning for the recommendations

## Project Structure

```
voyager-next/
├── app/
│   ├── api/
│   │   └── generate-itinerary/
│   │       └── route.ts         # AI API endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── Header.tsx               # App header
│   ├── EnhancedTripInput.tsx    # Search form
│   ├── LoadingState.tsx         # Loading animation
│   ├── TripResults.tsx          # Results display
│   └── EnhancedTripPlanner.tsx  # Main container
├── data/
│   └── destinations.ts          # TypeScript interfaces
└── .env.local                   # API keys (create this!)
```

## Technologies

- **Next.js 16** - React framework with Turbopack
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling (@tailwindcss/postcss)
- **Lucide React** - Icons
- **Google Gemini AI** - AI-powered recommendations

## API Route

The `/api/generate-itinerary` endpoint:
- Accepts POST requests with travel details
- Uses Google Gemini 1.5 Flash model
- Returns JSON with flight and hotel data
- Includes pricing, ratings, and recommendations

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_AI_API_KEY` | Google AI API key from AI Studio | Yes |

## Example Request

```json
{
  "departureAirport": "London Heathrow",
  "destination": "Paris",
  "tripType": "return",
  "duration": "3",
  "additionalInfo": "Budget £500, prefer morning flights"
}
```

## Example Response

```json
{
  "city": "Paris",
  "country": "France",
  "img": "https://images.unsplash.com/photo-...",
  "flights": {
    "airline": "Air France",
    "route": "London to Paris",
    "time": "08:30 - 10:45",
    "price": 120,
    "class": "Economy"
  },
  "hotel": {
    "name": "Hotel Le Marais",
    "location": "Central Paris",
    "rating": "4.6",
    "price": 150,
    "amenities": ["WiFi", "Breakfast", "Air Conditioning"]
  },
  "currency": "€",
  "totalCost": 420,
  "reasoning": "Selected for optimal price-to-quality ratio..."
}
```

## Development

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Troubleshooting

### CSS Not Loading
- Make sure you're using `@import "tailwindcss"` in `globals.css`
- Verify `@tailwindcss/postcss` is installed
- Restart the dev server

### API Errors
- Check that `.env.local` exists and contains your API key
- Verify the API key is valid in Google AI Studio
- Check the browser console for detailed error messages

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and restart: `rm -rf .next && npm run dev`

## Future Enhancements

- [ ] User authentication
- [ ] Save favorite trips
- [ ] Real booking integration
- [ ] Multi-city trips
- [ ] Price alerts
- [ ] Calendar integration
- [ ] Email confirmations

## License

MIT

## Support

For issues or questions, please check the console logs or create an issue in the repository.

---

**Note:** This application uses AI to generate travel recommendations. Prices and availability are estimates and should be verified with actual booking platforms. This is a demo and no payment information will be requested. No travel will be booked. 

**Empower Digital Solutions | Nicola Berry 2025**

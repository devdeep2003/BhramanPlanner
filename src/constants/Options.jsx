export const BudgetDetails = [
  {
    id: 1,
    title: "Cheap",
    desc: "Budget-friendly with smart spending and affordable stays",
    emoji: "💰💡",
  },
  {
    id: 2,
    title: "Moderate ",
    desc: "Balanced expenses with comfortable stays and good experiences",
    emoji: "💵✨",
  },
  {
    id: 3,
    title: "High",
    desc: "Luxury travel with premium accommodations and exclusive experiences",
    emoji: "💎🛎️",
  },
];

export const TravellerOptions = [
  {
    id: 1,
    title: "Solo",
    desc: "Independent traveler exploring alone",
    emoji: "🚶‍♂️🎒",
  },
  {
    id: 2,
    title: "Couples",
    desc: "Romantic or partner travel",
    emoji: "💑💕",
  },
  {
    id: 3,
    title: "Family",
    desc: "Family trips with 3-5 members",
    emoji: "👨‍👩‍👧‍👦🏡",
  },
  {
    id: 4,
    title: "Group",
    desc: "Friends or large family group (5-10 people)",
    emoji: "🧑‍🤝‍🧑🎉",
  },
];

export const GEMINI_PROMPT = `
You are an expert AI travel planner. Based on the user's inputs, generate a complete travel plan.

User Preferences:

Number of Days: {days}

Number of Members: {members}

Travel Destination: {place}

Budget Level: {budget}


Return the response strictly in this JSON format (no markdown, no explanation, no extra fields):

{
  "destination": "string",
  "overview": "string",
  "tourist_places": [
    {
      "name": "string",
      "description": "string",
      "location": "string",
      "best_time_to_visit": "string"
    }
  ],
  "hotels": [
    {
      "name": "string",
      "location": "string",
      "price_per_night": "string",
      "rating": "number (e.g., 4.5)",
      "amenities": ["string", "string"]
    }
  ],
  "daily_itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "time": "string (e.g., '09:00 AM')",
          "activity": "string"
        }
      ]
    }
  ],
  "food_recommendations": [
    {
      "meal_type": "breakfast/lunch/dinner",
      "restaurant": "string",
      "cuisine": "string",
      "price_range": "string (e.g., '₹₹')"
    }
  ],
  "estimated_cost": {
    "accommodation": "string (e.g., '₹300 total')",
    "food": "string",
    "transport": "string",
    "activities": "string",
    "total": "string"
  },
  "local_tips": [
    "string",
    "string"
  ]
}

Important Instructions:

Return only a valid JSON object.

Do not include markdown, bullet points, or additional text.

Use only the specified field names and structure.

All arrays must contain at least 1 item.

`;



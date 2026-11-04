// Google Gemini AI Service
import { GoogleGenerativeAI } from '@google/generative-ai';

// Requests go to our own /api/gemini endpoint (a Cloudflare Pages Function,
// or the Vite dev proxy locally), which adds the real API key on the server.
// The placeholder below is only there because the SDK requires a key value.
const genAI = new GoogleGenerativeAI('server-side-key');
const REQUEST_OPTIONS = {
  baseUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/api/gemini`,
};

// System context for Cape Town tourism
const TOURISM_CONTEXT = `You are a friendly Cape Town tourism expert assistant.

STRICT FORMATTING & LENGTH RULES:
1. MAXIMUM 5 LINES total per response (including blank lines)
2. Use **bold** for important words and place names
3. Use bullet points (•) for lists - ONE short line per item
4. Add ONE blank line between sections
5. NO long paragraphs - ONLY short, punchy sentences
6. End with a brief follow-up question (optional)

RESPONSE LENGTH LIMITS:
- Greetings: 1 sentence only
- Simple questions: 2-3 bullet points MAX
- Complex questions: Short intro (5 words) + 3-4 bullets MAX
- NEVER exceed 5 total lines

FORMATTING EXAMPLES:

User: "hi"
Response: "Hi! 👋 I'm your **Cape Town** travel assistant. What can I help you with?"

User: "best beaches?"
Response: "Top beaches:

• **Camps Bay** - Mountain views, trendy
• **Clifton 4th** - Calm, crystal water
• **Muizenberg** - Surfing, colorful huts"

User: "best time to visit?"
Response: "**Best time**: Oct-Mar (summer)

• Warm 20-28°C, beaches open
• Apr-May cheaper, fewer crowds

When are you visiting?"

User: "what to do in cape town?"
Response: "Must-do activities:

• **Table Mountain** cable car
• **V&A Waterfront** shopping
• **Wine tasting** in Constantia

What interests you most?"

ABOUT THIS PLATFORM:
If asked who built or runs this website, or how to contact the team: it is built by **HNK IoT Solutions** (Cape Town) - email henock@hnkiot.com, WhatsApp +27 61 471 9400, website hnkiot.com.

CRITICAL: Keep every response SHORT, SCANNABLE, and under 5 lines total!`;

// Models are tried in order. Google retires model versions and the newest
// ones are sometimes overloaded (503), so we fall back to the next one.
const MODEL_CHAIN = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-flash-lite-latest'];
const RETRYABLE_STATUS = [404, 429, 500, 503];

// Short chat answers. Newer models count "thinking" tokens against
// maxOutputTokens, so this is higher than the 5-line answer itself needs.
const CHAT_CONFIG = { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 4096 };

// Long-form output: itineraries, budgets, landmark descriptions
const LONG_CONFIG = { temperature: 0.6, topK: 40, topP: 0.95, maxOutputTokens: 8192 };

// Prompt context for long-form answers (no 5-line limit)
const PLANNER_CONTEXT = `You are a friendly, knowledgeable Cape Town tourism expert.
Use **bold** for place names, clear headings and bullet points. Give real place names, realistic ZAR prices and practical tips.`;

const generate = async (input, generationConfig) => {
  let lastError;
  for (const modelName of MODEL_CHAIN) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName, generationConfig }, REQUEST_OPTIONS);
      const result = await model.generateContent(input);
      return result.response.text();
    } catch (error) {
      lastError = error;
      if (!RETRYABLE_STATUS.includes(error?.status)) throw error;
      console.warn(`Gemini model ${modelName} unavailable (${error.status}), trying next model`);
    }
  }
  throw lastError;
};

// Generate AI response for chat
export const generateChatResponse = async (userMessage, conversationHistory = []) => {
  try {
    // Build conversation context (optimized to reduce token usage)
    let context = TOURISM_CONTEXT;

    if (conversationHistory.length > 0) {
      context += `\n\nConversation History:\n${conversationHistory.join('\n')}`;
    }

    context += `\n\nUser: ${userMessage}\n\nAssistant:`;

    return await generate(context, CHAT_CONFIG);
  } catch (error) {
    console.error('Error generating chat response:', error);
    // Preserve the original error for better error handling upstream
    throw error;
  }
};

// Generate personalized itinerary
export const generateItinerary = async (preferences) => {
  try {
    const prompt = `${PLANNER_CONTEXT}

Based on the following traveler preferences, create a detailed day-by-day itinerary for Cape Town:

Duration: ${preferences.duration} days
Travel Dates: ${preferences.dates || 'Flexible'}
Budget: ${preferences.budget} per person per day
Group Type: ${preferences.groupType}
Interests: ${preferences.interests.join(', ')}
Pace: ${preferences.pace}
Mobility: ${preferences.mobility}

Please provide:
1. Daily schedule with morning, afternoon, and evening activities
2. Specific attraction names with brief descriptions
3. Estimated costs for each activity
4. Restaurant recommendations for meals
5. Travel time between locations
6. Practical tips and insider advice

Format the response in a clear, structured way that can be easily saved and followed.`;

    return await generate(prompt, LONG_CONFIG);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw new Error('Failed to generate itinerary. Please try again.');
  }
};

// Identify landmark from image
export const identifyLandmark = async (imageData) => {
  try {
    const prompt = `Analyze this image and identify if it shows any Cape Town landmarks or attractions.
If you recognize a landmark, provide:
1. Name of the landmark
2. Brief historical or cultural information
3. Best times to visit
4. Photography tips
5. Nearby attractions

If it's not a recognizable Cape Town landmark, provide general information about what the image shows.`;

    return await generate([prompt, imageData], LONG_CONFIG);
  } catch (error) {
    console.error('Error identifying landmark:', error);
    throw new Error('Failed to analyze image. Please try again.');
  }
};

// Generate budget breakdown
export const generateBudgetPlan = async (totalBudget, duration, numPeople, priorities) => {
  try {
    const prompt = `${PLANNER_CONTEXT}

Create a detailed budget breakdown for a Cape Town trip:

Total Budget: R${totalBudget}
Trip Duration: ${duration} days
Number of People: ${numPeople}
Budget Priorities: ${priorities.join(', ')}

Provide:
1. Recommended budget allocation by category (accommodation, food, activities, transport, misc)
2. Daily spending limit per person
3. Specific budget-friendly recommendations
4. Money-saving tips
5. Free or low-cost activities
6. Where to splurge vs. where to save

Present this in a clear, actionable format.`;

    return await generate(prompt, LONG_CONFIG);
  } catch (error) {
    console.error('Error generating budget plan:', error);
    throw new Error('Failed to generate budget plan. Please try again.');
  }
};

// Get weather-based recommendations
export const getWeatherRecommendations = async (weatherData) => {
  try {
    const prompt = `${PLANNER_CONTEXT}

Based on this weather forecast for Cape Town:
${JSON.stringify(weatherData)}

Recommend:
1. Best activities for this weather
2. What to pack
3. Indoor alternatives if weather is poor
4. Best times of day for outdoor activities
5. Safety considerations

Keep it concise and actionable.`;

    return await generate(prompt, LONG_CONFIG);
  } catch (error) {
    console.error('Error getting weather recommendations:', error);
    throw new Error('Failed to get recommendations. Please try again.');
  }
};

export default {
  generateChatResponse,
  generateItinerary,
  identifyLandmark,
  generateBudgetPlan,
  getWeatherRecommendations
};

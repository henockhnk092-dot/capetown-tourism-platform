import { onRequestPost as __api_gemini___path___js_onRequestPost } from "C:\\Users\\henoc\\OneDrive\\Documents\\Codes\\Tourism\\capetown-tourism-app\\functions\\api\\gemini\\[[path]].js"
import { onRequestPost as __api_booking_email_js_onRequestPost } from "C:\\Users\\henoc\\OneDrive\\Documents\\Codes\\Tourism\\capetown-tourism-app\\functions\\api\\booking-email.js"
import { onRequestPost as __api_tts_js_onRequestPost } from "C:\\Users\\henoc\\OneDrive\\Documents\\Codes\\Tourism\\capetown-tourism-app\\functions\\api\\tts.js"

export const routes = [
    {
      routePath: "/api/gemini/:path*",
      mountPath: "/api/gemini",
      method: "POST",
      middlewares: [],
      modules: [__api_gemini___path___js_onRequestPost],
    },
  {
      routePath: "/api/booking-email",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_booking_email_js_onRequestPost],
    },
  {
      routePath: "/api/tts",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_tts_js_onRequestPost],
    },
  ]
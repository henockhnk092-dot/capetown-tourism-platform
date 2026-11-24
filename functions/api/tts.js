// Cloudflare Pages Function: turns assistant replies into natural speech with
// Azure AI Speech. The key is the encrypted Pages secret AZURE_SPEECH_KEY.

const REGION = 'southafricanorth';
const VOICES = ['en-ZA-LeahNeural', 'en-ZA-LukeNeural'];
const MAX_CHARS = 1200;
const ALLOWED_ORIGINS = ['https://capetownplanner.com', 'https://capetown.hnkiot.com', 'https://capetown-tourism.pages.dev'];

const escapeXml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  const isPreview = origin && origin.endsWith('.capetown-tourism.pages.dev');
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !isPreview) {
    return new Response('Forbidden', { status: 403 });
  }
  if (!env.AZURE_SPEECH_KEY) {
    return new Response('Speech is not configured', { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  const text = String(body.text || '').replace(/\s+/g, ' ').trim().slice(0, MAX_CHARS);
  if (!text) return new Response('Bad request', { status: 400 });
  const voice = VOICES.includes(body.voice) ? body.voice : VOICES[0];

  const ssml = `<speak version="1.0" xml:lang="en-ZA"><voice name="${voice}"><prosody rate="-5%">${escapeXml(text)}</prosody></voice></speak>`;

  const response = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': env.AZURE_SPEECH_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'capetown-tourism',
    },
    body: ssml,
  });

  if (!response.ok) {
    return new Response('Speech failed', { status: 502 });
  }
  return new Response(response.body, {
    headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' },
  });
}

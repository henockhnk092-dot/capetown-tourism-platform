import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send, Sparkles, Loader2, Volume2, Pause, Square, Copy, Check, RotateCcw, Mic, MicOff,
  Mountain, Waves, CalendarDays, Wallet, Wine, Route, ShieldCheck, Bus, CalendarRange, ArrowRight,
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { generateChatResponse } from '../services/geminiAI';

const STORAGE_KEY = 'ct-ai-chat';
const HISTORY_TURNS = 8; // earlier messages sent with each question, so follow-ups make sense

const WELCOME = {
  role: 'assistant',
  content: "Hi! 👋 I'm your **Cape Town** travel guide. Ask me about attractions, beaches, food, budgets, safety or getting around.",
};

const SUGGESTIONS = [
  { Icon: Mountain, label: 'Top attractions', question: 'What are the top 5 must-see attractions in Cape Town?' },
  { Icon: Waves, label: 'Best beaches', question: 'Which are the best beaches in Cape Town?' },
  { Icon: CalendarDays, label: 'When to visit', question: 'When is the best time of year to visit Cape Town?' },
  { Icon: Wallet, label: 'Budget tips', question: 'What are some budget-friendly things to do in Cape Town?' },
  { Icon: Wine, label: 'Wine regions', question: 'Which wine regions near Cape Town should I visit?' },
  { Icon: Route, label: '3-day itinerary', question: 'Can you suggest a 3-day Cape Town itinerary?' },
];

const TOPICS = ['Table Mountain', 'Robben Island', 'Cape Point', 'Winelands', 'Boulders Beach penguins', 'V&A Waterfront'];

const TIPS = [
  'Ask short, specific questions for the best answers.',
  'Follow-up questions work: the assistant remembers this chat.',
  'Tap the speaker on any reply to hear it read aloud.',
];

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Minimal formatting for replies: **bold**, bullet lines and line breaks
const formatReply = (text) =>
  escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/^\s*[•*-]\s+(.*)$/gm, '<span class="flex gap-2"><span class="text-amber-500">•</span><span>$1</span></span>')
    .replace(/\n/g, '<br/>');

const plainText = (text) => text.replace(/\*\*/g, '').replace(/•/g, '').trim();

const loadSaved = () => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : [WELCOME];
  } catch {
    return [WELCOME];
  }
};

const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
const hasBrowserVoice = typeof window !== 'undefined' && 'speechSynthesis' in window;
// Natural South African voice from Azure (via /api/tts); the browser voice is the fallback
const canSpeak = typeof window !== 'undefined' && (typeof Audio !== 'undefined' || hasBrowserVoice);

const AIAssistant = () => {
  const [messages, setMessages] = useState(loadSaved);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speaking, setSpeaking] = useState({ index: null, paused: false });
  const [copied, setCopied] = useState(null);
  const [listening, setListening] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  const hasConversation = messages.length > 1;

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // storage unavailable (private mode): the chat still works, it just isn't kept
    }
  }, [messages, isLoading]);

  // Stop speech and listening when leaving the page
  useEffect(() => () => {
    audioRef.current?.pause();
    if (hasBrowserVoice) window.speechSynthesis.cancel();
    recognitionRef.current?.abort();
  }, []);

  // Grow the textarea with its content (up to 5 lines)
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (hasBrowserVoice) window.speechSynthesis.cancel();
    setSpeaking({ index: null, paused: false });
  };

  const speakWithBrowser = (text, index) => {
    if (!hasBrowserVoice) {
      setSpeaking({ index: null, paused: false });
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking({ index: null, paused: false });
    utterance.onerror = () => setSpeaking({ index: null, paused: false });
    setSpeaking({ index, paused: false });
    window.speechSynthesis.speak(utterance);
  };

  const speak = async (text, index) => {
    stopSpeaking();
    const words = plainText(text);
    setSpeaking({ index, paused: false, loading: true });
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: words }),
      });
      if (!res.ok) throw new Error(res.status);
      const url = URL.createObjectURL(await res.blob());
      const audio = new Audio(url);
      const done = () => {
        URL.revokeObjectURL(url);
        if (audioRef.current === audio) audioRef.current = null;
        setSpeaking((s) => (s.index === index ? { index: null, paused: false } : s));
      };
      audio.onended = done;
      audio.onerror = done;
      audioRef.current = audio;
      await audio.play();
      setSpeaking({ index, paused: false });
    } catch {
      speakWithBrowser(words, index);
    }
  };

  const togglePause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) audio.play(); else audio.pause();
      setSpeaking((s) => ({ ...s, paused: !audio.paused }));
      return;
    }
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setSpeaking((s) => ({ ...s, paused: false }));
    } else {
      window.speechSynthesis.pause();
      setSpeaking((s) => ({ ...s, paused: true }));
    }
  };

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  const copyChat = () =>
    copyText(
      messages.map((m) => `${m.role === 'user' ? 'You' : 'Cape Town Guide'}: ${plainText(m.content)}`).join('\n\n'),
      'chat'
    );

  const newChat = () => {
    stopSpeaking();
    setMessages([WELCOME]);
    setInput('');
    inputRef.current?.focus();
  };

  const send = async (text = input) => {
    const question = text.trim();
    if (!question || isLoading) return;

    setInput('');
    const history = messages
      .slice(1)
      .slice(-HISTORY_TURNS)
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${plainText(m.content)}`);
    const next = [...messages, { role: 'user', content: question }];
    setMessages(next);
    setIsLoading(true);

    try {
      const reply = await generateChatResponse(question, history);
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch (error) {
      const busy = [429, 503].includes(error?.status) || /429|503|exhausted|overloaded/i.test(error?.message || '');
      setMessages([
        ...next,
        {
          role: 'assistant',
          error: true,
          content: busy
            ? '**The assistant is busy right now.** Please try again in a minute.'
            : '**Sorry, something went wrong.** Please check your connection and try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const retryLast = () => {
    const lastQuestion = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastQuestion) return;
    setMessages((m) => m.slice(0, -2));
    send(lastQuestion.content);
  };

  const toggleListening = () => {
    if (!SpeechRecognition) return;
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-ZA';
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      setInput(Array.from(event.results).map((r) => r[0].transcript).join(''));
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const iconButton = 'p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors';

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        image="ai-assistant"
        title="AI Travel Assistant"
        subtitle="Ask anything about Cape Town. Answers are powered by Google Gemini."
      >
        <div className="flex flex-wrap gap-2">
          {['Free to use', 'Remembers your chat', canSpeak && 'Voice replies'].filter(Boolean).map((badge) => (
            <span key={badge} className="px-3 py-1 rounded-full bg-white/15 border border-white/25 text-sm backdrop-blur-sm">
              {badge}
            </span>
          ))}
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid gap-6 lg:grid-cols-3">
        {/* Chat card */}
        <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[min(720px,calc(100svh-7rem))] min-h-[480px]">
          <header className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-900 truncate">Cape Town Guide</h2>
                <p className="text-xs text-gray-500">{isLoading ? 'Typing…' : 'Online'}</p>
              </div>
            </div>
            {hasConversation && (
              <div className="flex items-center gap-1 shrink-0">
                <button type="button" onClick={copyChat} className={`${iconButton} flex items-center gap-1.5 text-sm`} title="Copy chat">
                  {copied === 'chat' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  <span className="hidden sm:inline">{copied === 'chat' ? 'Copied' : 'Copy'}</span>
                </button>
                <button type="button" onClick={newChat} className={`${iconButton} flex items-center gap-1.5 text-sm`} title="Start a new chat">
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">New chat</span>
                </button>
              </div>
            )}
          </header>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto px-3 sm:px-5 py-5 space-y-5" aria-live="polite">
            {messages.map((message, index) => {
              const isUser = message.role === 'user';
              const isSpeakingThis = speaking.index === index;
              return (
                <div key={index} className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="hidden sm:flex h-8 w-8 shrink-0 rounded-full bg-gray-100 border border-gray-200 items-center justify-center">
                      <Sparkles className="h-4 w-4 text-gray-700" />
                    </div>
                  )}
                  <div className={`max-w-[88%] sm:max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed break-words ${
                        isUser
                          ? 'bg-gray-900 text-white rounded-br-md whitespace-pre-wrap'
                          : message.error
                            ? 'bg-red-50 text-red-800 border border-red-100 rounded-bl-md'
                            : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      {isUser ? message.content : <div dangerouslySetInnerHTML={{ __html: formatReply(message.content) }} />}
                    </div>

                    {!isUser && index > 0 && (
                      <div className="mt-1 flex items-center gap-0.5">
                        {message.error ? (
                          <button type="button" onClick={retryLast} className={`${iconButton} flex items-center gap-1 text-xs`}>
                            <RotateCcw className="h-3.5 w-3.5" /> Try again
                          </button>
                        ) : (
                          <>
                            {canSpeak && !isSpeakingThis && (
                              <button type="button" onClick={() => speak(message.content, index)} className={iconButton} title="Listen">
                                <Volume2 className="h-4 w-4" />
                              </button>
                            )}
                            {isSpeakingThis && (
                              <>
                                <button type="button" onClick={togglePause} className={iconButton} title={speaking.paused ? 'Resume' : 'Pause'}>
                                  {speaking.paused ? <Volume2 className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                                </button>
                                <button type="button" onClick={stopSpeaking} className={iconButton} title="Stop">
                                  <Square className="h-4 w-4" />
                                </button>
                                <span className="text-xs text-amber-600 ml-1">{speaking.loading ? 'Loading voice…' : speaking.paused ? 'Paused' : 'Speaking…'}</span>
                              </>
                            )}
                            <button type="button" onClick={() => copyText(plainText(message.content), index)} className={iconButton} title="Copy">
                              {copied === index ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5">
                <div className="hidden sm:flex h-8 w-8 shrink-0 rounded-full bg-gray-100 border border-gray-200 items-center justify-center">
                  <Sparkles className="h-4 w-4 text-gray-700" />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3.5 flex items-center gap-1.5" aria-label="Assistant is typing">
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Welcome suggestions */}
            {!hasConversation && !isLoading && (
              <div className="pt-2">
                <p className="text-sm font-medium text-gray-500 mb-3">Try one of these</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
                  {SUGGESTIONS.map(({ Icon, label, question }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => send(question)}
                      className="group flex items-start gap-3 text-left p-3.5 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <span className="h-9 w-9 shrink-0 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-gray-900">{label}</span>
                        <span className="block text-xs text-gray-500 mt-0.5 line-clamp-2">{question}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3 sm:p-4">
            <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white px-2 py-2 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition-colors">
              <label htmlFor="ai-input" className="sr-only">Your question</label>
              <textarea
                id="ai-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={listening ? 'Listening… speak now' : 'Ask me anything about Cape Town…'}
                rows={1}
                maxLength={1000}
                className="flex-1 resize-none bg-transparent px-2 py-2 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none"
                disabled={isLoading}
              />
              {SpeechRecognition && (
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                    listening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={listening ? 'Stop listening' : 'Speak your question'}
                  aria-pressed={listening}
                >
                  {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              )}
              <button
                type="button"
                onClick={() => send()}
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                aria-label="Send"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-[18px] w-[18px]" />}
              </button>
            </div>
            <p className="mt-2 px-1 text-xs text-gray-400 hidden sm:block">Enter to send · Shift+Enter for a new line</p>
          </div>
        </section>

        {/* Sidebar (below the chat on phones) */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Popular topics</h2>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => send(`Tell me about ${topic}: what to know before visiting.`)}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-gray-900 hover:text-gray-900 disabled:opacity-50 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Plan faster</h2>
            <div className="space-y-2">
              {[
                { to: '/planner', Icon: CalendarRange, title: 'Itinerary Planner', text: 'Build a day-by-day plan' },
                { to: '/events', Icon: CalendarDays, title: 'Events & Festivals', text: "See what's on" },
                { to: '/transportation', Icon: Bus, title: 'Getting Around', text: 'Buses, trains and taxis' },
                { to: '/safety', Icon: ShieldCheck, title: 'Safety Tips', text: 'Travel with confidence' },
              ].map(({ to, Icon, title, text }) => (
                <Link key={to} to={to} className="group flex items-center gap-3 p-2.5 -mx-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="h-9 w-9 shrink-0 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-gray-900">{title}</span>
                    <span className="block text-xs text-gray-500">{text}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gray-900 text-white p-5">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" /> Tips
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {TIPS.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="text-amber-400">•</span>
                  {tip}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-400">AI answers can be wrong. Check opening times and prices before you go.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AIAssistant;

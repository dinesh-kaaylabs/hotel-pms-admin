
import React, { useState } from 'react';
import { Sparkles, MessageSquare, Send, ThumbsUp, ThumbsDown, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_REVIEWS = [
  { id: 1, guest: 'Sarah M.', rating: 5, comment: 'The ocean view was absolutely breathtaking! Staff were incredibly helpful, especially when our flight was delayed. The spa services were top-notch.', status: 'Negative' },
  { id: 2, guest: 'James K.', rating: 3, comment: 'Room was clean but very noisy due to the construction nearby. Breakfast selection could be better for the price.', status: 'Negative' },
  { id: 3, guest: 'Linda P.', rating: 2, comment: 'Wait times at check-in were unacceptable. Over 45 minutes standing in the lobby. Not what I expect from a luxury property.', status: 'Negative' }
];

export const AIInsightsPage: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [insight, setInsight] = useState<string>('');

  const generateSmartResponse = async (review: string) => {
    setAnalyzing(true);
    setAiResponse('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a professional hotel manager. Draft a polite, empathetic, and professional response to the following guest review. Be concise but warm. Review: "${review}"`,
        config: {
          systemInstruction: 'You are the General Manager of LuxeStay, a luxury 5-star hotel.',
          temperature: 0.7
        }
      });
      
      setAiResponse(response.text || 'Unable to generate response.');
    } catch (error) {
      console.error(error);
      setAiResponse('Error communicating with AI assistant.');
    } finally {
      setAnalyzing(false);
    }
  };

  const getGlobalInsights = async () => {
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Based on these reviews, identify the top 3 operational improvements the hotel needs to make: ${JSON.stringify(MOCK_REVIEWS)}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 1000 } }
      });
      setInsight(response.text || '');
    } catch (e) {
      setInsight('Could not load insights.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            AI Concierge & Insights <Sparkles className="text-indigo-500" />
          </h1>
          <p className="text-slate-500 text-sm mt-1">Harness Gemini Pro to analyze guest sentiment and optimize operations</p>
        </div>
        <button 
          onClick={getGlobalInsights}
          disabled={analyzing}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
        >
          {analyzing ? 'Thinking...' : 'Generate Strategic Insights'} <BrainCircuit size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare size={20} className="text-indigo-500" /> Recent Guest Reviews
          </h3>
          {MOCK_REVIEWS.map((review) => (
            <div 
              key={review.id} 
              onClick={() => {
                setSelectedReview(review.id);
                generateSmartResponse(review.comment);
              }}
              className={cn(
                "p-5 bg-white border-2 rounded-2xl cursor-pointer transition-all hover:shadow-md",
                selectedReview === review.id ? "border-indigo-500 shadow-md" : "border-slate-200"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-slate-900">{review.guest}</span>
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? "opacity-100" : "opacity-30"}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 min-h-[400px] flex flex-col relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
          
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="text-indigo-400" /> AI Response Draft
          </h3>

          <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10">
            {analyzing ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
                />
                <p className="text-slate-400 text-sm animate-pulse">Analyzing sentiment and drafting reply...</p>
              </div>
            ) : aiResponse ? (
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="space-y-4"
                >
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 py-2 bg-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">Copy Draft</button>
                    <button className="px-4 py-2 border border-white/20 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors">Edit</button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <Sparkles size={40} className="text-slate-700 mb-4" />
                <p className="text-slate-400 text-sm">Select a review from the left to generate an AI-powered smart response.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {insight && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8"
        >
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <BrainCircuit size={24} /> Strategic AI Analysis
          </h3>
          <div className="prose prose-indigo max-w-none text-indigo-900/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h4 className="font-bold text-indigo-600 mb-2">Findings</h4>
                <p className="text-sm leading-relaxed">{insight}</p>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3">
                  <ThumbsUp className="text-emerald-600 shrink-0" size={20} />
                  <div>
                    <span className="font-bold text-emerald-800 text-sm">Guest Satisfaction Focus</span>
                    <p className="text-xs text-emerald-700 mt-0.5">Focus on maintaining the high-quality spa and view-related experiences mentioned.</p>
                  </div>
                </div>
                <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex gap-3">
                  <ThumbsDown className="text-rose-600 shrink-0" size={20} />
                  <div>
                    <span className="font-bold text-rose-800 text-sm">Critical Bottlenecks</span>
                    <p className="text-xs text-rose-700 mt-0.5">Check-in latency is currently the biggest risk factor to 5-star ranking.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(' ');
}

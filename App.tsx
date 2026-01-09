
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { evaluateEssay } from './services/geminiService';
import { EvaluationDisplay } from './components/EvaluationDisplay';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Matn tarkibi o'rganilmoqda...",
    "Imlo va punktuatsiya tekshirilmoqda...",
    "Uslubiy tahlil o'tkazilmoqda...",
    "Baholar shakllantirilmoqda...",
    "Yakuniy xulosa tayyorlanmoqda..."
  ];

  const handleEvaluate = async () => {
    if (!content.trim()) {
      setError('Iltimos, esse matnini kiriting.');
      return;
    }
    if (content.length < 100) {
      setError('Esse juda qisqa. Kamida 100 ta so\'z bo\'lishi tavsiya etiladi.');
      return;
    }

    setIsEvaluating(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    // Simulated step progression for UX
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 2500);

    try {
      const evaluation = await evaluateEssay(topic, content);
      setResult(evaluation);
    } catch (err: any) {
      setError(err.message || 'Kutilmagan xatolik yuz berdi.');
    } finally {
      clearInterval(interval);
      setIsEvaluating(false);
    }
  };

  const handleClear = () => {
    setTopic('');
    setContent('');
    setResult(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-edit text-indigo-600 mr-2"></i> Yangi Esse
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Esse Mavzusi (Ixtiyoriy)
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Masalan: Kitobxonlikning inson ma'naviyatidagi o'rni"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Esse Matni
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={15}
                  placeholder="Matnni shu yerga kiriting yoki nusxalab joylang..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-gray-800 font-sans leading-relaxed resize-none"
                ></textarea>
                <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
                   <span>So'zlar soni: {content.split(/\s+/).filter(x => x).length}</span>
                   <span>Kamida 150-200 so'z tavsiya etiladi</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i> {error}
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                  className={`flex-grow py-4 px-6 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 flex items-center justify-center ${
                    isEvaluating 
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                  }`}
                >
                  {isEvaluating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Tekshirilmoqda...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic mr-2"></i> Tahlil qilish
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-5">
          {!result && !isEvaluating && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <i className="fas fa-search-plus text-3xl text-gray-300"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Hali tahlil qilinmadi</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                Chap tarafdagi maydonga esse matnini kiriting va "Tahlil qilish" tugmasini bosing.
              </p>
              
              <div className="mt-8 w-full max-w-sm">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Baholash mezonlari</h4>
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 bg-white rounded-lg border border-gray-100">
                    <div className="text-indigo-600 font-bold mb-1">Mavzu</div>
                    <div className="text-xs text-gray-500">Maksimal 4 ball</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-100">
                    <div className="text-indigo-600 font-bold mb-1">Mantiq</div>
                    <div className="text-xs text-gray-500">Maksimal 3 ball</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-100">
                    <div className="text-indigo-600 font-bold mb-1">Imlo</div>
                    <div className="text-xs text-gray-500">Maksimal 3 ball</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-100">
                    <div className="text-indigo-600 font-bold mb-1">Punktuatsiya</div>
                    <div className="text-xs text-gray-500">Maksimal 2 ball</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isEvaluating && (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="relative mb-8">
                <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fas fa-microchip text-indigo-600 text-2xl animate-pulse"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ekspert ishlamoqda</h3>
              <p className="text-gray-500 text-center animate-pulse">{loadingMessages[loadingStep]}</p>
              
              <div className="mt-8 w-full bg-gray-100 rounded-full h-2 max-w-xs overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-500" 
                  style={{ width: `${(loadingStep + 1) * (100 / loadingMessages.length)}%` }}
                ></div>
              </div>
            </div>
          )}

          {result && <EvaluationDisplay markdown={result} />}
        </div>
      </div>
    </Layout>
  );
};

export default App;

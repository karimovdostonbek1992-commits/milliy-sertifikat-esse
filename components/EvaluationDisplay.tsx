
import React from 'react';

interface EvaluationDisplayProps {
  markdown: string;
}

export const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({ markdown }) => {
  // Simple parsing of markdown sections
  const sections = markdown.split('##').filter(s => s.trim() !== '');

  const renderSection = (title: string, content: string, index: number) => {
    // Basic formatting for the content
    const lines = content.trim().split('\n').filter(l => l.trim() !== '');
    
    return (
      <div key={index} className="mb-8 last:mb-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">
             {title.replace(/^#\s*/, '').trim()}
          </h3>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {lines.map((line, idx) => {
              // Highlight scores or errors
              if (line.includes('Ball:')) {
                return (
                   <li key={idx} className="flex justify-between items-center py-2 px-4 bg-indigo-50 rounded-lg">
                      <span className="text-gray-700 font-medium">{line.split(':')[0]}</span>
                      <span className="text-2xl font-black text-indigo-700">{line.split(':')[1].trim()}</span>
                   </li>
                );
              }
              if (line.startsWith('*')) {
                return (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-indigo-500 mt-1">•</span>
                    <span className="text-gray-600 leading-relaxed">{line.replace(/^\*\s*/, '')}</span>
                  </li>
                );
              }
              return <li key={idx} className="text-gray-600 leading-relaxed whitespace-pre-wrap">{line}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-6">
         <h2 className="text-2xl font-bold text-gray-900">Tahlil Natijalari</h2>
         <button 
           onClick={() => window.print()} 
           className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center"
         >
           <i className="fas fa-print mr-2"></i> PDF sifatida saqlash
         </button>
      </div>
      
      {sections.map((section, idx) => {
        const [title, ...rest] = section.split('\n');
        return renderSection(title, rest.join('\n'), idx);
      })}
    </div>
  );
};

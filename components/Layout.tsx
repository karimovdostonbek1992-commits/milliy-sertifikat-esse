
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-feather-alt text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Esse Eksperti</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Milliy Sertifikat Standarti</p>
            </div>
          </div>
          <nav className="hidden sm:flex space-x-4">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Qo'llanma</a>
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Mezonlar</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Milliy Esse Eksperti. Filologlar va abituriyentlar uchun maxsus.
          </p>
        </div>
      </footer>
    </div>
  );
};

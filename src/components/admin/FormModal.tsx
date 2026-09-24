'use client';

import { X } from 'lucide-react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function FormModal({ isOpen, onClose, title, children }: FormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-soga-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-soga-gold via-soga-gold-light to-soga-gold"></div>
          <div className="flex items-center justify-between p-6 border-b border-admin-muted/20 bg-gradient-to-b from-soga-sand/5 to-transparent">
            <h2 className="text-2xl font-bold text-soga-black font-display">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-admin-muted hover:text-soga-black hover:bg-soga-gold/10 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

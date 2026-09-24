import { X } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  fields: { key: string; label: string; type?: 'text' | 'boolean' | 'date' }[];
}

export default function DetailModal({ isOpen, onClose, title, data, fields }: DetailModalProps) {
  if (!isOpen) return null;

  const formatValue = (value: any, type?: string) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-soga-muted">-</span>;
    }

    if (type === 'boolean') {
      return value ? (
        <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-semibold">Oui</span>
      ) : (
        <span className="px-2 py-1 bg-soga-muted/10 text-soga-muted rounded-full text-xs font-semibold">Non</span>
      );
    }

    if (type === 'date') {
      return new Date(value).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    return String(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-soga-dark border border-soga-muted/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between p-6 border-b border-soga-muted/20">
          <h2 className="text-2xl font-bold text-soga-light">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-soga-muted hover:text-soga-light hover:bg-soga-muted/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key} className="flex flex-col sm:flex-row sm:items-start gap-2 py-3 border-b border-soga-muted/10 last:border-0">
                <span className="text-sm font-semibold text-soga-muted sm:w-1/3 shrink-0">
                  {field.label}
                </span>
                <span className="text-soga-light sm:w-2/3 break-words">
                  {formatValue(data[field.key], field.type)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useRef, useState, useEffect } from 'react';
import { analyzeConstructionPhoto } from '../geminiService';

interface CameraModalProps {
  onClose: () => void;
  onSave: (data: { photo: string, description: string }) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ onClose, onSave }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' }, 
          audio: false 
        });
        setStream(mediaStream);
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      } catch (err) {
        console.error("Erro ao acessar câmera:", err);
      }
    }
    startCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const takePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx?.drawImage(videoRef.current, 0, 0);
    
    const base64 = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
    setCapturedImage(canvasRef.current.toDataURL('image/jpeg'));
    
    setAnalyzing(true);
    const aiText = await analyzeConstructionPhoto(base64);
    setSuggestion(aiText || '');
    setAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <div className="p-4 flex justify-between items-center text-white">
        <button onClick={onClose} className="p-2"><span className="material-symbols-outlined">close</span></button>
        <span className="font-bold uppercase text-xs tracking-widest">Novo Registro de Obra</span>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-slate-900 flex items-center justify-center">
        {!capturedImage ? (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={capturedImage} className="w-full h-full object-cover" />
        )}
        
        {analyzing && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-sm">IA analisando progresso...</p>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="bg-white dark:bg-surface-dark p-6 rounded-t-3xl shadow-2xl">
        {!capturedImage ? (
          <div className="flex justify-center pb-8">
            <button 
              onClick={takePhoto}
              className="w-20 h-20 rounded-full border-8 border-slate-100 dark:border-slate-800 bg-primary flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-4xl">photo_camera</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Sugestão da IA</label>
              <textarea 
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="w-full mt-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm p-3 focus:ring-primary"
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setCapturedImage(null)}
                className="flex-1 py-4 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-500"
              >
                Recomeçar
              </button>
              <button 
                onClick={() => onSave({ photo: capturedImage, description: suggestion })}
                className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20"
              >
                Salvar Registro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import CircularDiseaseWheel from '@/components/CircularDiseaseWheel';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark radial gradient from right */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(6,53,51,1)0%,rgba(4,36,36,0)70%)] opacity-50"></div>

        {/* Subtle noise texture overlay if desired, or just keep clean */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen w-full max-w-md mx-auto overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-8 pb-2 z-20">
          <div className="flex items-center gap-2 mb-1">
            <ArrowLeft className="w-6 h-6 text-white cursor-pointer" />
            <h1 className="text-xl text-white font-lato font-semibold">
              Lifestyle Disease Risk Analysis
            </h1>
          </div>
          <p className="text-gray-400 text-xs ml-8">
            Tap the disease to know more
          </p>
        </div>

        {/* Circular Disease Wheel */}
        <div className="flex-1 relative w-full">
          <CircularDiseaseWheel />
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}

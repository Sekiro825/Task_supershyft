import { useParams, useNavigate } from 'react-router-dom';
import { diseases, getRiskColor, getRiskLabel } from '@/lib/diseaseData';
import { ArrowLeft, Info, Moon, Brain, PenTool, Activity, Droplet, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

export default function DiseaseDetail() {
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  const disease = diseases.find(d => d.id === diseaseId);

  const scoreCount = useMotionValue(0);
  const rounded = useTransform(scoreCount, latest => Math.round(latest));

  const lifestyleBarWidth = useMotionValue(0);

  useEffect(() => {
    if (disease) {
      const scoreAnimation = animate(scoreCount, disease.score, {
        duration: 2,
        ease: 'easeOut'
      });

      const lifestylePositions = {
        'LOW': 20,
        'MODERATE': 40,
        'INCREASED': 60,
        'HIGH': 80,
        'VERY HIGH': 100
      };

      const targetWidth = lifestylePositions[disease.lifestyleContribution];
      const barAnimation = animate(lifestyleBarWidth, targetWidth, {
        duration: 2,
        ease: 'easeOut'
      });

      return () => {
        scoreAnimation.stop();
        barAnimation.stop();
      };
    }
  }, [disease]);

  if (!disease) {
    return <div className="min-h-screen bg-[#042424] flex items-center justify-center text-white">Disease not found</div>;
  }

  // Helper to render the dotted line score visualization
  const renderScoreGraph = () => {
    const totalDots = 40;
    const dots = [];

    for (let i = 0; i < totalDots; i++) {
      let color = '#4ade80'; // Healthy (Green)
      if (i >= 10) color = '#facc15'; // Increased (Yellow)
      if (i >= 20) color = '#fb923c'; // High (Orange)
      if (i >= 30) color = '#f87171'; // Very High (Red)

      dots.push(
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      );
    }

    return (
      <div className="relative w-full mt-8 mb-12">
        {/* Labels Row */}
        <div className="flex justify-between text-[9px] text-gray-400 mb-2 px-1">
          <div className="flex flex-col items-start">
            <span>0-25</span>
            <span>Healthy</span>
          </div>
          <div className="flex flex-col items-start">
            <span>26-50</span>
            <span>Increased Risk</span>
          </div>
          <div className="flex flex-col items-start">
            <span>51-75</span>
            <span>High Risk</span>
          </div>
          <div className="flex flex-col items-start">
            <span>76-100</span>
            <span>Very High Risk</span>
          </div>
        </div>

        {/* Dotted Line Container */}
        <div className="relative flex justify-between items-center h-4">
          {/* Vertical Separators */}
          <div className="absolute left-[25%] top-[-10px] bottom-[-10px] w-px border-l border-dashed border-gray-600/50"></div>
          <div className="absolute left-[50%] top-[-10px] bottom-[-10px] w-px border-l border-dashed border-gray-600/50"></div>
          <div className="absolute left-[75%] top-[-10px] bottom-[-10px] w-px border-l border-dashed border-gray-600/50"></div>

          {/* Dots */}
          {dots}
        </div>

        {/* Score Indicator */}
        <div
          className="absolute top-8 transform -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${(disease.score / 100) * 100}%` }}
        >
          <div className="text-red-500 mb-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </div>
          <div className="text-white font-bold text-lg leading-none">{disease.score}</div>
          <div className="text-[10px] text-red-400 font-medium whitespace-nowrap">{getRiskLabel(disease.score)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden font-sans pb-24">
      {/* Background Gradients/Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] bg-[#0f3d39] rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[500px] h-[500px] bg-[#0f3d39] rounded-full blur-[100px] opacity-40"></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-[#1a5f56] rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 pt-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/home')} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl text-white font-lato font-normal">{disease.name}</h1>
        </div>

        <p className="text-gray-400 text-xs leading-relaxed mb-8">
          {disease.description}
        </p>

        {/* Score Graph */}
        {renderScoreGraph()}

        {/* Lifestyle Contribution */}
        <div className="mb-8 mt-20">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-white text-base font-medium">Lifestyle Contribution</h2>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <span className="text-gray-400 text-xs underline decoration-dotted underline-offset-4">
              {disease.lifestyleContribution}
            </span>
          </div>

          <div className="relative h-2 bg-gray-800 rounded-full mb-6">
            <motion.div
              className="absolute h-full rounded-full"
              style={{
                width: useTransform(lifestyleBarWidth, (v) => `${v}%`),
                background: 'linear-gradient(to right, #4ade80, #facc15, #fb923c, #f87171)'
              }}
            />
            {/* Checkmark Indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md z-10"
              style={{ left: useTransform(lifestyleBarWidth, (v) => `${v}%`) }}
            >
              <div className="w-3 h-3 text-[#041C1C]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </motion.div>

            {/* Labels */}
            <div className="absolute top-4 w-full flex justify-between text-[9px] text-gray-500 font-medium uppercase tracking-wider">
              <span>Low</span>
              <span>Moderate</span>
              <span>Increased</span>
              <span>High</span>
              <span>Very High</span>
            </div>
          </div>
        </div>

        {/* Health Rank */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-white text-base font-medium">Your Health Rank v/s Others</h2>
              <Info className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <span className="text-gray-400 text-xs underline decoration-dotted underline-offset-4">
              {disease.healthRank}th
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[#EE8B48]">{disease.healthRank}</span>
            <span className="text-xl text-gray-400">/100</span>
          </div>
        </div>

        {/* Side Navigation Arrow (Visual only as per design) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-white/5 rounded-l-full flex items-center justify-center backdrop-blur-sm border-l border-white/10">
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* Causes */}
        <div className="mb-8">
          <h2 className="text-white text-base font-medium mb-3">Causes</h2>
          <div className="flex flex-wrap gap-2">
            {disease.causes.map((cause, i) => (
              <div key={i} className="px-3 py-1.5 rounded-full border border-[#2d7f71] bg-[#0f3d39]/30 text-[#4ade80] text-xs font-medium">
                {cause}
              </div>
            ))}
          </div>
        </div>

        {/* Effects */}
        <div className="mb-8">
          <h2 className="text-white text-base font-medium mb-3">Effects</h2>
          <div className="space-y-3">
            {disease.effects.map((effect, i) => (
              <div key={i} className="flex items-center gap-3">
                {i === 0 && <Activity className="w-5 h-5 text-gray-400" />}
                {i === 1 && <Droplet className="w-5 h-5 text-gray-400" />}
                {i === 2 && <Activity className="w-5 h-5 text-gray-400" />} {/* Fallback for Liver */}
                <span className="text-gray-300 text-sm">{effect}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="mb-8">
          <h2 className="text-white text-base font-medium mb-3">Actionable Insights</h2>
          <div className="flex flex-wrap gap-2">
            {disease.insights.map((insight, i) => (
              <div key={i} className="px-3 py-1.5 rounded-full border border-gray-700 bg-gray-800/30 text-gray-300 text-xs">
                {insight}
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

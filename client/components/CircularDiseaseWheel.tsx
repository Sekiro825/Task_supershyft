import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, useAnimationFrame, useSpring } from 'framer-motion';
import { diseases, getRiskColor } from '@/lib/diseaseData';
import { useNavigate } from 'react-router-dom';

// Sub-component for individual disease icons to isolate transforms
const DiseaseIcon = ({
  disease,
  index,
  count,
  rotation,
  radius,
  centerX,
  centerY,
  onNavigate
}: {
  disease: any,
  index: number,
  count: number,
  rotation: any,
  radius: number,
  centerX: number,
  centerY: number,
  onNavigate: (id: string) => void
}) => {
  // Calculate position and styles based on rotation value
  const x = useTransform(rotation, (r: number) => {
    const angleStep = 360 / count;
    const angle = angleStep * index + r;
    const rad = (angle * Math.PI) / 180;
    // Map to container coordinates (center at 300,300)
    // We subtract 40 to center the 80px element
    return (300 + (centerX - 300) + Math.cos(rad) * radius) - 40;
  });

  const y = useTransform(rotation, (r: number) => {
    const angleStep = 360 / count;
    const angle = angleStep * index + r;
    const rad = (angle * Math.PI) / 180;
    return (300 + (centerY - 300) + Math.sin(rad) * radius) - 40;
  });

  const opacity = useTransform(rotation, (r: number) => {
    const angleStep = 360 / count;
    const angle = angleStep * index + r;
    const normalizedAngle = ((angle % 360) + 360) % 360;

    // Visible arc: Left side (approx 100 to 260 degrees)
    const isVisible = normalizedAngle >= 100 && normalizedAngle <= 260;

    if (!isVisible) return 0;

    // Fade out at edges (center of visible arc is 180)
    const distFromCenter = Math.abs(180 - normalizedAngle);
    return Math.max(0, 1 - (distFromCenter / 80));
  });

  const scale = useTransform(rotation, (r: number) => {
    const angleStep = 360 / count;
    const angle = angleStep * index + r;
    const normalizedAngle = ((angle % 360) + 360) % 360;
    const isVisible = normalizedAngle >= 100 && normalizedAngle <= 260;
    return isVisible ? 1 : 0.5;
  });

  const pointerEvents = useTransform(opacity, (op: number) => op > 0.1 ? 'auto' : 'none');

  return (
    <motion.div
      className="absolute"
      style={{ x, y, opacity, scale, pointerEvents }}
    >
      <motion.button
        onClick={() => onNavigate(disease.id)}
        className="flex flex-col items-center gap-2 w-20 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border border-white/10 backdrop-blur-sm transition-colors group-hover:border-white/30"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          {disease.icon}
        </div>
        <div className="text-center">
          <div className="text-gray-200 text-[11px] font-medium whitespace-nowrap max-w-24 truncate drop-shadow-md">
            {disease.name}
          </div>
          <div className="flex items-center justify-center gap-1">
            <span
              className="font-bold text-[13px]"
              style={{ color: getRiskColor(disease.score) }}
            >
              {disease.score}
            </span>
            <span className="text-gray-500 text-[10px]">/100</span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default function CircularDiseaseWheel() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth physics
  const rotation = useMotionValue(0);
  const velocity = useMotionValue(0.05); // Initial auto-rotation speed
  const isDragging = useRef(false);

  // Configuration
  const radius = 190;
  const centerX = 300;
  const centerY = 300;

  // Animation loop for physics and auto-rotation
  useAnimationFrame((time, delta) => {
    if (!isDragging.current) {
      // Apply velocity
      const currentRotation = rotation.get();
      const currentVelocity = velocity.get();

      rotation.set(currentRotation + currentVelocity * (delta / 16));

      // Friction/Auto-rotation logic
      if (Math.abs(currentVelocity) > 0.05) {
        // Apply friction if spinning fast
        velocity.set(currentVelocity * 0.95);
      } else {
        // Maintain slow auto-rotation
        // Smoothly interpolate back to 0.05 if it dropped below
        if (currentVelocity !== 0.05) {
          velocity.set(0.05);
        }
      }
    }
  });

  const handlePan = (event: PointerEvent, info: PanInfo) => {
    // Use Y axis delta for rotation
    const delta = info.delta.y;
    const rotationDelta = delta * 0.2; // Standard sensitivity for right-side wheel
    rotation.set(rotation.get() + rotationDelta);

    // Update velocity for momentum on release
    velocity.set(info.velocity.y * 0.01);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible" ref={containerRef}>
      {/* Main Container for the Wheel - Shifted Right */}
      <div className="absolute right-[-140px] md:right-[-120px] top-[42%] -translate-y-1/2 w-[600px] h-[600px] scale-[0.7] md:scale-100 origin-right transition-transform duration-300">

        {/* Background Ripples */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
          <defs>
            <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#0a4b50" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#063533" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Concentric Circles (Ripples) */}
          {[1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx="300"
              cy="300"
              r={120 + i * 60}
              fill="none"
              stroke="#2d7f71"
              strokeWidth="1"
              strokeOpacity={0.15 - i * 0.03}
            />
          ))}
        </svg>

        {/* Center Score Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full flex items-center justify-center z-20 pointer-events-none">
          {/* Inner dark circle */}
          <div className="absolute inset-2 rounded-full bg-[#042424] shadow-2xl z-10"></div>
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2d7f71] to-transparent opacity-30"></div>
          {/* Score Content */}
          <div className="relative z-20 text-center flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-[#CC203B] drop-shadow-lg font-lato">14</div>
            <div className="text-gray-400 text-sm font-medium">/100</div>
          </div>
        </div>

        {/* Curved Text - Rotated for Left Side */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full" viewBox="0 0 600 600">
            <path
              id="textPath"
              d="M 300,440 A 140,140 0 0,1 300,160"
              fill="none"
            />
            <text className="text-[13px] fill-gray-300" style={{ fontFamily: 'Lato' }}>
              <textPath href="#textPath" startOffset="50%" textAnchor="middle">
                Your Metabolic Risk Score
              </textPath>
            </text>
          </svg>
        </div>

        {/* Draggable Area Overlay */}
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-30"
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0}
          onPan={handlePan}
          onPanStart={() => { isDragging.current = true; }}
          onPanEnd={() => { isDragging.current = false; }}
          style={{ touchAction: 'none' }}
        />

        {/* Icons Layer - Rendered independently */}
        <div className="absolute inset-0 pointer-events-none z-40">
          {diseases.map((disease, index) => (
            <DiseaseIcon
              key={disease.id}
              disease={disease}
              index={index}
              count={diseases.length}
              rotation={rotation}
              radius={radius}
              centerX={centerX}
              centerY={centerY}
              onNavigate={(id) => navigate(`/disease/${id}`)}
            />
          ))}
        </div>

      </div>

      {/* Legend */}
      <div className="absolute bottom-24 left-0 right-0 flex justify-between px-6 text-[11px] pointer-events-none z-40">
        <div className="flex flex-col items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-healthy shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
          <div className="text-gray-400 text-center leading-tight">
            <div className="font-medium text-gray-300">Healthy</div>
            <div>(0-25)</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-increased shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
          <div className="text-gray-400 text-center leading-tight">
            <div className="font-medium text-gray-300">Increased</div>
            <div>(26-50)</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-high shadow-[0_0_8px_rgba(251,146,60,0.5)]"></div>
          <div className="text-gray-400 text-center leading-tight">
            <div className="font-medium text-gray-300">High Risk</div>
            <div>(51-75)</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-very-high shadow-[0_0_8px_rgba(248,113,113,0.5)]"></div>
          <div className="text-gray-400 text-center leading-tight">
            <div className="font-medium text-gray-300">Very High</div>
            <div>(76-100)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

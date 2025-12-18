import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden font-sans p-6">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-[#0f3d39] rounded-full blur-[120px] opacity-30"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-[#1a5f56] rounded-full blur-[120px] opacity-30"></div>
            </div>

            <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8">
                {/* Name Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#4ade80] text-xs font-medium mb-4 backdrop-blur-sm">
                        <Sparkles className="w-3 h-3" />
                        <span>Welcome</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tight mb-2">
                        Saket
                    </h1>
                    <p className="text-gray-400 text-sm tracking-widest uppercase">
                        Frontend Developer
                    </p>
                </motion.div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4ade80] to-[#0f3d39] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            S
                        </div>
                        <div>
                            <h2 className="text-white font-medium text-lg">About Me</h2>
                            <p className="text-gray-400 text-xs">Creative Technologist</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Passionate about building immersive and high-performance web interfaces.
                        I specialize in React, Tailwind CSS, and creating fluid user experiences
                        that combine aesthetics with functionality.
                    </p>
                </motion.div>

                {/* Action Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/home')}
                    className="group w-full py-4 bg-gradient-to-r from-[#4ade80] to-[#2d7f71] rounded-xl text-[#041C1C] font-bold text-lg shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all flex items-center justify-center gap-2"
                >
                    Let's move on to the task
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>
        </div>
    );
}

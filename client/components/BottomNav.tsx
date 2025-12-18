import { Home, Watch, Users, LayoutGrid } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const isHome = location.pathname === '/home';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#041C1C]/90 backdrop-blur-md border-t border-white/5 z-50 pb-4 pt-2">
      <div className="max-w-md mx-auto px-6">
        <div className="flex justify-between items-end">
          <Link
            to="/"
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isHome ? 'bg-white text-[#041C1C]' : 'text-gray-400'
              }`}>
              <Home className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-medium ${isHome ? 'text-white' : 'text-gray-500'}`}>Home</span>
          </Link>

          <div className="flex flex-col items-center gap-1 text-gray-500">
            <Watch className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Super Sync</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-gray-500">
            <Users className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Super Club</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-gray-500">
            <LayoutGrid className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-medium">Packages</span>
          </div>
        </div>
      </div>
    </div>
  );
}

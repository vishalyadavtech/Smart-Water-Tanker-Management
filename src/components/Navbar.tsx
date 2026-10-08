import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Droplets, Bell, User, LogOut, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';

const Navbar: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { notifications } = useAppContext();
  const unreadCount = notifications.filter(n => !n.read).length;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-4">
            {onMenuClick && (
              <button onClick={onMenuClick} className="lg:hidden p-3 text-slate-500 hover:bg-slate-100 rounded-2xl transition-all">
                <Menu size={24} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="bg-primary p-2 rounded-2xl shadow-lg shadow-primary/20"
              >
                <Droplets className="text-white" size={28} />
              </motion.div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter font-display">AquaRoute</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/notifications" className="relative p-3 text-slate-500 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-lg shadow-red-500/20">
                  {unreadCount}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-black text-slate-900 tracking-tight">{user?.name}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{user?.role}</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                title="Logout"
              >
                <LogOut size={22} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Droplets, Mail, ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>('user');
  const [error, setError] = useState('');
  const { loginWithGoogle, sendEmailOtp, verifyEmailOtp, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle(role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google Login failed. Please try again.');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (email.includes('@')) {
      try {
        await sendEmailOtp(email, role);
        setStep(2);
      } catch (err: any) {
        setError(err.message || 'Failed to send OTP. Please try again.');
        console.error(err);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await verifyEmailOtp(email, otp, role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-950">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <img 
          src="https://images.unsplash.com/photo-1527067829737-40299c5895bd?auto=format&fit=crop&q=80&w=2000" 
          alt="Water background" 
          className="w-full h-full object-cover opacity-20 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 backdrop-blur-[4px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/5 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden relative z-10"
      >
        {/* Left Side - Visual/Info */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border-r border-white/10">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-16 group">
              <div className="bg-white p-2 rounded-xl shadow-xl group-hover:scale-110 transition-transform">
                <Droplets className="text-blue-600" size={24} />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">AquaRoute</span>
            </Link>
            
            <h2 className="text-5xl font-black text-white tracking-tight leading-tight mb-8 font-display">
              The Future of <br />
              <span className="text-blue-400">Water Logistics.</span>
            </h2>
            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-sm">
              Access the most reliable water supply network with real-time tracking and verified vendors.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-white font-black text-sm">Enterprise Security</p>
                <p className="text-white/40 text-xs font-medium">End-to-end encrypted transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
                <ArrowRight size={24} />
              </div>
              <div>
                <p className="text-white font-black text-sm">Instant Matching</p>
                <p className="text-white/40 text-xs font-medium">AI-driven fleet orchestration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-6 sm:p-16 bg-white/5">
          <div className="lg:hidden flex items-center justify-between mb-8 md:mb-12">
            <Link to="/" className="flex items-center gap-2">
              <Droplets className="text-blue-500" size={24} />
              <span className="text-xl font-black text-white tracking-tighter">AquaRoute</span>
            </Link>
          </div>

          <div className="mb-8 md:mb-10">
            <p className="text-white/40 text-sm font-medium">Select your role to continue</p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl mb-8 md:mb-10 border border-white/5">
            {(['user', 'vendor', 'admin'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-3 text-[10px] md:text-[11px] font-black rounded-xl transition-all capitalize tracking-wider ${
                  role === r ? 'bg-white text-slate-900 shadow-xl' : 'text-white/40 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-xs font-bold flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4 mb-10">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-4 bg-white hover:bg-slate-50 text-slate-900 font-black py-4 rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>
            
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-6 text-white/20 text-[10px] uppercase font-black tracking-[0.2em]">Or with Email</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-white/40 uppercase tracking-widest mb-3 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-400 transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-white placeholder:text-white/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!email.includes('@') || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4.5 rounded-2xl shadow-2xl shadow-blue-600/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3 group active:scale-[0.98]"
              >
                {isLoading ? 'Sending...' : 'Send OTP to Email'}
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3 ml-1">
                  <label className="block text-xs font-black text-white/40 uppercase tracking-widest">Enter 6-Digit OTP</label>
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-blue-400 text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1"
                  >
                    <ChevronLeft size={12} /> Change Email
                  </button>
                </div>
                <div className="relative">
                  <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  <input
                    type="text"
                    placeholder="••••••"
                    className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none tracking-[1em] text-center font-black text-xl text-white placeholder:text-white/20"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={otp.length !== 6 || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4.5 rounded-2xl shadow-2xl shadow-blue-600/20 transition-all disabled:opacity-50 disabled:shadow-none active:scale-[0.98]"
              >
                {isLoading ? 'Verifying...' : 'Login to AquaRoute'}
              </button>
            </form>
          )}

          <p className="text-center text-white/20 text-[10px] mt-10 font-bold uppercase tracking-wider">
            Secure access powered by <span className="text-white/60">AquaRoute Cloud</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Camera, 
  Edit2, 
  Check, 
  X,
  CreditCard,
  Bell,
  Lock,
  LogOut,
  ChevronRight,
  Droplets
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+91 98765 43210',
    address: '123, Mira Road (East), Mumbai, Maharashtra',
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you'd call an API here
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Account Settings</h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">Manage your profile and preferences</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-all"
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-1 space-y-8"
        >
          <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-primary to-blue-600 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            </div>
            <div className="px-8 pb-8 -mt-16 relative">
              <div className="relative inline-block group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-2xl">
                  <div className="w-full h-full rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 bg-slate-900 text-white p-2.5 rounded-xl shadow-xl hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user?.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                    {user?.role} Account
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                    <Shield size={10} />
                    Verified
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                  <div className="bg-white p-2 rounded-xl text-slate-400 shadow-sm">
                    <Mail size={16} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-sm font-bold text-slate-700 truncate">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                  <div className="bg-white p-2 rounded-xl text-slate-400 shadow-sm">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                    <p className="text-sm font-bold text-slate-700">{formData.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/40 transition-all" />
            <Droplets className="text-primary mb-6" size={32} />
            <h3 className="text-xl font-black tracking-tight mb-2">AquaFlow Rewards</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">You've saved 1,200 liters of water through efficient booking.</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Points</p>
                <p className="text-2xl font-black tracking-tighter">2,450 XP</p>
              </div>
              <button className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Settings Tabs */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <User className="text-primary" size={24} />
                Personal Information
              </h3>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/5 px-4 py-2 rounded-xl transition-all"
                >
                  <Edit2 size={14} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <button 
                    onClick={handleSave}
                    className="bg-primary text-white p-2 rounded-xl shadow-lg shadow-primary/20 hover:scale-110 transition-transform"
                  >
                    <Check size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-60 transition-all"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-60 transition-all"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-60 transition-all"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-60 transition-all"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
                <CreditCard className="text-indigo-500" size={20} />
                Payment Methods
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-xl shadow-sm">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="w-8" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-700">•••• 4242</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                  + Add New Card
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
                <Bell className="text-amber-500" size={20} />
                Notifications
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Booking Updates', enabled: true },
                  { label: 'Promotional Offers', enabled: false },
                  { label: 'System Alerts', enabled: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    <button className={`w-12 h-6 rounded-full relative transition-colors ${item.enabled ? 'bg-primary' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.enabled ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm"
          >
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6 flex items-center gap-3">
              <Lock className="text-rose-500" size={20} />
              Security & Privacy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-rose-100 transition-all group">
                <span className="text-sm font-bold text-slate-700">Change Password</span>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-all" />
              </button>
              <button className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-rose-100 transition-all group">
                <span className="text-sm font-bold text-slate-700">Two-Factor Auth</span>
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Disabled</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

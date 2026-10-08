import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Navigation, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  DollarSign,
  User,
  Calendar,
  Settings,
  AlertTriangle,
  ChevronRight,
  Bell,
  Search,
  Activity,
  Droplets,
  PartyPopper
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import MapComponent from '../../components/MapComponent';

const VendorDashboard: React.FC = () => {
  const { bookings, tankers, updateBookingStatus, updateTanker, updateTankerLocation, addNotification } = useAppContext();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'jobs' | 'fleet' | 'income'>('jobs');
  
  const activeJobs = bookings.filter(b => b.vendorId === user?.id && b.status !== 'delivered' && b.status !== 'cancelled');
  const newRequests = bookings.filter(b => !b.vendorId && b.status === 'pending');
  const completedJobs = bookings.filter(b => b.vendorId === user?.id && b.status === 'delivered');
  const totalEarnings = completedJobs.reduce((acc, b) => acc + b.price, 0);

  const vendorTankers = tankers; // In a real app, filter by vendorId

  // Simulate movement for active trips
  useEffect(() => {
    const activeTrip = activeJobs.find(j => j.status === 'on_the_way');
    if (!activeTrip || !vendorTankers[0]) return;

    const tanker = vendorTankers[0];
    const targetLat = activeTrip.latitude;
    const targetLon = activeTrip.longitude;

    const interval = setInterval(() => {
      const step = 0.0005; // Small step for simulation
      let nextLat = tanker.currentLat;
      let nextLon = tanker.currentLon;

      if (Math.abs(nextLat - targetLat) > step) {
        nextLat += nextLat < targetLat ? step : -step;
      }
      if (Math.abs(nextLon - targetLon) > step) {
        nextLon += nextLon < targetLon ? step : -step;
      }

      if (Math.abs(nextLat - targetLat) <= step && Math.abs(nextLon - targetLon) <= step) {
        clearInterval(interval);
      } else {
        updateTankerLocation(tanker.id, nextLat, nextLon);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeJobs, vendorTankers, updateTankerLocation]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-amber-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Vendor Profile Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white shadow-2xl shadow-amber-500/30 relative z-10">
                <User size={32} className="sm:w-12 sm:h-12" />
              </div>
            </motion.div>
            <div>
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-2 font-display"
              >
                {user?.name}
              </motion.h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-amber-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-amber-500/20">Verified Vendor</span>
                <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                  <Truck size={16} className="text-amber-500" />
                  AquaRoute Logistics
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 rounded-[2rem] border border-white shadow-2xl shadow-slate-200/50">
              <Activity size={16} className="text-amber-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-700 tracking-widest uppercase">System Online</span>
            </div>
            <div className="flex gap-2">
              <button className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-amber-500 hover:border-amber-100 transition-all shadow-xl shadow-slate-200/40">
                <Bell size={20} />
              </button>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black shadow-2xl shadow-slate-900/20 transition-all flex items-center justify-center gap-3 text-[10px] sm:text-xs uppercase tracking-widest"
              >
                <Settings size={20} />
                <span className="hidden sm:inline">Fleet Settings</span>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { label: "Active Jobs", value: activeJobs.length, icon: Navigation, color: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-500/30' },
            { label: 'Total Revenue', value: `₹${totalEarnings}`, icon: DollarSign, color: 'from-amber-500 to-amber-400', shadow: 'shadow-amber-500/30' },
            { label: 'Fleet Status', value: `${vendorTankers.filter(t => t.status === 'available').length}/${vendorTankers.length} Ready`, icon: Truck, color: 'from-slate-900 to-slate-700', shadow: 'shadow-slate-900/30' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -mr-10 -mt-10 transition-transform group-hover:scale-110" />
              <div className="flex items-center gap-6 relative z-10">
                <div className={`bg-gradient-to-br ${stat.color} w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-white shadow-2xl ${stat.shadow} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <stat.icon size={28} className="sm:w-8 sm:h-8" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            <section className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
              <div className="p-10 border-b border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/30">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4 font-display">
                  <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-xl shadow-amber-500/20">
                    <Navigation size={24} />
                  </div>
                  Fleet Operations
                </h2>
                <div className="flex gap-3 bg-white/80 backdrop-blur-xl p-2 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20">
                  {(['jobs', 'fleet', 'income'] as const).map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-10">
                <AnimatePresence mode="wait">
                  {activeTab === 'jobs' ? (
                    <motion.div 
                      key="jobs"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-10"
                    >
                      {/* Map Section */}
                      <div className="h-[450px] rounded-[3.5rem] overflow-hidden border border-slate-100 relative shadow-2xl shadow-slate-900/5 group">
                        <MapComponent 
                          center={[19.2813, 72.8557]}
                          zoom={13}
                          tankers={vendorTankers.map(t => ({ 
                            id: t.id, 
                            location: [t.currentLat, t.currentLon], 
                            info: t.numberPlate,
                            status: t.status,
                            driver: t.driverName,
                            plate: t.numberPlate
                          }))}
                        />
                        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-white/50 z-[1000] max-w-sm transition-transform group-hover:translate-y-[-5px]">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Dispatch</p>
                          </div>
                          <p className="text-base font-black text-slate-900 leading-tight">Tanker #4291 heading to Shanti Nagar for 5000L delivery</p>
                        </div>
                      </div>

                      {/* New Requests Section */}
                      {newRequests.length > 0 && (
                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-4">New Booking Requests</h3>
                          {newRequests.map((job) => (
                            <motion.div 
                              whileHover={{ x: 10 }}
                              key={job.id} 
                              className="p-8 rounded-[3rem] border-2 border-blue-100 bg-blue-50/20 flex flex-col sm:flex-row justify-between items-center gap-8 group"
                            >
                              <div className="flex gap-8 w-full sm:w-auto">
                                <div className="bg-blue-600 w-20 h-20 rounded-[2rem] shadow-2xl shadow-blue-500/30 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                  <Droplets className="text-white" size={36} />
                                </div>
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black text-blue-600 bg-blue-100 px-4 py-1.5 rounded-full uppercase tracking-widest">#{job.id.slice(-6)}</span>
                                    {job.isEmergency && <span className="text-[10px] font-black text-red-600 bg-red-100 px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">Urgent</span>}
                                  </div>
                                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{job.quantityLiters}L Required</h3>
                                  <p className="text-sm text-slate-500 font-bold flex items-center gap-2 mt-1">
                                    <MapPin size={16} className="text-slate-400" />
                                    {job.address}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="text-right mr-4 hidden sm:block">
                                  <p className="text-2xl font-black text-slate-900 tracking-tight">₹{job.price}</p>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Payout</p>
                                </div>
                                <motion.button 
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={async () => {
                                    const availableTanker = vendorTankers.find(t => t.status === 'available');
                                    if (!availableTanker) {
                                      toast.error('No tankers available to accept this job.');
                                      return;
                                    }
                                    
                                    try {
                                      await updateBookingStatus(job.id, { 
                                        status: 'assigned', 
                                        vendorId: user?.id,
                                        tankerId: availableTanker.id 
                                      });
                                      await updateTanker(availableTanker.id, { status: 'busy' });
                                      
                                      // Notify User
                                      await addNotification({
                                        userId: job.userId,
                                        title: 'Booking Accepted!',
                                        message: `A vendor has accepted your booking #${job.id.slice(-6)}. Tanker ${availableTanker.registrationNumber} is being dispatched.`,
                                        type: 'success'
                                      });

                                      // Visual Feedback
                                      confetti({
                                        particleCount: 150,
                                        spread: 70,
                                        origin: { y: 0.6 },
                                        colors: ['#2563eb', '#3b82f6', '#60a5fa']
                                      });

                                      toast.success('Job Accepted Successfully!', {
                                        description: `Tanker ${availableTanker.registrationNumber} has been assigned to this job.`,
                                        icon: <PartyPopper className="text-blue-600" size={20} />
                                      });
                                    } catch (error) {
                                      toast.error('Failed to accept job. Please try again.');
                                    }
                                  }}
                                  className="flex-1 sm:flex-none bg-blue-600 text-white px-12 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30"
                                >
                                  Accept Job
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Active Jobs List */}
                      <div className="space-y-6">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-4">Active Dispatches</h3>
                        {activeJobs.length > 0 ? activeJobs.map((job) => (
                          <motion.div 
                            whileHover={{ x: 10 }}
                            key={job.id} 
                            className="p-8 rounded-[3rem] border border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-8 group"
                          >
                            <div className="flex gap-8 w-full sm:w-auto">
                              <div className="bg-white w-20 h-20 rounded-[2rem] shadow-2xl shadow-slate-200/50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                                <Truck className="text-amber-500" size={36} />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-4 py-1.5 rounded-full uppercase tracking-widest">#{job.id.slice(-6)}</span>
                                  {job.isEmergency && <span className="text-[10px] font-black text-red-600 bg-red-100 px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">Urgent</span>}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Residential Supply</h3>
                                <p className="text-sm text-slate-500 font-bold flex items-center gap-2 mt-1">
                                  <MapPin size={16} className="text-slate-400" />
                                  Mira Road (E), Sector 1
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              {job.status === 'assigned' && (
                                <motion.button 
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={async () => {
                                    try {
                                      await updateBookingStatus(job.id, { status: 'on_the_way' });
                                      await addNotification({
                                        userId: job.userId,
                                        title: 'Tanker Dispatched!',
                                        message: `Your tanker for booking #${job.id.slice(-6)} is on the way!`,
                                        type: 'info'
                                      });
                                      toast.info('Trip Started', {
                                        description: 'The user has been notified that the tanker is on the way.'
                                      });
                                    } catch (error) {
                                      toast.error('Failed to start trip.');
                                    }
                                  }}
                                  className="flex-1 sm:flex-none bg-amber-500 text-white px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber-500/30"
                                >
                                  Start Trip
                                </motion.button>
                              )}
                              {job.status === 'on_the_way' && (
                                <motion.button 
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={async () => {
                                    try {
                                      await updateBookingStatus(job.id, { status: 'delivered' });
                                      if (job.tankerId) {
                                        await updateTanker(job.tankerId, { status: 'available' });
                                      }
                                      await addNotification({
                                        userId: job.userId,
                                        title: 'Water Delivered!',
                                        message: `Your water delivery for booking #${job.id.slice(-6)} is complete. Thank you for using our service!`,
                                        type: 'success'
                                      });
                                      toast.success('Job Completed', {
                                        description: 'Payment has been processed and tanker is now available.'
                                      });
                                    } catch (error) {
                                      toast.error('Failed to complete job.');
                                    }
                                  }}
                                  className="flex-1 sm:flex-none bg-emerald-500 text-white px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30"
                                >
                                  Delivered
                                </motion.button>
                              )}
                              <motion.button 
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                className="w-16 h-16 bg-white border border-slate-100 text-slate-400 rounded-[1.5rem] hover:text-amber-500 hover:border-amber-100 transition-all flex items-center justify-center shadow-xl shadow-slate-200/40"
                              >
                                <Phone size={28} />
                              </motion.button>
                            </div>
                          </motion.div>
                        )) : (
                          <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                            <p className="text-xl font-black text-slate-400 uppercase tracking-widest">No active dispatches</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : activeTab === 'fleet' ? (
                    <motion.div 
                      key="fleet"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                    >
                      {vendorTankers.map((tanker) => (
                        <motion.div 
                          whileHover={{ y: -10 }}
                          key={tanker.id} 
                          className="p-10 rounded-[3.5rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-bl-[5rem] -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                          <div className="flex justify-between items-start mb-10 relative z-10">
                            <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/20">
                              <Truck size={32} />
                            </div>
                            <span className={`text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-sm ${
                              tanker.status === 'available' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                              {tanker.status}
                            </span>
                          </div>
                          <h4 className="text-3xl font-black text-slate-900 tracking-tight mb-2 relative z-10">{tanker.numberPlate}</h4>
                          <p className="text-base text-slate-500 font-bold mb-10 relative z-10">{tanker.capacityLiters}L Heavy Duty Tanker</p>
                          <div className="flex gap-4 relative z-10">
                            <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">Service</button>
                            <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-amber-500 text-white rounded-2xl hover:bg-amber-600 shadow-xl shadow-amber-500/20 transition-all">Update</button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="income"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
                        <div className="relative z-10">
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Available Balance</p>
                          <h3 className="text-6xl font-black tracking-tighter mb-12">₹12,450.00</h3>
                          <div className="grid grid-cols-2 gap-10">
                            <div>
                              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">This Month</p>
                              <p className="text-2xl font-black tracking-tight">₹48,200</p>
                            </div>
                            <div>
                              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Growth</p>
                              <p className="text-2xl font-black tracking-tight text-emerald-400">+12.5%</p>
                            </div>
                          </div>
                        </div>
                        <DollarSign className="absolute -right-12 -bottom-12 text-white/5" size={240} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            {/* Shift Schedule */}
            <section className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/40">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-10 flex items-center gap-4 font-display">
                <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-xl shadow-amber-500/20">
                  <Calendar size={20} />
                </div>
                Shift Log
              </h2>
              <div className="space-y-10 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-1.5 before:bg-slate-50">
                {[
                  { time: '08:00 AM', task: 'Shift Start', status: 'completed' },
                  { time: '10:30 AM', task: 'Pickup - Hub A', status: 'completed' },
                  { time: '01:00 PM', task: 'Lunch Break', status: 'current' },
                  { time: '02:30 PM', task: 'Delivery - Sec 4', status: 'pending' },
                  { time: '06:00 PM', task: 'Shift End', status: 'pending' },
                ].map((item, i) => (
                  <div key={i} className="relative pl-16">
                    <div className={`absolute left-0 top-1.5 w-11 h-11 rounded-2xl border-4 border-white shadow-2xl z-10 flex items-center justify-center transition-all ${
                      item.status === 'completed' ? 'bg-emerald-500 text-white' : item.status === 'current' ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {item.status === 'completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.time}</p>
                    <p className={`text-xl font-black tracking-tight ${item.status === 'current' ? 'text-amber-600' : 'text-slate-900'}`}>{item.task}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Performance Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[4rem] text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                  <TrendingUp className="text-emerald-400" size={28} />
                </div>
                <h3 className="font-black text-3xl mb-3 tracking-tight">Top Performer</h3>
                <p className="text-blue-100/60 text-sm leading-relaxed font-bold mb-10">You are in the top 5% of vendors this week. Keep it up to earn the Platinum Badge!</p>
                <div className="bg-white/10 rounded-3xl p-6 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Weekly Goal</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">85%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      className="h-full bg-emerald-400"
                    />
                  </div>
                </div>
              </div>
              <Activity className="absolute -right-12 -bottom-12 text-white/5 transition-transform group-hover:scale-110 duration-700" size={200} />
            </motion.div>

            {/* Alert Section */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-rose-50 p-10 rounded-[4rem] border border-rose-100 flex items-start gap-6 shadow-2xl shadow-rose-500/5"
            >
              <div className="bg-rose-500 p-4 rounded-2xl text-white shadow-xl shadow-rose-500/20 shrink-0">
                <AlertTriangle size={28} />
              </div>
              <div>
                <p className="text-xl font-black text-rose-900 tracking-tight mb-2">System Alert</p>
                <p className="text-sm text-rose-700 font-bold leading-relaxed">Tanker MH-04-AB-1234 requires immediate tire inspection. Safety first!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

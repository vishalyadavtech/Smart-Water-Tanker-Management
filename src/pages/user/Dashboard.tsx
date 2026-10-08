import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  History, 
  Droplets, 
  Clock, 
  MapPin, 
  ChevronRight,
  Truck,
  Package,
  CheckCircle2,
  Navigation,
  CreditCard,
  Home,
  Star,
  ArrowRight,
  Search,
  Bell,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { bookings, tankers, addBooking, notifications, markNotificationRead } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const packages = [
    { size: 500, price: 250, eta: '30-45 mins', color: 'from-blue-500 to-cyan-400' },
    { size: 1000, price: 450, eta: '45-60 mins', color: 'from-indigo-500 to-blue-400' },
    { size: 2000, price: 800, eta: '1-2 hours', color: 'from-violet-500 to-purple-400' },
    { size: 5000, price: 1800, eta: '2-3 hours', color: 'from-slate-800 to-slate-700' },
  ];

  const savedAddresses = [
    { id: '1', label: 'Home', address: 'Flat 402, Shanti Nagar, Sector 1, Mira Road (E), Maharashtra', isDefault: true, icon: Home },
    { id: '2', label: 'Office', address: 'Shop 12, Maxus Mall Road, Bhayandar (W), Maharashtra', isDefault: false, icon: MapPin },
  ];

  const activeBookings = bookings.filter(b => b.status !== 'delivered' && b.status !== 'cancelled');
  const pastBookings = bookings.filter(b => b.status === 'delivered');

  const availableTankers = tankers.filter(t => t.status === 'available').length;

  const handleQuickBook = async (pkg: typeof packages[0]) => {
    if (availableTankers === 0) {
      toast.error('No Tankers Available', {
        description: 'Sorry, all our tankers are currently busy. Please try again in a few minutes.',
        icon: <AlertTriangle className="text-red-500" size={20} />
      });
      return;
    }

    try {
      await addBooking({
        userId: user?.id || '',
        address: savedAddresses[0].address,
        latitude: 19.2813,
        longitude: 72.8557,
        quantityLiters: pkg.size,
        price: pkg.price,
        status: 'pending',
      });
      toast.success('Booking Confirmed!', {
        description: `Your ${pkg.size}L water tanker has been booked successfully.`,
        icon: <CheckCircle2 className="text-emerald-500" size={20} />
      });
    } catch (error) {
      toast.error('Booking Failed', {
        description: 'Something went wrong. Please try again.'
      });
    }
  };

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  const handleAction = (action: string) => {
    alert(`${action} feature coming soon!`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-2xl shadow-blue-500/30 relative z-10">
                <Droplets size={32} className="animate-bounce-slow sm:w-10 sm:h-10" />
              </div>
            </motion.div>
            <div>
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display"
              >
                {user?.name.split(' ')[0]}!
              </motion.h1>
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 font-medium text-base sm:text-lg"
              >
                Your smart water supply is active and ready.
              </motion.p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              to="/dashboard/book"
              className="flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-[2rem] shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-[0.98] group"
            >
              <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-xs font-black uppercase tracking-widest">Book Tanker</span>
            </Link>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 rounded-[2rem] border border-white shadow-2xl shadow-slate-200/50">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
              <span className="text-[10px] font-black text-slate-700 tracking-widest uppercase">{availableTankers} Tankers Available</span>
            </div>
            <div className="flex gap-2 relative">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 transition-all shadow-xl shadow-slate-200/40 relative ${showNotifications ? 'text-blue-500 border-blue-100' : 'text-slate-400 hover:text-blue-500 hover:border-blue-100'}`}
                >
                  <Bell size={20} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg shadow-red-500/20">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 sm:w-96 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-300/50 border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
                        <button 
                          onClick={() => notifications.forEach(n => !n.read && markNotificationRead(n.id))}
                          className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div 
                              key={n.id} 
                              onClick={() => {
                                markNotificationRead(n.id);
                                setShowNotifications(false);
                              }}
                              className={`p-6 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer relative group ${!n.read ? 'bg-blue-50/20' : ''}`}
                            >
                              {!n.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}
                              <div className="flex gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                  n.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                  n.type === 'info' ? 'bg-blue-100 text-blue-600' :
                                  n.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                  'bg-red-100 text-red-600'
                                }`}>
                                  {n.type === 'success' ? <CheckCircle2 size={18} /> : <Bell size={18} />}
                                </div>
                                <div>
                                  <h4 className="text-sm font-black text-slate-900 tracking-tight mb-1">{n.title}</h4>
                                  <p className="text-xs text-slate-500 font-bold leading-relaxed">{n.message}</p>
                                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
                                    {n.timestamp?.toDate ? new Date(n.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Bell className="text-slate-300" size={24} />
                            </div>
                            <p className="text-sm text-slate-400 font-bold">No notifications yet</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={() => handleAction('Settings')}
                className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-100 transition-all shadow-xl shadow-slate-200/40"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Active Orders - Prominent Tracking */}
            {activeBookings.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 font-display">
                    <div className="bg-blue-500/10 p-3 rounded-2xl">
                      <Navigation className="text-blue-600" size={24} />
                    </div>
                    Live Tracking
                  </h2>
                  <Link 
                    to={activeBookings.length > 0 ? `/dashboard/track/${activeBookings[0].id}` : '#'} 
                    className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] hover:underline"
                  >
                    View Map
                  </Link>
                </div>
                <div className="space-y-6">
                  {activeBookings.map((booking) => (
                    <motion.div 
                      key={booking.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/30 rounded-bl-[10rem] -mr-20 -mt-20 transition-transform group-hover:scale-110" />
                      
                      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                        <div className="flex items-center gap-6">
                          <div className="bg-blue-600 w-20 h-20 rounded-[2rem] text-white shadow-2xl shadow-blue-500/30 flex items-center justify-center">
                            <Truck size={36} className="animate-float" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Order #{booking.id.slice(-6)}</span>
                              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">In Progress</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{booking.quantityLiters}L Premium Supply</h3>
                            <p className="text-slate-400 font-bold text-sm flex items-center gap-2 mt-1">
                              <Clock size={14} /> Estimated Arrival: 24 mins
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                          <button 
                            onClick={() => {
                              const tanker = tankers.find(t => t.id === booking.tankerId);
                              const lat = tanker?.currentLat || booking.latitude;
                              const lng = tanker?.currentLon || booking.longitude;
                              openGoogleMaps(lat, lng);
                            }}
                            className="flex-1 md:flex-none bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3"
                          >
                            Track Live (Google Maps)
                            <MapPin size={18} />
                          </button>
                          <Link 
                            to={`/dashboard/track/${booking.id}`}
                            className="flex-1 md:flex-none bg-white border-2 border-slate-900 text-slate-900 px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                          >
                            In-App View
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                      
                      {/* Status Tracker */}
                      <div className="relative px-4">
                        <div className="absolute top-5 left-0 w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '66%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                          />
                        </div>
                        <div className="relative flex justify-between">
                          {['Pending', 'Assigned', 'On the Way', 'Delivered'].map((step, i) => {
                            const statuses = ['pending', 'assigned', 'on_the_way', 'delivered'];
                            const currentIndex = statuses.indexOf(booking.status);
                            const isActive = currentIndex >= i;
                            const isCurrent = currentIndex === i;

                            return (
                              <div key={step} className="flex flex-col items-center gap-4">
                                <div className={`
                                  w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-700
                                  ${isActive ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40' : isCurrent ? 'bg-white border-4 border-blue-600 text-blue-600 ring-8 ring-blue-50' : 'bg-white border-2 border-slate-100 text-slate-300'}
                                `}>
                                  {isActive ? <CheckCircle2 size={24} /> : <div className="w-3 h-3 rounded-full bg-current" />}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive || isCurrent ? 'text-slate-900' : 'text-slate-400'}`}>
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Booking Grid */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-4 font-display">
                  <div className="bg-emerald-500/10 p-3 rounded-2xl">
                    <Package className="text-emerald-600" size={24} />
                  </div>
                  Quick Booking
                </h2>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <Clock size={12} /> Live ETA Active
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {packages.map((pkg, i) => (
                  <motion.div
                    key={pkg.size}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${pkg.color} opacity-[0.03] rounded-bl-[5rem] -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-10">
                        <div className={`bg-gradient-to-br ${pkg.color} p-4 rounded-2xl text-white shadow-2xl shadow-blue-500/20`}>
                          <Truck size={32} />
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-black text-slate-900 tracking-tighter">₹{pkg.price}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Flat Rate</p>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{pkg.size} Liters</h3>
                      <div className="flex items-center gap-3 text-slate-500 text-sm mb-10 font-bold">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                          <Clock size={16} className="text-blue-500" />
                        </div>
                        <span>ETA: {pkg.eta}</span>
                      </div>
                      
                      <button 
                        onClick={() => navigate('/dashboard/book', { state: { preSelectedSize: pkg.size } })}
                        className="w-full bg-slate-950 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-xs uppercase tracking-[0.2em]"
                      >
                        Book Now
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Saved Places */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -mr-10 -mt-10" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl font-black text-slate-900 flex items-center gap-4 font-display">
                    <div className="bg-slate-900 p-2.5 rounded-xl text-white">
                      <MapPin size={20} />
                    </div>
                    Saved Places
                  </h2>
                  <button 
                    onClick={() => handleAction('Add Address')}
                    className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    Add New
                  </button>
                </div>
                <div className="space-y-6">
                  {savedAddresses.map((addr) => (
                    <motion.div 
                      key={addr.id} 
                      whileHover={{ x: 10 }}
                      onClick={() => alert(`${addr.label} set as default delivery address.`)}
                      className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${addr.isDefault ? 'border-blue-100 bg-blue-50/30 shadow-lg shadow-blue-500/5' : 'border-slate-50 hover:border-slate-200'}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${addr.isDefault ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-100 text-slate-400'}`}>
                            <addr.icon size={18} />
                          </div>
                          <span className="text-base font-black text-slate-900 tracking-tight">{addr.label}</span>
                        </div>
                        {addr.isDefault && <span className="text-[9px] font-black text-blue-600 bg-white border border-blue-100 px-3 py-1 rounded-full uppercase tracking-widest">Default</span>}
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed font-bold pl-1">{addr.address}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Recent History */}
            <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-4 font-display">
                  <div className="bg-slate-900 p-2.5 rounded-xl text-white">
                    <History size={20} />
                  </div>
                  History
                </h2>
                  <Link to="/dashboard/history" className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="space-y-8">
                {pastBookings.length > 0 ? pastBookings.slice(0, 3).map((b) => (
                  <div key={b.id} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="bg-slate-50 w-14 h-14 rounded-2xl text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all flex items-center justify-center shadow-sm">
                        <Droplets size={24} />
                      </div>
                      <div>
                        <p className="text-base font-black text-slate-900 tracking-tight">{b.quantityLiters}L Supply</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                          {b.createdAt?.toDate ? b.createdAt.toDate().toLocaleDateString() : 
                           b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000).toLocaleDateString() :
                           new Date(b.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-black text-slate-900 tracking-tight">₹{b.price}</p>
                      <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Delivered</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-10 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No history yet</p>
                  </div>
                )}
              </div>
            </section>

            {/* Premium Promo Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-bl-[5rem] -mr-10 -mt-10 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="bg-blue-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  <Star className="text-amber-400" size={24} fill="currentColor" />
                </div>
                <h3 className="font-black text-2xl mb-3 tracking-tight">Go Premium</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-bold mb-8">Get priority delivery, zero service fees, and monthly water quality reports.</p>
                <button 
                  onClick={() => handleAction('Premium Upgrade')}
                  className="w-full bg-white text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
                >
                  Upgrade Now
                </button>
              </div>
              <Droplets className="absolute -right-10 -bottom-10 text-white/5 transition-transform group-hover:scale-110 duration-700" size={180} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

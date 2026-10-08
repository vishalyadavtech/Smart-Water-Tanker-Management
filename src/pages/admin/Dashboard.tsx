import React, { useState } from 'react';
import { 
  Users, 
  Truck, 
  Calendar, 
  TrendingUp, 
  Map as MapIcon,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  ShieldCheck,
  MessageSquare,
  Settings,
  DollarSign,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  ChevronRight,
  Plus,
  Activity,
  Zap,
  Clock,
  Search,
  Filter,
  Download,
  Bell,
  Star
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import MapComponent from '../../components/MapComponent';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const { bookings, tankers, updateBookingStatus } = useAppContext();
  const [activeView, setActiveView] = useState<'overview' | 'vendors' | 'feedback' | 'settings'>('overview');
  const [selectedTankerId, setSelectedTankerId] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAssign = async () => {
    if (!selectedTankerId || !selectedBookingId) return;
    const tanker = tankers.find(t => t.id === selectedTankerId);
    if (!tanker) return;

    await updateBookingStatus(selectedBookingId, { 
      status: 'assigned', 
      tankerId: selectedTankerId,
      vendorId: tanker.vendorId
    });
    setSelectedTankerId('');
    setSelectedBookingId('');
    // Use a more subtle notification if possible, but keeping it simple for now
    console.log('Tanker assigned successfully!');
  };

  const stats = [
    { label: 'Total Users', value: '1,240', trend: '+12%', up: true, icon: Users, color: 'from-indigo-600 to-blue-600', shadow: 'shadow-indigo-500/20' },
    { label: 'Active Vendors', value: '48', trend: '+5%', up: true, icon: ShieldCheck, color: 'from-emerald-600 to-teal-600', shadow: 'shadow-emerald-500/20' },
    { label: 'Active Tankers', value: tankers.length, trend: '85%', up: true, icon: Truck, color: 'from-blue-600 to-cyan-600', shadow: 'shadow-blue-500/20' },
    { label: 'Total Revenue', value: `₹${bookings.reduce((acc, b) => acc + b.price, 0).toLocaleString()}`, trend: '+18%', up: true, icon: DollarSign, color: 'from-violet-600 to-purple-600', shadow: 'shadow-violet-500/20' },
  ];

  const chartData = [
    { name: 'Mon', bookings: 40, revenue: 2400 },
    { name: 'Tue', bookings: 30, revenue: 1398 },
    { name: 'Wed', bookings: 20, revenue: 9800 },
    { name: 'Thu', bookings: 27, revenue: 3908 },
    { name: 'Fri', bookings: 18, revenue: 4800 },
    { name: 'Sat', bookings: 23, revenue: 3800 },
    { name: 'Sun', bookings: 34, revenue: 4300 },
  ];

  const pieData = [
    { name: 'Pending', value: bookings.filter(b => b.status === 'pending').length },
    { name: 'Assigned', value: bookings.filter(b => b.status === 'assigned').length },
    { name: 'Ongoing', value: bookings.filter(b => b.status === 'on_the_way').length },
    { name: 'Completed', value: bookings.filter(b => b.status === 'delivered').length },
  ];

  const COLORS = ['#6366f1', '#3b82f6', '#0ea5e9', '#10b981'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="space-y-8 pb-12 bg-slate-50/50 min-h-screen -m-8 p-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      {/* Admin Header */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 relative z-10">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-slate-950 p-3 rounded-2xl text-white shadow-2xl shadow-slate-900/20">
              <Activity size={24} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter font-display">Mission Control</h1>
          </div>
          <p className="text-slate-500 font-medium ml-14">Global system orchestration & real-time telemetry</p>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-wrap gap-4 items-center w-full xl:w-auto"
        >
          <div className="relative flex-1 xl:w-72 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search telemetry data..." 
              className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 pl-14 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 bg-white/80 backdrop-blur-md p-2 rounded-[1.5rem] border border-slate-200 shadow-sm">
            {['overview', 'vendors', 'feedback', 'settings'].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view as any)}
                className={`px-6 py-3 rounded-xl text-xs font-black transition-all capitalize tracking-tight ${
                  activeView === view 
                    ? 'bg-slate-950 text-white shadow-2xl shadow-slate-900/30' 
                    : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <button className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-slate-600 hover:text-blue-600 transition-all relative group">
            <Bell size={22} />
            <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
          </button>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-8 relative z-10"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -mr-10 -mt-10 transition-transform group-hover:scale-110" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className={`bg-gradient-to-br ${stat.color} p-4.5 rounded-2xl text-white shadow-2xl ${stat.shadow} group-hover:rotate-6 transition-transform`}>
                        <stat.icon size={28} />
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {stat.trend}
                      </div>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-black text-slate-950 tracking-tighter">{stat.value}</p>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Live Fleet Map */}
              <motion.section 
                variants={itemVariants}
                className="lg:col-span-2 bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group relative"
              >
                <div className="p-10 border-b border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <h2 className="font-black text-slate-950 flex items-center gap-3 text-2xl tracking-tighter font-display">
                      <Zap className="text-amber-500" size={24} fill="currentColor" />
                      Fleet Telemetry
                    </h2>
                    <p className="text-sm font-medium text-slate-400 mt-1">Real-time geospatial tracking & unit orchestration</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-3 text-[11px] font-black text-emerald-600 bg-emerald-50 px-6 py-3 rounded-2xl uppercase tracking-widest border border-emerald-100">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      {tankers.filter(t => t.status === 'available').length} Available
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-h-[400px] sm:min-h-[600px] relative flex flex-col lg:block">
                  <div className="flex-1 h-full relative z-0">
                    <MapComponent 
                      center={[19.2813, 72.8557]}
                      zoom={12}
                      tankers={tankers.map(t => ({ 
                        id: t.id, 
                        location: [t.currentLat, t.currentLon], 
                        info: `${t.driverName} (${t.numberPlate})`,
                        status: t.status,
                        driver: t.driverName,
                        plate: t.numberPlate
                      }))}
                    />
                  </div>
                  
                  {/* Manual Override Overlay */}
                  <div className="lg:absolute lg:top-10 lg:right-10 z-[1000] bg-white/90 backdrop-blur-2xl p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] shadow-2xl border border-white/50 w-full lg:w-80 mt-4 lg:mt-0">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-slate-950 p-2 rounded-xl text-white">
                        <Settings size={16} />
                      </div>
                      <h3 className="text-xs font-black text-slate-950 uppercase tracking-[0.2em]">Manual Override</h3>
                    </div>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Unit</label>
                        <select 
                          value={selectedTankerId}
                          onChange={(e) => setSelectedTankerId(e.target.value)}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Choose Tanker...</option>
                          {tankers.map(t => <option key={t.id} value={t.id}>{t.numberPlate} — {t.driverName}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Target</label>
                        <select 
                          value={selectedBookingId}
                          onChange={(e) => setSelectedBookingId(e.target.value)}
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-sm font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Choose Order...</option>
                          {bookings.filter(b => b.status === 'pending').map(b => <option key={b.id} value={b.id}>Order #{b.id.slice(-6)}</option>)}
                        </select>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAssign}
                        disabled={!selectedTankerId || !selectedBookingId}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl text-sm font-black hover:bg-blue-500 transition-all disabled:opacity-50 shadow-2xl shadow-blue-600/20 mt-4 flex items-center justify-center gap-3"
                      >
                        Execute Assignment
                        <ArrowUpRight size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Performance Analytics */}
              <div className="space-y-10">
                <motion.section 
                  variants={itemVariants}
                  className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-bl-[5rem] -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <h2 className="font-black text-slate-950 flex items-center gap-3 text-2xl tracking-tighter font-display">
                          <TrendingUp className="text-indigo-600" size={24} />
                          Revenue
                        </h2>
                        <p className="text-sm font-medium text-slate-400 mt-1">7-day performance metrics</p>
                      </div>
                      <button className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-indigo-600 border border-transparent hover:border-slate-100">
                        <Download size={20} />
                      </button>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 11, fontWeight: 800, fill: '#94a3b8'}} 
                            dy={15}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: '24px', 
                              border: 'none', 
                              boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                              padding: '16px 20px',
                              fontWeight: 'bold'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#6366f1" 
                            fillOpacity={1} 
                            fill="url(#colorRev)" 
                            strokeWidth={5} 
                            animationDuration={2500}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-10 flex justify-between items-center p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                      <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Daily Average</p>
                        <p className="text-3xl font-black text-slate-950 tracking-tighter">₹4,280</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1.5 text-emerald-500 font-black text-lg">
                          <ArrowUpRight size={20} />
                          +12.5%
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">vs last cycle</p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section 
                  variants={itemVariants}
                  className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <h2 className="font-black text-slate-950 flex items-center gap-3 text-2xl tracking-tighter font-display">
                        <PieChartIcon className="text-emerald-600" size={24} />
                        Status
                      </h2>
                      <p className="text-sm font-medium text-slate-400 mt-1">Order lifecycle distribution</p>
                    </div>
                  </div>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={75}
                          outerRadius={100}
                          paddingAngle={10}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-10">
                    {pieData.map((item, i) => (
                      <div key={item.name} className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-3.5 h-3.5 rounded-full shrink-0 shadow-lg" style={{ backgroundColor: COLORS[i] }} />
                        <div>
                          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.name}</p>
                          <p className="text-lg font-black text-slate-950">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'vendors' && (
          <motion.section 
            key="vendors"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-black text-slate-900 flex items-center gap-2 text-xl tracking-tight">
                  <ShieldCheck className="text-emerald-500" size={24} />
                  Vendor Verification Queue
                </h2>
                <p className="text-sm font-medium text-slate-400 mt-1">Manage and verify service provider credentials</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none bg-slate-50 text-slate-600 px-6 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-slate-100 transition-all">
                  <Filter size={16} />
                  Filter
                </button>
                <button className="flex-1 sm:flex-none bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                  <Plus size={16} />
                  Add New Vendor
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <th className="px-8 py-5">Vendor Profile</th>
                    <th className="px-8 py-5">Company Entity</th>
                    <th className="px-8 py-5">Fleet Capacity</th>
                    <th className="px-8 py-5">Verification</th>
                    <th className="px-8 py-5 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'Rajesh Yadav', company: 'AquaPure Services', fleet: 12, status: 'verified', email: 'rajesh@aqua.com' },
                    { name: 'Suresh Kumar', company: 'BlueWater Co.', fleet: 8, status: 'pending', email: 'suresh@blue.com' },
                    { name: 'Amit Sharma', company: 'Amit & Sons', fleet: 5, status: 'verified', email: 'amit@sons.com' },
                    { name: 'Priya Singh', company: 'PureFlow Ltd', fleet: 15, status: 'under_review', email: 'priya@flow.com' },
                  ].map((v, i) => (
                    <motion.tr 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                            {v.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{v.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">{v.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-600">{v.company}</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <Truck size={14} className="text-slate-300" />
                          <p className="text-sm font-black text-slate-900">{v.fleet} Units</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider ${
                          v.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 
                          v.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {v.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="bg-white border border-slate-200 text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                          Review
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        )}

        {activeView === 'feedback' && (
          <motion.div 
            key="feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="font-black text-slate-900 flex items-center gap-2 text-xl tracking-tight">
                    <MessageSquare className="text-indigo-500" size={24} />
                    User Sentiment
                  </h2>
                  <p className="text-sm font-medium text-slate-400 mt-1">Real-time feedback stream from customers</p>
                </div>
                <div className="flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-xl">
                  <Star size={14} className="text-indigo-500" fill="currentColor" />
                  <span className="text-sm font-black text-indigo-600">4.8</span>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { user: 'Rahul M.', rating: 5, comment: 'Great service! Tanker arrived within 30 mins.', time: '2h ago', avatar: 'RM' },
                  { user: 'Priya S.', rating: 4, comment: 'Easy booking process, but driver was a bit rude.', time: '5h ago', avatar: 'PS' },
                  { user: 'Vikram K.', rating: 2, comment: 'Water quality was not up to the mark.', time: '1d ago', avatar: 'VK' },
                  { user: 'Anjali D.', rating: 5, comment: 'Best app for water supply in Mira Road!', time: '2d ago', avatar: 'AD' },
                ].map((f, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xs font-black text-slate-400">
                          {f.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{f.user}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{f.time}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < f.rating ? 'currentColor' : 'none'} />)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{f.comment}"</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="font-black text-slate-900 flex items-center gap-2 text-xl tracking-tight">
                    <AlertCircle className="text-rose-500" size={24} />
                    Critical Incidents
                  </h2>
                  <p className="text-sm font-medium text-slate-400 mt-1">Pending complaints requiring immediate action</p>
                </div>
                <span className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-xl text-xs font-black">3 Active</span>
              </div>
              <div className="space-y-4">
                {[
                  { id: 'C-102', type: 'Delay', status: 'high', time: '1h ago', desc: 'Tanker delayed by 2 hours without notice.' },
                  { id: 'C-105', type: 'Pricing', status: 'medium', time: '3h ago', desc: 'User charged extra for emergency delivery.' },
                  { id: 'C-108', type: 'Quality', status: 'high', time: '6h ago', desc: 'Reported muddy water in the supplied tanker.' },
                ].map((c, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col p-6 rounded-3xl border border-slate-100 hover:border-rose-100 transition-all cursor-pointer group bg-white"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${c.status === 'high' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-500'}`}>
                          <AlertCircle size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">Incident #{c.id}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.type} Breach</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                        c.status === 'high' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {c.status} Priority
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">{c.desc}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.time}</p>
                      <button className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                        Investigate <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeView === 'settings' && (
          <motion.section 
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-black text-slate-900 flex items-center gap-3 text-2xl tracking-tighter">
                  <Settings className="text-slate-400" size={32} />
                  System Configuration
                </h2>
                <p className="text-sm font-medium text-slate-400 mt-1">Global parameters and service zone management</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-slate-50 text-slate-600 px-6 py-3 rounded-2xl text-xs font-black hover:bg-slate-100 transition-all">Discard</button>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all">Apply Changes</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-primary" size={20} />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Pricing Architecture</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: '500L Standard', value: '₹250', desc: 'Residential small capacity' },
                    { label: '1000L Premium', value: '₹450', desc: 'Most popular choice' },
                    { label: '2000L Industrial', value: '₹800', desc: 'Commercial grade' },
                    { label: '5000L Bulk', value: '₹1800', desc: 'Large scale operations' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all group">
                      <div>
                        <span className="text-sm font-black text-slate-900">{item.label}</span>
                        <p className="text-[10px] font-medium text-slate-400">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-black text-slate-900 tracking-tighter">{item.value}</span>
                        <button className="bg-white p-2 rounded-xl text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-rose-500" size={20} />
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Operational Zones</h3>
                </div>
                <div className="space-y-4">
                  {['Mira Road (East)', 'Mira Road (West)', 'Bhayandar (East)', 'Bhayandar (West)'].map((zone) => (
                    <div key={zone} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-rose-100 transition-all">
                      <span className="text-sm font-black text-slate-900">{zone}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-black text-emerald-600 uppercase">Active</span>
                        </div>
                        <button className="text-rose-500 hover:text-rose-700 transition-colors">
                          <Zap size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                    <Plus size={18} />
                    Provision New Zone
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  ShieldCheck, 
  Zap, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Globe,
  Smartphone,
  BarChart3,
  Star,
  MapPin,
  Clock,
  CreditCard,
  Shield,
  Activity,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MapComponent from '../components/MapComponent';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Delivery",
      desc: "Get water tankers at your doorstep in under 45 minutes with our smart routing.",
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100"
    },
    {
      icon: ShieldCheck,
      title: "Verified Vendors",
      desc: "Every vendor undergoes a rigorous 5-step verification process for quality assurance.",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    },
    {
      icon: Globe,
      title: "Live Tracking",
      desc: "Track your water tanker in real-time with our advanced geospatial telemetry.",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100"
    }
  ];

  const pricing = [
    {
      name: "Residential",
      price: "₹499",
      unit: "/tanker",
      features: ["5,000L Capacity", "Standard Delivery", "Live Tracking", "Verified Vendor"],
      cta: "Book Now",
      popular: false
    },
    {
      name: "Industrial",
      price: "₹1,299",
      unit: "/tanker",
      features: ["12,000L Capacity", "Priority Delivery", "Dedicated Support", "Quality Certificate"],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Bulk / Enterprise",
      price: "Custom",
      unit: "",
      features: ["Multiple Tankers", "Scheduled Supply", "API Integration", "Monthly Billing"],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Apartment Manager",
      text: "AquaRoute has completely transformed how we manage water supply for our 200+ flats. The reliability is unmatched.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
    },
    {
      name: "Priya Patel",
      role: "Restaurant Owner",
      text: "No more chasing tanker drivers. The live tracking and automated billing save me hours every week.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
      name: "Vikram Singh",
      role: "Industrial Plant Head",
      text: "The quality assurance and priority delivery for our industrial plant have been a game-changer for our operations.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Verified Tankers", value: "1.2K+" },
    { label: "Cities Covered", value: "24" },
    { label: "Water Delivered", value: "10M+ L" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Droplets className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter font-display">AquaRoute</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Features</a>
            <a href="#stats" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Impact</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-black text-slate-900 px-6 py-2.5 hover:bg-slate-50 rounded-xl transition-all">Login</Link>
            <Link to="/login" className="bg-slate-900 text-white text-sm font-black px-8 py-3 rounded-xl shadow-xl shadow-slate-900/20 hover:bg-primary hover:shadow-primary/30 transition-all active:scale-[0.98]">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1200px] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-500/10 blur-[180px] rounded-full animate-pulse-slow" />
          <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[180px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[10%] left-[20%] w-[50%] h-[50%] bg-cyan-500/10 blur-[180px] rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur-md px-5 py-2.5 rounded-full mb-10 border border-blue-100/50 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">Next-Gen Water Logistics</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-[10rem] font-black text-slate-900 tracking-tighter leading-[0.82] mb-10 font-display">
                Pure Water. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-500">Pure Speed.</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-500 font-medium leading-relaxed mb-12 max-w-xl">
                AquaRoute is the world's most advanced water management platform, connecting residential and industrial needs with a verified fleet of smart tankers.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <Link to="/login" className="w-full sm:w-auto bg-slate-900 text-white font-black px-12 py-6 rounded-3xl shadow-2xl shadow-slate-900/30 hover:bg-primary hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 group text-xl relative overflow-hidden">
                  <span className="relative z-10">Book a Tanker</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <img 
                        key={i}
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} 
                        alt="User" 
                        className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 shadow-xl"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">12K+ Users</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined this week</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:h-[800px] flex items-center justify-center"
            >
              {/* Main Visual Container */}
              <div className="relative w-full aspect-square lg:aspect-auto lg:h-full max-w-2xl">
                {/* Floating Card 1 */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[10%] -left-[10%] z-30 bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border border-white/50 flex items-center gap-6"
                >
                  <div className="bg-emerald-500 w-16 h-16 rounded-2xl text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Quality Check</p>
                    <p className="text-xl font-black text-slate-900 tracking-tight">100% Verified</p>
                  </div>
                </motion.div>

                {/* Main Image with Glass Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-[4rem] blur-3xl opacity-50" />
                <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-[12px] border-white shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200" 
                    alt="Smart Logistics" 
                    className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-12 left-12 right-12">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                      <span className="text-xs font-black text-white uppercase tracking-[0.3em]">Live Fleet Telemetry</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { label: 'Active', val: '1.2K' },
                        { label: 'ETA', val: '14m' },
                        { label: 'Health', val: '99%' }
                      ].map(s => (
                        <div key={s.label} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-5">
                          <p className="text-[10px] font-bold text-white/50 uppercase mb-1">{s.label}</p>
                          <p className="text-2xl font-black text-white">{s.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[15%] -right-[10%] z-30 bg-slate-900/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-6"
                >
                  <div className="bg-blue-500 w-16 h-16 rounded-2xl text-white flex items-center justify-center shadow-2xl shadow-blue-500/30">
                    <Truck size={32} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Live Status</p>
                    <p className="text-xl font-black text-white tracking-tight">Tanker En Route</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Map Preview Section */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-slate-50 px-5 py-2.5 rounded-full mb-10 border border-slate-100 shadow-sm">
                <Globe className="text-blue-500" size={18} />
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Real-time Geospatial Intelligence</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-10 font-display">
                Track Every Drop <br />
                <span className="text-blue-600">In Real-Time.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
                Our advanced tracking system gives you full visibility into your water delivery. From the moment you book to the final drop, you're in control.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: MapPin, title: "Precise Geofencing", desc: "Automated arrival alerts when the tanker enters your zone." },
                  { icon: Clock, title: "Dynamic ETA", desc: "AI-powered arrival estimates based on traffic and load." },
                  { icon: Shield, title: "Secure Handover", desc: "OTP-based delivery verification for absolute security." }
                ].map((item, i) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6"
                  >
                    <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 mb-1 tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-slate-900 rounded-[3.5rem] p-4 shadow-[0_64px_128px_-24px_rgba(0,0,0,0.3)] border border-slate-800">
                <div className="aspect-[4/5] lg:aspect-square rounded-[2.5rem] overflow-hidden relative">
                  <MapComponent 
                    center={[19.2813, 72.8557]} 
                    zoom={14} 
                    tankers={[
                      { id: '1', location: [19.2853, 72.8597], info: 'Tanker 1', status: 'available', driver: 'Suresh Kumar', plate: 'MH-04-AB-1234', capacity: '5,000L' },
                      { id: '2', location: [19.2783, 72.8527], info: 'Tanker 2', status: 'busy', driver: 'Mahesh Singh', plate: 'MH-04-CD-5678', capacity: '10,000L' }
                    ]}
                    userLocation={[19.2813, 72.8557]}
                    showControls={false}
                    className="w-full h-full"
                  />
                  
                  {/* UI Overlay */}
                  <div className="absolute top-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 z-[1000]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                          <Navigation size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Estimated Arrival</p>
                          <p className="text-xl font-black text-white tracking-tight">12:45 PM</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Distance</p>
                        <p className="text-xl font-black text-white tracking-tight">2.4 km</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative background blur */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[120px] rounded-full" />
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section id="stats" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-2 font-display">{stat.value}</p>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full mb-6 border border-slate-100">
              <Activity className="text-primary" size={16} />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Capabilities</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 font-display">Engineered for Reliability.</h2>
            <p className="text-lg text-slate-500 font-medium">We've combined advanced geospatial technology with a robust supply chain to solve the water crisis one tanker at a time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`bg-white p-10 rounded-[3rem] border ${f.border} shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all group`}
              >
                <div className={`${f.bg} ${f.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 font-display">Transparent Pricing.</h2>
            <p className="text-lg text-slate-500 font-medium">No hidden costs. No surge pricing. Just clean water when you need it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white p-10 rounded-[3rem] border ${plan.popular ? 'border-blue-500 shadow-2xl shadow-blue-500/10' : 'border-slate-100'} flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-slate-400 font-bold">{plan.unit}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-slate-600 font-medium">
                      <CheckCircle2 className="text-emerald-500" size={18} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/login" 
                  className={`w-full py-4 rounded-2xl font-black text-center transition-all ${
                    plan.popular 
                      ? 'bg-blue-500 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600' 
                      : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 font-display">Trusted by Thousands.</h2>
            <p className="text-lg text-slate-500 font-medium">Hear from the people and businesses who rely on AquaRoute every day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-10 rounded-[3rem] relative"
              >
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="text-amber-400 fill-amber-400" size={16} />
                  ))}
                </div>
                <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full bg-white border border-slate-200" />
                  <div>
                    <p className="font-black text-slate-900">{t.name}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white blur-[120px] rounded-full" />
              <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white blur-[120px] rounded-full" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tight mb-8 font-display leading-none">Ready to upgrade your water supply?</h2>
              <p className="text-xl text-white/70 font-medium mb-12">Join thousands of households and businesses already using AquaRoute for their daily water needs.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/login" className="w-full sm:w-auto bg-white text-blue-600 font-black px-12 py-5 rounded-2xl shadow-2xl hover:scale-105 transition-all text-lg">
                  Create Free Account
                </Link>
                <button className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 font-black px-12 py-5 rounded-2xl hover:bg-white/20 transition-all text-lg">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary p-2 rounded-xl">
                  <Droplets className="text-white" size={24} />
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter font-display">AquaRoute</span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                Revolutionizing water logistics through technology and transparency.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <Globe size={20} />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Platform</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Vendors</a></li>
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Safety</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Company</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8">Support</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-500 font-bold hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-50 gap-6">
            <p className="text-sm font-bold text-slate-400">© 2024 AquaRoute Technologies Inc. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                System Status: Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

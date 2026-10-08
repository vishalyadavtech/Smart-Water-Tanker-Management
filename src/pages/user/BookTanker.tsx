import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Droplets, 
  Clock, 
  Calendar, 
  MapPin, 
  Zap, 
  CreditCard, 
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Info,
  ShieldCheck,
  Truck,
  AlertTriangle
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import MapComponent from '../../components/MapComponent';

const BookTanker: React.FC = () => {
  const { addBooking, tankers } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const locationState = useLocation();

  const availableTankers = tankers.filter(t => t.status === 'available').length;

  const [tankSize, setTankSize] = useState(5000);
  const [slot, setSlot] = useState('Morning (8 AM - 12 PM)');
  const [isEmergency, setIsEmergency] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('Mira Road, Sector 1, Shanti Nagar');
  const [location, setLocation] = useState<[number, number]>([19.2813, 72.8557]);

  useEffect(() => {
    if (locationState.state?.preSelectedSize) {
      setTankSize(locationState.state.preSelectedSize);
    }
  }, [locationState.state]);

  const sizes = [
    { label: 'Standard', value: 3000, price: 800, desc: 'Perfect for small families', img: 'https://images.unsplash.com/photo-1586864387917-f7397d636fc0?auto=format&fit=crop&q=80&w=400' },
    { label: 'Family', value: 5000, price: 1200, desc: 'Ideal for 4-6 people', img: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=400' },
    { label: 'Commercial', value: 10000, price: 2200, desc: 'Best for large buildings', img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=400' },
  ];

  const slots = [
    { id: 'morning', label: 'Morning', time: '8 AM - 12 PM' },
    { id: 'afternoon', label: 'Afternoon', time: '12 PM - 4 PM' },
    { id: 'evening', label: 'Evening', time: '4 PM - 8 PM' },
  ];

  const selectedSize = sizes.find(s => s.value === tankSize)!;
  const totalPrice = selectedSize.price + (isEmergency ? 500 : 0);

  const handleBooking = async () => {
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
        address: address,
        latitude: location[0],
        longitude: location[1],
        quantityLiters: tankSize,
        price: totalPrice,
        scheduledTime: slot,
      });
      setStep(4);
      setTimeout(() => navigate('/dashboard'), 6000);
    } catch (error) {
      toast.error('Booking Failed', {
        description: 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden pb-20">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12">
        <div className="mb-8 md:mb-16 text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative inline-block mb-6 md:mb-8"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/30 relative z-10">
              <Droplets className="text-white w-8 h-8 md:w-12 md:h-12" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4 font-display"
          >
            Instant Water Delivery
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg md:text-xl font-bold max-w-xl mx-auto leading-relaxed px-4"
          >
            Premium quality water delivered to your doorstep. Fast, reliable, and transparent.
          </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 md:mb-20 relative px-4 md:px-12 max-w-3xl mx-auto">
          <div className="absolute top-1/2 left-4 md:left-12 right-4 md:right-12 h-1 md:h-2 bg-slate-100 -translate-y-1/2 z-0 rounded-full" />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((step - 1) / 3) * 100}%` }}
            className="absolute top-1/2 left-4 md:left-12 h-1 md:h-2 bg-blue-600 -translate-y-1/2 z-0 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          />
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center gap-2 md:gap-4">
              <div 
                className={`
                  w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-[1.8rem] flex items-center justify-center font-black transition-all duration-500 text-sm md:text-xl
                  ${step >= s ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30 scale-110' : 'bg-white text-slate-400 border-2 border-slate-100'}
                `}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8" /> : s}
              </div>
              <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${step >= s ? 'text-blue-600' : 'text-slate-400'}`}>
                {s === 1 ? 'Size' : s === 2 ? 'Details' : s === 3 ? 'Payment' : 'Done'}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {sizes.map((size, i) => (
                  <motion.button
                    key={size.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTankSize(size.value)}
                    className={`
                      p-2 rounded-[3.5rem] border-2 text-left transition-all relative overflow-hidden group
                      ${tankSize === size.value 
                        ? 'border-blue-600 bg-white shadow-2xl shadow-blue-600/10' 
                        : 'border-slate-100 bg-white hover:border-slate-200'}
                    `}
                  >
                    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden mb-6 relative">
                      <img 
                        src={size.img} 
                        alt={size.label} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <p className="text-white font-black text-2xl tracking-tight">{size.label}</p>
                        <p className="text-white/80 text-sm font-bold">{size.value} Liters</p>
                      </div>
                    </div>
                    <div className="px-8 pb-8">
                      <p className="text-xs text-slate-400 font-bold mb-6 leading-relaxed min-h-[40px]">{size.desc}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-black text-blue-600 tracking-tighter">₹{size.price}</p>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${tankSize === size.value ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-slate-50 text-slate-400'}`}>
                          <CheckCircle2 size={20} />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft size={16} />
                  Back to Dashboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStep(2)}
                  className="w-full md:w-auto bg-slate-900 text-white px-12 py-6 rounded-2xl md:rounded-[2rem] font-black shadow-2xl shadow-slate-900/20 transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]"
                >
                  Next Step
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Delivery Schedule</h3>
                    <div className="space-y-4">
                      {slots.map((s) => (
                        <motion.button
                          whileHover={{ x: 10 }}
                          key={s.id}
                          onClick={() => setSlot(s.label + ' (' + s.time + ')')}
                          className={`
                            w-full p-8 rounded-[2.5rem] border-2 flex items-center justify-between transition-all
                            ${slot.includes(s.label) 
                              ? 'border-blue-600 bg-white shadow-2xl shadow-blue-600/5' 
                              : 'border-slate-100 bg-white hover:border-slate-200'}
                          `}
                        >
                          <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${slot.includes(s.label) ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-slate-50 text-slate-400'}`}>
                              <Clock size={28} />
                            </div>
                            <div className="text-left">
                              <span className={`block text-xl font-black tracking-tight ${slot.includes(s.label) ? 'text-slate-900' : 'text-slate-500'}`}>{s.label}</span>
                              <span className="text-sm text-slate-400 font-bold">{s.time}</span>
                            </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${slot.includes(s.label) ? 'border-blue-600' : 'border-slate-200'}`}>
                            {slot.includes(s.label) && <div className="w-4 h-4 rounded-full bg-blue-600" />}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </section>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-amber-50 p-10 rounded-[3.5rem] border border-amber-100 flex items-center justify-between shadow-2xl shadow-amber-500/5"
                  >
                    <div className="flex items-center gap-8">
                      <div className="bg-amber-500 w-20 h-20 rounded-[2rem] text-white shadow-2xl shadow-amber-500/30 flex items-center justify-center">
                        <Zap size={40} />
                      </div>
                      <div>
                        <p className="text-2xl font-black text-amber-900 tracking-tight">Express Delivery</p>
                        <p className="text-base text-amber-700 font-bold">Delivery within 60 mins (+₹500)</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsEmergency(!isEmergency)}
                      className={`
                        w-20 h-10 rounded-full transition-all relative p-1.5
                        ${isEmergency ? 'bg-amber-500' : 'bg-slate-200'}
                      `}
                    >
                      <motion.div 
                        animate={{ x: isEmergency ? 40 : 0 }}
                        className="w-7 h-7 bg-white rounded-full shadow-xl"
                      />
                    </button>
                  </motion.div>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Delivery Address</h3>
                    <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-8">
                      <div className="flex items-start gap-6">
                        <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                          <MapPin size={28} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Location</p>
                          <textarea 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-2xl p-6 text-slate-900 font-bold text-base focus:ring-2 focus:ring-blue-500/20 transition-all resize-none h-32"
                            placeholder="Enter your full delivery address..."
                          />
                        </div>
                      </div>
                      
                      {/* Map Preview */}
                      <div className="aspect-video rounded-[2.5rem] bg-slate-100 relative overflow-hidden border border-slate-200 shadow-inner">
                        <MapComponent 
                          center={location} 
                          zoom={15} 
                          userLocation={location}
                          showControls={false}
                          onMapClick={(lat, lng) => setLocation([lat, lng])}
                          className="w-full h-full"
                        />
                        <div className="absolute top-6 right-6 z-[1000]">
                          <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Click map to adjust pin</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50/50 p-6 rounded-[2rem] flex items-center gap-4">
                        <Info size={20} className="text-blue-500" />
                        <p className="text-xs text-blue-700 font-bold">Our driver will call you once they reach the location.</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(1)}
                  className="w-full md:flex-1 bg-white border border-slate-100 text-slate-400 font-black py-5 md:py-6 rounded-2xl md:rounded-[2rem] transition-all text-xs uppercase tracking-widest shadow-xl shadow-slate-200/20"
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(3)}
                  className="w-full md:flex-[2] bg-blue-600 text-white font-black py-5 md:py-6 rounded-2xl md:rounded-[2rem] shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]"
                >
                  Continue to Payment
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-10">
                  <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Payment Method</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <motion.button 
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-[3rem] border-2 border-blue-600 bg-white shadow-2xl shadow-blue-600/5 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-8">
                          <div className="bg-blue-600 text-white w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/30 transition-transform group-hover:scale-110">
                            <CreditCard size={36} />
                          </div>
                          <div className="text-left">
                            <span className="block font-black text-slate-900 text-2xl tracking-tight">UPI / Cards</span>
                            <span className="text-sm text-slate-400 font-bold">Pay instantly for faster dispatch</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <CheckCircle2 size={24} />
                        </div>
                      </motion.button>
                      <motion.button 
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-[3rem] border-2 border-slate-100 bg-white hover:border-slate-200 flex items-center gap-8"
                      >
                        <div className="bg-slate-50 text-slate-400 w-20 h-20 rounded-[2rem] flex items-center justify-center">
                          <Droplets size={36} />
                        </div>
                        <div className="text-left">
                          <span className="block font-black text-slate-500 text-2xl tracking-tight">Cash on Delivery</span>
                          <span className="text-sm text-slate-400 font-bold">Pay when tanker arrives</span>
                        </div>
                      </motion.button>
                    </div>
                  </section>

                  <div className="bg-blue-50 p-10 rounded-[3.5rem] border border-blue-100 flex items-start gap-8">
                    <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-xl shadow-blue-600/20 shrink-0">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <p className="text-xl font-black text-blue-900 tracking-tight mb-2">Secure Transaction</p>
                      <p className="text-sm text-blue-700 font-bold leading-relaxed">Your payment is protected by industry-standard encryption. We never store your card details.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/40 sticky top-10">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-10 font-display">Order Summary</h3>
                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <Truck size={20} />
                          </div>
                          <span className="text-slate-500 font-bold">{selectedSize.label} Tanker</span>
                        </div>
                        <span className="font-black text-slate-900 text-xl">₹{selectedSize.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <Clock size={20} />
                          </div>
                          <span className="text-slate-500 font-bold">Scheduled Slot</span>
                        </div>
                        <span className="font-black text-slate-900 text-lg">Morning</span>
                      </div>
                      {isEmergency && (
                        <div className="flex justify-between items-center text-amber-600">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                              <Zap size={20} />
                            </div>
                            <span className="font-bold">Express Fee</span>
                          </div>
                          <span className="font-black text-lg">+₹500</span>
                        </div>
                      )}
                      <div className="pt-10 border-t border-slate-100">
                        <div className="flex justify-between items-center mb-10">
                          <span className="font-black text-slate-900 text-2xl tracking-tight">Total Amount</span>
                          <span className="text-5xl font-black text-blue-600 tracking-tighter">₹{totalPrice}</span>
                        </div>
                        
                        {availableTankers === 0 && (
                          <div className="mb-6 p-6 bg-red-50 rounded-3xl border border-red-100 flex items-center gap-4">
                            <AlertTriangle className="text-red-500 shrink-0" size={24} />
                            <p className="text-xs text-red-700 font-bold">Sorry, no tankers are currently available. You cannot proceed with the booking at this moment.</p>
                          </div>
                        )}

                        <motion.button
                          whileHover={availableTankers > 0 ? { scale: 1.02, y: -4 } : {}}
                          whileTap={availableTankers > 0 ? { scale: 0.98 } : {}}
                          onClick={handleBooking}
                          disabled={availableTankers === 0}
                          className={`w-full font-black py-6 rounded-[2rem] transition-all text-xs uppercase tracking-[0.2em] ${
                            availableTankers > 0 
                              ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' 
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {availableTankers > 0 ? 'Confirm Order' : 'No Tankers Available'}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 relative"
            >
              {/* Confetti-like elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      top: "50%", 
                      left: "50%", 
                      scale: 0,
                      rotate: 0 
                    }}
                    animate={{ 
                      top: `${Math.random() * 100}%`, 
                      left: `${Math.random() * 100}%`, 
                      scale: Math.random() * 1 + 0.5,
                      rotate: Math.random() * 360 
                    }}
                    transition={{ 
                      duration: 2, 
                      ease: "easeOut",
                      delay: 0.2 
                    }}
                    className={`absolute w-4 h-4 rounded-full ${['bg-blue-400', 'bg-emerald-400', 'bg-amber-400', 'bg-rose-400'][i % 4]} opacity-20`}
                  />
                ))}
              </div>

              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-emerald-500 to-emerald-400 text-white rounded-3xl md:rounded-[4rem] flex items-center justify-center mx-auto mb-8 md:mb-12 shadow-2xl shadow-emerald-500/40 relative"
              >
                <div className="absolute inset-0 bg-white/20 rounded-3xl md:rounded-[4rem] animate-ping" />
                <CheckCircle2 className="w-16 h-16 md:w-24 md:h-24 relative z-10" />
              </motion.div>

              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4 md:mb-6 font-display"
              >
                Booking Confirmed!
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-slate-500 text-lg md:text-2xl font-bold mb-10 md:mb-16 max-w-2xl mx-auto leading-relaxed px-4"
              >
                Your water tanker is being dispatched. Track your delivery in real-time from the dashboard.
              </motion.p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto px-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 group hover:border-blue-200 transition-colors"
                >
                  <p className="text-[8px] md:text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] mb-2 md:mb-4">Order ID</p>
                  <p className="text-xl md:text-3xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">#AQ-9821</p>
                </motion.div>
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 group hover:border-blue-200 transition-colors"
                >
                  <p className="text-[8px] md:text-[10px] text-slate-400 uppercase font-black tracking-[0.3em] mb-2 md:mb-4">ETA</p>
                  <p className="text-xl md:text-3xl font-black text-blue-600 tracking-tight">45 Mins</p>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-16 flex items-center justify-center gap-4"
              >
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                </div>
                <p className="text-sm text-slate-400 font-black uppercase tracking-widest">Redirecting to dashboard...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookTanker;

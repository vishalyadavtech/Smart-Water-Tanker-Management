import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Truck, 
  Phone, 
  MessageSquare, 
  Clock, 
  MapPin, 
  ChevronLeft,
  Star,
  CheckCircle2
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import MapComponent from '../../components/MapComponent';
import { motion } from 'motion/react';

const LiveTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookings, tankers } = useAppContext();
  const { user } = useAuth();
  const booking = bookings.find(b => b.id === id);
  const tanker = tankers.find(t => t.id === booking?.tankerId) || tankers[0];

  const defaultCenter: [number, number] = [19.2813, 72.8557];
  const tankerLocation: [number, number] = tanker ? [tanker.currentLat, tanker.currentLon] : defaultCenter;

  const [eta, setEta] = useState(15);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const handleCall = () => {
    if (tanker?.driverPhone) {
      window.location.href = `tel:${tanker.driverPhone}`;
    } else {
      alert('Connecting you to driver...');
    }
  };

  const handleMessage = () => {
    alert('Chat feature coming soon! You can contact the driver at +91 98765 43210');
  };

  const handleSubmitFeedback = () => {
    alert(`Thank you for your ${rating}-star feedback!`);
    setShowRating(false);
  };

  useEffect(() => {
    if (booking?.status === 'delivered') {
      setShowRating(true);
    }
  }, [booking?.status]);

  if (!booking) return <div className="p-8 text-center">Booking not found</div>;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-8">
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 text-slate-500 hover:text-primary transition-all font-black uppercase tracking-widest text-[10px]">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
              <ChevronLeft size={16} />
            </div>
            Back to Dashboard
          </Link>
          <div className="bg-primary text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
            {booking.status.replace(/-/g, ' ')}
          </div>
        </div>

        <div className="flex-1 min-h-[400px] relative rounded-[2.5rem] overflow-hidden border border-white shadow-2xl shadow-slate-200/50">
          <MapComponent 
            center={tankerLocation}
            zoom={14}
            userLocation={[booking.latitude, booking.longitude]}
            tankers={tanker ? [{ 
              id: tanker.id, 
              location: tankerLocation, 
              info: `Tanker ${tanker.numberPlate}` 
            }] : []}
            route={[tankerLocation, [booking.latitude, booking.longitude]]}
          />
          
          <div className="absolute bottom-8 left-8 right-8 z-[1000]">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass p-6 rounded-[2rem] shadow-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-5">
                <div className="bg-primary p-4 rounded-2xl text-white shadow-xl shadow-primary/30">
                  <Truck size={32} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Estimated Arrival</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">{eta} Minutes</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleMessage}
                  className="p-4 bg-white/50 hover:bg-white text-slate-600 rounded-2xl transition-all shadow-sm active:scale-95 border border-white"
                >
                  <MessageSquare size={24} />
                </button>
                <button 
                  onClick={handleCall}
                  className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-xl shadow-green-500/30 transition-all active:scale-95"
                >
                  <Phone size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 space-y-8">
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-900 mb-6 font-display text-lg tracking-tight">Driver Details</h3>
          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              <img 
                src={`https://picsum.photos/seed/${tanker?.driverName || 'driver'}/100/100`} 
                alt={tanker?.driverName || 'Driver'}
                className="w-16 h-16 rounded-[1.5rem] object-cover shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-lg tracking-tight">{tanker?.driverName || 'Assigning Driver...'}</p>
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-black tracking-tight">4.8 <span className="text-slate-400 font-bold">(120)</span></span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</span>
              <span className="font-black text-slate-900 tracking-tight">{tanker?.numberPlate || 'TBD'}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacity</span>
              <span className="font-black text-slate-900 tracking-tight">{tanker?.capacityLiters || '5000'} L</span>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-slate-900 mb-6 font-display text-lg tracking-tight">Order Info</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-primary h-fit shadow-sm">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Delivery Address</p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">{booking.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-primary h-fit shadow-sm">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Scheduled Time</p>
                <p className="text-sm font-bold text-slate-700">
                  {booking.scheduledTime?.toDate ? booking.scheduledTime.toDate().toLocaleString() : 
                   booking.scheduledTime?.seconds ? new Date(booking.scheduledTime.seconds * 1000).toLocaleString() :
                   booking.scheduledTime || 'Immediate'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Rating Modal */}
      {showRating && (
        <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white max-w-sm w-full rounded-3xl p-8 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Water Delivered!</h2>
            <p className="text-slate-500 mb-8">How was your experience with {tanker.driverName}?</p>
            
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((s) => (
                <button 
                  key={s} 
                  onClick={() => setRating(s)}
                  className={`transition-colors ${rating >= s ? 'text-amber-400' : 'text-slate-200'}`}
                >
                  <Star size={32} fill={rating >= s ? "currentColor" : "none"} />
                </button>
              ))}
            </div>

            <button 
              onClick={handleSubmitFeedback}
              disabled={rating === 0}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              Submit Feedback
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LiveTracking;

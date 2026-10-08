import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck, 
  History, 
  Settings, 
  Users, 
  Map as MapIcon, 
  BarChart3,
  PlusCircle,
  Navigation
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const userLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/book', icon: PlusCircle, label: 'Book Tanker' },
    { to: '/dashboard/history', icon: History, label: 'History' },
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const vendorLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Jobs' },
    { to: '/dashboard/earnings', icon: BarChart3, label: 'Earnings' },
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  const adminLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/dashboard/live-map', icon: MapIcon, label: 'Live Map' },
    { to: '/dashboard/bookings', icon: History, label: 'Bookings' },
    { to: '/dashboard/vendors', icon: Truck, label: 'Vendors' },
    { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'vendor' ? vendorLinks : userLinks;

  return (
    <aside className="w-72 bg-white border-r border-slate-100 h-full overflow-y-auto">
      <div className="p-6 space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `
              flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-black transition-all tracking-tight
              ${isActive 
                ? 'bg-primary text-white shadow-xl shadow-primary/25' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            {({ isActive }) => (
              <>
                <link.icon size={22} className={isActive ? 'text-white' : 'text-slate-400'} />
                {link.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
      
      <div className="mt-10 p-6">
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
          <p className="text-xs font-black text-slate-900 mb-2">Need Help?</p>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-4">Our support team is available 24/7 for any water supply issues.</p>
          <button className="w-full bg-white border border-slate-200 text-slate-900 text-[10px] font-black py-3 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-widest">Contact Support</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

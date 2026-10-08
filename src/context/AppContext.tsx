import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { Booking, Tanker, Notification } from '../types';

interface AppContextType {
  bookings: Booking[];
  tankers: Tanker[];
  notifications: Notification[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateBookingStatus: (id: string, data: Partial<Booking>) => Promise<void>;
  updateTanker: (id: string, data: Partial<Tanker>) => Promise<void>;
  updateTankerLocation: (id: string, lat: number, lon: number) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tankers, setTankers] = useState<Tanker[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (isAuthLoading || !user) {
      if (!isAuthLoading && !user) {
        setBookings([]);
        setNotifications([]);
      }
      return;
    }

    // Bookings Listener
    let bookingsQuery;
    if (user.role === 'admin') {
      bookingsQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    } else if (user.role === 'vendor') {
      // Vendors see jobs assigned to them OR pending jobs with no vendor assigned
      bookingsQuery = query(
        collection(db, 'bookings'),
        orderBy('createdAt', 'desc')
      );
    } else {
      bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.id), orderBy('createdAt', 'desc'));
    }

  const unsubscribeBookings = onSnapshot(bookingsQuery, (snapshot) => {
      let docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      
      // Client-side filtering for vendors if needed, or just let them see all for now
      // In a real app, we'd use Firestore 'or' queries or separate collections
      if (user.role === 'vendor') {
        docs = docs.filter(b => b.vendorId === user.id || (!b.vendorId && b.status === 'pending'));
      }
      
      setBookings(docs);

      // Seed bookings if none exist (for demo purposes)
      if (docs.length === 0 && user.role === 'admin') {
        const seedBookings = [
          {
            userId: user.id,
            address: 'Shanti Nagar, Sector 4, Mira Road',
            latitude: 19.2833,
            longitude: 72.8577,
            quantityLiters: 5000,
            price: 1200,
            status: 'pending',
            scheduledTime: Timestamp.now(),
            createdAt: Timestamp.now()
          },
          {
            userId: user.id,
            address: 'Pleasant Park, Mira Road (E)',
            latitude: 19.2900,
            longitude: 72.8650,
            quantityLiters: 1000,
            price: 450,
            status: 'pending',
            scheduledTime: Timestamp.now(),
            createdAt: Timestamp.now()
          }
        ];
        seedBookings.forEach(b => addDoc(collection(db, 'bookings'), b));
      }
    }, (error) => {
      console.error('Bookings Listener Error:', error);
    });

    // Tankers Listener
    const tankersQuery = query(collection(db, 'tankers'));
    const unsubscribeTankers = onSnapshot(tankersQuery, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tanker));
      setTankers(docs);
      
      // Seed tankers if none exist (for demo purposes)
      if (docs.length === 0 && user.role === 'admin') {
        const seedTankers = [
          {
            vendorId: user.id,
            numberPlate: 'MH-04-AB-1234',
            capacityLiters: 5000,
            status: 'available',
            currentLat: 19.2813,
            currentLon: 72.8557,
            driverName: 'Suresh Kumar',
            driverPhone: '9876543210'
          },
          {
            vendorId: user.id,
            numberPlate: 'MH-04-XY-5678',
            capacityLiters: 10000,
            status: 'busy',
            currentLat: 19.2950,
            currentLon: 72.8600,
            driverName: 'Rajesh Yadav',
            driverPhone: '9876543211'
          }
        ];
        seedTankers.forEach(t => addDoc(collection(db, 'tankers'), t));
      }
    }, (error) => {
      console.error('Tankers Listener Error:', error);
    });

    // Notifications Listener
    const notificationsQuery = query(collection(db, 'notifications'), where('userId', '==', user.id), orderBy('timestamp', 'desc'));
    const unsubscribeNotifications = onSnapshot(notificationsQuery, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
      setNotifications(docs);
    }, (error) => {
      console.error('Notifications Listener Error:', error);
    });

    return () => {
      unsubscribeBookings();
      unsubscribeTankers();
      unsubscribeNotifications();
    };
  }, [user, isAuthLoading]);

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        userId: user.id,
        status: 'pending',
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  };

  const updateBookingStatus = async (id: string, data: Partial<Booking>) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, data);
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  };

  const updateTanker = async (id: string, data: Partial<Tanker>) => {
    try {
      const tankerRef = doc(db, 'tankers', id);
      await updateDoc(tankerRef, {
        ...data,
        lastUpdated: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating tanker:', error);
      throw error;
    }
  };

  const updateTankerLocation = async (id: string, lat: number, lon: number) => {
    await updateTanker(id, { currentLat: lat, currentLon: lon });
  };

  const addNotification = async (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    try {
      await addDoc(collection(db, 'notifications'), {
        ...notification,
        read: false,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const markNotificationRead = async (id: string) => {
    try {
      const notificationRef = doc(db, 'notifications', id);
      await updateDoc(notificationRef, { read: true });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{ 
      bookings, 
      tankers, 
      notifications, 
      addBooking, 
      updateBookingStatus, 
      updateTanker,
      updateTankerLocation,
      markNotificationRead,
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

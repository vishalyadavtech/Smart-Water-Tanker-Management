import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { addMinutes, isAfter } from "date-fns";

interface AuthRequest extends Request {
  user?: any;
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = 3000;

  app.use(express.json());

  // In-memory Database (Simulating SQL)
  const db = {
    users: new Map<string, any>(),
    vendors: new Map<string, any>(),
    tankers: [
      { id: 't1', numberPlate: 'MH-04-AB-1234', capacityLiters: 5000, status: 'available', currentLat: 19.2813, currentLon: 72.8557, driverName: 'Suresh' },
      { id: 't2', numberPlate: 'MH-04-CD-5678', capacityLiters: 10000, status: 'available', currentLat: 19.2913, currentLon: 72.8657, driverName: 'Ramesh' },
    ],
    bookings: [] as any[],
    otp_verification: new Map<string, { otp: string, expiresAt: Date, isUsed: boolean }>(),
    notifications: [] as any[],
    admin_settings: {
      base_price_per_1000L: 500,
      delivery_charge_per_km: 20,
      platform_fee: 50,
    }
  };

  // Helper: Generate 6-digit OTP
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  // Helper: Mock SMS API (Structure for Twilio/Fast2SMS)
  const sendSMS = async (phone: string, otp: string) => {
    console.log(`\n--- SMS API CALL ---`);
    console.log(`To: ${phone}`);
    console.log(`Message: Your AquaRoute OTP is ${otp}. Valid for 5 minutes.`);
    console.log(`--------------------\n`);
  };

  // Middleware: Auth Check (Simplified)
  const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id'];
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const user = db.users.get(userId as string);
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  };

  // --- AUTH API ---

  // Send Email OTP
  app.post("/api/auth/send-email-otp", async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const otp = generateOTP();
    const expiresAt = addMinutes(new Date(), 5);

    db.otp_verification.set(email, { otp, expiresAt, isUsed: false });
    
    console.log(`\n--- EMAIL SIMULATION ---`);
    console.log(`To: ${email}`);
    console.log(`Message: Your AquaRoute OTP is ${otp}. Valid for 5 minutes.`);
    console.log(`------------------------\n`);

    res.json({ success: true, message: "OTP sent successfully" });
  });

  // Verify Email OTP
  app.post("/api/auth/verify-email-otp", (req: Request, res: Response) => {
    const { email, otp, role, name } = req.body;
    
    // Master OTP bypass
    if (otp === "123456") {
      return handleUserSession(email, role, name, res);
    }

    const record = db.otp_verification.get(email);

    if (!record) {
      return res.status(400).json({ error: "No OTP sent for this email" });
    }

    if (record.isUsed) {
      return res.status(400).json({ error: "OTP already used" });
    }

    if (isAfter(new Date(), record.expiresAt)) {
      return res.status(400).json({ error: "OTP expired" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ error: "Incorrect OTP" });
    }

    // Mark as used
    record.isUsed = true;

    return handleUserSession(email, role, name, res);
  });

  // Helper to handle user session creation/retrieval
  function handleUserSession(email: string, role: string, name: string, res: Response) {
    let user = Array.from(db.users.values()).find(u => u.email === email);
    if (!user) {
      user = {
        id: uuidv4(),
        name: name || "New User",
        email,
        role: role || 'user',
        createdAt: new Date().toISOString(),
      };
      db.users.set(user.id, user);
    }
    return res.json({ success: true, user });
  }

  // --- VENDOR API ---

  app.post("/api/vendors/register", authenticate as any, (req: AuthRequest, res: Response) => {
    const { businessName, gstNumber } = req.body;
    const vendor = {
      id: uuidv4(),
      userId: req.user.id,
      businessName,
      gstNumber,
      isApproved: false,
      createdAt: new Date().toISOString(),
    };
    db.vendors.set(vendor.id, vendor);
    res.json({ success: true, vendor });
  });

  // --- BOOKING API ---

  app.get("/api/bookings", (req: Request, res: Response) => {
    const { userId, vendorId } = req.query;
    let filtered = db.bookings;
    if (userId) filtered = filtered.filter(b => b.userId === userId);
    if (vendorId) filtered = filtered.filter(b => b.vendorId === vendorId);
    res.json(filtered);
  });

  app.post("/api/bookings", authenticate as any, (req: AuthRequest, res: Response) => {
    const booking = {
      id: `b_${Date.now()}`,
      userId: req.user.id,
      ...req.body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    db.bookings.push(booking);
    io.emit('booking_update', db.bookings);
    res.json(booking);
  });

  app.patch("/api/bookings/:id/status", authenticate as any, (req: AuthRequest, res: Response) => {
    const index = db.bookings.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Booking not found" });

    const { status, vendorId, tankerId } = req.body;
    db.bookings[index] = { 
      ...db.bookings[index], 
      status: status || db.bookings[index].status,
      vendorId: vendorId || db.bookings[index].vendorId,
      tankerId: tankerId || db.bookings[index].tankerId,
    };

    io.emit('booking_update', db.bookings);
    res.json(db.bookings[index]);
  });

  // --- TANKER API ---

  app.get("/api/tankers", (req: Request, res: Response) => {
    res.json(db.tankers);
  });

  app.patch("/api/tankers/:id/location", (req: Request, res: Response) => {
    const index = db.tankers.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
      const { latitude, longitude } = req.body;
      db.tankers[index] = { ...db.tankers[index], currentLat: latitude, currentLon: longitude };
      io.emit('tanker_update', db.tankers);
      res.json(db.tankers[index]);
    } else {
      res.status(404).json({ error: "Tanker not found" });
    }
  });

  // --- ADMIN API ---

  app.patch("/api/admin/settings", (req: Request, res: Response) => {
    db.admin_settings = { ...db.admin_settings, ...req.body };
    res.json({ success: true, settings: db.admin_settings });
  });

  app.patch("/api/vendors/:id/approve", (req: Request, res: Response) => {
    const vendor = db.vendors.get(req.params.id);
    if (vendor) {
      vendor.isApproved = req.body.isApproved;
      res.json({ success: true, vendor });
    } else {
      res.status(404).json({ error: "Vendor not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`AquaRoute Server running on http://localhost:${PORT}`);
  });
}

startServer();

# AquaRoute System Workflows

## 1. OTP Login Workflow
1. **Request:** User submits mobile number.
2. **Generation:** Backend generates a cryptographically secure 6-digit random number.
3. **Storage:** OTP is saved in `otp_verification` table with `expires_at` (current time + 5 mins) and `is_used = false`.
4. **Dispatch:** Backend calls SMS API (e.g., Twilio) to send the code.
5. **Verification:** User submits OTP.
6. **Validation Logic:**
   - Check if phone exists in `otp_verification`.
   - Check if `otp_code` matches.
   - Check if `now() < expires_at`.
   - Check if `is_used == false`.
7. **Completion:** Mark `is_used = true`. Issue JWT token and return User object.

## 2. Booking & Vendor Assignment
1. **User Action:** Selects water quantity and provides location.
2. **Pricing:** System fetches `admin_settings` to calculate: `(Quantity * BaseRate) + (Distance * Rate) + PlatformFee`.
3. **Creation:** Booking saved as `pending`.
4. **Admin Action:** Reviews pending bookings and selects a Vendor + Tanker.
5. **Assignment:** Booking updated to `assigned`. Vendor notified via Socket.IO/Push.

## 3. Delivery & Live Tracking
1. **Start Trip:** Vendor clicks "Start Trip". Status becomes `on_the_way`.
2. **GPS Updates:** Tanker mobile app sends latitude/longitude to `PATCH /api/tankers/:id/location` every 30 seconds.
3. **Real-time Sync:** Backend broadcasts location via Socket.IO.
4. **User View:** User's map updates tanker position dynamically.
5. **Completion:** Vendor clicks "Delivered". System prompts for payment confirmation.

## 4. Route Optimization Logic
- **Provider:** OpenRouteService (ORS) or Google Maps.
- **Logic:**
  1. Get `tanker_location` (A) and `delivery_address` (B).
  2. Call Directions API: `GET /v2/directions/driving-car?start=A&end=B`.
  3. Extract `geometry` (polyline) for map rendering.
  4. Extract `distance` and `duration` for ETA calculation.
  5. If multiple bookings, use "Matrix API" to find the optimal sequence (Traveling Salesman Problem).

## 5. Permissions Matrix

| Feature | User | Vendor | Admin |
|---------|------|--------|-------|
| Book Tanker | Yes | No | No |
| View Own Bookings | Yes | Yes | Yes |
| Manage Tankers | No | Yes | Yes |
| Approve Vendors | No | No | Yes |
| Update Pricing | No | No | Yes |
| Live Tracking | Yes | Yes | Yes |
| Complete Delivery | No | Yes | Yes |

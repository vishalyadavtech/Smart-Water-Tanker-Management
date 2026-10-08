# AquaRoute API Documentation

## 1. Authentication & OTP

### Send OTP
- **Endpoint:** `POST /api/auth/send-otp`
- **Request:**
```json
{
  "phone": "+919876543210"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully. Valid for 5 minutes."
}
```

### Verify OTP
- **Endpoint:** `POST /api/auth/verify-otp`
- **Request:**
```json
{
  "phone": "+919876543210",
  "otp": "123456",
  "role": "user",
  "name": "John Doe"
}
```
- **Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid-123",
    "name": "John Doe",
    "phone": "+919876543210",
    "role": "user",
    "token": "jwt-token-here"
  }
}
```

## 2. User & Vendor Registration

### Register Vendor
- **Endpoint:** `POST /api/vendors/register`
- **Request:**
```json
{
  "userId": "uuid-123",
  "businessName": "Aqua Fresh Services",
  "gstNumber": "22AAAAA0000A1Z5"
}
```
- **Response:**
```json
{
  "success": true,
  "vendor": {
    "id": "vendor-uuid-456",
    "isApproved": false
  }
}
```

## 3. Tanker Management

### Get Tanker Packages
- **Endpoint:** `GET /api/tankers/packages`
- **Response:**
```json
[
  { "id": "p1", "capacity": 5000, "price": 1500, "label": "Standard Tanker" },
  { "id": "p2", "capacity": 10000, "price": 2800, "label": "Large Tanker" }
]
```

### Update Tanker GPS
- **Endpoint:** `PATCH /api/tankers/:id/location`
- **Request:**
```json
{
  "latitude": 19.2813,
  "longitude": 72.8557,
  "speed": 45.5
}
```

## 4. Bookings & Delivery

### Create Booking
- **Endpoint:** `POST /api/bookings`
- **Request:**
```json
{
  "userId": "uuid-123",
  "address": "123, Ocean Drive, Mumbai",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "quantityLiters": 5000,
  "scheduledTime": "2026-03-29T10:00:00Z"
}
```

### Assign Booking (Admin Only)
- **Endpoint:** `PATCH /api/bookings/:id/assign`
- **Request:**
```json
{
  "vendorId": "vendor-uuid-456",
  "tankerId": "tanker-uuid-789"
}
```

### Vendor Action (Accept/Reject)
- **Endpoint:** `PATCH /api/bookings/:id/status`
- **Request:**
```json
{
  "status": "assigned",
  "vendorId": "vendor-uuid-456"
}
```

### Start Trip
- **Endpoint:** `PATCH /api/bookings/:id/start`
- **Response:**
```json
{
  "success": true,
  "status": "on_the_way"
}
```

### Complete Delivery
- **Endpoint:** `PATCH /api/bookings/:id/complete`
- **Request:**
```json
{
  "paymentMethod": "upi",
  "transactionId": "txn_987654321"
}
```

## 5. Tracking & Notifications

### Get Live Tracking
- **Endpoint:** `GET /api/bookings/:id/tracking`
- **Response:**
```json
{
  "tankerId": "tanker-uuid-789",
  "currentLocation": { "lat": 19.2813, "lng": 72.8557 },
  "estimatedArrival": "2026-03-29T10:15:00Z"
}
```

### Get Notifications
- **Endpoint:** `GET /api/notifications?userId=uuid-123`

## 6. Admin Controls

### Update Pricing
- **Endpoint:** `PATCH /api/admin/settings`
- **Request:**
```json
{
  "base_price_per_1000L": "550",
  "platform_fee": "60"
}
```

### Approve Vendor
- **Endpoint:** `PATCH /api/vendors/:id/approve`
- **Request:**
```json
{
  "isApproved": true
}
```

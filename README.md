# Rental & Property Management System

## Overview

A full-stack **MERN** (MongoDB, Express, React, Node.js) application designed to streamline property management operations. The system facilitates seamless communication between **landlords** and **tenants**, providing tools for property management, lease tracking, rent collection, maintenance requests, and automated notifications.

---

##  Key Features

### **Authentication & User Management**
- **Role-based authentication** (Tenant & Landlord roles)
- **Secure login** using phone number and password
- **JWT token-based** authentication with HTTP-only cookies
- **Password encryption** with bcryptjs for enhanced security
- **User registration** with role assignment

###  **Property Management**
- **Create, Read, Update, Delete** (CRUD) properties
- **Landlord-only property creation** with ownership verification
- **Property details** including title, price, location, and images
- **Tenant assignment** to properties with automatic date tracking
- **Availability status** tracking (available/occupied)
- **Next rent due** date calculation and management
- **Property listing** with public visibility for browsing

###  **Lease Management**
- **Create and manage leases** between landlords and tenants
- **Lease terms** documentation and storage
- **Lease status tracking** (active, terminated, expired)
- **Start and end date** management
- **Rent amount** specification per lease
- **Payment tracking** with isPaid flag

###  **Payment & Rent Collection**
- **Initiate rent payments** from tenants
- **Real-time payment tracking** with transaction IDs
- **Payment status monitoring** (pending, success, failed)
- **SMS notifications** to both tenants and landlords upon payment initiation
- **Phone number verification** for payment collection
- **Amount validation** and property verification

###  **SMS Notifications System**
- **Integration with Africa's Talking** (SMS gateway) for real-time notifications
- **Automated rent reminders** sent via SMS to tenants
- **Overdue payment notifications** (8th of each month)
- **Payment confirmation** messages
- **Landlord notifications** about tenant payments
- **Phone formatting** for international numbers (Kenya +254)

###  **Maintenance Request System**
- **Tenants can submit** maintenance requests for issues
- **Issue tracking** with status updates (pending, in-progress, resolved)
- **Property-linked requests** for landlord identification
- **Role-based access** - tenants see only their requests, landlords see all
- **Real-time status updates** for transparency
- **Automatic timestamps** for request tracking

###  **Automated Rent Reminders (Cron Jobs)**
- **Scheduled daily execution** at midnight (0 0 * * *)
- **1st of month reminder** - payment reminder to tenants
- **8th of month notification** - overdue payment alert
- **Automatic filtering** of occupied properties only
- **Formatted phone numbers** for international SMS delivery
- **Zero-downtime operation** with background scheduling

###  **Management Dashboard (Frontend)**
- **Tenant Dashboard** - view leases, make payments, submit maintenance requests, manage profile
- **Landlord Dashboard** - manage properties, track payments, monitor maintenance requests, view analytics
- **Protected routes** based on user roles
- **Responsive UI** with Tailwind CSS and ShadCN components
- **Modern design** with React and Vite

---

##  Technology Stack

### **Backend**
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **MongoDB** | NoSQL database for data storage |
| **Mongoose** | ODM for MongoDB |
| **JWT (jsonwebtoken)** | Secure token-based authentication |
| **bcryptjs** | Password hashing & security |
| **node-cron** | Automated scheduled tasks (rent reminders) |
| **Africa's Talking SDK** | SMS gateway integration |
| **CORS** | Cross-Origin Resource Sharing |
| **Cookie-parser** | HTTP cookie parsing |
| **dotenv** | Environment variable management |
| **Nodemon** | Development server auto-reload |

### **Frontend**
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router 7** | Client-side routing |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **ShadCN/UI** | Pre-built accessible components |
| **Sonner** | Toast notifications |
| **Lucide React** | Icon library |
| **TypeScript** | Type-safe development (in UI components) |
| **Radix UI** | Headless component primitives |

---

##  Project Structure

```
rental-n-property-management/
│
├──  Backend (Root Level)
│   ├── config/
│   │   ├── at.js              # Africa's Talking SMS configuration
│   │   └── db.js              # MongoDB connection setup
│   │
│   ├── controllers/
│   │   ├── authController.js  # Login/authentication logic
│   │   └── paymentController.js # Payment processing logic
│   │
│   ├── models/
│   │   ├── User.js            # User schema (tenants & landlords)
│   │   ├── Property.js        # Property schema with landlord/tenant links
│   │   ├── Lease.js           # Lease agreement schema
│   │   ├── Payment.js         # Payment transaction schema
│   │   ├── Maintenance.js     # Maintenance request schema
│   │   ├── Booking.js         # Booking schema
│   │   └── Transaction.js     # Transaction history schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   ├── propertyRoutes.js  # Property CRUD endpoints
│   │   ├── paymentRoutes.js   # Payment processing endpoints
│   │   ├── leaseRoutes.js     # Lease management endpoints
│   │   ├── maintenanceRoutes.js # Maintenance request endpoints
│   │   ├── bookingRoutes.js   # Booking endpoints
│   │   └── atRoutes.js        # Africa's Talking webhook handlers
│   │
│   ├── middleware/
│   │   ├── authmiddleware.js  # JWT token verification
│   │   └── landlordOnly.js    # Landlord-only route protection
│   │
│   ├── Crons/
│   │   └── rentReminders.js   # Automated rent reminder jobs
│   │
│   ├── server.js              # Main server entry point
│   ├── seedUser.js            # Database seeding script
│   ├── testSms.js             # SMS testing utility
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables (create this)
│
├── 📁 Frontend (Management-dashboard/)
│   ├── src/
│   │   ├── Pages/
│   │   │   ├── Dashboard.jsx      # Main tenant/landlord dashboard
│   │   │   ├── LandlordDashboard.jsx # Landlord-specific dashboard
│   │   │   ├── addProperty.jsx    # Add new property form
│   │   │   ├── Properties.jsx     # Property listing
│   │   │   ├── propertyDetails.jsx # Single property details
│   │   │   ├── Payments.jsx       # Payment management page
│   │   │   ├── Lease.jsx          # Lease management page
│   │   │   ├── Maintainance.jsx   # Maintenance requests page
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Register.jsx       # User registration
│   │   │   └── Home.jsx           # Home landing page
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── Sidebar.jsx        # Sidebar navigation
│   │   │   ├── propertyCard.jsx   # Property display card
│   │   │   ├── propertyForm.jsx   # Property creation form
│   │   │   ├── paymentForm.jsx    # Payment initialization form
│   │   │   ├── propertyFormDialog.jsx # Modal form wrapper
│   │   │   ├── GoBackButton.jsx   # Navigation back button
│   │   │   ├── LogoutButton.jsx   # Logout functionality
│   │   │   ├── ProtectedRoute.jsx # Role-based route protection
│   │   │   ├── Loader.jsx         # Loading spinner
│   │   │   └── ui/                # ShadCN UI components (button, card, input, etc.)
│   │   │
│   │   ├── services/
│   │   │   ├── api.js             # Axios API client setup
│   │   │   ├── authService.js     # Authentication API calls
│   │   │   ├── propertyService.js # Property-related API calls
│   │   │   ├── paymentService.js  # Payment API calls
│   │   │   ├── leaseService.js    # Lease API calls
│   │   │   └── maintainanceService.js # Maintenance API calls
│   │   │
│   │   ├── context/
│   │   │   └── authContext.jsx    # Global authentication state
│   │   │
│   │   ├── utils/
│   │   │   └── useApi.js          # Custom hook for API calls
│   │   │
│   │   ├── layout/
│   │   │   └── DashboardLayout.jsx # Layout wrapper for authenticated pages
│   │   │
│   │   ├── lib/
│   │   │   └── utils.ts           # Utility functions
│   │   │
│   │   ├── App.jsx               # Main app component with routing
│   │   ├── main.jsx              # React DOM rendering
│   │   └── index.css             # Global styles
│   │
│   ├── public/                   # Static assets
│   ├── vite.config.js            # Vite build configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── package.json              # Frontend dependencies
│   └── README.md                 # Frontend-specific documentation
│
└── Rental.md                     # (Empty - project notes)
```

---

##  Installation & Setup

### **Prerequisites**
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud-hosted like MongoDB Atlas)
- **Africa's Talking account** for SMS integration
- **Environment variables** configured

### **Backend Setup**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file** in root directory:
   ```env
   # MongoDB Connection
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rental-db

   # JWT Secret Key
   JWT_SECRET=your-super-secret-jwt-key-change-in-production

   # Africa's Talking SMS Gateway
   AT_API_KEY=your-africas-talking-api-key
   AT_USERNAME=your-africas-talking-username

   # Server Port
   PORT=5000

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the backend server:**
   ```bash
   # Development mode (with auto-reload)
   npm start

   # Or direct execution
   npm run dev
   ```

   Server runs at `http://localhost:5000`

### **Frontend Setup**

1. **Navigate to frontend directory:**
   ```bash
   cd Management-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (if needed):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Frontend runs at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

---

##  API Endpoints

### **Authentication Endpoints** (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|-----------------|
| POST | `/login` | Login with phone & password | No |
| POST | `/register` | Register new user | No |
| POST | `/logout` | Logout user & clear cookie | Yes |

### **Property Endpoints** (`/api/properties`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---|---|
| GET | `/` | Get all properties (public) | No | - |
| GET | `/:id` | Get single property details | No | - |
| POST | `/` | Create new property | Yes | Landlord |
| PUT | `/:id` | Update property | Yes | Landlord (owner) |
| DELETE | `/:id` | Delete property | Yes | Landlord (owner) |
| PATCH | `/:id/assign-tenant` | Assign tenant to property | Yes | Landlord |

### **Lease Endpoints** (`/api/leases`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---|---|
| GET | `/` | Get all leases | Yes | Both |
| GET | `/:id` | Get single lease | Yes | Both |
| POST | `/` | Create new lease | Yes | Landlord |
| PUT | `/:id` | Update lease | Yes | Landlord |
| DELETE | `/:id` | Delete lease | Yes | Landlord |

### **Payment Endpoints** (`/api/payments`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---|---|
| POST | `/initiate` | Initiate rent payment | Yes | Tenant |
| GET | `/` | Get payment history | Yes | Both |
| GET | `/:id` | Get payment details | Yes | Both |
| PATCH | `/:id/confirm` | Confirm payment completion | Yes | Landlord |

### **Maintenance Endpoints** (`/api/maintenance`)
| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---|---|
| GET | `/` | Get maintenance requests | Yes | Both |
| POST | `/` | Create maintenance request | Yes | Tenant |
| PATCH | `/:id` | Update request status | Yes | Landlord |

### **Africa's Talking Endpoints** (`/api/at`)
| Method | Endpoint | Description | Purpose |
|--------|----------|-------------|---------|
| POST | `/webhook` | SMS delivery callback | Webhook for delivery receipts |
| POST | `/dlr` | Delivery receipt handler | Confirm SMS delivery status |

---

##  Authentication Flow

### **Login Process**
1. User enters phone number & password
2. Server finds user in MongoDB
3. Password verified with bcryptjs
4. JWT token generated (24-hour expiry)
5. Token stored in **HTTP-only cookie** (prevents XSS attacks)
6. User redirected to dashboard

### **Authorization**
- JWT verified on each protected request via `authmiddleware.js`
- User role checked for role-specific operations via `landlordOnly.js`
- Token expires after 24 hours (re-login required)

---

##  Payment Flow

### **Rent Payment Process**
1. **Tenant initiates payment** via dashboard
2. **Payment record created** in MongoDB (status: pending)
3. **SMS sent to tenant** with transaction ID
4. **SMS sent to landlord** notifying of payment
5. **Payment status updated** when gateway confirms
6. **History recorded** for audit trail

### **Supported Payment Methods**
- Africa's Talking M-Pesa integration (can be extended)
- Transaction ID tracking
- Amount validation
- Property verification

---

##  SMS Notification System

### **Africa's Talking Integration**
- **Real-time SMS delivery** to registered phone numbers
- **Formatted international numbers** (e.g., +254 for Kenya)
- **Webhook handling** for delivery receipts

### **Automated Notifications**
| Trigger | Recipient | Message | Timing |
|---------|-----------|---------|--------|
| **Rent Reminder** | Tenant | "Rent for [Property] is due this month" | 1st of month |
| **Overdue Alert** | Tenant | "Rent payment overdue for [Property]" | 8th of month |
| **Payment Initiated** | Both | "Payment of KES [amount] initiated/confirmed" | On payment |
| **Maintenance Update** | Tenant | "[Issue] status updated to [status]" | On status change |

---

##  Automated Tasks (Cron Jobs)

### **Rent Reminder System** (`Crons/rentReminders.js`)
- **Execution:** Daily at midnight (0 0 * * *)
- **1st of Month:** Courtesy reminder sent to tenants
- **8th of Month:** Overdue payment alert
- **Processing:** Only occupied properties with active leases
- **Phone Formatting:** Automatic international format conversion

##  Security Features

### **Implemented**
✅ **JWT Authentication** - Token-based session management  
✅ **HTTP-Only Cookies** - Prevents XSS attacks  
✅ **Password Hashing** - bcryptjs with salt rounds  
✅ **Role-Based Access Control** - Landlord/Tenant separation  
✅ **CORS Protection** - Restricted origins  
✅ **Environment Variables** - Secure sensitive data  
✅ **Input Validation** - Request data validation  
✅ **Ownership Verification** - Landlords can only modify own properties  

##  Testing

### **Backend Testing**
```bash
# Test SMS functionality
node testSms.js

# Seed test data
node seedUser.js
```

### **Frontend Testing**
```bash
# Run linter
npm run lint

# Build and preview
npm run build && npm run preview
```

---

##  Troubleshooting

### **SMS Not Sending**
- ✓ Verify Africa's Talking credentials in `.env`
- ✓ Check phone number format (should be +254XXXXXXXXX)
- ✓ Ensure account has SMS credits
- ✓ Review cron job logs in console

### **Authentication Issues**
- ✓ Clear browser cookies: `Application > Cookies > Delete`
- ✓ Verify JWT_SECRET is set in `.env`
- ✓ Check token expiry (24 hours)
- ✓ Ensure credentials are correct

### **Database Connection Failed**
- ✓ Verify MONGO_URI in `.env`
- ✓ Check MongoDB is running (local) or accessible (cloud)
- ✓ Verify IP whitelisting (MongoDB Atlas)
- ✓ Check network connection

### **CORS Errors**
- ✓ Ensure frontend URL matches CORS origin in `server.js`
- ✓ Verify cookies are set with `credentials: true`
- ✓ Check that requests include `withCredentials: true`

---

##  Usage Examples

### **Creating a Property (Landlord)**
```javascript
// Landlord creates property
POST /api/properties
{
  "Title": "Modern Apartment",
  "price": 15000,
  "location": "Nairobi, Kenya",
  "images": ["url1", "url2"]
}
// Response includes landlordID auto-populated
```

### **Assigning Tenant to Property**
```javascript
// Landlord assigns tenant
PATCH /api/properties/:propertyId/assign-tenant
{
  "tenantID": "userId"
}
// Property marked unavailable, nextRentDue calculated
```

### **Initiating Payment**
```javascript
// Tenant pays rent
POST /api/payments/initiate
{
  "phone": "0712345678",
  "amount": 15000,
  "propertyID": "propertyId"
}
// SMS sent to tenant & landlord with transaction ID
```

### **Submitting Maintenance Request**
```javascript
// Tenant reports issue
POST /api/maintenance
{
  "propertyID": "propertyId",
  "issue": "Leaking roof in master bedroom"
}
// Request created with pending status
```

---

##  Support & Contact

For issues, questions, or suggestions:
-  Email: support@rentalproperty.dev
-  Report bugs via GitHub Issues
-  Join our community Slack/Discord (to be created)

---

<div align="center">

### Built with using MERN Stack

*Making property management simple, secure, and scalable*

</div>

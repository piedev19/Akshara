# 🏫 Vidya Vihar International School — MERN Stack Website

A fully-featured, production-ready school website built with MongoDB, Express, React, and Node.js.

---

## 📁 Project Structure

```
school-website/
├── client/                  # React frontend (CRA)
│   ├── public/
│   │   └── index.html       # SEO-optimised HTML with structured data
│   └── src/
│       ├── components/
│       │   ├── common/      # Navbar, Footer, FloatingAdmission, Loader
│       │   └── home/        # Hero, WhyUs, FacilitiesShowcase, AchieversPreview,
│       │                    # QuickAdmission, BoardOfDirectors, Testimonials, NewsStrip
│       ├── pages/           # Home, About, Academics, Admissions, Contact,
│       │                    # Transport, Hostel, Gallery, News, AdmissionStatus, NotFound
│       ├── utils/
│       │   └── api.js       # Axios with interceptors + all API modules
│       ├── App.js           # Routes with lazy loading + AnimatePresence
│       └── index.css        # Full design system (Navy/Gold theme)
│
└── server/                  # Express backend
    ├── models/              # Admission, Contact, Achiever, News (Mongoose)
    ├── routes/              # admissions, contact, gallery, news, transport, hostel, admin
    ├── utils/
    │   ├── emailService.js  # Nodemailer with HTML templates
    │   ├── cronJobs.js      # Automated reminders & weekly summaries
    │   └── sitemap.js       # Dynamic XML sitemap
    ├── index.js             # Main server with all middleware
    └── .env.example         # Environment variable template
```

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourorg/school-website.git
cd school-website
npm install          # installs root concurrently
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
# Edit .env with your values:
# - MONGO_URI (MongoDB Atlas or local)
# - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (Gmail App Password recommended)
# - ADMIN_EMAIL, ADMIN_PASSWORD
# - CLIENT_URL (http://localhost:3000 for dev)
```

### 3. Run in Development

```bash
# From root directory:
npm run dev
# Starts both server (port 5000) and React client (port 3000) concurrently
```

---

## 🚀 Deployment

### Option A: Full-Stack on a VPS (Ubuntu + PM2 + Nginx)

```bash
# 1. Build the React frontend
cd client && npm run build

# 2. Serve build files from Express (add to server/index.js):
# app.use(express.static(path.join(__dirname, '../client/build')));
# app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

# 3. Start with PM2
npm install -g pm2
cd server && pm2 start index.js --name "school-server"
pm2 startup && pm2 save

# 4. Configure Nginx reverse proxy
# server {
#     listen 80;
#     server_name vidyavihar.edu.in www.vidyavihar.edu.in;
#     location / { proxy_pass http://localhost:5000; }
# }

# 5. SSL with Let's Encrypt
# certbot --nginx -d vidyavihar.edu.in
```

### Option B: Separate Hosting
- **Frontend**: Deploy `client/build` to Vercel, Netlify, or AWS S3+CloudFront
- **Backend**: Deploy `server/` to Railway, Render, or AWS EC2
- Set `REACT_APP_API_URL` in Vercel/Netlify to your backend URL

### Option C: Docker (add docker-compose.yml)
```yaml
version: '3.8'
services:
  mongo:
    image: mongo:7
    volumes: [mongo_data:/data/db]
  server:
    build: ./server
    env_file: ./server/.env
    ports: ["5000:5000"]
    depends_on: [mongo]
  client:
    build: ./client
    ports: ["3000:80"]
volumes:
  mongo_data:
```

---

## ✨ Features

### 🎨 Frontend
| Feature | Details |
|---------|---------|
| **Design System** | Navy + Gold theme, Playfair Display + DM Sans fonts |
| **Hero Section** | Auto-sliding 3-panel with stats bar |
| **News Ticker** | Real-time scrolling announcements |
| **Facilities Explorer** | Interactive tabbed facility showcase |
| **Board of Directors** | Quotes + credentials for 4 members |
| **Testimonials** | Auto-playing carousel with 6 parent/alumni quotes |
| **Admissions Form** | 5-step form with transport + hostel options |
| **Gallery** | Filterable masonry grid with lightbox |
| **Transport Page** | Route explorer with stops timeline |
| **Hostel Page** | Occupancy bar, meal schedule, warden info |
| **Status Tracker** | Real-time application status with timeline |
| **Floating CTA** | Pop-up admission reminder after 5 seconds |
| **404 Page** | Branded with navigation links |
| **Responsive** | Fully mobile-first, breakpoints at 480/640/768/900/1024/1200px |

### 🔧 Backend
| Feature | Details |
|---------|---------|
| **Admissions API** | Submit, check status, available seats |
| **Auto App Numbers** | Format: ADM20260001, unique per submission |
| **Email Confirmation** | Beautiful HTML templates via Nodemailer |
| **Admin Dashboard** | JWT-protected routes for managing applications |
| **Status Updates** | Email notification on status change |
| **Cron Jobs** | Daily reminders + weekly admin summary |
| **Rate Limiting** | 5 applications/hour, 10 contacts/15min per IP |
| **SEO Sitemap** | Dynamic XML at /sitemap.xml |
| **Transport API** | 5 routes with stops, fees, timings |
| **Hostel API** | Occupancy, facilities, rules, mealtimes |
| **Security** | Helmet, CORS, express-validator on all inputs |

---

## 🔑 Admin Access

Visit `/api/admin/login` with `POST`:
```json
{ "email": "admin@yourschool.edu.in", "password": "your_admin_password" }
```
Returns a JWT token for use in `Authorization: Bearer <token>` header.

Admin endpoints:
- `GET /api/admin/admissions` — List all applications (filterable)
- `PATCH /api/admin/admissions/:id/status` — Update status (triggers email)
- `GET /api/admin/stats` — Dashboard statistics

---

## 📧 Email Setup (Gmail)

1. Enable 2FA on Gmail account
2. Go to Google Account → Security → App Passwords
3. Create an App Password for "Mail"
4. Use it as `SMTP_PASS` in `.env`

---

## 🌐 SEO Features

- Semantic HTML5 throughout
- `react-helmet-async` for dynamic meta tags per page
- JSON-LD structured data (Schema.org School type)
- Dynamic XML sitemap at `/sitemap.xml`
- Open Graph & Twitter Card tags
- Canonical URLs
- Image alt tags on all photos

---

## 📱 Social Media Links to Update

In `Footer.jsx` and `Contact.js`, replace:
- `https://instagram.com` → Your Instagram URL
- `https://facebook.com` → Your Facebook URL
- `https://youtube.com` → Your YouTube Channel URL

---

## 🔄 Scalability Notes

- All data models use Mongoose with timestamps
- Routes are modular — add new routes by creating a file in `server/routes/`
- React pages are lazy-loaded — add new pages by creating a file in `src/pages/`
- Design system uses CSS variables — rebrand by changing 6 variables in `index.css`
- Email templates are in `utils/emailService.js` — easy to customise

---

## 📞 Support

For questions about this codebase, contact the development team.
For school admissions: **+91 98765 43210** | **admissions@vidyavihar.edu.in**

# ITSS 2 - Job Finder

Ứng dụng tuyển dụng công việc hiện đại với giao diện người dùng thân thiện và API backend mạnh mẽ.

## 📋 Tổng Quan Dự Án

**ITSS 2 Jobs** là một nền tảng tuyển dụng trực tuyến cung cấp cho người tìm việc khả năng:
- 🔍 Tìm kiếm công việc với các bộ lọc nâng cao
- 💾 Lưu công việc yêu thích
- 📄 Xem chi tiết thông tin công việc
- 🏢 Khám phá các công ty và vị trí tuyển dụng

**Công nghệ**: React + TypeScript + Express.js + MongoDB

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 (vanilla)
- **API Client**: Fetch API
- **Routing**: React Router
- **Linting**: ESLint

**Dependencies chính:**
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x"
}
```

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **API Documentation**: Swagger/OpenAPI
- **Linting**: ESLint

**Dependencies chính:**
```json
{
  "express": "^4.x",
  "mongoose": "^7.x",
  "typescript": "^5.x"
}
```

### Tools
- **Python**: Script automation (nếu cần)

---

## 📁 Cấu Trúc Dự Án

```
ITSS_2_Jobs/
├── FE/                          # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── app/                 # Application shell
│   │   ├── components/          # Reusable React components
│   │   │   ├── jobs/            # Job-related components
│   │   │   └── layout/          # Layout components
│   │   ├── pages/               # Page components
│   │   ├── lib/                 # Utilities & API client
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript type definitions
│   │   └── utils/               # Helper functions
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── BE/                          # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── app.ts               # Express app setup
│   │   ├── server.ts            # Server entry point
│   │   ├── config/              # Configuration files
│   │   │   ├── db.ts            # Database connection
│   │   │   └── swagger.ts        # Swagger documentation
│   │   ├── controllers/         # Route handlers
│   │   ├── models/              # Database schemas
│   │   ├── routes/              # API routes
│   │   └── utils/               # Helper functions
│   ├── package.json
│   ├── tsconfig.json
│   └── docs/
│       └── detail-api-design/   # API documentation
│
├── Script/                      # Automation scripts
│   └── Script.py
│
└── README.md                    # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 hoặc cao hơn)
- **npm** hoặc **yarn**
- **MongoDB** (local hoặc cloud service)
- **Python** 3.7+ (nếu sử dụng scripts)

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd ITSS_2_Jobs
```

### Bước 2: Cài Đặt Backend

```bash
cd BE

# Cài đặt dependencies
npm install

# Tạo file .env (nếu cần)
# API_PORT=5000
# MONGODB_URI=mongodb://localhost:27017/itss-jobs

# Chạy development server
npm run dev

# Hoặc build production
npm run build
npm start
```

**API sẽ chạy tại:** `http://localhost:5000/api`

**Swagger Docs:** `http://localhost:5000/api-docs` (nếu được cấu hình)

### Bước 3: Cài Đặt Frontend

```bash
cd ../FE

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

**Frontend sẽ chạy tại:** `http://localhost:5173` (Vite default)

### Bước 4: Cấu Hình Biến Môi Trường

**Backend (.env)**
```env
API_PORT=5000
MONGODB_URI=mongodb://localhost:27017/itss-jobs
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=https://itss-2-jobs.onrender.com/api
```

---

## 📦 Các Script Có Sẵn

### Frontend

```bash
# Development
npm run dev              # Chạy dev server

# Build
npm run build            # Build production
npm run preview          # Preview build

# Linting
npm run lint             # Kiểm tra linting
npm run lint:fix         # Sửa linting issues
```

### Backend

```bash
# Development
npm run dev              # Chạy dev server với hot reload

# Build & Run
npm run build            # Build TypeScript
npm start                # Chạy production server

# Linting
npm run lint             # Kiểm tra linting
```

---

## 🔌 API Endpoints

### Jobs
- `GET /api/jobs` - Lấy danh sách công việc (có pagination)
- `GET /api/jobs/search` - Tìm kiếm công việc
- `GET /api/jobs/:id` - Lấy chi tiết công việc

### Skills
- `GET /api/skills` - Lấy danh sách kỹ năng

### Health Check
- `GET /api/health` - Kiểm tra server status

*Xem chi tiết API tại: [BE/docs/detail-api-design/jobs-api.md](BE/docs/detail-api-design/jobs-api.md)*

---

## 📱 Features

- ✅ Danh sách công việc với pagination
- ✅ Tìm kiếm công việc theo từ khóa
- ✅ Lọc công việc (vị trí, kỹ năng, địa điểm, loại công việc, v.v.)
- ✅ Xem chi tiết công việc
- ✅ Responsive Design (mobile-friendly)
- ✅ API Documentation

### Planned Features
- 📝 Lưu công việc yêu thích (localStorage/backend)
- 👤 Authentication & User Profiles
- 📧 Email notifications
- ⭐ Job ratings & reviews

---

## 🏗️ Project Structure

### Frontend Components
- `JobSearchBar` - Thanh tìm kiếm công việc
- `JobFilterPanel` - Bộ lọc nâng cao
- `JobCard` - Thẻ hiển thị công việc
- `Pagination` - Phân trang
- `SiteHeader` - Navigation header

### Backend Controllers
- `jobController` - Xử lý logic công việc

### Database Models
- `Job` - Schema công việc
- `Skill` - Schema kỹ năng
- `Major` - Schema ngành học

---

## 🔍 Development

### Debugging
- Frontend: Sử dụng Chrome DevTools
- Backend: Sử dụng VS Code Debugger hoặc console.log

### Code Quality
- ESLint: Đảm bảo style consistency
- TypeScript: Type safety

---

## 📝 License

Dự án này là phần của ITSS (Internship Training for Software Specialist) Program.

---

## 👥 Support

Để báo cáo vấn đề hoặc đề xuất tính năng, vui lòng tạo issue trong repository.

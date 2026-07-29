# 🌿 Thanh Hương Nam Kỳ - Web Application

Dự án Web Application dành cho hệ thống **Thanh Hương Nam Kỳ**, được xây dựng trên nền tảng **React 19 + Vite 7 + TypeScript + Tailwind CSS**.

---

## 📋 Mục lục
1. [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
2. [Cài đặt & Chạy Local](#-cài-đặt--chạy-local)
3. [Hướng dẫn Deploy lên Vercel](#-hướng-dẫn-deploy-lên-vercel)
4. [Cấu trúc dự án](#-cấu-trúc-dự-án)
5. [Danh sách câu lệnh (Scripts)](#-danh-sách-câu-lệnh-scripts)

---

## ⚙️ Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:
- **Node.js**: phiên bản `>= 18.0.0` (khuyên dùng Node.js LTS v20 hoặc v22).
- **npm**: phiên bản `>= 9.0.0` (đi kèm sẵn khi cài Node.js).

Kiểm tra phiên bản bằng lệnh:
```bash
node -v
npm -v
```

---

## 🚀 Cài đặt & Chạy Local

### Bước 1: Clone Repository & Truy cập thư mục dự án
```bash
git clone <URL_REPOSITORY_CỦA_DỰ_ÁN>
cd thanhhuongnamky
```

### Bước 2: Cài đặt các gói phụ thuộc (Dependencies)
```bash
npm install
```

### Bước 3: Chạy ứng dụng ở môi trường Development
```bash
npm run dev
```
Sau khi chạy thành công, ứng dụng sẽ mở tại địa chỉ: **`http://localhost:5173`** (hoặc cổng hiển thị trên Terminal).

### Bước 4: Kiểm tra Build & Type Check
Trước khi push code hoặc deploy, hãy chạy lệnh build để đảm bảo không bị lỗi TypeScript hoặc lỗi đóng gói:
```bash
npm run build
```
Kết quả build ra thư mục `/dist`. Bạn có thể chạy `npm run preview` để kiểm tra bản build chạy local.

---

## 🌐 Hướng dẫn Deploy lên Vercel

Dự án đã được cấu hình sẵn file `vercel.json` để hỗ trợ **Client-side Routing (React Router)** trên Vercel, tránh bị lỗi **404 Page Not Found** khi người dùng truy cập trực tiếp URL hoặc nhấn Refresh (F5).

Có 2 cách chính để deploy:

### Cách 1: Deploy tự động qua Vercel Dashboard (Khuyên dùng cho Đội ngũ / CI-CD)

1. **Push code lên Repository** (GitHub, GitLab, hoặc Bitbucket).
2. **Đăng nhập Vercel**: Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản team.
3. **Tạo mới Project**:
   - Nhấn **Add New...** -> **Project**.
   - Chọn repository `thanhhuongnamky` từ danh sách.
4. **Cấu hình Project Settings**:
   - **Framework Preset**: Chọn `Vite` (Vercel thường tự nhận diện).
   - **Root Directory**: `./` (để mặc định).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Environment Variables**: Nhập các biến môi trường (nếu có).
5. **Deploy**:
   - Nhấn nút **Deploy**. Vercel sẽ tự động build và tạo ra đường dẫn công khai (domain preview & production).
   - Mọi commit mới push lên nhánh chính (`main`/`master`) sẽ tự động trigger tự động deploy bản mới.

---

### Cách 2: Deploy trực tiếp qua Vercel CLI (Dành cho Developer)

#### 1. Cài đặt Vercel CLI toàn cục:
```bash
npm install -g vercel
```

#### 2. Đăng nhập vào tài khoản Vercel:
```bash
vercel login
```

#### 3. Deploy bản Preview (Dùng để kiểm thử nhanh):
Chạy lệnh sau tại thư mục gốc của dự án:
```bash
vercel
```
Lần đầu chạy, Vercel CLI sẽ hỏi một số câu hỏi thiết lập:
- `Set up and deploy "~/thanhhuongnamky"?` -> Gõ `y`
- `Which scope do you want to deploy to?` -> Chọn tài khoản/team tương ứng
- `Link to existing project?` -> Chọn `n` (nếu là project mới)
- `What's your project's name?` -> Nhập `thanh-nam-huong-ky` hoặc nhấn Enter
- `In which directory is your code located?` -> Nhấn Enter (`./`)
- Auto-detected Project Settings: Nhấn Enter để đồng ý mặc định (`Vite`).

#### 4. Deploy lên Production chính thức:
Khi code đã sẵn sàng để phát hành chính thức:
```bash
vercel --prod
```

---

## 📁 Cấu trúc dự án

```text
thanhhuongnamky/
├── public/                 # Tài nguyên tĩnh (images, icons, fonts)
├── src/
│   ├── app/                # Provider, Router chính
│   ├── features/           # Phân chia tính năng theo nghiệp vụ
│   │   ├── consumer/       # Giao diện & xử lý cho Khách hàng
│   │   ├── producer/       # Giao diện & xử lý cho Nhà sản xuất
│   │   └── role-selection/ # Màn hình chọn vai trò người dùng
│   ├── shared/             # Components, Hooks, Utilities dùng chung
│   ├── main.tsx            # Entry point chính của React App
│   └── vite-env.d.ts       # Type definitions cho Vite
├── index.html              # HTML template
├── package.json            # Quản lý dependencies & scripts
├── tailwind.config.js      # Cấu hình giao diện Tailwind CSS
├── tsconfig.json           # Cấu hình TypeScript compiler
├── vercel.json             # Cấu hình SPA rewrites cho Vercel
└── vite.config.mjs         # Cấu hình Vite Bundler
```

---

## 🛠️ Danh sách câu lệnh (Scripts)

| Lệnh | Ý nghĩa & Tác dụng |
| :--- | :--- |
| `npm run dev` | Khởi chạy máy chủ phát triển (Development Server) với HMR. |
| `npm run build` | Thực hiện kiểm tra kiểu dữ liệu TypeScript (`tsc`) và đóng gói mã nguồn sang thư mục `dist/`. |
| `npm run preview` | Khởi chạy web server chạy thử bản build sản xuất tại thư mục `dist/`. |

---

## 💡 Lưu ý quan trọng khi cập nhật code
- Mọi trang mới sử dụng React Router đều đã được hỗ trợ bởi [vercel.json](file:///c:/Data/FPT/thanhhuongnamky/vercel.json). Nếu thêm cấu hình API proxy hoặc redirect mới, cần bổ sung vào file `vercel.json`.
- Luôn chạy `npm run build` trước khi gửi Pull Request hoặc push code lên repository.

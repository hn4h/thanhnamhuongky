# 🌿 Thanh Hương Nam Kỳ - Web Application

Dự án Web Application dành cho hệ thống **Thanh Hương Nam Kỳ**, được xây dựng trên nền tảng **React 19 + Vite 7 + TypeScript + Tailwind CSS**.

---

## 📋 Mục lục
1. [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
2. [Cài đặt & Chạy Local](#-cài-đặt--chạy-local)
3. [Hướng dẫn Deploy lên Vercel](#-hướng-dẫn-deploy-lên-vercel)
4. [Cấu trúc dự án](#-cấu-trúc-dự-án)
5. [Hướng dẫn Chỉnh sửa & Cập nhật Nội dung](#-hướng-dẫn-chỉnh-sửa--cập-nhật-nội-dung)
6. [Danh sách câu lệnh (Scripts)](#-danh-sách-câu-lệnh-scripts)

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
│   │   ├── consumer/       # Giao diện & dữ liệu cho Khách hàng
│   │   ├── producer/       # Giao diện & dữ liệu cho Nhà sản xuất
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

## ✏️ Hướng dẫn Chỉnh sửa & Cập nhật Nội dung

Toàn bộ dữ liệu hiển thị (văn bản, thông tin sản phẩm, mẻ bánh, thông số IoT, quy trình chế biến) đều được **tách riêng vào các file cấu hình và dữ liệu rõ ràng**, giúp đội ngũ dễ dàng cập nhật mà không làm ảnh hưởng tới giao diện hay logic ứng dụng.

### 1. Thay đổi thông tin hiển thị cho Khách Hàng (Consumer Scan QR)
Vị trí file dữ liệu:
👉 **`src/features/consumer/shared/data/consumerData.ts`**

Trong file này, bạn có thể chỉnh sửa:
- **Thông tin sản phẩm**: Mã sản phẩm (`code`), tên (`name`), phân loại (`grade`), mã mẻ (`batch`), ngày sản xuất (`producedAt`), hạn sử dụng (`expiresAt`), địa chỉ cơ sở (`origin`), số chứng nhận (`certificate`).
- **Danh sách kiểm tra an toàn (`checks`)**: Các dòng cam kết chất lượng khi khách hàng quét mã thành công.
- **Quy trình chế biến / Truy xuất nguồn gốc (`timeline`)**:
  - Tiêu đề bước (`title`), ngày thực hiện (`date`), mô tả chi tiết (`detail`).
  - Các thông số IoT đo đạc thực tế (`iotData`: nhiệt độ, độ ẩm, tỷ lệ, áp suất...).
- **Gợi ý thưởng thức & Trà đi kèm (`pairing`)**: Mô tả hương vị, trà khuyên dùng.
- **Cam kết & Chứng nhận (`quality`)**: Tiêu chuẩn ISO/HACCP, chứng nhận OCOP...

---

### 2. Thay đổi dữ liệu Nhà Sản Xuất (Producer Dashboard, Cảnh báo & Mẻ Bánh)
Dữ liệu của từng dòng sản phẩm được lưu tại thư mục riêng dưới `src/features/producer/`:

- **Bánh Gai**:
  - Cấu hình chung & Theme: `src/features/producer/banh-gai/config.ts`
  - Chỉ số IoT & Danh sách mẻ bánh: `src/features/producer/banh-gai/data/index.ts`
- **Bánh Xíu Páo**:
  - Cấu hình chung: `src/features/producer/banh-xiu-pao/config.ts`
  - Dữ liệu mẻ & chỉ số: `src/features/producer/banh-xiu-pao/data/index.ts`
- **Bánh Đội**:
  - Cấu hình chung: `src/features/producer/doi/config.ts`
  - Dữ liệu mẻ & chỉ số: `src/features/producer/doi/data/index.ts`
- **Kẹo Xìu Châu**:
  - Cấu hình chung: `src/features/producer/keo-xiu-chau/config.ts`
  - Dữ liệu mẻ & chỉ số: `src/features/producer/keo-xiu-chau/data/index.ts`

**Các mục thường sửa trong `data/index.ts`**:
- `metrics`: Danh sách các chỉ số cảm biến (Nhiệt độ, Độ ẩm, Áp suất...) và **Đề xuất của AI** (`aiRecommendation`).
- `batches`: Danh sách các mẻ bánh (Trạng thái mẻ, số lượng, ngày khởi tạo, tiến độ %).
- `alerts`: Các cảnh báo hệ thống gửi tới nhà sản xuất (Mức độ nguy cơ `warning`/`critical`, nội dung cảnh báo).

---

### 3. Thêm mới hoặc Đổi tên/Theme màu sắc dòng sản phẩm
Đăng ký sản phẩm trong registry hệ thống:
- **Producer Registry**: `src/features/producer/shared/productRegistry.ts`
- **Consumer Registry**: `src/features/consumer/shared/productRegistry.ts`

Tại đây bạn có thể thay đổi: Tên hiển thị, mô tả ngắn, màu nền chủ đạo (`primary`, `accent`, `background`).

---

### 4. Thay đổi Hình ảnh, Banner & Logo
Vị trí thư mục chứa ảnh:
👉 **`public/images/`**

- `bg.png`: Hình nền ứng dụng.
- `Logo tách nền.png` & `logo.jpg`: Logo thương hiệu.
- `sign.png`: Chữ ký xác thực chứng nhận.

*Lưu ý*: Khi thay thế ảnh mới, giữ nguyên tên file hoặc cập nhật lại đường dẫn trong code tương ứng (ví dụ: `/images/bg.png`).

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
- Luôn chạy `npm run build` sau khi chỉnh sửa nội dung để đảm bảo không bị lỗi cú pháp TypeScript trước khi gửi Pull Request hoặc deploy.

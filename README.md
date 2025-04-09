
# Ứng Dụng Chat Tích Hợp AIMLAPI

Một ứng dụng chat đơn giản được xây dựng với Next.js, tích hợp AIMLAPI để tạo hội thoại thông minh sử dụng trí tuệ nhân tạo.

## Tính Năng

- Giao diện chat thời gian thực
- Phản hồi được hỗ trợ bởi AI sử dụng AIMLAPI
- Lưu lịch sử trò chuyện dưới định dạng CSV
- Giao diện hiện đại và đáp ứng tốt trên nhiều thiết bị

## Yêu Cầu Trước Khi Cài Đặt

- Đã cài đặt Node.js phiên bản 18 trở lên
- Tài khoản AIMLAPI và khóa API

## Cài Đặt

1. Clone kho mã nguồn:
```bash
git clone <your-repository-url>
cd chat-app
```

2. Cài đặt các thư viện phụ thuộc:
```bash
npm install
```

3. Tạo file `.env.local` trong thư mục gốc và thêm khóa AIMLAPI của bạn:
```
AIMLAPI_KEY=your_api_key_here
```

## Tích Hợp AIMLAPI

Dự án này sử dụng [AIMLAPI](https://aimlapi.com/app/) để cung cấp chức năng chat AI. Để bắt đầu:

1. Đăng ký tài khoản tại [AIMLAPI](https://aimlapi.com/app/)
2. Tạo khóa API từ trang quản lý
3. Thêm khóa API vào file `.env.local`

### Cấu Hình API

Ứng dụng sử dụng các endpoint sau của AIMLAPI:
- Hoàn thành cuộc trò chuyện: `https://api.aimlapi.com/v1/chat/completions`
- Mô hình: `gpt-3.5-turbo`

## Chạy Ứng Dụng

1. Khởi động máy chủ phát triển:
```bash
npm run dev
```

2. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt của bạn

## Thu Thập Dữ Liệu

Ứng dụng sẽ tự động lưu lịch sử trò chuyện vào `data/chat_history.csv` với định dạng sau:
- question: Câu hỏi từ người dùng
- answer: Phản hồi từ AI
- timestamp: Thời gian diễn ra hội thoại

Dữ liệu này có thể được sử dụng để:
- Huấn luyện các mô hình tùy chỉnh
- Phân tích các câu hỏi phổ biến
- Cải thiện chất lượng phản hồi

## Cấu Trúc Dự Án

```
chat-app/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # Xử lý API
│   └── page.tsx            # Giao diện chính của ứng dụng chat
├── data/
│   └── chat_history.csv    # Lưu lịch sử trò chuyện
├── public/
├── .env.local              # Biến môi trường
└── package.json
```

## Đóng Góp

1. Fork kho mã nguồn
2. Tạo nhánh chức năng mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên nhánh đó (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## Giấy Phép

Dự án này được phát hành theo giấy phép MIT - xem file LICENSE để biết chi tiết.

## Lời Cảm Ơn

- [AIMLAPI](https://aimlapi.com/app/) vì đã cung cấp API chat AI
- Đội ngũ Next.js vì framework tuyệt vời

# Bàn giao kho hình ảnh Winterfrost

Ngày cập nhật: 26/07/2026
Tên website: **Winterfrost**
Tên miền chính: **winterfrost.tech**

## Trạng thái hoàn thành

Kho ảnh mới đã được tạo, tối ưu và tích hợp vào giao diện. Cấu trúc tổng thể, tỷ lệ ảnh và vùng cắt của giao diện được giữ nguyên.

- 26 thương hiệu dự án/khách hàng mới đã thay toàn bộ tên và logo dự án cũ.
- 147 vị trí ảnh dự án đã được tạo hoặc ánh xạ sang bộ ảnh Winterfrost.
- 80 vị trí ảnh người đã dùng nhân vật người Việt Nam.
- 12 ảnh dịch vụ Winterfrost đã thay các ảnh dịch vụ có dấu hiệu thương hiệu cũ.
- 9 biểu tượng ngành nghề đã được lưu cục bộ.
- Logo, biểu tượng, banner và đồ họa hero Winterfrost đã được tích hợp.
- Ảnh ngoài cần thiết đã được lưu trong dự án, không còn phụ thuộc máy chủ ảnh HomeNest.

## Các bảng kiểm chính

| Tệp | Nội dung | Cách kiểm tra |
|---|---|---|
| `01-danh-muc-anh-nguoi.csv` | 80 vị trí ảnh người | Cột `status` phải là `DA_TAO_VA_TICH_HOP`. |
| `02-danh-muc-anh-du-an.csv` | 147 vị trí ảnh dự án | Cột `status` phải là trạng thái đã hoàn thành. |
| `04-winterfrost-ban-do-thuong-hieu-du-an.csv` | Bản đồ 26 tên dự án cũ → thương hiệu mới | Dùng để đối chiếu slug, tên và thư mục dự án. |
| `08-winterfrost-kho-anh-da-tich-hop.csv` | Danh mục toàn bộ tài sản Winterfrost đã tạo | Có đường dẫn website, đường dẫn tệp, kích thước và dung lượng. |

`03-danh-muc-toan-bo-anh.csv` và `07-winterfrost-migrate-homenest-images.csv` là hồ sơ kiểm kê/migration ban đầu, được giữ lại để truy vết kỹ thuật.

## Thư mục hình ảnh

```text
public/images/
├── brand/winterfrost/            Logo, biểu tượng, banner, đồ họa hero
├── projects/                     26 bộ thương hiệu và hình ảnh dự án
├── people/
│   ├── founder/winterfrost/      Chân dung nhà sáng lập
│   ├── library/winterfrost/      Thư viện chân dung người Việt
│   ├── doi-ngu/                  Thành viên đội ngũ
│   ├── khach-hang/               Khách hàng
│   ├── doi-tac/                  Đối tác
│   ├── cta/winterfrost/          Nhân vật CTA nền trong suốt
│   ├── work-life/                Ảnh bìa Work Life
│   ├── work-life-chi-tiet/       Ảnh trong bài Work Life
│   └── van-phong/                Ảnh văn phòng Winterfrost
├── services/winterfrost/         Ảnh dịch vụ
└── industries/winterfrost/       Biểu tượng ngành nghề
```

## Quy chuẩn khi thay ảnh về sau

- Giữ nguyên tên tệp và kích thước ghi trong `08-winterfrost-kho-anh-da-tich-hop.csv` nếu muốn thay trực tiếp mà không sửa mã nguồn.
- Ảnh chân dung dùng tỷ lệ `4:5`; ảnh bìa dự án dùng `16:9`; ảnh CTA dùng PNG nền trong suốt.
- Với ảnh dự án, đặt nội dung quan trọng trong vùng giữa để giao diện desktop và mobile đều cắt an toàn.
- Không chèn nút CTA hoặc đoạn giới thiệu dài trực tiếp vào ảnh.
- Logo dự án nằm trong thư mục `brand/` của từng dự án; thay đồng thời `symbol.png` và `wordmark.png` nếu đổi nhận diện.

## Tạo lại bảng danh mục

Sau khi thêm hoặc thay tệp ảnh, chạy:

```bash
node scripts/build-winterfrost-image-inventory.mjs
```

Lệnh trên cập nhật `08-winterfrost-kho-anh-da-tich-hop.csv` với kích thước và dung lượng thực tế của từng tệp.

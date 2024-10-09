# Giải thích mối quan hệ trong cơ sở dữ liệu Gas Station Management

## 1. Bảng `gas_stations` (Trạm xăng)

- **id**: Khóa chính, định danh duy nhất cho mỗi trạm xăng.
- **code**: Mã định danh của trạm xăng.
- **name**: Tên của trạm xăng.
- **address**: Địa chỉ của trạm xăng.
- **manager**: Tên người quản lý trạm xăng.
- **phone_number**: Số điện thoại liên lạc của trạm xăng.
- **email**: Địa chỉ email của trạm xăng.

### Quan hệ:

- Mỗi trạm xăng có thể có nhiều bơm (bảng `pumps`), do đó có quan hệ **1:N** với bảng `pumps`.
- Mỗi trạm xăng có thể thực hiện nhiều giao dịch (bảng `transactions`), do đó cũng có quan hệ **1:N** với bảng `transactions`.

---

## 2. Bảng `products` (Sản phẩm)

- **id**: Khóa chính, định danh duy nhất cho mỗi sản phẩm.
- **code**: Mã định danh của sản phẩm.
- **name**: Tên của sản phẩm.
- **price**: Giá của sản phẩm.
- **currency**: Đơn vị tiền tệ của giá.

### Quan hệ:

- Mỗi sản phẩm có thể được cung cấp bởi nhiều bơm (bảng `pumps`), do đó có quan hệ **1:N** với bảng `pumps`.
- Mỗi sản phẩm có thể được sử dụng trong nhiều giao dịch (bảng `transactions`), do đó cũng có quan hệ **1:N** với bảng `transactions`.

---

## 3. Bảng `pumps` (Bơm)

- **id**: Khóa chính, định danh duy nhất cho mỗi bơm.
- **station_id**: Khóa ngoại liên kết đến bảng `gas_stations`, xác định trạm xăng mà bơm thuộc về.
- **product_id**: Khóa ngoại liên kết đến bảng `products`, xác định sản phẩm mà bơm cung cấp.
- **pump_number**: Số hiệu của bơm.

### Quan hệ:

- Mỗi bơm chỉ thuộc về một trạm xăng (quan hệ **N:1** với `gas_stations`).
- Mỗi bơm chỉ cung cấp một sản phẩm (quan hệ **N:1** với `products`).
- Mỗi bơm có thể thực hiện nhiều giao dịch (bảng `transactions`), do đó có quan hệ **1:N** với bảng `transactions`.

---

## 4. Bảng `customers` (Khách hàng) - Bổ sung cho phù hợp với ngữ cảnh của hệ thống và dữ liệu từ task 1

- **id**: Khóa chính, định danh duy nhất cho mỗi khách hàng.
- **customer_code**: Mã định danh của khách hàng.
- **customer_name**: Tên của khách hàng.
- **type_of_customer**: Loại khách hàng.
- **license_number**: Số giấy phép của khách hàng.

### Quan hệ:

- Mỗi khách hàng có thể thực hiện nhiều giao dịch (bảng `transactions`), do đó có quan hệ **1:N** với bảng `transactions`.

---

## 5. Bảng `transactions` (Giao dịch)

- **id**: Khóa chính, định danh duy nhất cho mỗi giao dịch.
- **station_id**: Khóa ngoại liên kết đến bảng `gas_stations`, xác định trạm xăng thực hiện giao dịch.
- **pump_id**: Khóa ngoại liên kết đến bảng `pumps`, xác định bơm thực hiện giao dịch.
- **product_id**: Khóa ngoại liên kết đến bảng `products`, xác định sản phẩm được giao dịch.
- **transaction_date**: Ngày và giờ thực hiện giao dịch.
- **quantity**: Số lượng sản phẩm được giao dịch.
- **total_price**: Tổng giá trị giao dịch.
- **payment_method**: Phương thức thanh toán.
- **payment_status**: Trạng thái thanh toán.
- **customer_id**: Khóa ngoại liên kết đến bảng `customers`, xác định khách hàng thực hiện giao dịch.

### Quan hệ:

- Mỗi giao dịch chỉ thuộc về một trạm xăng (quan hệ **N:1** với `gas_stations`).
- Mỗi giao dịch chỉ liên quan đến một bơm (quan hệ **N:1** với `pumps`).
- Mỗi giao dịch chỉ liên quan đến một sản phẩm (quan hệ **N:1** với `products`).
- Mỗi giao dịch chỉ thuộc về một khách hàng (quan hệ **N:1** với `customers`).

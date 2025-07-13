# Test User Profile - Kiểm tra phân quyền theo memberId

## Các thay đổi đã thực hiện:

### 1. Cải thiện Login (`src/page/login/index.jsx`)
- Đảm bảo `memberId` được lưu đúng cách trong sessionStorage
- Thêm validation để đảm bảo memberId tồn tại

### 2. Cải thiện User Profile (`src/page/user/index.jsx`)

#### a) Cải thiện các hàm fetch:
- `fetchDonations()`: Thêm logging và validation memberId
- `fetchBloodRequests()`: Thêm logging và validation memberId  
- `fetchBloodRequestProcesses()`: Filter processes theo memberId hiện tại

#### b) Thêm validation trong render:
- **Lịch sử hiến máu**: Chỉ hiển thị đơn của member hiện tại
- **Lịch sử nhận máu**: Chỉ hiển thị đơn của member hiện tại
- **Đơn hiến máu hiện tại**: Chỉ hiển thị đơn của member hiện tại
- **Đơn nhận máu hiện tại**: Chỉ hiển thị đơn của member hiện tại

#### c) Thêm thông báo khi không có dữ liệu:
- Hiển thị thông báo phù hợp khi không có lịch sử/đơn nào

#### d) Thêm kiểm tra đăng nhập:
- Redirect về login nếu chưa đăng nhập

## Cách test:

1. **Đăng nhập với member A**
2. **Tạo một số đơn hiến/nhận máu cho member A**
3. **Đăng xuất**
4. **Đăng nhập với member B**
5. **Kiểm tra trang user profile của member B**
   - Không nên thấy đơn của member A
   - Chỉ thấy đơn của member B (nếu có)

## Console logs để debug:
- Mở Developer Tools > Console
- Kiểm tra các log:
  - "Fetching user profile for memberId: ..."
  - "Fetching donations for memberId: ..."
  - "Fetching blood requests for memberId: ..."
  - "Donations response: ..."
  - "Blood requests response: ..."

## Lưu ý:
- Tất cả các API call đều có parameter `memberId` để filter
- Có thêm validation ở frontend để đảm bảo an toàn
- Console logs giúp debug nếu có vấn đề 
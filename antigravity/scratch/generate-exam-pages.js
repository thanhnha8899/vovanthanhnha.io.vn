const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'de-thi-vatli.html'), 'utf8');

const subjects = [
  {
    file: 'de-thi-toan.html', name: 'Toán', icon: 'fa-calculator',
    color: '#3b82f6, #60a5fa', defaultTest: 'ĐỀ KIỂM TRA TOÁN 10',
    grades: '<option value="toan10" selected>Toán 10</option>\n<option value="toan11">Toán 11</option>\n<option value="toan12">Toán 12</option>',
    notification: 'Ma trận đề thi Toán đã được tạo thành công!',
    topics: `[
        { id: 'menh-de-tap-hop', name: 'Mệnh đề và tập hợp', fullName: 'Mệnh đề và tập hợp', color: 'c-blue', subtopics: ['Mệnh đề', 'Mệnh đề chứa biến', 'Phủ định mệnh đề', 'Mệnh đề kéo theo', 'Tập hợp và các phép toán', 'Số gần đúng và sai số'] },
        { id: 'bat-phuong-trinh', name: 'Bất phương trình bậc nhất hai ẩn', fullName: 'Bất phương trình bậc nhất hai ẩn', color: 'c-green', subtopics: ['Bất phương trình bậc nhất hai ẩn', 'Hệ bất phương trình bậc nhất hai ẩn', 'Ứng dụng trong thực tế'] },
        { id: 'ham-so-bac-hai', name: 'Hàm số bậc hai', fullName: 'Hàm số bậc hai', color: 'c-purple', subtopics: ['Hàm số và đồ thị', 'Hàm số bậc hai y = ax² + bx + c', 'Parabol và ứng dụng', 'Dấu của tam thức bậc hai'] },
        { id: 'phuong-trinh-he-pt', name: 'Phương trình – Hệ phương trình', fullName: 'Phương trình và hệ phương trình', color: 'c-orange', subtopics: ['Phương trình quy về bậc nhất, bậc hai', 'Hệ phương trình bậc nhất ba ẩn', 'Phương trình trong thực tế'] },
        { id: 'bat-dang-thuc', name: 'Bất đẳng thức – Bất phương trình bậc hai', fullName: 'Bất đẳng thức và bất phương trình bậc hai', color: 'c-pink', subtopics: ['Bất đẳng thức', 'Bất đẳng thức Cauchy', 'Bất phương trình bậc hai một ẩn'] },
        { id: 'thong-ke', name: 'Thống kê', fullName: 'Thống kê', color: 'c-teal', subtopics: ['Số liệu ghép nhóm', 'Các số đặc trưng đo xu thế trung tâm', 'Các số đặc trưng đo độ phân tán'] },
        { id: 'dai-so-to-hop', name: 'Đại số tổ hợp', fullName: 'Đại số tổ hợp', color: 'c-indigo', subtopics: ['Quy tắc đếm', 'Hoán vị', 'Chỉnh hợp', 'Tổ hợp', 'Nhị thức Newton'] },
        { id: 'xac-suat', name: 'Xác suất', fullName: 'Xác suất', color: 'c-cyan', subtopics: ['Biến cố và xác suất', 'Xác suất có điều kiện', 'Biến cố độc lập', 'Công thức Bernoulli'] },
        { id: 'luong-giac', name: 'Hệ thức lượng trong tam giác', fullName: 'Hệ thức lượng trong tam giác', color: 'c-red', subtopics: ['Giá trị lượng giác của góc', 'Định lí côsin', 'Định lí sin', 'Giải tam giác và ứng dụng'] },
        { id: 'vector', name: 'Vectơ', fullName: 'Vectơ', color: 'c-amber', subtopics: ['Khái niệm vectơ', 'Tổng và hiệu hai vectơ', 'Tích của vectơ với một số', 'Hệ trục toạ độ'] }
    ]`
  },
  {
    file: 'de-thi-hoahoc.html', name: 'Hóa học', icon: 'fa-flask',
    color: '#14b8a6, #2dd4bf', defaultTest: 'ĐỀ KIỂM TRA HÓA HỌC 10',
    grades: '<option value="hoahoc10" selected>Hóa học 10</option>\n<option value="hoahoc11">Hóa học 11</option>\n<option value="hoahoc12">Hóa học 12</option>',
    notification: 'Ma trận đề thi Hóa học đã được tạo thành công!',
    topics: `[
        { id: 'bang-tuan-hoan', name: 'Bảng tuần hoàn các nguyên tố hoá học', fullName: 'Bảng tuần hoàn các nguyên tố hoá học', color: 'c-blue', subtopics: ['Cấu tạo của bảng tuần hoàn', 'Xu hướng biến đổi một số tính chất', 'Định luật tuần hoàn và ý nghĩa'] },
        { id: 'cau-tao-nguyen-tu', name: 'Cấu tạo nguyên tử', fullName: 'Cấu tạo nguyên tử', color: 'c-green', subtopics: ['Thành phần nguyên tử', 'Nguyên tố hoá học', 'Cấu trúc lớp vỏ electron', 'Cấu hình electron nguyên tử'] },
        { id: 'lien-ket-hoa-hoc', name: 'Liên kết hoá học', fullName: 'Liên kết hoá học', color: 'c-purple', subtopics: ['Quy tắc octet', 'Liên kết ion', 'Liên kết cộng hoá trị', 'Liên kết hydrogen và van der Waals'] },
        { id: 'phan-ung-oxi-hoa-khu', name: 'Phản ứng oxi hoá – khử', fullName: 'Phản ứng oxi hoá – khử', color: 'c-orange', subtopics: ['Số oxi hoá', 'Phản ứng oxi hoá – khử', 'Cân bằng phản ứng oxi hoá – khử'] },
        { id: 'nang-luong-hoa-hoc', name: 'Năng lượng hoá học', fullName: 'Năng lượng hoá học', color: 'c-pink', subtopics: ['Enthalpy tạo thành', 'Biến thiên enthalpy', 'Tính biến thiên enthalpy phản ứng'] },
        { id: 'toc-do-phan-ung', name: 'Tốc độ phản ứng hoá học', fullName: 'Tốc độ phản ứng hoá học', color: 'c-teal', subtopics: ['Tốc độ phản ứng', 'Các yếu tố ảnh hưởng', 'Ý nghĩa thực tiễn'] },
        { id: 'nguyen-to-nhom-viia', name: 'Nguyên tố nhóm VIIA (Halogen)', fullName: 'Nguyên tố nhóm VIIA (Halogen)', color: 'c-indigo', subtopics: ['Đơn chất halogen', 'Hydrogen halide', 'Muối halide', 'Ứng dụng'] },
        { id: 'chuyen-de-10', name: 'Chuyên đề 10', fullName: 'Chuyên đề 10 (Cơ sở hoá học)', color: 'c-cyan', subtopics: ['Phản ứng hạt nhân', 'Hoá học phản ứng cháy', 'Chất xúc tác trong đời sống'] }
    ]`
  },
  {
    file: 'de-thi-sinhhoc.html', name: 'Sinh Học', icon: 'fa-dna',
    color: '#f59e0b, #fbbf24', defaultTest: 'ĐỀ KIỂM TRA SINH HỌC 10',
    grades: '<option value="sinhhoc10" selected>Sinh Học 10</option>\n<option value="sinhhoc11">Sinh Học 11</option>\n<option value="sinhhoc12">Sinh Học 12</option>',
    notification: 'Ma trận đề thi Sinh Học đã được tạo thành công!',
    topics: `[
        { id: 'gioi-thieu-sinh-hoc', name: 'Giới thiệu chung về thế giới sống', fullName: 'Giới thiệu chung về thế giới sống', color: 'c-green', subtopics: ['Các cấp độ tổ chức', 'Giới và hệ thống phân loại', 'Phương pháp nghiên cứu sinh học'] },
        { id: 'thanh-phan-hoa-hoc', name: 'Thành phần hoá học của tế bào', fullName: 'Thành phần hoá học của tế bào', color: 'c-blue', subtopics: ['Các nguyên tố hoá học và nước', 'Carbohydrate và lipid', 'Protein', 'Nucleic acid'] },
        { id: 'cau-truc-te-bao', name: 'Cấu trúc tế bào', fullName: 'Cấu trúc tế bào', color: 'c-purple', subtopics: ['Tế bào nhân sơ', 'Tế bào nhân thực', 'Màng sinh chất', 'Các bào quan'] },
        { id: 'trao-doi-chat', name: 'Trao đổi chất qua màng sinh chất', fullName: 'Trao đổi chất qua màng sinh chất', color: 'c-orange', subtopics: ['Vận chuyển thụ động', 'Vận chuyển chủ động', 'Nhập bào và xuất bào'] },
        { id: 'chuyen-hoa-nang-luong', name: 'Chuyển hoá năng lượng trong tế bào', fullName: 'Chuyển hoá năng lượng trong tế bào', color: 'c-pink', subtopics: ['Năng lượng và chuyển hoá', 'Enzyme', 'ATP', 'Hô hấp tế bào', 'Quang hợp'] },
        { id: 'chu-ky-te-bao', name: 'Chu kỳ tế bào và phân bào', fullName: 'Chu kỳ tế bào và phân bào', color: 'c-teal', subtopics: ['Chu kỳ tế bào', 'Nguyên phân', 'Giảm phân', 'Ý nghĩa nguyên phân và giảm phân'] },
        { id: 'cong-nghe-te-bao', name: 'Công nghệ tế bào', fullName: 'Công nghệ tế bào', color: 'c-indigo', subtopics: ['CN tế bào thực vật', 'CN tế bào động vật', 'Ứng dụng'] },
        { id: 'vi-sinh-vat', name: 'Sinh học vi sinh vật', fullName: 'Sinh học vi sinh vật', color: 'c-cyan', subtopics: ['Khái quát vi sinh vật', 'Phương thức dinh dưỡng', 'Tổng hợp và phân giải', 'Sinh trưởng', 'Ứng dụng'] }
    ]`
  },
  {
    file: 'de-thi-nguvan.html', name: 'Ngữ Văn', icon: 'fa-book',
    color: '#6366f1, #818cf8', defaultTest: 'ĐỀ KIỂM TRA NGỮ VĂN 10',
    grades: '<option value="nguvan10" selected>Ngữ Văn 10</option>\n<option value="nguvan11">Ngữ Văn 11</option>\n<option value="nguvan12">Ngữ Văn 12</option>',
    notification: 'Ma trận đề thi Ngữ Văn đã được tạo thành công!',
    topics: `[
        { id: 'doc-hieu-tho', name: 'Đọc hiểu thơ', fullName: 'Đọc hiểu thơ', color: 'c-blue', subtopics: ['Thơ lục bát', 'Thơ tự do', 'Thơ Đường luật', 'Thơ hai-cư', 'Phân tích biện pháp tu từ'] },
        { id: 'doc-hieu-nghi-luan', name: 'Đọc hiểu văn bản nghị luận', fullName: 'Đọc hiểu văn bản nghị luận', color: 'c-green', subtopics: ['Nghị luận xã hội', 'Nghị luận văn học', 'Luận điểm, luận cứ', 'Xác định quan điểm tác giả'] },
        { id: 'doc-hieu-truyen', name: 'Đọc hiểu truyện', fullName: 'Đọc hiểu truyện', color: 'c-purple', subtopics: ['Truyện ngắn hiện đại', 'Tiểu thuyết', 'Truyện truyền kì', 'Nhân vật, cốt truyện, điểm nhìn'] },
        { id: 'kich-van-ban', name: 'Kịch và văn bản thông tin', fullName: 'Kịch và văn bản thông tin', color: 'c-orange', subtopics: ['Kịch bản văn học', 'Văn bản thông tin', 'Văn bản đa phương thức'] },
        { id: 'nghi-luan-xa-hoi', name: 'Viết nghị luận xã hội', fullName: 'Viết nghị luận xã hội', color: 'c-pink', subtopics: ['Nghị luận về tư tưởng đạo lí', 'Nghị luận về hiện tượng đời sống', 'Bày tỏ quan điểm cá nhân'] },
        { id: 'nghi-luan-van-hoc', name: 'Viết nghị luận văn học', fullName: 'Viết nghị luận văn học', color: 'c-teal', subtopics: ['Phân tích tác phẩm thơ', 'Phân tích truyện ngắn', 'So sánh hai tác phẩm'] },
        { id: 'tieng-viet', name: 'Thực hành tiếng Việt', fullName: 'Thực hành tiếng Việt', color: 'c-indigo', subtopics: ['Biện pháp tu từ', 'Ngữ cảnh', 'Phong cách ngôn ngữ', 'Lỗi dùng từ, đặt câu'] },
        { id: 'noi-nghe', name: 'Nói và nghe', fullName: 'Nói và nghe', color: 'c-cyan', subtopics: ['Thuyết trình', 'Tranh luận', 'Phỏng vấn', 'Nghe và phản hồi'] }
    ]`
  },
  {
    file: 'de-thi-lichsu.html', name: 'Lịch Sử', icon: 'fa-landmark',
    color: '#ef4444, #f87171', defaultTest: 'ĐỀ KIỂM TRA LỊCH SỬ 10',
    grades: '<option value="lichsu10" selected>Lịch Sử 10</option>\n<option value="lichsu11">Lịch Sử 11</option>\n<option value="lichsu12">Lịch Sử 12</option>',
    notification: 'Ma trận đề thi Lịch Sử đã được tạo thành công!',
    topics: `[
        { id: 'lich-su-va-su-hoc', name: 'Lịch sử và Sử học', fullName: 'Lịch sử và Sử học', color: 'c-red', subtopics: ['Hiện thực lịch sử và nhận thức', 'Tri thức lịch sử và cuộc sống', 'Sử học với bảo tồn di sản'] },
        { id: 'vai-tro-su-hoc', name: 'Vai trò của Sử học', fullName: 'Vai trò của Sử học', color: 'c-blue', subtopics: ['Vai trò của Sử học', 'Sử học với khoa học', 'Sử học và giáo dục'] },
        { id: 'van-minh-co-dai', name: 'Một số nền văn minh thế giới cổ đại', fullName: 'Một số nền văn minh thế giới cổ đại', color: 'c-purple', subtopics: ['Văn minh Ai Cập cổ đại', 'Văn minh Trung Hoa cổ đại', 'Văn minh Ấn Độ cổ đại', 'Văn minh Hy Lạp - La Mã'] },
        { id: 'cach-mang-cong-nghiep', name: 'Các cuộc cách mạng công nghiệp', fullName: 'Các cuộc cách mạng công nghiệp', color: 'c-orange', subtopics: ['CMCN lần thứ nhất', 'CMCN lần thứ hai', 'CM khoa học kĩ thuật hiện đại'] },
        { id: 'van-minh-vn', name: 'Văn minh cổ trên đất nước Việt Nam', fullName: 'Các nền văn minh cổ đại trên đất nước Việt Nam', color: 'c-green', subtopics: ['Văn minh Văn Lang - Âu Lạc', 'Văn minh Champa', 'Văn minh Phù Nam', 'Đông Nam Á cổ - trung đại'] },
        { id: 'cong-dong-dan-toc', name: 'Cộng đồng các dân tộc Việt Nam', fullName: 'Cộng đồng các dân tộc Việt Nam', color: 'c-teal', subtopics: ['Thành phần các dân tộc', 'Khối đại đoàn kết', 'Chính sách dân tộc'] },
        { id: 'van-minh-dai-viet', name: 'Văn minh Đại Việt', fullName: 'Văn minh Đại Việt', color: 'c-indigo', subtopics: ['Cơ sở hình thành', 'Thành tựu chính trị, kinh tế', 'Thành tựu văn hoá, giáo dục', 'Ý nghĩa'] }
    ]`
  },
  {
    file: 'de-thi-diali.html', name: 'Địa Lí', icon: 'fa-globe-americas',
    color: '#06b6d4, #22d3ee', defaultTest: 'ĐỀ KIỂM TRA ĐỊA LÍ 10',
    grades: '<option value="diali10" selected>Địa Lí 10</option>\n<option value="diali11">Địa Lí 11</option>\n<option value="diali12">Địa Lí 12</option>',
    notification: 'Ma trận đề thi Địa Lí đã được tạo thành công!',
    topics: `[
        { id: 'su-dung-ban-do', name: 'Sử dụng bản đồ', fullName: 'Sử dụng bản đồ', color: 'c-cyan', subtopics: ['Phương pháp sử dụng bản đồ', 'GPS và bản đồ số'] },
        { id: 'trai-dat', name: 'Trái Đất', fullName: 'Trái Đất', color: 'c-blue', subtopics: ['Vị trí trong hệ Mặt Trời', 'Chuyển động tự quay', 'Hệ quả chuyển động', 'Cấu trúc Trái Đất'] },
        { id: 'thach-quyen', name: 'Thạch quyển', fullName: 'Thạch quyển', color: 'c-green', subtopics: ['Thuyết kiến tạo mảng', 'Nội lực và ngoại lực', 'Núi lửa, động đất', 'Các dạng địa hình'] },
        { id: 'khi-quyen', name: 'Khí quyển', fullName: 'Khí quyển', color: 'c-purple', subtopics: ['Nhiệt độ không khí', 'Khí áp và gió', 'Mưa', 'Thời tiết và khí hậu', 'Biến đổi khí hậu'] },
        { id: 'thuy-quyen', name: 'Thuỷ quyển', fullName: 'Thuỷ quyển', color: 'c-orange', subtopics: ['Vòng tuần hoàn nước', 'Nước ngầm, băng hà', 'Sông và hồ', 'Biển và đại dương'] },
        { id: 'tho-nhuong', name: 'Thổ nhưỡng và Sinh quyển', fullName: 'Thổ nhưỡng quyển và Sinh quyển', color: 'c-teal', subtopics: ['Đất và nhân tố hình thành', 'Sinh quyển', 'Các quy luật địa lí'] },
        { id: 'dan-cu', name: 'Địa lí dân cư', fullName: 'Địa lí dân cư', color: 'c-pink', subtopics: ['Dân số và gia tăng', 'Cơ cấu dân số', 'Phân bố dân cư và đô thị hoá'] },
        { id: 'kinh-te', name: 'Các ngành kinh tế', fullName: 'Địa lí các ngành kinh tế', color: 'c-red', subtopics: ['Cơ cấu kinh tế', 'Nông nghiệp', 'Công nghiệp', 'Dịch vụ', 'Phát triển bền vững'] }
    ]`
  },
  {
    file: 'de-thi-ktpl.html', name: 'KT \u2013 PL', icon: 'fa-scale-balanced',
    color: '#8b5cf6, #a78bfa', defaultTest: 'ĐỀ KIỂM TRA KT-PL 10',
    grades: '<option value="ktpl10" selected>KT-PL 10</option>\n<option value="ktpl11">KT-PL 11</option>\n<option value="ktpl12">KT-PL 12</option>',
    notification: 'Ma trận đề thi KT-PL đã được tạo thành công!',
    topics: `[
        { id: 'nen-kinh-te', name: 'Nền kinh tế và các chủ thể', fullName: 'Nền kinh tế và các chủ thể', color: 'c-purple', subtopics: ['Nền kinh tế và thành phần', 'Chủ thể nền kinh tế', 'Doanh nghiệp và kinh doanh'] },
        { id: 'thi-truong', name: 'Thị trường và cơ chế thị trường', fullName: 'Thị trường và cơ chế thị trường', color: 'c-blue', subtopics: ['Khái niệm thị trường', 'Cung – cầu', 'Giá cả thị trường', 'Cạnh tranh'] },
        { id: 'ngan-sach-thue', name: 'Ngân sách nhà nước và thuế', fullName: 'Ngân sách nhà nước và thuế', color: 'c-green', subtopics: ['Ngân sách nhà nước', 'Thuế và vai trò', 'Thu chi ngân sách', 'Nghĩa vụ nộp thuế'] },
        { id: 'ngan-hang', name: 'Ngân hàng và lãi suất', fullName: 'Ngân hàng và lãi suất', color: 'c-orange', subtopics: ['Tiền tệ', 'Ngân hàng', 'Lãi suất', 'Lạm phát'] },
        { id: 'san-xuat-kinh-doanh', name: 'Sản xuất kinh doanh và việc làm', fullName: 'Sản xuất kinh doanh và việc làm', color: 'c-teal', subtopics: ['Sản xuất vật chất', 'Kế hoạch tài chính cá nhân', 'Việc làm và thất nghiệp'] },
        { id: 'phap-luat', name: 'Pháp luật và đời sống', fullName: 'Pháp luật và đời sống', color: 'c-pink', subtopics: ['Khái niệm pháp luật', 'Vai trò pháp luật', 'Thực hiện pháp luật', 'Vi phạm và trách nhiệm pháp lí'] },
        { id: 'quyen-nghia-vu', name: 'Quyền và nghĩa vụ công dân', fullName: 'Quyền và nghĩa vụ công dân', color: 'c-red', subtopics: ['Quyền và nghĩa vụ cơ bản', 'Quyền bình đẳng', 'Quyền tự do', 'Quyền dân chủ'] },
        { id: 'hien-phap', name: 'Hiến pháp và bộ máy nhà nước', fullName: 'Hiến pháp và bộ máy nhà nước', color: 'c-indigo', subtopics: ['Hiến pháp nước CHXHCN VN', 'Bộ máy nhà nước', 'Quốc hội, Chính phủ, Toà án'] }
    ]`
  },
  {
    file: 'de-thi-tinhoc.html', name: 'Tin học', icon: 'fa-laptop-code',
    color: '#06b6d4, #22d3ee', defaultTest: 'ĐỀ KIỂM TRA TIN HỌC 10',
    grades: '<option value="tinhoc10" selected>Tin học 10</option>\n<option value="tinhoc11">Tin học 11</option>\n<option value="tinhoc12">Tin học 12</option>',
    notification: 'Ma trận đề thi Tin học đã được tạo thành công!',
    topics: `[
        { id: 'may-tinh-xa-hoi', name: 'Máy tính và xã hội tri thức', fullName: 'Máy tính và xã hội tri thức', color: 'c-cyan', subtopics: ['Thông tin và dữ liệu', 'Biểu diễn thông tin', 'Hệ nhị phân', 'Đơn vị đo thông tin'] },
        { id: 'mang-may-tinh', name: 'Mạng máy tính và Internet', fullName: 'Mạng máy tính và Internet', color: 'c-blue', subtopics: ['Mạng máy tính', 'Internet và WWW', 'An toàn trên Internet'] },
        { id: 'dao-duc-phap-luat', name: 'Đạo đức và pháp luật trong CNTT', fullName: 'Đạo đức và pháp luật trong môi trường số', color: 'c-purple', subtopics: ['Bản quyền và sở hữu trí tuệ', 'An toàn thông tin', 'Tác động CNTT đến xã hội'] },
        { id: 'ung-dung-tin-hoc', name: 'Ứng dụng tin học', fullName: 'Ứng dụng tin học', color: 'c-green', subtopics: ['Soạn thảo văn bản', 'Bảng tính', 'Trình chiếu', 'Phần mềm học tập'] },
        { id: 'giai-quyet-van-de', name: 'Giải quyết vấn đề với máy tính', fullName: 'Giải quyết vấn đề với sự trợ giúp của máy tính', color: 'c-orange', subtopics: ['Thuật toán', 'Thuật toán sắp xếp', 'Thuật toán tìm kiếm', 'Đánh giá thuật toán'] },
        { id: 'lap-trinh-python', name: 'Lập trình cơ bản (Python)', fullName: 'Lập trình cơ bản với Python', color: 'c-teal', subtopics: ['Ngôn ngữ lập trình và Python', 'Biến và kiểu dữ liệu', 'Câu lệnh điều kiện', 'Câu lệnh lặp', 'Hàm', 'Danh sách (List)', 'Xâu kí tự (String)'] },
        { id: 'co-so-du-lieu', name: 'Cơ sở dữ liệu', fullName: 'Cơ sở dữ liệu', color: 'c-indigo', subtopics: ['Khái niệm CSDL', 'Hệ quản trị CSDL', 'Bảng và mối quan hệ', 'Thao tác với CSDL'] },
        { id: 'huong-nghiep', name: 'Hướng nghiệp với Tin học', fullName: 'Hướng nghiệp với Tin học', color: 'c-pink', subtopics: ['Ngành nghề CNTT', 'Xu hướng phát triển', 'Kỹ năng cần thiết'] }
    ]`
  }
];

subjects.forEach(subj => {
  let content = template;

  // Replace title
  content = content.replace(/Đề thi THPT – Vật Lí \| VOVANTHANHNHA\.IO\.VN/g, `Đề thi THPT – ${subj.name} | VOVANTHANHNHA.IO.VN`);
  content = content.replace(/Công cụ tạo đề thi THPT môn Vật Lí tự động với AI/g, `Công cụ tạo đề thi THPT môn ${subj.name} tự động với AI`);

  // Replace icon
  content = content.replace(/fa-atom/g, subj.icon);

  // Replace page title
  content = content.replace(/Đề thi THPT – Vật Lí/g, `Đề thi THPT – ${subj.name}`);

  // Replace default test name
  content = content.replace('ĐỀ KIỂM TRA VẬT LÍ 10', subj.defaultTest);

  // Replace subject select
  content = content.replace('<option value="vatli" selected>Vật Lí</option>', `<option value="${subj.file.replace('de-thi-','').replace('.html','')}" selected>${subj.name}</option>`);

  // Replace grades
  content = content.replace(/<select id="khoi-lop">[\s\S]*?<\/select>/, `<select id="khoi-lop">\n${subj.grades}\n                        </select>`);

  // Replace topics data
  content = content.replace(/const physicsTopics = \[[\s\S]*?\];/, `const physicsTopics = ${subj.topics};`);

  // Replace notification
  content = content.replace('Ma trận đề thi Vật Lí đã được tạo thành công!', subj.notification);

  // Replace subject icon color
  content = content.replace(/#06b6d4, #22d3ee/g, subj.color);

  // Replace tool description
  content = content.replace('Công cụ tạo đề thi PPKT THPT', `Công cụ tạo đề thi PPKT THPT`);

  fs.writeFileSync(path.join(__dirname, subj.file), content, 'utf8');
  console.log(`Created: ${subj.file}`);
});

console.log('\nAll exam pages generated!');

# Generate exam pages for all subjects
$subjects = @(
    @{
        file = "de-thi-toan.html"
        name = "Toán"
        icon = "fa-calculator"
        color = "#3b82f6, #60a5fa"
        desc = "Công cụ tạo đề thi THPT môn Toán tự động với AI"
        grades = @(
            @{ value = "toan10"; label = "Toán 10"; selected = $true },
            @{ value = "toan11"; label = "Toán 11"; selected = $false },
            @{ value = "toan12"; label = "Toán 12"; selected = $false }
        )
        defaultTest = "ĐỀ KIỂM TRA TOÁN 10"
        topics = @"
    const subjectTopics = [
        {
            id: 'menh-de-tap-hop',
            name: 'Mệnh đề và tập hợp',
            fullName: 'Mệnh đề và tập hợp',
            color: 'c-blue',
            subtopics: ['Mệnh đề', 'Mệnh đề chứa biến', 'Phủ định mệnh đề', 'Mệnh đề kéo theo', 'Tập hợp và các phép toán', 'Số gần đúng và sai số']
        },
        {
            id: 'bat-phuong-trinh-bac-nhat',
            name: 'Bất phương trình bậc nhất hai ẩn',
            fullName: 'Bất phương trình bậc nhất hai ẩn',
            color: 'c-green',
            subtopics: ['Bất phương trình bậc nhất hai ẩn', 'Hệ bất phương trình bậc nhất hai ẩn', 'Ứng dụng trong thực tế']
        },
        {
            id: 'ham-so-bac-hai',
            name: 'Hàm số bậc hai',
            fullName: 'Hàm số bậc hai',
            color: 'c-purple',
            subtopics: ['Hàm số và đồ thị', 'Hàm số bậc hai y = ax² + bx + c', 'Parabol và ứng dụng', 'Dấu của tam thức bậc hai']
        },
        {
            id: 'phuong-trinh-he-pt',
            name: 'Phương trình – Hệ phương trình',
            fullName: 'Phương trình và hệ phương trình',
            color: 'c-orange',
            subtopics: ['Phương trình quy về bậc nhất, bậc hai', 'Hệ phương trình bậc nhất ba ẩn', 'Phương trình và hệ phương trình trong thực tế']
        },
        {
            id: 'bat-dang-thuc-bat-pt',
            name: 'Bất đẳng thức – Bất phương trình bậc hai',
            fullName: 'Bất đẳng thức và bất phương trình bậc hai',
            color: 'c-pink',
            subtopics: ['Bất đẳng thức', 'Bất đẳng thức Cauchy', 'Bất phương trình bậc hai một ẩn', 'Hệ bất phương trình bậc hai']
        },
        {
            id: 'thong-ke',
            name: 'Thống kê',
            fullName: 'Thống kê',
            color: 'c-teal',
            subtopics: ['Số liệu ghép nhóm', 'Các số đặc trưng đo xu thế trung tâm', 'Các số đặc trưng đo độ phân tán']
        },
        {
            id: 'dai-so-to-hop',
            name: 'Đại số tổ hợp',
            fullName: 'Đại số tổ hợp',
            color: 'c-indigo',
            subtopics: ['Quy tắc đếm', 'Hoán vị', 'Chỉnh hợp', 'Tổ hợp', 'Nhị thức Newton']
        },
        {
            id: 'xac-suat',
            name: 'Xác suất',
            fullName: 'Xác suất',
            color: 'c-cyan',
            subtopics: ['Biến cố và xác suất', 'Xác suất có điều kiện', 'Biến cố độc lập', 'Công thức Bernoulli']
        },
        {
            id: 'hinh-hoc-phang',
            name: 'Hệ thức lượng trong tam giác',
            fullName: 'Hệ thức lượng trong tam giác',
            color: 'c-red',
            subtopics: ['Giá trị lượng giác của góc', 'Định lí côsin', 'Định lí sin', 'Giải tam giác và ứng dụng']
        },
        {
            id: 'vector',
            name: 'Vectơ',
            fullName: 'Vectơ',
            color: 'c-amber',
            subtopics: ['Khái niệm vectơ', 'Tổng và hiệu hai vectơ', 'Tích của vectơ với một số', 'Hệ trục toạ độ']
        }
    ];
"@
    },
    @{
        file = "de-thi-hoahoc.html"
        name = "Hóa học"
        icon = "fa-flask"
        color = "#14b8a6, #2dd4bf"
        desc = "Công cụ tạo đề thi THPT môn Hóa học tự động với AI"
        grades = @(
            @{ value = "hoahoc10"; label = "Hóa học 10"; selected = $true },
            @{ value = "hoahoc11"; label = "Hóa học 11"; selected = $false },
            @{ value = "hoahoc12"; label = "Hóa học 12"; selected = $false }
        )
        defaultTest = "ĐỀ KIỂM TRA HÓA HỌC 10"
        topics = @"
    const subjectTopics = [
        {
            id: 'bang-tuan-hoan',
            name: 'Bảng tuần hoàn các nguyên tố hoá học',
            fullName: 'Bảng tuần hoàn các nguyên tố hoá học',
            color: 'c-blue',
            subtopics: ['Cấu tạo của bảng tuần hoàn', 'Xu hướng biến đổi một số tính chất', 'Định luật tuần hoàn và ý nghĩa']
        },
        {
            id: 'cau-tao-nguyen-tu',
            name: 'Cấu tạo nguyên tử',
            fullName: 'Cấu tạo nguyên tử',
            color: 'c-green',
            subtopics: ['Thành phần nguyên tử', 'Nguyên tố hoá học', 'Cấu trúc lớp vỏ electron', 'Cấu hình electron nguyên tử']
        },
        {
            id: 'lien-ket-hoa-hoc',
            name: 'Liên kết hoá học',
            fullName: 'Liên kết hoá học',
            color: 'c-purple',
            subtopics: ['Quy tắc octet', 'Liên kết ion', 'Liên kết cộng hoá trị', 'Liên kết hydrogen và tương tác van der Waals']
        },
        {
            id: 'phan-ung-oxi-hoa-khu',
            name: 'Phản ứng oxi hoá – khử',
            fullName: 'Phản ứng oxi hoá – khử',
            color: 'c-orange',
            subtopics: ['Số oxi hoá', 'Phản ứng oxi hoá – khử', 'Cân bằng phản ứng oxi hoá – khử']
        },
        {
            id: 'nang-luong-hoa-hoc',
            name: 'Năng lượng hoá học',
            fullName: 'Năng lượng hoá học',
            color: 'c-pink',
            subtopics: ['Enthalpy tạo thành và biến thiên enthalpy', 'Ý nghĩa biến thiên enthalpy', 'Tính biến thiên enthalpy phản ứng']
        },
        {
            id: 'toc-do-phan-ung',
            name: 'Tốc độ phản ứng hoá học',
            fullName: 'Tốc độ phản ứng hoá học',
            color: 'c-teal',
            subtopics: ['Tốc độ phản ứng', 'Các yếu tố ảnh hưởng đến tốc độ phản ứng', 'Ý nghĩa thực tiễn']
        },
        {
            id: 'nguyen-to-nhom-viia',
            name: 'Nguyên tố nhóm VIIA (Halogen)',
            fullName: 'Nguyên tố nhóm VIIA (Halogen)',
            color: 'c-indigo',
            subtopics: ['Đơn chất halogen', 'Hydrogen halide', 'Muối halide', 'Ứng dụng của halogen']
        },
        {
            id: 'chuyen-de-10',
            name: 'Chuyên đề 10',
            fullName: 'Chuyên đề 10 (Cơ sở hoá học, Cháy...)',
            color: 'c-cyan',
            subtopics: ['Phản ứng hạt nhân', 'Hoá học về phản ứng cháy', 'Chất xúc tác trong đời sống']
        }
    ];
"@
    },
    @{
        file = "de-thi-sinhhoc.html"
        name = "Sinh Học"
        icon = "fa-dna"
        color = "#f59e0b, #fbbf24"
        desc = "Công cụ tạo đề thi THPT môn Sinh Học tự động với AI"
        grades = @(
            @{ value = "sinhhoc10"; label = "Sinh Học 10"; selected = $true },
            @{ value = "sinhhoc11"; label = "Sinh Học 11"; selected = $false },
            @{ value = "sinhhoc12"; label = "Sinh Học 12"; selected = $false }
        )
        defaultTest = "ĐỀ KIỂM TRA SINH HỌC 10"
        topics = @"
    const subjectTopics = [
        {
            id: 'gioi-thieu-sinh-hoc',
            name: 'Giới thiệu chung về thế giới sống',
            fullName: 'Giới thiệu chung về thế giới sống',
            color: 'c-green',
            subtopics: ['Các cấp độ tổ chức của thế giới sống', 'Giới và hệ thống phân loại sinh vật', 'Các phương pháp nghiên cứu sinh học']
        },
        {
            id: 'thanh-phan-hoa-hoc-te-bao',
            name: 'Thành phần hoá học của tế bào',
            fullName: 'Thành phần hoá học của tế bào',
            color: 'c-blue',
            subtopics: ['Các nguyên tố hoá học và nước', 'Carbohydrate và lipid', 'Protein', 'Nucleic acid']
        },
        {
            id: 'cau-truc-te-bao',
            name: 'Cấu trúc tế bào',
            fullName: 'Cấu trúc tế bào',
            color: 'c-purple',
            subtopics: ['Tế bào nhân sơ', 'Tế bào nhân thực', 'Màng sinh chất', 'Các bào quan', 'So sánh tế bào nhân sơ và nhân thực']
        },
        {
            id: 'trao-doi-chat-qua-mang',
            name: 'Trao đổi chất qua màng sinh chất',
            fullName: 'Trao đổi chất qua màng sinh chất',
            color: 'c-orange',
            subtopics: ['Vận chuyển thụ động', 'Vận chuyển chủ động', 'Nhập bào và xuất bào']
        },
        {
            id: 'chuyen-hoa-nang-luong',
            name: 'Chuyển hoá năng lượng trong tế bào',
            fullName: 'Chuyển hoá năng lượng trong tế bào',
            color: 'c-pink',
            subtopics: ['Khái quát về năng lượng và chuyển hoá', 'Enzyme và vai trò', 'Tổng hợp và phân giải ATP', 'Hô hấp tế bào', 'Quang hợp']
        },
        {
            id: 'chu-ky-te-bao',
            name: 'Chu kỳ tế bào và phân bào',
            fullName: 'Chu kỳ tế bào và phân bào',
            color: 'c-teal',
            subtopics: ['Chu kỳ tế bào', 'Nguyên phân', 'Giảm phân', 'Ý nghĩa của nguyên phân và giảm phân']
        },
        {
            id: 'cong-nghe-te-bao',
            name: 'Công nghệ tế bào',
            fullName: 'Công nghệ tế bào',
            color: 'c-indigo',
            subtopics: ['Công nghệ tế bào thực vật', 'Công nghệ tế bào động vật', 'Ứng dụng công nghệ tế bào']
        },
        {
            id: 'vi-sinh-vat',
            name: 'Sinh học vi sinh vật',
            fullName: 'Sinh học vi sinh vật',
            color: 'c-cyan',
            subtopics: ['Khái quát về vi sinh vật', 'Các phương thức dinh dưỡng', 'Quá trình tổng hợp và phân giải', 'Sinh trưởng của vi sinh vật', 'Ứng dụng vi sinh vật']
        }
    ];
"@
    },
    @{
        file = "de-thi-nguvan.html"
        name = "Ngữ Văn"
        icon = "fa-book"
        color = "#6366f1, #818cf8"
        desc = "Công cụ tạo đề thi THPT môn Ngữ Văn tự động với AI"
        grades = @(
            @{ value = "nguvan10"; label = "Ngữ Văn 10"; selected = $true },
            @{ value = "nguvan11"; label = "Ngữ Văn 11"; selected = $false },
            @{ value = "nguvan12"; label = "Ngữ Văn 12"; selected = $false }
        )
        defaultTest = "ĐỀ KIỂM TRA NGỮ VĂN 10"
        topics = @"
    const subjectTopics = [
        {
            id: 'doc-hieu-tho',
            name: 'Đọc hiểu thơ',
            fullName: 'Đọc hiểu thơ',
            color: 'c-blue',
            subtopics: ['Thơ lục bát', 'Thơ tự do', 'Thơ Đường luật', 'Thơ hai-cư', 'Phân tích biện pháp tu từ']
        },
        {
            id: 'doc-hieu-van-ban',
            name: 'Đọc hiểu văn bản nghị luận',
            fullName: 'Đọc hiểu văn bản nghị luận',
            color: 'c-green',
            subtopics: ['Nghị luận xã hội', 'Nghị luận văn học', 'Luận điểm, luận cứ, lập luận', 'Xác định quan điểm tác giả']
        },
        {
            id: 'doc-hieu-truyen',
            name: 'Đọc hiểu truyện',
            fullName: 'Đọc hiểu truyện',
            color: 'c-purple',
            subtopics: ['Truyện ngắn hiện đại', 'Tiểu thuyết', 'Truyện truyền kì', 'Nhân vật, cốt truyện, điểm nhìn']
        },
        {
            id: 'kich-va-van-ban',
            name: 'Kịch và văn bản thông tin',
            fullName: 'Kịch và văn bản thông tin',
            color: 'c-orange',
            subtopics: ['Kịch bản văn học', 'Văn bản thông tin', 'Văn bản đa phương thức']
        },
        {
            id: 'nghi-luan-xa-hoi',
            name: 'Viết nghị luận xã hội',
            fullName: 'Viết nghị luận xã hội',
            color: 'c-pink',
            subtopics: ['Nghị luận về một tư tưởng đạo lí', 'Nghị luận về một hiện tượng đời sống', 'Bày tỏ quan điểm cá nhân']
        },
        {
            id: 'nghi-luan-van-hoc',
            name: 'Viết nghị luận văn học',
            fullName: 'Viết nghị luận văn học',
            color: 'c-teal',
            subtopics: ['Phân tích tác phẩm thơ', 'Phân tích truyện ngắn', 'So sánh hai tác phẩm', 'Nghị luận về một vấn đề văn học']
        },
        {
            id: 'tieng-viet',
            name: 'Thực hành tiếng Việt',
            fullName: 'Thực hành tiếng Việt',
            color: 'c-indigo',
            subtopics: ['Biện pháp tu từ', 'Ngữ cảnh', 'Phong cách ngôn ngữ', 'Lỗi dùng từ, đặt câu']
        },
        {
            id: 'noi-nghe',
            name: 'Nói và nghe',
            fullName: 'Nói và nghe',
            color: 'c-cyan',
            subtopics: ['Thuyết trình', 'Tranh luận', 'Phỏng vấn', 'Nghe và phản hồi']
        }
    ];
"@
    },
    @{
        file = "de-thi-lichsu.html"
        name = "Lịch Sử"
        icon = "fa-landmark"
        color = "#ef4444, #f87171"
        desc = "Công cụ tạo đề thi THPT môn Lịch Sử tự động với AI"
        grades = @(
            @{ value = "lichsu10"; label = "Lịch Sử 10"; selected = $true },
            @{ value = "lichsu11"; label = "Lịch Sử 11"; selected = $false },
            @{ value = "lichsu12"; label = "Lịch Sử 12"; selected = $false }
        )
        defaultTest = "ĐỀ KIỂM TRA LỊCH SỬ 10"
        topics = @"
    const subjectTopics = [
        {
            id: 'lich-su-va-su-hoc',
            name: 'Lịch sử và Sử học',
            fullName: 'Lịch sử và Sử học',
            color: 'c-red',
            subtopics: ['Hiện thực lịch sử và nhận thức lịch sử', 'Tri thức lịch sử và cuộc sống', 'Sử học với công tác bảo tồn']
        },
        {
            id: 'vai-tro-su-hoc',
            name: 'Vai trò của Sử học',
            fullName: 'Vai trò của Sử học',
            color: 'c-blue',
            subtopics: ['Vai trò của Sử học', 'Sử học với các lĩnh vực khoa học', 'Sử học và giáo dục']
        },
        {
            id: 'mot-so-nen-van-minh',
            name: 'Một số nền văn minh thế giới cổ đại',
            fullName: 'Một số nền văn minh thế giới thời kì cổ đại',
            color: 'c-purple',
            subtopics: ['Văn minh Ai Cập cổ đại', 'Văn minh Trung Hoa cổ đại', 'Văn minh Ấn Độ cổ đại', 'Văn minh Hy Lạp - La Mã cổ đại']
        },
        {
            id: 'cac-cuoc-cach-mang',
            name: 'Các cuộc cách mạng công nghiệp',
            fullName: 'Các cuộc cách mạng công nghiệp trong lịch sử thế giới',
            color: 'c-orange',
            subtopics: ['Cách mạng công nghiệp lần thứ nhất', 'Cách mạng công nghiệp lần thứ hai', 'Cách mạng khoa học kĩ thuật hiện đại']
        },
        {
            id: 'van-minh-dong-nam-a',
            name: 'Văn minh Đông Nam Á',
            fullName: 'Các nền văn minh cổ đại trên đất nước Việt Nam',
            color: 'c-green',
            subtopics: ['Văn minh Văn Lang - Âu Lạc', 'Văn minh Champa', 'Văn minh Phù Nam', 'Đông Nam Á thời kì cổ - trung đại']
        },
        {
            id: 'cong-dong-cac-dan-toc',
            name: 'Cộng đồng các dân tộc Việt Nam',
            fullName: 'Cộng đồng các dân tộc Việt Nam',
            color: 'c-teal',
            subtopics: ['Thành phần các dân tộc', 'Khối đại đoàn kết dân tộc', 'Chính sách dân tộc']
        },
        {
            id: 'van-minh-dai-viet',
            name: 'Văn minh Đại Việt',
            fullName: 'Văn minh Đại Việt',
            color: 'c-indigo',
            subtopics: ['Cơ sở hình thành', 'Thành tựu chính trị, kinh tế', 'Thành tựu văn hoá, giáo dục', 'Ý nghĩa văn minh Đại Việt']
        }
    ];
"@
    },
    @{
        file = "de-thi-diali.html"
        name = "Địa Lí"
        icon = "fa-globe-americas"
        color = "#06b6d4, #22d3ee"
        desc = "Công cụ tạo đề thi THPT môn Địa Lí tự động với AI"
        grades = @(
            @{ value = "diali10"; label = "Địa Lí 10"; selected = $true },
            @{ value = "diali11"; label = "Địa Lí 11"; selected = $false },
            @{ value = "diali12"; label = "Địa Lí 12"; selected = $false }
        )
        defaultTest = "ĐỀ KIỂM TRA ĐỊA LÍ 10"
        topics = @"
    const subjectTopics = [
        {
            id: 'su-dung-ban-do',
            name: 'Sử dụng bản đồ',
            fullName: 'Sử dụng bản đồ',
            color: 'c-cyan',
            subtopics: ['Phương pháp sử dụng bản đồ trong học tập', 'Một số ứng dụng của GPS, bản đồ số']
        },
        {
            id: 'trai-dat',
            name: 'Trái Đất',
            fullName: 'Trái Đất',
            color: 'c-blue',
            subtopics: ['Vị trí Trái Đất trong hệ Mặt Trời', 'Chuyển động tự quay và quay quanh Mặt Trời', 'Hệ quả chuyển động', 'Cấu trúc Trái Đất']
        },
        {
            id: 'thach-quyen',
            name: 'Thạch quyển',
            fullName: 'Thạch quyển',
            color: 'c-green',
            subtopics: ['Thuyết kiến tạo mảng', 'Nội lực và ngoại lực', 'Núi lửa, động đất', 'Các dạng địa hình']
        },
        {
            id: 'khi-quyen',
            name: 'Khí quyển',
            fullName: 'Khí quyển',
            color: 'c-purple',
            subtopics: ['Khí quyển, nhiệt độ không khí', 'Khí áp và gió', 'Mưa', 'Thời tiết và khí hậu', 'Biến đổi khí hậu']
        },
        {
            id: 'thuy-quyen',
            name: 'Thuỷ quyển',
            fullName: 'Thuỷ quyển',
            color: 'c-orange',
            subtopics: ['Thuỷ quyển và vòng tuần hoàn nước', 'Nước ngầm, băng hà', 'Sông và hồ', 'Biển và đại dương']
        },
        {
            id: 'tho-nhuong-quyen',
            name: 'Thổ nhưỡng quyển và Sinh quyển',
            fullName: 'Thổ nhưỡng quyển và Sinh quyển',
            color: 'c-teal',
            subtopics: ['Đất và các nhân tố hình thành', 'Sinh quyển', 'Các quy luật địa lí']
        },
        {
            id: 'dia-li-dan-cu',
            name: 'Địa lí dân cư',
            fullName: 'Địa lí dân cư',
            color: 'c-pink',
            subtopics: ['Dân số và gia tăng dân số', 'Cơ cấu dân số', 'Phân bố dân cư và đô thị hoá']
        },
        {
            id: 'dia-li-cong-nghiep',
            name: 'Các ngành kinh tế',
            fullName: 'Địa lí các ngành kinh tế',
            color: 'c-red',
            subtopics: ['Cơ cấu kinh tế', 'Nông nghiệp', 'Công nghiệp', 'Dịch vụ', 'Phát triển bền vững']
        }
    ];
"@
    },
    @{
        file = "de-thi-ktpl.html"
        name = "KT – PL"
        icon = "fa-scale-balanced"
        color = "#8b5cf6, #a78bfa"
        desc = "Công cụ tạo đề thi THPT môn Kinh tế và Pháp luật tự động với AI"
        grades = @(
            @{ value = "ktpl10"; label = "KT-PL 10"; selected = $true },
            @{ value = "ktpl11"; label = "KT-PL 11"; selected = $false },
            @{ value = "ktpl12"; label = "KT-PL 12"; selected = $false }
        )
        defaultTest = "ĐỀ KIỂM TRA KT-PL 10"
        topics = @"
    const subjectTopics = [
        {
            id: 'nen-kinh-te',
            name: 'Nền kinh tế và các chủ thể',
            fullName: 'Nền kinh tế và các chủ thể của nền kinh tế',
            color: 'c-purple',
            subtopics: ['Nền kinh tế và các thành phần kinh tế', 'Chủ thể của nền kinh tế', 'Doanh nghiệp và hoạt động kinh doanh']
        },
        {
            id: 'thi-truong',
            name: 'Thị trường và cơ chế thị trường',
            fullName: 'Thị trường và cơ chế thị trường',
            color: 'c-blue',
            subtopics: ['Khái niệm thị trường', 'Cung – cầu', 'Giá cả thị trường', 'Cạnh tranh trong kinh tế']
        },
        {
            id: 'ngan-sach-thue',
            name: 'Ngân sách nhà nước và thuế',
            fullName: 'Ngân sách nhà nước và thuế',
            color: 'c-green',
            subtopics: ['Ngân sách nhà nước', 'Thuế và vai trò', 'Thu chi ngân sách', 'Nghĩa vụ nộp thuế']
        },
        {
            id: 'ngan-hang-lai-suat',
            name: 'Ngân hàng và lãi suất',
            fullName: 'Ngân hàng và lãi suất',
            color: 'c-orange',
            subtopics: ['Tiền tệ', 'Ngân hàng', 'Lãi suất', 'Lạm phát']
        },
        {
            id: 'san-xuat-kinh-doanh',
            name: 'Sản xuất kinh doanh và việc làm',
            fullName: 'Sản xuất kinh doanh và việc làm',
            color: 'c-teal',
            subtopics: ['Sản xuất của cải vật chất', 'Lập kế hoạch tài chính cá nhân', 'Việc làm và thất nghiệp']
        },
        {
            id: 'phap-luat-doi-song',
            name: 'Pháp luật và đời sống',
            fullName: 'Pháp luật và đời sống',
            color: 'c-pink',
            subtopics: ['Khái niệm pháp luật', 'Vai trò pháp luật trong đời sống', 'Thực hiện pháp luật', 'Vi phạm pháp luật và trách nhiệm pháp lí']
        },
        {
            id: 'quyen-nghia-vu',
            name: 'Quyền và nghĩa vụ công dân',
            fullName: 'Quyền và nghĩa vụ công dân',
            color: 'c-red',
            subtopics: ['Quyền và nghĩa vụ cơ bản', 'Quyền bình đẳng', 'Quyền tự do', 'Quyền dân chủ']
        },
        {
            id: 'hien-phap-nha-nuoc',
            name: 'Hiến pháp và bộ máy nhà nước',
            fullName: 'Hiến pháp và bộ máy nhà nước',
            color: 'c-indigo',
            subtopics: ['Hiến pháp nước CHXHCN Việt Nam', 'Bộ máy nhà nước', 'Quốc hội, Chính phủ, Toà án']
        }
    ];
"@
    },
    @{
        file = "de-thi-tinhoc.html"
        name = "Tin học"
        icon = "fa-laptop-code"
        color = "#06b6d4, #22d3ee"
        desc = "Công cụ tạo đề thi THPT môn Tin học tự động với AI"
        grades = @(
            @{ value = "tinhoc10"; label = "Tin học 10"; selected = $true },
            @{ value = "tinhoc11"; label = "Tin học 11"; selected = $false },
            @{ value = "tinhoc12"; label = "Tin học 12"; selected = $false }
        )
        defaultTest = "ĐỀ KIỂM TRA TIN HỌC 10"
        topics = @"
    const subjectTopics = [
        {
            id: 'may-tinh-xa-hoi',
            name: 'Máy tính và xã hội tri thức',
            fullName: 'Máy tính và xã hội tri thức',
            color: 'c-cyan',
            subtopics: ['Thông tin và dữ liệu', 'Biểu diễn thông tin trong máy tính', 'Hệ nhị phân', 'Đơn vị đo thông tin']
        },
        {
            id: 'mang-may-tinh',
            name: 'Mạng máy tính và Internet',
            fullName: 'Mạng máy tính và Internet',
            color: 'c-blue',
            subtopics: ['Mạng máy tính', 'Internet và World Wide Web', 'An toàn trên Internet', 'Thực hành sử dụng Internet']
        },
        {
            id: 'dao-duc-phap-luat',
            name: 'Đạo đức và pháp luật trong CNTT',
            fullName: 'Đạo đức và pháp luật trong môi trường số',
            color: 'c-purple',
            subtopics: ['Bản quyền và sở hữu trí tuệ', 'An toàn thông tin', 'Tác động của CNTT đến xã hội']
        },
        {
            id: 'ung-dung-tin-hoc',
            name: 'Ứng dụng tin học',
            fullName: 'Ứng dụng tin học',
            color: 'c-green',
            subtopics: ['Phần mềm soạn thảo văn bản', 'Phần mềm bảng tính', 'Phần mềm trình chiếu', 'Sử dụng phần mềm học tập']
        },
        {
            id: 'giai-quyet-van-de',
            name: 'Giải quyết vấn đề với máy tính',
            fullName: 'Giải quyết vấn đề với sự trợ giúp của máy tính',
            color: 'c-orange',
            subtopics: ['Thuật toán và biểu diễn thuật toán', 'Thuật toán sắp xếp', 'Thuật toán tìm kiếm', 'Đánh giá thuật toán']
        },
        {
            id: 'lap-trinh-co-ban',
            name: 'Lập trình cơ bản (Python)',
            fullName: 'Lập trình cơ bản với Python',
            color: 'c-teal',
            subtopics: ['Ngôn ngữ lập trình và Python', 'Biến và kiểu dữ liệu', 'Câu lệnh điều kiện', 'Câu lệnh lặp', 'Hàm trong Python', 'Danh sách (List)', 'Xâu kí tự (String)']
        },
        {
            id: 'co-so-du-lieu',
            name: 'Cơ sở dữ liệu',
            fullName: 'Cơ sở dữ liệu',
            color: 'c-indigo',
            subtopics: ['Khái niệm cơ sở dữ liệu', 'Hệ quản trị CSDL', 'Bảng và mối quan hệ', 'Thao tác với CSDL']
        },
        {
            id: 'huong-nghiep',
            name: 'Hướng nghiệp với Tin học',
            fullName: 'Hướng nghiệp với Tin học',
            color: 'c-pink',
            subtopics: ['Các ngành nghề liên quan đến CNTT', 'Xu hướng phát triển CNTT', 'Kỹ năng cần thiết trong CNTT']
        }
    ];
"@
    }
)

# Read the template from de-thi-vatli.html
$template = Get-Content "c:\Users\thanh\.gemini\antigravity\scratch\de-thi-vatli.html" -Raw -Encoding UTF8

foreach ($subj in $subjects) {
    $content = $template

    # Replace title
    $content = $content -replace "Đề thi THPT – Vật Lí \| VOVANTHANHNHA\.IO\.VN", "Đề thi THPT – $($subj.name) | VOVANTHANHNHA.IO.VN"
    $content = $content -replace 'Công cụ tạo đề thi THPT môn Vật Lí tự động với AI', $subj.desc

    # Replace icon and color
    $content = $content -replace 'fa-atom', $subj.icon
    $content = $content -replace '#06b6d4, #22d3ee', $subj.color

    # Replace page title text
    $content = $content -replace 'Đề thi THPT – Vật Lí', "Đề thi THPT – $($subj.name)"

    # Replace default test name
    $content = $content -replace 'ĐỀ KIỂM TRA VẬT LÍ 10', $subj.defaultTest

    # Replace subject select
    $content = $content -replace '<option value="vatli" selected>Vật Lí</option>', "<option value=`"$($subj.file -replace 'de-thi-|\.html','')`" selected>$($subj.name)</option>"

    # Replace grade options
    $gradeHtml = ""
    foreach ($g in $subj.grades) {
        $sel = if ($g.selected) { " selected" } else { "" }
        $gradeHtml += "                            <option value=`"$($g.value)`"$sel>$($g.label)</option>`n"
    }
    $content = $content -replace '(?s)<select id="khoi-lop">.*?</select>', "<select id=`"khoi-lop`">`n$gradeHtml                        </select>"

    # Replace topics data
    $content = $content -replace '(?s)const physicsTopics = \[.*?\];', ($subj.topics -replace 'subjectTopics', 'physicsTopics')

    # Replace notification message
    $content = $content -replace 'Ma trận đề thi Vật Lí đã được tạo thành công!', "Ma trận đề thi $($subj.name) đã được tạo thành công!"

    # Write file
    $outputPath = "c:\Users\thanh\.gemini\antigravity\scratch\$($subj.file)"
    $content | Set-Content $outputPath -Encoding UTF8
    Write-Host "Created: $($subj.file)"
}

Write-Host "`nAll exam pages generated!"

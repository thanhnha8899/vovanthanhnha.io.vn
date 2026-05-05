export const navItems = [
  { label: 'Trang chủ', href: '#hero' },
  { label: 'Công cụ miễn phí', href: '#free-tools' },
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Dịch vụ', href: '#services' },
  { label: 'Năng lực', href: '#features' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Đánh giá', href: '#testimonials' },
  { label: 'Bảng giá', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Liên hệ', href: '#contact' },
]

export type FreeTool = {
  title: string
  description: string
  href: string
  badge?: string
  external?: boolean
}

export const freeTools: FreeTool[] = [
  {
    title: 'Hệ thống Nhận xét Học sinh',
    description:
      'Tạo nhận xét cá nhân hóa cho từng học sinh từ bảng điểm Excel/CSV. Có sẵn 58+ mẫu, xuất Word/Excel, in trực tiếp. Hoàn toàn miễn phí, dữ liệu chạy ngay trên trình duyệt.',
    href: '/tools/nhan-xet-hoc-sinh/',
    badge: 'Mới',
    external: true,
  },
]

export const services = [
  {
    slug: 'tao-bai-trac-nghiem',
    title: 'Tạo bài trắc nghiệm',
    description:
      'Nhập nội dung bài học để tạo nhanh bộ câu hỏi trắc nghiệm kèm đáp án.',
  },
  {
    slug: 'tao-ppt-tu-giao-an',
    title: 'Tạo PPT từ giáo án',
    description:
      'Chuyển giáo án thành dàn ý slide theo flow giảng dạy rõ ràng, dễ trình bày.',
  },
  {
    slug: 'cham-bai-tu-dong',
    title: 'Chấm bài tự động',
    description:
      'Dán bài làm học sinh để nhận điểm số và nhận xét chi tiết theo tiêu chí.',
  },
]

export const features = [
  {
    slug: 'tom-tat-noi-dung',
    title: 'Tóm tắt nội dung thông minh',
    description: 'Rút gọn tài liệu dài thành các ý chính để tiết kiệm thời gian chuẩn bị.',
  },
  {
    slug: 'tao-de-cuong-hoc',
    title: 'Tạo đề cương học theo chủ đề',
    description: 'Sinh kế hoạch học tập theo mục tiêu và đối tượng người học.',
  },
  {
    slug: 'tao-ke-hoach-day-hoc',
    title: 'Lập kế hoạch dạy học',
    description: 'Tạo flow buổi học rõ ràng với mốc thời gian và hoạt động tương tác.',
  },
  {
    slug: 'tao-bai-trac-nghiem',
    title: 'Sinh câu hỏi kiểm tra nhanh',
    description: 'Tạo bộ câu hỏi ngắn để kiểm tra mức độ hiểu bài trong vài giây.',
  },
]

export const projects = [
  {
    name: 'Lumio Finance',
    type: 'Website công ty tài chính',
    result: '+38% tỉ lệ đăng ký tư vấn trong 8 tuần',
  },
  {
    name: 'Nero Health',
    type: 'Landing page sản phẩm SaaS',
    result: 'CPA giảm 27% sau khi tối ưu UX copy',
  },
  {
    name: 'Kite Retail',
    type: 'Trang dịch vụ B2B',
    result: 'Time-on-page tăng 2.1x nhờ flow nội dung mới',
  },
]

export const testimonials = [
  {
    quote:
      'Team Nexa biến outline thô của chúng tôi thành một website chuyên nghiệp chỉ trong 2 sprint. Khả năng phối hợp giữa design và code rất ấn tượng.',
    author: 'Minh Trinh',
    role: 'Marketing Manager, Lumio Finance',
  },
  {
    quote:
      'Không chỉ đẹp, website mới giúp sales dễ chốt lead hơn vì câu chuyện thương hiệu được trình bày rất rõ ràng theo từng section.',
    author: 'Hoang Phuc',
    role: 'Founder, Kite Retail',
  },
]

export const pricing = [
  {
    plan: 'Starter',
    price: '19.000.000đ',
    description: 'Phu hop cho startup can website gioi thieu dich vu.',
    features: ['5 section chinh', 'Responsive day du', 'CMS co ban'],
  },
  {
    plan: 'Growth',
    price: '39.000.000đ',
    description: 'Goi pho bien cho doanh nghiep muon tap trung chuyen doi.',
    features: ['Toan bo section conversion', 'UI copywriting', 'SEO ky thuat'],
    highlight: true,
  },
  {
    plan: 'Scale',
    price: 'Theo yeu cau',
    description: 'Danh cho he thong da kenh va can nang cap lien tuc.',
    features: ['Design system day du', 'Tich hop API/CRM', 'A/B testing support'],
  },
]

export const faqs = [
  {
    question: 'Mất bao lâu để hoàn thành một website?',
    answer: 'Trung bình 2-6 tuần tùy độ phức tạp, số lượng trang và mức độ tích hợp.',
  },
  {
    question: 'Sau bàn giao có thể tự chỉnh sửa nội dung không?',
    answer: 'Có. Chúng tôi cấu trúc component và nội dung rõ ràng để đội của bạn dễ cập nhật.',
  },
  {
    question: 'Có hỗ trợ tối ưu SEO và tốc độ không?',
    answer: 'Có, đây là phần bắt buộc trong mọi gói để đảm bảo website hoạt động hiệu quả lâu dài.',
  },
]

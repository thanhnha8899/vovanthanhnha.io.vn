export type ToolField = {
  name: 'topic' | 'audience' | 'goal' | 'source'
  label: string
  placeholder: string
  type?: 'text' | 'textarea'
  required?: boolean
}

export type ToolConfig = {
  slug: string
  title: string
  shortDescription: string
  description: string
  fields: ToolField[]
}

export const toolConfigs: ToolConfig[] = [
  {
    slug: 'tao-bai-trac-nghiem',
    title: 'Tạo bài trắc nghiệm',
    shortDescription: 'Tạo nhanh bộ câu hỏi từ nội dung bài học.',
    description:
      'Nhập nội dung cốt lõi của bài học, công cụ sẽ tạo bộ câu hỏi trắc nghiệm kèm đáp án để bạn dùng ngay.',
    fields: [
      {
        name: 'source',
        label: 'Nội dung bài học',
        placeholder: 'Nhập hoặc dán nội dung kiến thức cần chuyển thành câu hỏi',
        type: 'textarea',
        required: true,
      },
      {
        name: 'goal',
        label: 'Mục tiêu đánh giá',
        placeholder: 'Ví dụ: Đánh giá mức độ hiểu khái niệm và áp dụng',
      },
    ],
  },
  {
    slug: 'tao-ppt-tu-giao-an',
    title: 'Tạo PPT từ giáo án',
    shortDescription: 'Chuyển giáo án thành dàn ý slide rõ ràng.',
    description: 'Nhập giáo án, công cụ sẽ gợi ý cấu trúc slide theo flow mở bài, nội dung chính và tổng kết.',
    fields: [
      {
        name: 'source',
        label: 'Nội dung giáo án',
        placeholder: 'Dán nội dung giáo án chi tiết',
        type: 'textarea',
        required: true,
      },
      {
        name: 'audience',
        label: 'Đối tượng học',
        placeholder: 'Ví dụ: Học sinh lớp 9, thời lượng 45 phút',
      },
    ],
  },
  {
    slug: 'cham-bai-tu-dong',
    title: 'Chấm bài tự động',
    shortDescription: 'Chấm điểm nhanh và đưa nhận xét cụ thể.',
    description: 'Nhập bài làm học sinh và tiêu chí đánh giá, hệ thống trả về điểm cùng nhận xét chi tiết.',
    fields: [
      {
        name: 'source',
        label: 'Bài làm học sinh',
        placeholder: 'Dán bài làm hoặc câu trả lời tự luận',
        type: 'textarea',
        required: true,
      },
      {
        name: 'goal',
        label: 'Tiêu chí chấm',
        placeholder: 'Ví dụ: Nội dung đúng 70%, lập luận 30%',
      },
    ],
  },
  {
    slug: 'tom-tat-noi-dung',
    title: 'Tóm tắt nội dung',
    shortDescription: 'Rút gọn tài liệu thành ý chính dễ nhớ.',
    description:
      'Nhập nội dung dài, công cụ sẽ tóm tắt theo dạng bullet points giúp tiết kiệm thời gian chuẩn bị.',
    fields: [
      {
        name: 'source',
        label: 'Nội dung cần tóm tắt',
        placeholder: 'Dán tài liệu, bài viết hoặc transcript',
        type: 'textarea',
        required: true,
      },
      {
        name: 'goal',
        label: 'Định dạng mong muốn',
        placeholder: 'Ví dụ: 5 gạch đầu dòng ngắn gọn',
      },
    ],
  },
  {
    slug: 'tao-de-cuong-hoc',
    title: 'Tạo đề cương học',
    shortDescription: 'Sinh đề cương theo chủ đề và cấp độ.',
    description:
      'Nhập chủ đề và đối tượng, công cụ đề xuất cấu trúc học tập theo tuần kèm các mốc đánh giá.',
    fields: [
      {
        name: 'topic',
        label: 'Chủ đề học',
        placeholder: 'Ví dụ: Hàm số bậc hai',
        required: true,
      },
      {
        name: 'audience',
        label: 'Đối tượng học',
        placeholder: 'Ví dụ: Học sinh lớp 10',
      },
      {
        name: 'goal',
        label: 'Mục tiêu đầu ra',
        placeholder: 'Ví dụ: Nắm công thức, giải được bài tập vận dụng',
      },
    ],
  },
  {
    slug: 'tao-ke-hoach-day-hoc',
    title: 'Tạo kế hoạch dạy học',
    shortDescription: 'Lên plan bài giảng theo từng bước.',
    description: 'Nhập mục tiêu buổi học, hệ thống tạo kế hoạch gồm hoạt động mở đầu, chính và củng cố.',
    fields: [
      {
        name: 'topic',
        label: 'Chủ đề buổi học',
        placeholder: 'Ví dụ: Phản ứng oxi hóa khử',
        required: true,
      },
      {
        name: 'goal',
        label: 'Mục tiêu bài học',
        placeholder: 'Ví dụ: Hiểu khái niệm, biết cân bằng phương trình',
      },
      {
        name: 'audience',
        label: 'Đối tượng',
        placeholder: 'Ví dụ: Lớp 11',
      },
    ],
  },
]

export const toolConfigBySlug = Object.fromEntries(toolConfigs.map((tool) => [tool.slug, tool]))

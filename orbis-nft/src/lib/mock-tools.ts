import type { ToolConfig } from '../data/tools'

export type ToolFormValues = {
  topic: string
  audience: string
  goal: string
  source: string
}

export type ToolResult = {
  title: string
  body: string
  items?: string[]
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function buildQuiz(source: string, goal: string): ToolResult {
  const unit = source.slice(0, 120) || 'Nội dung bài học'
  return {
    title: 'Bộ câu hỏi trắc nghiệm (5 câu)',
    body: `Mục tiêu: ${goal || 'Đánh giá mức độ hiểu bài tổng quan'}`,
    items: [
      `Câu 1: Ý chính nào phản ánh đúng nội dung "${unit}"?`,
      'Câu 2: Tình huống áp dụng nào phù hợp nhất?',
      'Câu 3: Điểm khác nhau giữa khái niệm cốt lõi và ví dụ minh họa là gì?',
      'Câu 4: Khi thay đổi điều kiện, kết quả nào có khả năng xảy ra?',
      'Câu 5: Kết luận quan trọng nhất sau bài học là gì?',
    ],
  }
}

function buildSlides(source: string, audience: string): ToolResult {
  return {
    title: 'Dàn ý slide đề xuất (10 slide)',
    body: `Đối tượng: ${audience || 'Lớp học phổ thông'}`,
    items: [
      'Slide 1: Tiêu đề buổi học và mục tiêu',
      'Slide 2: Tình huống mở đầu tạo bối cảnh',
      'Slide 3: Khái niệm nền tảng',
      'Slide 4: Ví dụ minh họa trực quan',
      'Slide 5: Bài tập tương tác nhanh',
      'Slide 6: Phần nội dung mở rộng',
      'Slide 7: Sai lầm thường gặp',
      'Slide 8: Tổng kết công thức hoặc quy trình',
      'Slide 9: Câu hỏi kiểm tra cuối buổi',
      `Slide 10: Tổng kết và giao bài tập về nhà (${source.length} ký tự đầu vào)`,
    ],
  }
}

function gradeSubmission(source: string, rubric: string): ToolResult {
  const score = Math.max(6, Math.min(10, Math.round((source.length / 140) * 10) / 10))
  return {
    title: `Kết quả chấm bài: ${score}/10`,
    body: `Tiêu chí áp dụng: ${rubric || 'Nội dung, lập luận, diễn đạt'}`,
    items: [
      'Điểm mạnh: Có cấu trúc bài viết rõ ràng và bám câu hỏi.',
      'Cần cải thiện: Tăng dẫn chứng thực tế để làm rõ lập luận.',
      'Gợi ý: Chia đoạn theo từng luận điểm để bài mạch lạc hơn.',
    ],
  }
}

function summarizeContent(source: string, format: string): ToolResult {
  const cleaned = source.replace(/\s+/g, ' ').trim()
  return {
    title: 'Bản tóm tắt nội dung',
    body: `Định dạng: ${format || 'Danh sách gạch đầu dòng'}`,
    items: [
      `Ý chính 1: ${cleaned.slice(0, 90) || 'Nội dung tập trung vào khái niệm cốt lõi.'}...`,
      'Ý chính 2: Có các bước triển khai và lưu ý thực hành quan trọng.',
      'Ý chính 3: Phần kết nhấn mạnh kết quả đầu ra và tiêu chí đánh giá.',
      'Ý chính 4: Đề xuất hành động tiếp theo để củng cố kiến thức.',
    ],
  }
}

function buildOutline(topic: string, audience: string, goal: string): ToolResult {
  return {
    title: `Đề cương học tập: ${topic || 'Chủ đề tổng quát'}`,
    body: `Đối tượng: ${audience || 'Người học phổ thông'} | Mục tiêu: ${goal || 'Nắm nền tảng và áp dụng được'}`,
    items: [
      'Tuần 1: Làm quen khái niệm nền tảng và thuật ngữ.',
      'Tuần 2: Thực hành bài tập mức cơ bản.',
      'Tuần 3: Phân tích lỗi sai và chiến lược cải thiện.',
      'Tuần 4: Bài tập vận dụng và mini assessment.',
    ],
  }
}

function buildTeachingPlan(topic: string, goal: string, audience: string): ToolResult {
  return {
    title: `Kế hoạch dạy học: ${topic || 'Buổi học mới'}`,
    body: `Mục tiêu: ${goal || 'Hiểu bài và vận dụng'} | Đối tượng: ${audience || 'Lớp học phổ thông'}`,
    items: [
      'Hoạt động mở đầu (5 phút): khởi động bằng câu hỏi tình huống.',
      'Hoạt động chính 1 (15 phút): giảng giải kiến thức trọng tâm.',
      'Hoạt động chính 2 (15 phút): làm việc nhóm theo bài tập ngắn.',
      'Hoạt động củng cố (7 phút): tổng kết và kiểm tra nhanh.',
      'Hoạt động giao nhiệm vụ (3 phút): bài tập về nhà theo 2 mức độ.',
    ],
  }
}

export async function runTool(config: ToolConfig, values: ToolFormValues): Promise<ToolResult> {
  await wait(1000)

  switch (config.slug) {
    case 'tao-bai-trac-nghiem':
      return buildQuiz(values.source, values.goal)
    case 'tao-ppt-tu-giao-an':
      return buildSlides(values.source, values.audience)
    case 'cham-bai-tu-dong':
      return gradeSubmission(values.source, values.goal)
    case 'tom-tat-noi-dung':
      return summarizeContent(values.source, values.goal)
    case 'tao-de-cuong-hoc':
      return buildOutline(values.topic, values.audience, values.goal)
    case 'tao-ke-hoach-day-hoc':
      return buildTeachingPlan(values.topic, values.goal, values.audience)
    default:
      throw new Error('Tool chưa được cấu hình logic xử lý.')
  }
}

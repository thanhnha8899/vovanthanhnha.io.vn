import {
  ArrowRight,
  CircleDollarSign,
  ExternalLink,
  Gift,
  Mail,
  MessageSquareQuote,
  Phone,
  Sparkles,
} from 'lucide-react'
import { FeatureCard } from './tool-ui'
import { faqs, features, freeTools, pricing, projects, services, testimonials } from '../data/site-content'

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string
  title: string
  description: string
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <span className="eyebrow">{badge}</span>
      <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-muted">{description}</p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-hero-grid py-20 sm:py-28">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="eyebrow">Digital Growth Partner</span>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Website hiện đại giúp doanh nghiệp tăng trưởng bền vững.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Nexa Studio kết hợp Product Design, Frontend Engineering và UX Writing để biến website
            của bạn thành kênh tạo doanh thu thay vì chỉ là một trang giới thiệu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Nhận tư vấn miễn phí <ArrowRight size={16} />
            </a>
            <a href="#projects" className="btn-secondary">
              Xem dự án gần đây
            </a>
            <a href="#free-tools" className="btn-secondary">
              <Gift size={16} />
              Công cụ miễn phí
            </a>
            {freeTools[0] ? (
              <a
                href={freeTools[0].href}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary border-accent/30 bg-accent/5 text-accent hover:bg-accent/10"
              >
                {freeTools[0].title}
                <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted">Hiệu quả từ khách hàng đã triển khai</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { label: 'Tăng conversion', value: '+42%' },
              { label: 'Giảm bounce rate', value: '-31%' },
              { label: 'Tăng tốc tải trang', value: '1.8s' },
              { label: 'Tăng lead chất lượng', value: '+2.3x' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            badge="About"
            title="Chúng tôi không chỉ làm đẹp giao diện."
            description="Nexa tập trung vào toàn bộ hành trình người dùng: từ ấn tượng đầu tiên, đọc hiểu giá trị, đến hành động liên hệ."
          />
          <div className="grid gap-3 text-sm text-muted sm:grid-cols-3">
            {['UX Strategy', 'Modern Frontend', 'Conversion Copy'].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card p-8">
          <p className="text-lg leading-relaxed text-text">
            Mỗi dự án được triển khai theo quy trình rõ ràng: khám phá mục tiêu, xây dựng cấu trúc
            nội dung, thiết kế UI đồng bộ và phát triển bằng kiến trúc component dễ maintain. Nhờ
            đó, website luôn sẵn sàng để mở rộng cho SEO, chiến dịch marketing và sản phẩm mới.
          </p>
        </div>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20">
      <div className="section-shell">
        <SectionHeading
          badge="Services"
          title="Dịch vụ trọng tâm"
          description="Các gói dịch vụ được thiết kế để phù hợp cả startup lẫn doanh nghiệp đang tăng trưởng."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <FeatureCard
              key={service.title}
              title={service.title}
              description={service.description}
              href={`/tool/${service.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="section-shell">
        <SectionHeading
          badge="Features"
          title="Nền tảng kỹ thuật và UX vững chắc"
          description="Website được xây để chạy tốt ngay hôm nay và đủ linh hoạt cho các nhu cầu ngày mai."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              href={`/tool/${feature.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function FreeToolsSection() {
  return (
    <section id="free-tools" className="relative overflow-hidden py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_85%_85%,rgba(37,99,235,0.18),transparent_40%)]"
      />
      <div className="section-shell relative">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow inline-flex items-center gap-2">
              <Gift size={12} />
              Free tools
            </span>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Công cụ miễn phí cho thầy cô & người làm nội dung
            </h2>
            <p className="mt-4 text-muted">
              Bộ công cụ web chạy ngay trên trình duyệt, không cần đăng ký. Dữ liệu của bạn không
              được gửi đi đâu cả — đây là cách Nexa Studio đóng góp lại cho cộng đồng.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent sm:inline-flex">
            <Sparkles size={14} />
            100% miễn phí
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {freeTools.map((tool) => {
            const linkProps = tool.external
              ? { href: tool.href, target: '_blank' as const, rel: 'noreferrer' }
              : { href: tool.href }
            return (
              <a
                key={tool.title}
                {...linkProps}
                className="card group relative flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-accent/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Sparkles size={20} />
                  </div>
                  {tool.badge ? (
                    <span className="rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                      {tool.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-white">{tool.title}</h3>
                <p className="mt-3 flex-1 text-muted">{tool.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Mở công cụ
                  <ExternalLink size={14} className="transition group-hover:translate-x-0.5" />
                </span>
              </a>
            )
          })}

          <div className="card relative flex flex-col items-start justify-between gap-4 border-dashed p-6 text-muted">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted">
                <Gift size={20} />
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold text-white">Đề xuất công cụ mới</h3>
              <p className="mt-3 text-sm">
                Bạn cần một tool nào để hỗ trợ giảng dạy, marketing hay vận hành? Gửi ý tưởng và
                Nexa Studio sẽ ưu tiên xây miễn phí cho cộng đồng.
              </p>
            </div>
            <a href="#contact" className="btn-secondary px-4 py-2 text-sm">
              Gửi ý tưởng
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <div className="section-shell">
        <SectionHeading
          badge="Portfolio"
          title="Dự án tiêu biểu"
          description="Một số sản phẩm đã giúp khách hàng cải thiện rõ rệt chỉ số kinh doanh."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.name} className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">{project.type}</p>
              <h3 className="mt-3 font-heading text-2xl font-extrabold text-white">{project.name}</h3>
              <p className="mt-4 text-muted">{project.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="section-shell">
        <SectionHeading
          badge="Testimonials"
          title="Khách hàng nói gì về Nexa"
          description="Đây là phản hồi thực tế từ các đội marketing, founder và product lead đã làm việc cùng chúng tôi."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.author} className="card p-6">
              <MessageSquareQuote size={20} className="text-accent" />
              <p className="mt-4 text-text">{item.quote}</p>
              <p className="mt-6 font-semibold text-white">{item.author}</p>
              <p className="text-sm text-muted">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="section-shell">
        <SectionHeading
          badge="Pricing"
          title="Bảng giá minh bạch"
          description="Lựa chọn gói phù hợp với giai đoạn phát triển hiện tại của doanh nghiệp."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {pricing.map((plan) => (
            <article
              key={plan.plan}
              className={`card p-6 ${plan.highlight ? 'border-primary bg-primary/10' : ''}`}
            >
              <h3 className="font-heading text-2xl font-bold text-white">{plan.plan}</h3>
              <p className="mt-3 text-3xl font-extrabold text-accent">{plan.price}</p>
              <p className="mt-3 text-muted">{plan.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-text">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CircleDollarSign size={14} className="text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="section-shell">
        <SectionHeading
          badge="FAQ"
          title="Câu hỏi thường gặp"
          description="Một vài thông tin quan trọng trước khi bắt đầu dự án cùng nhau."
        />
        <div className="space-y-3">
          {faqs.map((item) => (
            <details key={item.question} className="card group p-5">
              <summary className="cursor-pointer list-none font-semibold text-white">{item.question}</summary>
              <p className="mt-3 text-muted group-open:animate-none">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="section-shell">
        <div className="card grid gap-8 p-8 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Sẵn sàng nâng cấp website của bạn?
            </h2>
            <p className="mt-4 text-muted">
              Gửi brief hoặc outline hiện tại, đội ngũ của chúng tôi sẽ phản hồi định hướng triển
              khai trong vòng 24h.
            </p>
            <div className="mt-6 space-y-3 text-sm text-text">
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                hello@nexastudio.com
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                +84 898 123 456
              </p>
            </div>
          </div>
          <form className="grid gap-3">
            <label htmlFor="name" className="text-sm text-muted">
              Họ và tên
            </label>
            <input
              id="name"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-text outline-none ring-primary transition focus:ring-2"
              placeholder="Nguyen Van A"
            />
            <label htmlFor="email" className="text-sm text-muted">
              Email công việc
            </label>
            <input
              id="email"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-text outline-none ring-primary transition focus:ring-2"
              placeholder="ban@congty.com"
              type="email"
            />
            <label htmlFor="message" className="text-sm text-muted">
              Nhu cầu dự án
            </label>
            <textarea
              id="message"
              className="min-h-32 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-text outline-none ring-primary transition focus:ring-2"
              placeholder="Mô tả ngắn mục tiêu website của bạn"
            />
            <button type="button" className="btn-primary w-fit">
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export function CtaStripSection() {
  return (
    <section className="py-12">
      <div className="section-shell">
        <div className="card flex flex-col items-start justify-between gap-5 bg-primary/10 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">Next Step</p>
            <h3 className="mt-2 font-heading text-2xl font-extrabold text-white">
              Bạn đã có outline, chúng tôi có thể biến thành website hoàn chỉnh.
            </h3>
          </div>
          <a href="#contact" className="btn-primary">
            Bắt đầu dự án <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

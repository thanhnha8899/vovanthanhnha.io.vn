import { Clipboard, LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ToolConfig, ToolField } from '../data/tools'
import type { ToolResult } from '../lib/mock-tools'

export function ToolPageLayout({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="section-shell">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-muted">{description}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

export function FeatureCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link to={href} className="card block p-6 transition hover:-translate-y-0.5 hover:border-primary/50">
      <h3 className="font-heading text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>
      <span className="mt-5 inline-flex text-sm font-semibold text-accent">Mở công cụ</span>
    </Link>
  )
}

export function FormInput({
  field,
  value,
  onChange,
}: {
  field: ToolField
  value: string
  onChange: (value: string) => void
}) {
  const baseClass =
    'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-text outline-none ring-primary transition focus:ring-2'

  if (field.type === 'textarea') {
    return (
      <textarea
        className={`${baseClass} min-h-32`}
        value={value}
        required={field.required}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  return (
    <input
      className={baseClass}
      value={value}
      required={field.required}
      placeholder={field.placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export function LoadingState() {
  return (
    <div className="card flex items-center gap-3 p-4 text-sm text-muted">
      <LoaderCircle size={16} className="animate-spin text-accent" />
      Đang xử lý dữ liệu, vui lòng đợi...
    </div>
  )
}

export function ResultDisplay({ result, onCopy }: { result: ToolResult; onCopy: () => void }) {
  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl font-bold text-white">{result.title}</h3>
          <p className="mt-2 text-muted">{result.body}</p>
        </div>
        <button type="button" className="btn-secondary px-4 py-2" onClick={onCopy}>
          <Clipboard size={14} />
          Copy
        </button>
      </div>
      {result.items?.length ? (
        <ul className="mt-5 space-y-2 text-sm text-text">
          {result.items.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function ToolForm({
  config,
  values,
  isLoading,
  error,
  onSubmit,
  onChangeField,
}: {
  config: ToolConfig
  values: Record<string, string>
  isLoading: boolean
  error: string | null
  onSubmit: () => void
  onChangeField: (name: string, value: string) => void
}) {
  return (
    <div className="card p-6">
      <div className="grid gap-4">
        {config.fields.map((field) => (
          <label key={field.name} className="grid gap-2 text-sm text-muted">
            {field.label}
            <FormInput field={field} value={values[field.name] ?? ''} onChange={(v) => onChangeField(field.name, v)} />
          </label>
        ))}
      </div>
      {error ? <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}
      <button type="button" className="btn-primary mt-6" disabled={isLoading} onClick={onSubmit}>
        {isLoading ? 'Đang tạo...' : 'Tạo kết quả'}
      </button>
    </div>
  )
}

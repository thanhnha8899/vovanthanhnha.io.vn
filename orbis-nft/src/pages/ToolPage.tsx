import { Download, Home } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../components/layout'
import { LoadingState, ResultDisplay, ToolForm, ToolPageLayout } from '../components/tool-ui'
import { toolConfigBySlug } from '../data/tools'
import { runTool, type ToolFormValues, type ToolResult } from '../lib/mock-tools'

const initialValues: ToolFormValues = {
  topic: '',
  audience: '',
  goal: '',
  source: '',
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function ToolPage() {
  const { slug = '' } = useParams()
  const config = toolConfigBySlug[slug]
  const [formValues, setFormValues] = useState<ToolFormValues>(initialValues)
  const [result, setResult] = useState<ToolResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const serializedResult = useMemo(() => {
    if (!result) return ''
    const lines = [result.title, result.body, ...(result.items ?? [])]
    return lines.join('\n')
  }, [result])

  if (!config) {
    return (
      <main className="min-h-screen bg-bg text-text">
        <Navbar />
        <section className="py-16">
          <div className="section-shell">
            <div className="card p-6">
              <h1 className="font-heading text-2xl font-bold text-white">Không tìm thấy công cụ</h1>
              <p className="mt-2 text-muted">Slug `{slug}` chưa được cấu hình.</p>
              <Link to="/" className="btn-secondary mt-6">
                <Home size={14} />
                Về trang chủ
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const handleGenerate = async () => {
    const hasRequiredFieldMissing = config.fields.some(
      (field) => field.required && !String(formValues[field.name] ?? '').trim(),
    )
    if (hasRequiredFieldMissing) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc trước khi tạo kết quả.')
      return
    }

    setError(null)
    setIsLoading(true)
    setResult(null)
    try {
      const generated = await runTool(config, formValues)
      setResult(generated)
    } catch (toolError) {
      const message = toolError instanceof Error ? toolError.message : 'Có lỗi xảy ra trong quá trình xử lý.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <Navbar />
      <ToolPageLayout title={config.title} description={config.description}>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Link to="/" className="btn-secondary px-4 py-2">
            <Home size={14} />
            Trang chủ
          </Link>
          <button
            type="button"
            className="btn-secondary px-4 py-2"
            disabled={!result}
            onClick={() => downloadTextFile(`${config.slug}.txt`, serializedResult)}
          >
            <Download size={14} />
            Download kết quả
          </button>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <ToolForm
            config={config}
            values={formValues}
            isLoading={isLoading}
            error={error}
            onSubmit={handleGenerate}
            onChangeField={(name, value) =>
              setFormValues((prev) => ({
                ...prev,
                [name]: value,
              }))
            }
          />
          <div className="space-y-4">
            {isLoading ? <LoadingState /> : null}
            {result ? (
              <ResultDisplay
                result={result}
                onCopy={async () => {
                  try {
                    await navigator.clipboard.writeText(serializedResult)
                  } catch {
                    setError('Không thể copy tự động. Vui lòng thử lại trên trình duyệt hỗ trợ clipboard.')
                  }
                }}
              />
            ) : !isLoading ? (
              <div className="card p-6 text-sm text-muted">
                Kết quả sẽ xuất hiện tại đây sau khi bạn bấm &quot;Tạo kết quả&quot;.
              </div>
            ) : null}
          </div>
        </div>
      </ToolPageLayout>
    </main>
  )
}

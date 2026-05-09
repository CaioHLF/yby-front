import { Breadcrumb } from 'antd'
import { ArrowLeft } from 'lucide-react'
import type { BreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'

interface Props {
  title: string
  breadcrumbs?: BreadcrumbItemType[]
  extra?: React.ReactNode
  tabs?: React.ReactNode
  onBack?: () => void
}

export default function PageHeader({ title, breadcrumbs, extra, tabs, onBack }: Props) {
  return (
    <div
      className="bg-white"
      style={{ borderBottom: '1px solid #f0f0f0' }}
    >
      <div style={{ padding: '12px 24px 0' }}>
        {breadcrumbs && (
          <Breadcrumb
            items={breadcrumbs}
            style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 8 }}
          />
        )}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center justify-center w-8 h-8 rounded hover:bg-[#f5f5f5] transition-colors"
                style={{ color: 'rgba(0,0,0,0.45)' }}
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <h1 style={{ fontSize: 20, fontWeight: 600, color: 'rgba(0,0,0,0.85)', margin: 0, lineHeight: '28px' }}>
              {title}
            </h1>
          </div>
          {extra && <div className="flex items-center gap-2">{extra}</div>}
        </div>
      </div>
      {tabs && <div style={{ padding: '0 24px' }}>{tabs}</div>}
    </div>
  )
}

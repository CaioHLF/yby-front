'use client'

import PageHeader from '@/components/shared/PageHeader'
import ChargebackForm from '@/components/chargeback/ChargebackForm'

export default function ChargebackPage() {
  return (
    <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Detalhes da Disputa" breadcrumb="Chargebacks / Detalhes da Disputa" onBack={() => {}} />
      <div style={{ padding: 24, maxWidth: 960, width: '100%', margin: '0 auto' }}>
        <ChargebackForm
          onCancel={() => {}}
          onReturnForAnalysis={() => {}}
          onSendForExecution={() => {}}
        />
      </div>
    </div>
  )
}

'use client'
// Maquininhas do Estabelecimento Comercial — V0.
// PLACEHOLDER: Figma desta tela ainda não foi finalizado. Estrutura mínima
// pra rota responder e Pixel já checar o framing — copy positivo
// ("o produto vem aí") sem usar erro/falha.

import PageHeader from '@/components/shared/PageHeader'
import EmptyState from '@/components/shared/EmptyState'

export default function EcMaquininhas() {
  return (
    <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Maquininhas" breadcrumb="Estabelecimento Comercial / Cobranças / Maquininhas" />
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 2, border: '1px solid rgba(0,0,0,0.06)', padding: '20px 24px' }}>
          <EmptyState
            title="Em breve"
            description="A gestão de maquininhas (POS) está em construção. Quando estiver pronta, você verá aqui as maquininhas habilitadas, status de conexão e relatórios de uso."
            paddingY={64}
          />
        </div>
      </div>
    </div>
  )
}

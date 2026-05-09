'use client'

import { useState } from 'react'
import { App, Button, InputNumber } from 'antd'
import PageHeader from '@/components/shared/PageHeader'
import AccordionCard from '@/components/shared/AccordionCard'
import Icon from '@/components/shared/Icon'

type Categoria = 'Bronze' | 'Prata' | 'Ouro'

interface TaxaCategoria {
  categoria:      Categoria
  taxaMensal:     number
  taxaMin:        number
  taxaMax:        number
  prazoMaxDias:   number
  limiteOp:       number
}

const INITIAL: TaxaCategoria[] = [
  { categoria: 'Bronze', taxaMensal: 3.5, taxaMin: 2.0, taxaMax: 5.0, prazoMaxDias: 180, limiteOp: 50000   },
  { categoria: 'Prata',  taxaMensal: 2.8, taxaMin: 1.5, taxaMax: 4.0, prazoMaxDias: 270, limiteOp: 150000  },
  { categoria: 'Ouro',   taxaMensal: 2.2, taxaMin: 1.0, taxaMax: 3.5, prazoMaxDias: 360, limiteOp: 500000  },
]

const CAT_COLOR: Record<Categoria, string> = {
  Bronze: '#d46b08',
  Prata:  'rgba(0,0,0,0.65)',
  Ouro:   '#d4a017',
}

export default function PricingAntecipacaoPage() {
  const { message } = App.useApp()
  const [taxas, setTaxas] = useState<TaxaCategoria[]>(INITIAL)
  const [saving, setSaving] = useState(false)

  const update = (categoria: Categoria, field: keyof TaxaCategoria, value: number) => {
    setTaxas(prev => prev.map(t => t.categoria === categoria ? { ...t, [field]: value } : t))
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    message.success('Taxas salvas (modo demo — nada gravado).')
    setSaving(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageHeader
        title="Taxas de Antecipação"
        breadcrumb="Sub-adquirente · v1 / Pricing / Taxas de Antecipação"
        extra={
          <Button type="primary" loading={saving} onClick={handleSave}>Salvar</Button>
        }
      />

      <div style={{ flex: 1, overflow: 'auto', background: '#F2F4F8', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: '#E6F7FF', border: '1px solid #91D5FF', borderRadius: 2, padding: '10px 14px', fontSize: 12, color: 'rgba(0,0,0,0.85)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Icon name="info" size={14} color="#1890FF" />
          <span>
            Taxas aplicadas na operação de antecipação de recebíveis por categoria do EC.
            Cada save gera uma nova versão com timestamp — mudanças aplicam-se a partir do próximo ciclo (D+1).
          </span>
        </div>

        {taxas.map(t => (
          <AccordionCard
            key={t.categoria}
            defaultOpen={true}
            header={
              <>
                <div style={{ width: 32, height: 32, background: '#fafafa', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="creditCard" size={16} color={CAT_COLOR[t.categoria]} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: CAT_COLOR[t.categoria] }}>{t.categoria}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Taxa a.m. atual: {t.taxaMensal.toFixed(2).replace('.', ',')}%</div>
                </div>
              </>
            }
            meta={<span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Limite por op.: R$ {t.limiteOp.toLocaleString('pt-BR')}</span>}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 24, padding: '4px 0' }}>
              <Field label="Taxa a.m. (%)">
                <InputNumber
                  value={t.taxaMensal}
                  min={0} max={20} step={0.1} precision={2}
                  suffix="%"
                  style={{ width: '100%' }}
                  onChange={v => v !== null && update(t.categoria, 'taxaMensal', v)}
                />
              </Field>
              <Field label="Taxa mínima (%)">
                <InputNumber
                  value={t.taxaMin}
                  min={0} max={t.taxaMensal} step={0.1} precision={2}
                  suffix="%"
                  style={{ width: '100%' }}
                  onChange={v => v !== null && update(t.categoria, 'taxaMin', v)}
                />
              </Field>
              <Field label="Taxa máxima (%)">
                <InputNumber
                  value={t.taxaMax}
                  min={t.taxaMensal} max={30} step={0.1} precision={2}
                  suffix="%"
                  style={{ width: '100%' }}
                  onChange={v => v !== null && update(t.categoria, 'taxaMax', v)}
                />
              </Field>
              <Field label="Prazo máx. (dias)">
                <InputNumber
                  value={t.prazoMaxDias}
                  min={30} max={720} step={30}
                  suffix="dias"
                  style={{ width: '100%' }}
                  onChange={v => v !== null && update(t.categoria, 'prazoMaxDias', v)}
                />
              </Field>
              <Field label="Limite por operação (R$)">
                <InputNumber
                  value={t.limiteOp}
                  min={1000} step={1000}
                  formatter={v => `R$ ${Number(v).toLocaleString('pt-BR')}`}
                  parser={v => Number(String(v).replace(/[^0-9]/g, ''))}
                  style={{ width: '100%' }}
                  onChange={v => v !== null && update(t.categoria, 'limiteOp', v)}
                />
              </Field>
            </div>
          </AccordionCard>
        ))}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  )
}

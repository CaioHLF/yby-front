'use client'

import { useState } from 'react'
import { App, Button, InputNumber, Switch, TimePicker, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { Info } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import Icon from '@/components/shared/Icon'
import TableTabsBar, { type TableTab } from '@/components/pricing/TableTabsBar'

// ── Tipos ──────────────────────────────────────────────────────────────────

type CatId = string

interface Categoria extends TableTab {
  taxaMensal:   number
  taxaMin:      number
  taxaMax:      number
  prazoMaxDias: number
  limiteOp:     number
  // risco
  scoreMinimo:        number
  thresholdChargeback: number
  carenciaDias:       number
  // limites
  pctAgendaMax:   number
  limiteDiario:   number
  opMinima:       number
  opMaxima:       number
  cooldownHoras:  number
  colchaoReserva: number
}

const CATEGORIAS_INITIAL: Categoria[] = [
  {
    id: 'bronze', name: 'Bronze',
    taxaMensal: 3.5, taxaMin: 2.0, taxaMax: 5.0, prazoMaxDias: 180, limiteOp: 50000,
    scoreMinimo: 600, thresholdChargeback: 2.0, carenciaDias: 90,
    pctAgendaMax: 40, limiteDiario: 100000, opMinima: 1000, opMaxima: 50000, cooldownHoras: 48, colchaoReserva: 5,
  },
  {
    id: 'prata', name: 'Prata',
    taxaMensal: 2.8, taxaMin: 1.5, taxaMax: 4.0, prazoMaxDias: 270, limiteOp: 150000,
    scoreMinimo: 500, thresholdChargeback: 3.0, carenciaDias: 60,
    pctAgendaMax: 60, limiteDiario: 300000, opMinima: 1000, opMaxima: 150000, cooldownHoras: 24, colchaoReserva: 3,
  },
  {
    id: 'ouro', name: 'Ouro',
    taxaMensal: 2.2, taxaMin: 1.0, taxaMax: 3.5, prazoMaxDias: 360, limiteOp: 500000,
    scoreMinimo: 400, thresholdChargeback: 4.0, carenciaDias: 30,
    pctAgendaMax: 80, limiteDiario: 1000000, opMinima: 5000, opMaxima: 500000, cooldownHoras: 12, colchaoReserva: 2,
  },
]

interface OperacionalConfig {
  horarioCorte:             string
  slaAprovacaoHoras:        number
  retryMaxTentativas:       number
  retryIntervaloMin:        number
  janelaReconciliacaoHoras: number
  modoManutencao:           boolean
}

const OPER_INITIAL: OperacionalConfig = {
  horarioCorte: '15:00', slaAprovacaoHoras: 48, retryMaxTentativas: 3,
  retryIntervaloMin: 5, janelaReconciliacaoHoras: 4, modoManutencao: false,
}

interface NotifConfig {
  emailAtivo: boolean
  pushAtivo:  boolean
  smsAtivo:   boolean
  thresholdAlertaExposicao:  number
  thresholdAlertaChargeback: number
  dominiosEmail: string
}

const NOTIF_INITIAL: NotifConfig = {
  emailAtivo: true, pushAtivo: true, smsAtivo: false,
  thresholdAlertaExposicao: 80, thresholdAlertaChargeback: 3.0,
  dominiosEmail: 'subadq.com.br',
}

const SECTION_TABS = [
  { key: 'taxas',        label: 'Taxas' },
  { key: 'risco',        label: 'Risco' },
  { key: 'limites',      label: 'Limites' },
  { key: 'operacional',  label: 'Operacional' },
  { key: 'notificacoes', label: 'Notificações' },
]

// ── Helpers ────────────────────────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{label}</span>
        {hint && (
          <Tooltip title={hint} placement="top">
            <Info size={12} color="rgba(0,0,0,0.25)" style={{ cursor: 'help', flexShrink: 0 }} />
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 }}>
      {children}
    </div>
  )
}

// ── Componente principal ───────────────────────────────────────────────────

function PricingAntecipacaoInner() {
  const { message } = App.useApp()
  const [section, setSection]   = useState('taxas')
  const [saving, setSaving]     = useState(false)
  const [cats, setCats]         = useState<Categoria[]>(CATEGORIAS_INITIAL)
  const [activeCatId, setActiveCatId] = useState<string>(CATEGORIAS_INITIAL[0].id)
  const [oper, setOper]         = useState<OperacionalConfig>(OPER_INITIAL)
  const [notif, setNotif]       = useState<NotifConfig>(NOTIF_INITIAL)

  const cat = cats.find(c => c.id === activeCatId) ?? cats[0]

  const updateCat = <K extends keyof Categoria>(field: K, value: Categoria[K]) =>
    setCats(prev => prev.map(c => c.id === activeCatId ? { ...c, [field]: value } : c))

  const hasCatTabs = ['taxas', 'risco', 'limites'].includes(section)

  const handleAddCat = () => {
    message.info('Criação de nova categoria disponível em breve (modo demo).')
  }

  const handleRenameCat = (id: CatId, name: string) =>
    setCats(prev => prev.map(c => c.id === id ? { ...c, name } : c))

  const handleDeleteCat = (id: CatId) => {
    setCats(prev => prev.filter(c => c.id !== id))
    if (activeCatId === id) setActiveCatId(cats.find(c => c.id !== id)?.id ?? '')
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    message.success('Configurações salvas (modo demo — nada gravado).')
    setSaving(false)
  }

  const fmtBRL = (v: number) => `R$ ${v.toLocaleString('pt-BR')}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Linha 1 — PageHeader */}
      <PageHeader
        title="Antecipação"
        breadcrumb="Sub-adquirente · v1 / Custos & Precificação / Antecipação"
        extra={<Button type="primary" loading={saving} onClick={handleSave}>Salvar</Button>}
      />

      {/* Linha 2 — Abas de seção */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 24px', display: 'flex', gap: 0, flexShrink: 0 }}>
        {SECTION_TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setSection(t.key)}
            style={{
              border: 'none', background: 'none', padding: '12px 20px', fontSize: 14,
              cursor: 'pointer', marginBottom: -1,
              color: section === t.key ? '#1890FF' : 'rgba(0,0,0,0.65)',
              borderBottom: section === t.key ? '2px solid #1890FF' : '2px solid transparent',
              fontWeight: section === t.key ? 500 : 400,
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* Linha 3 — TabsBar de categorias (só Taxas / Risco / Limites) */}
      {hasCatTabs && (
        <div style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '0 24px', flexShrink: 0 }}>
          <TableTabsBar
            tabs={cats}
            activeId={activeCatId}
            onChangeActive={setActiveCatId}
            onAdd={handleAddCat}
            onRename={handleRenameCat}
            onDelete={cats.length > 1 ? handleDeleteCat : undefined}
            addLabel="Nova categoria"
          />
        </div>
      )}

      {/* Conteúdo */}
      <div style={{ flex: 1, overflow: 'auto', background: '#F2F4F8', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Banner */}
        <div style={{ background: '#E6F7FF', border: '1px solid #91D5FF', borderRadius: 2, padding: '10px 14px', fontSize: 12, color: 'rgba(0,0,0,0.85)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Icon name="info" size={14} color="#1890FF" />
          <span>Cada save = nova versão com timestamp. Mudanças aplicam-se a partir do próximo ciclo (D+1). As categorias atravessam todas as abas — alterar Bronze em Taxas também é aplicado no Risco e Limites da mesma categoria.</span>
        </div>

        {/* ── TAXAS ── */}
        {section === 'taxas' && (
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, padding: '20px 24px' }}>
            <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', marginBottom: 20 }}>
              Categoria <strong style={{ color: 'rgba(0,0,0,0.85)' }}>{cat.name}</strong> — taxas e prazos aplicados às antecipações dos ECs nessa faixa.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
              <Field label="Taxa a.m. (%)" hint="Taxa mensal cobrada do EC pela antecipação do recebível">
                <InputNumber value={cat.taxaMensal} min={0} max={20} step={0.1} precision={2} suffix="%" style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('taxaMensal', v)} />
              </Field>
              <Field label="Taxa mínima (%)" hint="Piso da taxa — não pode ser cobrado abaixo disso mesmo com desconto comercial">
                <InputNumber value={cat.taxaMin} min={0} max={cat.taxaMensal} step={0.1} precision={2} suffix="%" style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('taxaMin', v)} />
              </Field>
              <Field label="Taxa máxima (%)" hint="Teto da taxa — limite superior para negociação comercial com o EC">
                <InputNumber value={cat.taxaMax} min={cat.taxaMensal} max={30} step={0.1} precision={2} suffix="%" style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('taxaMax', v)} />
              </Field>
              <Field label="Prazo máx. (dias)" hint="Parcelas com vencimento além desse prazo não são elegíveis para antecipação">
                <InputNumber value={cat.prazoMaxDias} min={30} max={720} step={30} suffix="dias" style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('prazoMaxDias', v)} />
              </Field>
              <Field label="Limite por operação (R$)" hint="Valor máximo que pode ser antecipado em uma única solicitação">
                <InputNumber
                  value={cat.limiteOp} min={1000} step={1000}
                  formatter={v => fmtBRL(Number(v))}
                  parser={v => Number(String(v).replace(/[^0-9]/g, ''))}
                  style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('limiteOp', v)}
                />
              </Field>
            </div>
          </div>
        )}

        {/* ── RISCO ── */}
        {section === 'risco' && (
          <>
            <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, padding: '20px 24px' }}>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', marginBottom: 20 }}>
                Critérios de risco para ECs na categoria <strong style={{ color: 'rgba(0,0,0,0.85)' }}>{cat.name}</strong>.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
                <Field label="Score mínimo" hint="Score de crédito mínimo exigido do EC para poder antecipar. ECs abaixo desse score são bloqueados automaticamente.">
                  <InputNumber value={cat.scoreMinimo} min={0} max={1000} step={10} style={{ width: '100%' }}
                    onChange={v => v !== null && updateCat('scoreMinimo', v)} />
                </Field>
                <Field label="Threshold chargeback (% TPV)" hint="Percentual máximo de chargeback sobre o volume total processado. Acima disso, novas antecipações são bloqueadas para o EC.">
                  <InputNumber value={cat.thresholdChargeback} min={0} max={20} step={0.1} precision={1} suffix="%" style={{ width: '100%' }}
                    onChange={v => v !== null && updateCat('thresholdChargeback', v)} />
                </Field>
                <Field label="Carência para EC novo (dias)" hint="Quantos dias um EC recém-cadastrado deve aguardar antes de poder solicitar a primeira antecipação.">
                  <InputNumber value={cat.carenciaDias} min={0} max={365} step={30} suffix="dias" style={{ width: '100%' }}
                    onChange={v => v !== null && updateCat('carenciaDias', v)} />
                </Field>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, padding: '16px 20px' }}>
              <SectionLabel>MCCs e whitelist</SectionLabel>
              <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>Controle granular de MCCs permitidos/bloqueados e whitelist de ECs por exceção — disponível na próxima versão.</div>
            </div>
          </>
        )}

        {/* ── LIMITES ── */}
        {section === 'limites' && (
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, padding: '20px 24px' }}>
            <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', marginBottom: 20 }}>
              Limites operacionais para ECs na categoria <strong style={{ color: 'rgba(0,0,0,0.85)' }}>{cat.name}</strong>.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
              <Field label="% máx. da agenda" hint="Percentual máximo do saldo de agenda do EC que pode ser antecipado. Ex: 60% significa que se o EC tem R$ 100k em agenda, pode antecipar até R$ 60k.">
                <InputNumber value={cat.pctAgendaMax} min={1} max={100} step={5} suffix="%" style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('pctAgendaMax', v)} />
              </Field>
              <Field label="Limite diário (R$)" hint="Valor máximo total que pode ser antecipado por um EC em um único dia, somando todas as operações.">
                <InputNumber
                  value={cat.limiteDiario} min={1000} step={10000}
                  formatter={v => fmtBRL(Number(v))}
                  parser={v => Number(String(v).replace(/[^0-9]/g, ''))}
                  style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('limiteDiario', v)}
                />
              </Field>
              <Field label="Operação mínima (R$)" hint="Valor mínimo por solicitação. Solicitações abaixo disso são recusadas para evitar microoperações não rentáveis.">
                <InputNumber
                  value={cat.opMinima} min={100} step={500}
                  formatter={v => fmtBRL(Number(v))}
                  parser={v => Number(String(v).replace(/[^0-9]/g, ''))}
                  style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('opMinima', v)}
                />
              </Field>
              <Field label="Operação máxima (R$)" hint="Valor máximo por solicitação individual. Operações acima disso precisam de aprovação manual.">
                <InputNumber
                  value={cat.opMaxima} min={cat.opMinima} step={5000}
                  formatter={v => fmtBRL(Number(v))}
                  parser={v => Number(String(v).replace(/[^0-9]/g, ''))}
                  style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('opMaxima', v)}
                />
              </Field>
              <Field label="Cooldown entre operações" hint="Tempo mínimo que o EC deve aguardar entre duas solicitações consecutivas. Evita múltiplas operações em sequência rápida.">
                <InputNumber value={cat.cooldownHoras} min={0} max={168} step={12} suffix="h" style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('cooldownHoras', v)} />
              </Field>
              <Field label="Colchão de reserva (%)" hint="Percentual do valor antecipado retido como reserva para cobrir eventuais falhas de TED/PIX ou chargebacks futuros.">
                <InputNumber value={cat.colchaoReserva} min={0} max={20} step={0.5} precision={1} suffix="%" style={{ width: '100%' }}
                  onChange={v => v !== null && updateCat('colchaoReserva', v)} />
              </Field>
            </div>
          </div>
        )}

        {/* ── OPERACIONAL ── */}
        {section === 'operacional' && (
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <SectionLabel>Janelas de tempo</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
                <Field label="Horário de corte" hint="Solicitações recebidas até este horário são processadas no mesmo dia. Após o corte, entram no ciclo do próximo dia útil.">
                  <TimePicker
                    value={dayjs(oper.horarioCorte, 'HH:mm')}
                    format="HH:mm" minuteStep={30} style={{ width: '100%' }}
                    onChange={v => v && setOper(p => ({ ...p, horarioCorte: v.format('HH:mm') }))}
                  />
                </Field>
                <Field label="SLA aprovação manual" hint="Prazo máximo para que a equipe de operações revise e aprove/rejeite solicitações que requerem análise manual.">
                  <InputNumber value={oper.slaAprovacaoHoras} min={1} max={168} step={12} suffix="h" style={{ width: '100%' }}
                    onChange={v => v !== null && setOper(p => ({ ...p, slaAprovacaoHoras: v }))} />
                </Field>
                <Field label="Janela reconciliação Núclea" hint="Período em que o sistema aguarda confirmação da Núclea antes de considerar a operação liquidada.">
                  <InputNumber value={oper.janelaReconciliacaoHoras} min={1} max={24} step={1} suffix="h" style={{ width: '100%' }}
                    onChange={v => v !== null && setOper(p => ({ ...p, janelaReconciliacaoHoras: v }))} />
                </Field>
              </div>
            </div>
            <div>
              <SectionLabel>Retry TED/PIX</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
                <Field label="Tentativas máximas" hint="Quantas vezes o sistema tenta reenviar um TED/PIX em caso de falha técnica antes de marcar como erro.">
                  <InputNumber value={oper.retryMaxTentativas} min={1} max={10} step={1} style={{ width: '100%' }}
                    onChange={v => v !== null && setOper(p => ({ ...p, retryMaxTentativas: v }))} />
                </Field>
                <Field label="Intervalo entre tentativas" hint="Tempo de espera entre cada tentativa de reenvio. Evita sobrecarregar o sistema de pagamentos em caso de instabilidade.">
                  <InputNumber value={oper.retryIntervaloMin} min={1} max={60} step={5} suffix="min" style={{ width: '100%' }}
                    onChange={v => v !== null && setOper(p => ({ ...p, retryIntervaloMin: v }))} />
                </Field>
              </div>
            </div>
            <div>
              <SectionLabel>Modo de manutenção</SectionLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Switch checked={oper.modoManutencao} onChange={v => setOper(p => ({ ...p, modoManutencao: v }))} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: oper.modoManutencao ? '#ff4d4f' : 'rgba(0,0,0,0.85)' }}>
                    {oper.modoManutencao ? 'ATIVO — novas antecipações pausadas globalmente' : 'Inativo'}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Operações em andamento não são afetadas.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── NOTIFICAÇÕES ── */}
        {section === 'notificacoes' && (
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <SectionLabel>Canais de saída</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {([
                  { key: 'emailAtivo', label: 'E-mail', desc: 'Notificações por e-mail para operadores cadastrados' },
                  { key: 'pushAtivo',  label: 'Push',   desc: 'Notificações push no painel web' },
                  { key: 'smsAtivo',   label: 'SMS',    desc: 'SMS para alertas críticos (custo adicional por envio)' },
                ] as const).map(ch => (
                  <div key={ch.key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Switch checked={notif[ch.key]} onChange={v => setNotif(p => ({ ...p, [ch.key]: v }))} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{ch.label}</div>
                      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{ch.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>Thresholds de alerta</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
                <Field label="Alerta exposição (% do limite)" hint="Quando a exposição total em antecipações atingir esse percentual do limite configurado, um alerta é disparado para os operadores.">
                  <InputNumber value={notif.thresholdAlertaExposicao} min={50} max={100} step={5} suffix="%" style={{ width: '100%' }}
                    onChange={v => v !== null && setNotif(p => ({ ...p, thresholdAlertaExposicao: v }))} />
                </Field>
                <Field label="Alerta chargeback (% TPV)" hint="Quando o índice de chargeback de um EC atingir esse percentual do volume processado, um alerta preventivo é enviado antes do bloqueio automático.">
                  <InputNumber value={notif.thresholdAlertaChargeback} min={0.5} max={10} step={0.5} precision={1} suffix="%" style={{ width: '100%' }}
                    onChange={v => v !== null && setNotif(p => ({ ...p, thresholdAlertaChargeback: v }))} />
                </Field>
              </div>
            </div>
            <div>
              <SectionLabel>Whitelist de domínios (e-mail)</SectionLabel>
              <Field label="Domínios permitidos (separados por vírgula)" hint="Apenas endereços de e-mail nesses domínios receberão notificações. Deixe vazio para não restringir.">
                <input
                  value={notif.dominiosEmail}
                  onChange={e => setNotif(p => ({ ...p, dominiosEmail: e.target.value }))}
                  style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: 2, padding: '5px 11px', fontSize: 13, outline: 'none', color: 'rgba(0,0,0,0.85)' }}
                  onFocus={e => (e.target.style.borderColor = '#1890FF')}
                  onBlur={e  => (e.target.style.borderColor = '#d9d9d9')}
                />
              </Field>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PricingAntecipacaoPage() {
  return (
    <App>
      <PricingAntecipacaoInner />
    </App>
  )
}

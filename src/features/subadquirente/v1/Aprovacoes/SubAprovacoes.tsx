'use client'
// SUB v1 — Aprovando manualmente (FigJam 140:402).
// Console de aprovação: fila ordenada por SLA + dossiê do EC + 3 decisões.
//
// Pixel/Rian (Enviesados):
// - cap. 7 (fadiga): fila ordenada por SLA, mais urgente primeiro
// - cap. 1 (ancoragem): dossiê completo do EC pra decisão informada
// - cap. 9 (não-impostor): flags de risco visíveis, motivo de encaminhamento explícito

import { useState } from 'react'
import KpiCard from '@/components/ui/KpiCard'
import DataTable, { type ColumnType } from '@/components/ui/DataTable'
import PageHeader from '@/components/shared/PageHeader'
import Tag from '@/components/shared/Tag'
import Icon from '@/components/shared/Icon'
import Drawer from '@/components/shared/Drawer'
import Tooltip from '@/components/shared/Tooltip'
import { Tag as AntTag, Progress } from 'antd'
import {
  subSolicitacoes,
  subAprovacoesKpis,
  FLAG_LABELS,
  type SolicitacaoAprovacao,
  type Categoria,
} from '@/mocks/sub/aprovacoes'

const fmtBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

const fmtSla = (min: number) => {
  if (min < 60) return `${min}min`
  const h = Math.floor(min / 60)
  return `${h}h`
}

const slaColor = (min: number) => {
  if (min < 240) return '#FF4D4F'   // <4h crítico
  if (min < 720) return '#FA8C16'   // <12h alerta
  return '#52c41a'                  // >12h ok
}

const categoriaTag = (cat: Categoria) => {
  const map: Record<Categoria, { color: string; label: string }> = {
    Bronze: { color: 'orange',  label: 'Bronze' },
    Prata:  { color: 'default', label: 'Prata' },
    Ouro:   { color: 'gold',    label: 'Ouro' },
  }
  const { color, label } = map[cat]
  return <AntTag color={color} style={{ marginInlineEnd: 0 }}>{label}</AntTag>
}

export default function SubAprovacoes() {
  const [selected, setSelected] = useState<SolicitacaoAprovacao | null>(null)

  const columns: ColumnType<SolicitacaoAprovacao>[] = [
    { title: 'ID',       dataIndex: 'id',  key: 'id',  width: 90 },
    {
      title:  'EC',
      key:    'ec',
      render: (_: unknown, row: SolicitacaoAprovacao) => (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 500 }}>{row.ec}</span>
          {categoriaTag(row.categoria)}
        </span>
      ),
    },
    {
      title:  'Valor',
      key:    'valor',
      align:  'right',
      width:  140,
      render: (_: unknown, row: SolicitacaoAprovacao) => (
        <span style={{ fontWeight: 600, color: '#1890FF' }}>{fmtBRL(row.valorSolicitado)}</span>
      ),
    },
    { title: 'Parcelas', dataIndex: 'qtdParcelas', key: 'qtd', align: 'center', width: 100 },
    {
      // Pixel/Rian (cap. 9): Score sem cor semântica na lista — analista lê o
      // dossiê pra decidir, não o vermelho/verde da tabela.
      title:  'Score',
      key:    'score',
      align:  'right',
      width:  100,
      render: (_: unknown, row: SolicitacaoAprovacao) => (
        <span style={{ color: 'rgba(0,0,0,0.85)', fontWeight: 600 }}>{row.scoreAtual}</span>
      ),
    },
    {
      title:  'Flags',
      key:    'flags',
      width:  220,
      render: (_: unknown, row: SolicitacaoAprovacao) => {
        if (row.flags.length === 0) return <span style={{ color: 'rgba(0,0,0,0.25)' }}>—</span>
        return (
          <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 4 }}>
            {row.flags.map((f) => (
              <Tooltip bare key={f} text={FLAG_LABELS[f].label}>
                <span style={{ fontSize: 10, padding: '1px 6px', background: '#fff', color: FLAG_LABELS[f].cor, border: `1px solid ${FLAG_LABELS[f].cor}40`, borderRadius: 2, fontWeight: 500, cursor: 'help' }}>
                  {FLAG_LABELS[f].label}
                </span>
              </Tooltip>
            ))}
          </span>
        )
      },
    },
    {
      title:  'SLA restante',
      key:    'sla',
      align:  'right',
      width:  130,
      render: (_: unknown, row: SolicitacaoAprovacao) => (
        <span style={{ fontWeight: 600, color: slaColor(row.slaRestanteMin) }}>{fmtSla(row.slaRestanteMin)}</span>
      ),
    },
    {
      title:  'Ações',
      key:    'acoes',
      width:  80,
      render: (_: unknown, row: SolicitacaoAprovacao) => (
        <button
          aria-label="Ver dossiê"
          onClick={(e) => { e.stopPropagation(); setSelected(row) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.45)' }}
        >
          <Icon name="eye" size={16} />
        </button>
      ),
    },
  ]

  // Ordenar por SLA crescente (mais urgente primeiro)
  const dataSorted = [...subSolicitacoes].sort((a, b) => a.slaRestanteMin - b.slaRestanteMin)

  return (
    <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Aprovações de antecipação" breadcrumb="Sub-adquirente · v1 / Aprovações" />

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* KPIs */}
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1 }}><KpiCard label="Pendentes na fila" value={String(subAprovacoesKpis.pendentes)} subLabel="Aguardando decisão" variant="warning" /></div>
          <div style={{ flex: 1 }}><KpiCard label="Próximo SLA"       value={fmtSla(subAprovacoesKpis.proximaSlaMin)} subLabel="Mais urgente da fila" variant="error" /></div>
          <div style={{ flex: 1 }}><KpiCard label="Aprovadas no mês"  value={String(subAprovacoesKpis.aprovadasMes)} subLabel="Histórico de decisões" variant="success" /></div>
          <div style={{ flex: 1 }}><KpiCard label="SLA hit rate"      value={`${subAprovacoesKpis.slaHitRate}%`}     subLabel="% decididas dentro do prazo" variant="info" /></div>
        </div>

        {/* Tabela fila */}
        <DataTable<SolicitacaoAprovacao>
          columns={columns}
          dataSource={dataSorted}
          rowKey="id"
          searchPlaceholder="Pesquise por EC ou ID"
          onRow={(row) => ({ onClick: () => setSelected(row) })}
        />
      </div>

      {/* Drawer dossiê + decisão */}
      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title="Dossiê de aprovação"
        width={560}
        footer={
          <>
            {/* Pixel/Rian (cap. 8 afeto + cap. 9): botões com mesmo peso visual.
                Verde grande induzia 'sim'; aqui cada decisão tem o mesmo destaque,
                ordem alfabética pra não ancorar. */}
            <button style={{ flex: 1, border: '1px solid #d9d9d9', background: '#fff', borderRadius: 2, padding: '8px 0', fontSize: 13, cursor: 'pointer', color: 'rgba(0,0,0,0.85)', fontWeight: 500 }}>Aprovar</button>
            <button style={{ flex: 1, border: '1px solid #d9d9d9', background: '#fff', borderRadius: 2, padding: '8px 0', fontSize: 13, cursor: 'pointer', color: 'rgba(0,0,0,0.85)', fontWeight: 500 }}>Aprovar parcial</button>
            <button style={{ flex: 1, border: '1px solid #d9d9d9', background: '#fff', borderRadius: 2, padding: '8px 0', fontSize: 13, cursor: 'pointer', color: 'rgba(0,0,0,0.85)', fontWeight: 500 }}>Recusar</button>
          </>
        }
      >
        {selected && (
          <>
            {/* Header com EC + categoria + SLA badge */}
            <div style={{ marginBottom: 20, padding: '12px 14px', background: '#fafafa', borderRadius: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{selected.ec}</span>
                {categoriaTag(selected.categoria)}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{selected.cnpj} · {selected.ecId}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: slaColor(selected.slaRestanteMin), fontWeight: 600 }}>
                ⏱ SLA restante: {fmtSla(selected.slaRestanteMin)}
              </div>
            </div>

            {/* Motivo do encaminhamento */}
            <div style={{ marginBottom: 20, padding: '12px 14px', background: '#FFFBEB', borderRadius: 2, border: '1px solid #FDE68A', fontSize: 12, color: 'rgba(0,0,0,0.75)' }}>
              <strong>Motivo do encaminhamento manual:</strong> {selected.motivoEncaminhamento}
            </div>

            {/* Solicitação */}
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Solicitação</div>
            {[
              { label: 'Valor solicitado',      value: fmtBRL(selected.valorSolicitado) },
              { label: 'Quantidade de parcelas',value: `${selected.qtdParcelas}x` },
              { label: 'Prazo médio',           value: selected.prazoMedio },
              { label: 'Recebida em',           value: selected.recebidaEm },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: 13 }}>
                <span style={{ color: 'rgba(0,0,0,0.45)' }}>{r.label}</span>
                <span style={{ fontWeight: 500 }}>{r.value}</span>
              </div>
            ))}

            {/* Score + Exposição com progress visual (Pixel cap. 1 - ancoragem visual) */}
            <div style={{ fontSize: 14, fontWeight: 600, margin: '20px 0 12px' }}>Risco e exposição</div>

            {/* Score isolado */}
            <div style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, padding: '12px 14px', marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Score do EC</span>
                <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)' }}>0–1000</span>
              </div>
              {/* Pixel/Rian (cap. 9): score sem rótulo de juízo de valor.
                  Faixa contextual da categoria pra referência, sem ancorar a decisão. */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: 'rgba(0,0,0,0.85)' }}>{selected.scoreAtual}</span>
                <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                  · faixa {selected.categoria}: {selected.categoria === 'Bronze' ? '0–700' : selected.categoria === 'Prata' ? '600–850' : '750–1000'}
                </span>
              </div>
              <Progress
                percent={(selected.scoreAtual / 1000) * 100}
                showInfo={false}
                size="small"
                strokeColor="rgba(0,0,0,0.45)"
                style={{ marginTop: 4 }}
              />
            </div>

            {/* Exposição vs Limite com progress visual */}
            <div style={{ background: '#fafafa', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 2, padding: '12px 14px', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>Exposição atual vs limite da categoria</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: (selected.exposicaoAtual / selected.limiteCategoria) > 0.8 ? '#FF4D4F' : '#1890FF' }}>
                  {Math.round((selected.exposicaoAtual / selected.limiteCategoria) * 100)}%
                </span>
              </div>
              <Progress
                percent={(selected.exposicaoAtual / selected.limiteCategoria) * 100}
                showInfo={false}
                size="small"
                strokeColor={
                  (selected.exposicaoAtual / selected.limiteCategoria) > 0.8 ? '#FF4D4F' :
                  (selected.exposicaoAtual / selected.limiteCategoria) > 0.5 ? '#FA8C16' :
                  '#52C41A'
                }
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'rgba(0,0,0,0.65)' }}>
                <span>{fmtBRL(selected.exposicaoAtual)} usado</span>
                <span>{fmtBRL(selected.limiteCategoria)} limite</span>
              </div>
            </div>

            {/* Flags de risco */}
            {selected.flags.length > 0 && (
              <>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Flags de risco detectadas</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {selected.flags.map((f) => (
                    <span key={f} style={{ fontSize: 11, padding: '2px 8px', background: `${FLAG_LABELS[f].cor}10`, color: FLAG_LABELS[f].cor, border: `1px solid ${FLAG_LABELS[f].cor}40`, borderRadius: 2, fontWeight: 500 }}>
                      ⚠ {FLAG_LABELS[f].label}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Histórico */}
            <div style={{ fontSize: 14, fontWeight: 600, margin: '20px 0 12px' }}>
              Histórico de antecipações ({selected.historicoAntecipacoes.length})
            </div>
            {selected.historicoAntecipacoes.length === 0 ? (
              <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', fontStyle: 'italic', padding: '12px 0' }}>
                Nenhuma antecipação anterior — primeira operação deste EC.
              </div>
            ) : (
              selected.historicoAntecipacoes.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: 13 }}>
                  <span style={{ color: 'rgba(0,0,0,0.65)' }}>{h.data}</span>
                  <span>{fmtBRL(h.valor)}</span>
                  <Tag status={h.status === 'paga' ? 'Pago' : 'Pendente'} label={h.status === 'paga' ? 'Paga' : 'Em aberto'} />
                </div>
              ))
            )}
          </>
        )}
      </Drawer>
    </div>
  )
}

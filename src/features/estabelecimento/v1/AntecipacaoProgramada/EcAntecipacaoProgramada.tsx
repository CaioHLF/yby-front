'use client'
// EC v1 — Antecipando programadamente (FigJam 141:466).
// Lista de regras + KPIs + drawer de criação.
//
// Pixel/Rian (Enviesados):
// - cap. 4 (custo afundado): "Simular antes de salvar" — explora sem pressão
// - cap. 6 (enquadramento): "Total antecipado este mês" em verde, número-rei
// - cap. 5 (status quo): regras inativas com tag cinza, ativas em verde claro

import { useState } from 'react'
import KpiCard from '@/components/ui/KpiCard'
import DataTable, { type ColumnType } from '@/components/ui/DataTable'
import PageHeader from '@/components/shared/PageHeader'
import Button from '@/components/shared/Button'
import Tag from '@/components/shared/Tag'
import Icon from '@/components/shared/Icon'
import Drawer from '@/components/shared/Drawer'
import EmptyState from '@/components/shared/EmptyState'
import { ecRegrasAntecipacao, ecKpisProgramada, type RegraAntecipacao } from '@/mocks/ec/antecipacao-programada'

const fmtBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

export default function EcAntecipacaoProgramada() {
  const [selected, setSelected] = useState<RegraAntecipacao | null>(null)
  const [creating, setCreating] = useState(false)

  const columns: ColumnType<RegraAntecipacao>[] = [
    { title: 'ID',   dataIndex: 'id',   key: 'id',   width: 100 },
    { title: 'Nome da regra', dataIndex: 'nome', key: 'nome' },
    {
      title:  'Trigger',
      key:    'trigger',
      render: (_: unknown, row: RegraAntecipacao) => (
        <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>{row.trigger.descricao}</span>
      ),
    },
    { title: 'Última execução', dataIndex: 'ultimaExecucao', key: 'ultimaExecucao', width: 160, render: (v: string | undefined) => v ?? '—' },
    { title: 'Próxima execução', dataIndex: 'proximaExecucao', key: 'proximaExecucao', width: 180, render: (v: string | undefined) => v ?? '—' },
    {
      title:  'Antecipado / mês',
      key:    'totalMes',
      align:  'right',
      width:  150,
      render: (_: unknown, row: RegraAntecipacao) => (
        <span style={{ color: row.totalAntecipadoMes > 0 ? '#52c41a' : 'rgba(0,0,0,0.25)', fontWeight: 500 }}>
          {row.totalAntecipadoMes > 0 ? `+ ${fmtBRL(row.totalAntecipadoMes)}` : '—'}
        </span>
      ),
    },
    {
      title:  'Status',
      key:    'ativa',
      width:  110,
      render: (_: unknown, row: RegraAntecipacao) => (
        <Tag status={row.ativa ? 'Ativo' : 'Inativo'} label={row.ativa ? 'Ativa' : 'Inativa'} />
      ),
    },
    {
      title:  'Ações',
      key:    'acoes',
      width:  80,
      render: (_: unknown, row: RegraAntecipacao) => (
        <button
          aria-label="Ver detalhes"
          onClick={(e) => { e.stopPropagation(); setSelected(row) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.45)' }}
        >
          <Icon name="eye" size={16} />
        </button>
      ),
    },
  ]

  return (
    <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="Antecipação programada"
        breadcrumb="Estabelecimento Comercial · v1 / Financeiro / Antecipação programada"
        extra={<Button variant="primary" icon="plus" onClick={() => setCreating(true)}>Criar regra</Button>}
      />

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* KPIs */}
        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1 }}><KpiCard label="Regras ativas"           value={String(ecKpisProgramada.regrasAtivas)} subLabel="Disparam automaticamente"   variant="success" /></div>
          <div style={{ flex: 1 }}><KpiCard label="Próxima execução"        value={ecKpisProgramada.proximaExecucao}      subLabel="Quando uma regra rodar"     variant="info" /></div>
          <div style={{ flex: 1 }}><KpiCard label="Antecipado este mês"     value={fmtBRL(ecKpisProgramada.totalAntecipadoMes)} subLabel="Total das regras"     variant="success" /></div>
        </div>

        {/* Tabela de regras */}
        <DataTable<RegraAntecipacao>
          columns={columns}
          dataSource={ecRegrasAntecipacao}
          rowKey="id"
          searchPlaceholder="Pesquise por nome da regra"
          onRow={(row) => ({ onClick: () => setSelected(row) })}
        />
      </div>

      {/* Drawer detalhes da regra */}
      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title="Detalhes da regra"
        width={520}
        footer={
          <>
            <button style={{ flex: 1, border: '1px solid #d9d9d9', background: '#fff', borderRadius: 2, padding: '8px 0', fontSize: 13, cursor: 'pointer', color: 'rgba(0,0,0,0.65)' }}>Editar</button>
            <button style={{ flex: 1, border: '1px solid #ff4d4f', background: '#fff', borderRadius: 2, padding: '8px 0', fontSize: 13, cursor: 'pointer', color: '#ff4d4f' }}>{selected?.ativa ? 'Pausar regra' : 'Ativar regra'}</button>
          </>
        }
      >
        {selected && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.85)' }}>{selected.nome}</span>
              <Tag status={selected.ativa ? 'Ativo' : 'Inativo'} label={selected.ativa ? 'Ativa' : 'Inativa'} />
            </div>
            {[
              { label: 'ID',                 value: selected.id },
              { label: 'Trigger',            value: selected.trigger.descricao },
              { label: 'Última execução',    value: selected.ultimaExecucao ?? '—' },
              { label: 'Próxima execução',   value: selected.proximaExecucao ?? '—' },
              { label: 'Bandeiras filtradas',value: selected.filtros.bandeiras?.join(', ') ?? 'Todas' },
              { label: 'Parcela mínima',     value: selected.filtros.minParcela ? `${selected.filtros.minParcela}` : '—' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: 13 }}>
                <span style={{ color: 'rgba(0,0,0,0.45)' }}>{r.label}</span>
                <span style={{ color: 'rgba(0,0,0,0.85)', fontWeight: 500 }}>{r.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.85)', marginBottom: 12 }}>Performance este mês</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 2, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Antecipado</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#52c41a' }}>{fmtBRL(selected.totalAntecipadoMes)}</div>
                </div>
                <div style={{ flex: 1, background: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: 2, padding: '10px 8px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Execuções</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1890FF' }}>{selected.qtdExecucoesMes}x</div>
                </div>
              </div>
            </div>
          </>
        )}
      </Drawer>

      {/* Drawer criar regra */}
      <Drawer
        open={creating}
        onClose={() => setCreating(false)}
        title="Criar nova regra de antecipação"
        width={540}
        footer={
          <>
            <button onClick={() => setCreating(false)} style={{ flex: 1, border: '1px solid #d9d9d9', background: '#fff', borderRadius: 2, padding: '8px 0', fontSize: 13, cursor: 'pointer', color: 'rgba(0,0,0,0.65)' }}>Cancelar</button>
            <button style={{ flex: 1, border: 'none', background: '#1890FF', borderRadius: 2, padding: '8px 0', fontSize: 13, cursor: 'pointer', color: '#fff', fontWeight: 500 }}>Simular antes de salvar</button>
          </>
        }
      >
        <EmptyState
          title="Criação de regra — em construção"
          description={
            <span>
              Form em desenvolvimento (FigJam 141:466). Vai conter:
              <ul style={{ textAlign: 'left', margin: '12px auto', maxWidth: 420, fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
                <li>Nome da regra</li>
                <li>Tipo de trigger (calendário · valor agenda · fim de mês · dia da semana)</li>
                <li>Filtros: bandeiras, MCC, faixa de parcelas</li>
                <li>Pré-visualização com simulação de impacto</li>
                <li>Ativar/desativar logo após criar</li>
              </ul>
              <strong>Pixel/Rian:</strong> sempre simula antes de salvar — sem custo afundado.
            </span>
          }
          paddingY={48}
        />
      </Drawer>
    </div>
  )
}

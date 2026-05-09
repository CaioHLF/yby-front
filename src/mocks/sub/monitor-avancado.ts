// Mocks de Monitor Avançado — SUB V1 (FigJam 140:491).
// Dashboard real-time com KPIs por categoria + drill-down + alertas + ações.

export type Categoria = 'Bronze' | 'Prata' | 'Ouro'
export type AlertaSeveridade = 'critico' | 'aviso' | 'info'
export type AlertaTipo = 'exposicao-limite' | 'sla-violado' | 'retry-storm' | 'volume-anomalo' | 'reconciliacao-pendente'

export interface KpisCategoria {
  categoria: Categoria
  volume30d: number
  exposicaoAtual: number
  exposicaoMax: number
  aprovacaoManualPct: number
  slaHitRate: number
  ecsAtivos: number
}

export const subKpisCategoria: KpisCategoria[] = [
  { categoria: 'Bronze', volume30d:  450000, exposicaoAtual:  78000, exposicaoMax: 200000, aprovacaoManualPct: 28, slaHitRate: 92, ecsAtivos: 23 },
  { categoria: 'Prata',  volume30d: 1240000, exposicaoAtual: 320000, exposicaoMax: 600000, aprovacaoManualPct: 12, slaHitRate: 96, ecsAtivos: 45 },
  { categoria: 'Ouro',   volume30d: 3400000, exposicaoAtual: 980000, exposicaoMax: 2000000, aprovacaoManualPct:  3, slaHitRate: 99, ecsAtivos: 12 },
]

export interface Alerta {
  id: string
  severidade: AlertaSeveridade
  tipo: AlertaTipo
  titulo: string
  contexto: string
  ec?: string
  ecId?: string
  detectadoEm: string
  /** Sugestão de ação operacional */
  acaoSugerida?: string
}

export const subAlertas: Alerta[] = [
  {
    id: 'ALT-001',
    severidade: 'critico',
    tipo: 'exposicao-limite',
    titulo: 'Exposição Bronze a 90% do teto',
    contexto: 'Categoria Bronze: R$ 180k de R$ 200k limite (90%). Próximas antecipações Bronze podem ser bloqueadas.',
    detectadoEm: '08/05/2026 16:12',
    acaoSugerida: 'Avaliar subir limite Bronze ou pausar antecipação automática até reconciliação',
  },
  {
    id: 'ALT-002',
    severidade: 'critico',
    tipo: 'sla-violado',
    titulo: 'SLA de aprovação violado em APR-001',
    contexto: 'Calçados Bruno Ltda — solicitação aberta há 50h (limite 48h). EC notificado.',
    ec: 'Calçados Bruno Ltda',
    ecId: 'MCH-007',
    detectadoEm: '08/05/2026 15:45',
    acaoSugerida: 'Decisão imediata necessária pela área de aprovação',
  },
  {
    id: 'ALT-003',
    severidade: 'aviso',
    tipo: 'retry-storm',
    titulo: 'Retry storm detectado — TED Itaú',
    contexto: '14 retries TED no último 30min para destinos Itaú. Possível instabilidade no banco.',
    detectadoEm: '08/05/2026 16:25',
    acaoSugerida: 'Pausar TED Itaú e mudar pra PIX como fallback',
  },
  {
    id: 'ALT-004',
    severidade: 'aviso',
    tipo: 'volume-anomalo',
    titulo: 'Volume 3x acima da média — Magazine Luiza',
    contexto: 'EC Magazine Luiza com R$ 320k em antecipações em 24h vs média 110k. Verificar com merchant.',
    ec: 'Magazine Luiza',
    ecId: 'MCH-002',
    detectadoEm: '08/05/2026 14:20',
  },
  {
    id: 'ALT-005',
    severidade: 'info',
    tipo: 'reconciliacao-pendente',
    titulo: 'Reconciliação Núclea D-1 pendente',
    contexto: '320 operações de 07/05 ainda não reconciliadas. Job noturno detectou divergência de R$ 1.240,00.',
    detectadoEm: '08/05/2026 06:15',
    acaoSugerida: 'Conferir arquivo Núclea e aplicar ajuste contábil',
  },
]

export interface TopEc {
  rank: number
  ec: string
  ecId: string
  categoria: Categoria
  volume30d: number
  exposicaoAtual: number
  ultimaAtividade: string
}

export const subTopEcs: TopEc[] = [
  { rank: 1, ec: 'Mercado Livre',  ecId: 'MCH-008', categoria: 'Ouro',   volume30d: 1240000, exposicaoAtual: 380000, ultimaAtividade: '08/05/2026 16:30' },
  { rank: 2, ec: 'Amazon Brasil',  ecId: 'MCH-006', categoria: 'Ouro',   volume30d:  980000, exposicaoAtual: 240000, ultimaAtividade: '08/05/2026 16:28' },
  { rank: 3, ec: 'Magazine Luiza', ecId: 'MCH-002', categoria: 'Ouro',   volume30d:  720000, exposicaoAtual: 320000, ultimaAtividade: '08/05/2026 14:20' },
  { rank: 4, ec: 'Shopee Brasil',  ecId: 'MCH-005', categoria: 'Prata',  volume30d:  430000, exposicaoAtual:  95000, ultimaAtividade: '08/05/2026 14:30' },
  { rank: 5, ec: 'Rappi Brasil',   ecId: 'MCH-003', categoria: 'Prata',  volume30d:  340000, exposicaoAtual:  68000, ultimaAtividade: '08/05/2026 13:15' },
]

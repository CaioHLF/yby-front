// Mocks de Aprovações de Antecipação — SUB V1 (FigJam 140:402).
// Fila de solicitações que caíram em fluxo manual: score limítrofe,
// valor > limite categoria, ou EC fora de auto.

export type Categoria = 'Bronze' | 'Prata' | 'Ouro'
export type FlagRisco = 'volume-incomum' | 'chargeback-acima' | 'mcc-limitrofe' | 'score-baixo' | 'primeira-operacao'
export type DecisaoStatus = 'pendente' | 'aprovado' | 'aprovado-parcial' | 'recusado'

export interface SolicitacaoAprovacao {
  id: string
  ec: string
  ecId: string
  cnpj: string
  categoria: Categoria
  valorSolicitado: number
  qtdParcelas: number
  prazoMedio: string
  scoreAtual: number
  exposicaoAtual: number
  limiteCategoria: number
  flags: FlagRisco[]
  motivoEncaminhamento: string
  recebidaEm: string
  /** SLA em minutos (decrescente) */
  slaRestanteMin: number
  status: DecisaoStatus
  // Dossiê
  historicoAntecipacoes: Array<{ data: string; valor: number; status: 'paga' | 'em-aberto' }>
}

export const FLAG_LABELS: Record<FlagRisco, { label: string; cor: string }> = {
  'volume-incomum':     { label: 'Volume incomum',          cor: '#FA8C16' },
  'chargeback-acima':   { label: 'Chargeback acima média',  cor: '#FF4D4F' },
  'mcc-limitrofe':      { label: 'MCC limítrofe',           cor: '#FA8C16' },
  'score-baixo':        { label: 'Score abaixo do esperado',cor: '#FF4D4F' },
  'primeira-operacao':  { label: 'Primeira operação',       cor: '#1890FF' },
}

export const subSolicitacoes: SolicitacaoAprovacao[] = [
  {
    id: 'APR-001',
    ec: 'Calçados Bruno Ltda',
    ecId: 'MCH-007',
    cnpj: '98.765.432/0001-10',
    categoria: 'Bronze',
    valorSolicitado: 85000,
    qtdParcelas: 12,
    prazoMedio: '45 dias',
    scoreAtual: 580,
    exposicaoAtual: 32000,
    limiteCategoria: 50000,
    flags: ['score-baixo', 'volume-incomum'],
    motivoEncaminhamento: 'Valor (R$ 85k) acima do limite Bronze (R$ 50k).',
    recebidaEm: '08/05/2026 09:42',
    slaRestanteMin: 480, // 8h
    status: 'pendente',
    historicoAntecipacoes: [
      { data: '15/04/2026', valor: 12000, status: 'paga' },
      { data: '02/04/2026', valor:  8500, status: 'em-aberto' },
    ],
  },
  {
    id: 'APR-002',
    ec: 'Magazine Luiza',
    ecId: 'MCH-002',
    cnpj: '47.960.950/0001-21',
    categoria: 'Ouro',
    valorSolicitado: 320000,
    qtdParcelas: 24,
    prazoMedio: '60 dias',
    scoreAtual: 920,
    exposicaoAtual: 180000,
    limiteCategoria: 500000,
    flags: [],
    motivoEncaminhamento: 'EC explicitamente fora de auto (preferência manual).',
    recebidaEm: '08/05/2026 11:15',
    slaRestanteMin: 1620, // 27h
    status: 'pendente',
    historicoAntecipacoes: [
      { data: '20/04/2026', valor: 250000, status: 'paga' },
      { data: '10/04/2026', valor: 180000, status: 'paga' },
      { data: '02/04/2026', valor: 220000, status: 'paga' },
    ],
  },
  {
    id: 'APR-003',
    ec: 'Shopee Brasil',
    ecId: 'MCH-005',
    cnpj: '35.060.991/0001-56',
    categoria: 'Prata',
    valorSolicitado: 95000,
    qtdParcelas: 8,
    prazoMedio: '30 dias',
    scoreAtual: 720,
    exposicaoAtual: 65000,
    limiteCategoria: 150000,
    flags: ['chargeback-acima'],
    motivoEncaminhamento: 'Chargeback nos últimos 30 dias acima do threshold (1.8% vs 1.2% média).',
    recebidaEm: '08/05/2026 14:30',
    slaRestanteMin: 2340, // 39h
    status: 'pendente',
    historicoAntecipacoes: [
      { data: '01/05/2026', valor: 80000, status: 'em-aberto' },
    ],
  },
  {
    id: 'APR-004',
    ec: 'Loja Nova Esperança',
    ecId: 'MCH-099',
    cnpj: '11.222.333/0001-44',
    categoria: 'Bronze',
    valorSolicitado: 18000,
    qtdParcelas: 6,
    prazoMedio: '25 dias',
    scoreAtual: 650,
    exposicaoAtual: 0,
    limiteCategoria: 50000,
    flags: ['primeira-operacao', 'mcc-limitrofe'],
    motivoEncaminhamento: 'Primeira operação de antecipação · MCC 5912 (farmácia) requer aprovação manual no V1++.',
    recebidaEm: '08/05/2026 15:55',
    slaRestanteMin: 2820, // 47h
    status: 'pendente',
    historicoAntecipacoes: [],
  },
]

export interface AprovacoesKpis {
  pendentes: number
  proximaSlaMin: number
  aprovadasMes: number
  recusadasMes: number
  slaHitRate: number
}

export const subAprovacoesKpis: AprovacoesKpis = {
  pendentes: 4,
  proximaSlaMin: 480,
  aprovadasMes: 87,
  recusadasMes: 12,
  slaHitRate: 96,
}

// Mocks de Cobranças e Links de Pagamento — EC V0.
// Dados extraídos do Figma "Payments" (cobranças) e "Payment links".

export type CobrancaCanal = 'pos' | 'link' | 'ecommerce'
export type CobrancaStatus = 'Sucesso' | 'Falha' | 'Pendente'
export type CardBrand = 'Visa' | 'Mastercard' | 'Elo' | 'Amex' | 'PIX'

export interface Cobranca {
  id: string
  ultimaTransacao: string
  cliente: string
  criadoEm: string
  canal: CobrancaCanal
  canalDetalhe?: string
  brand: CardBrand
  parcelas: number
  valor: number
  status: CobrancaStatus
}

export const ecCobrancas: Cobranca[] = [
  {
    id: 'd056s9la6jjs7151angg',
    ultimaTransacao: '10/10/2025 10:00',
    cliente: '—',
    criadoEm: '10/10/2025 10:00',
    canal: 'pos',
    canalDetalhe: '1234',
    brand: 'Mastercard',
    parcelas: 1,
    valor: 10,
    status: 'Sucesso',
  },
  {
    id: 'd05750qle4as716dtuh0',
    ultimaTransacao: '10/10/2025 10:00',
    cliente: 'XYZ Merchandising',
    criadoEm: '10/10/2025 10:00',
    canal: 'link',
    brand: 'Visa',
    parcelas: 1,
    valor: 200,
    status: 'Sucesso',
  },
  {
    id: 'd058rfuh2kqc712vtvo0',
    ultimaTransacao: '10/10/2025 10:00',
    cliente: 'Store Online Ltda',
    criadoEm: '10/10/2025 10:00',
    canal: 'ecommerce',
    brand: 'PIX',
    parcelas: 1,
    valor: 2000,
    status: 'Sucesso',
  },
  {
    id: 'd05abejst5lc714imf2g',
    ultimaTransacao: '10/10/2025 10:00',
    cliente: 'Calçados e Cia',
    criadoEm: '10/10/2025 10:00',
    canal: 'ecommerce',
    brand: 'Elo',
    parcelas: 4,
    valor: 20000,
    status: 'Falha',
  },
]

// ─── Links de Pagamento ───

export type LinkStatus = 'Ativo' | 'Concluído' | 'Inativo'

export interface LinkPagamento {
  id: string
  nome: string
  formas: CardBrand[]
  valor: number
  pagamentos: number
  limitePagamentos: number
  totalRecebido: number
  status: LinkStatus
  criadoEm: string
}

export const ecLinksPagamento: LinkPagamento[] = [
  { id: '11', nome: 'Link teste 11', formas: ['Visa', 'Elo'],         valor: 10,    pagamentos: 0, limitePagamentos: 1, totalRecebido: 0,    status: 'Ativo',     criadoEm: '10/10/2025 10:00' },
  { id: '12', nome: 'Link teste 12', formas: ['Visa', 'Elo'],         valor: 10,    pagamentos: 2, limitePagamentos: 5, totalRecebido: 20,   status: 'Ativo',     criadoEm: '10/10/2025 10:00' },
  { id: '22', nome: 'Link teste 22', formas: ['Mastercard', 'Elo'],   valor: 200,   pagamentos: 1, limitePagamentos: 1, totalRecebido: 200,  status: 'Concluído', criadoEm: '10/10/2025 10:00' },
  { id: '23', nome: 'Link teste 23', formas: ['Elo'],                  valor: 2000,  pagamentos: 1, limitePagamentos: 1, totalRecebido: 2000, status: 'Concluído', criadoEm: '10/10/2025 10:00' },
  { id: '15', nome: 'Link teste 15', formas: ['Mastercard', 'Elo'],   valor: 20000, pagamentos: 0, limitePagamentos: 0, totalRecebido: 0,    status: 'Inativo',   criadoEm: '10/10/2025 10:00' },
]

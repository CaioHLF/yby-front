// Mocks do Dashboard do Estabelecimento Comercial — V0.
// Estrutura espelha o Figma "Dashboard" da section "Dashboard" no design file
// snVJWDtyxkFoUwn7trI4BP. Valores são fictícios mas mantêm proporções e
// soma coerentes para validar a UI.

export interface KpiSummary {
  label: string
  value: string
  subLabel?: string
}

export interface TpvPoint {
  date: string // 'dd/MM'
  value: number
}

export interface StatusBreakdown {
  status: 'Pago' | 'Pendente' | 'Cancelado' | 'Não autorizado' | 'Outros'
  value: number
  count: number
  percent: number
}

export interface PaymentMethodShare {
  method: string
  iconKey: 'creditCard' | 'pix' | 'debit' | 'boleto'
  percent: number
}

export interface BrandShare {
  brand: 'Visa' | 'Mastercard' | 'Elo' | 'Amex' | 'Outros'
  percent: number
}

export interface ConversionRate {
  channel: string
  percent: number
}

export interface InstallmentBucket {
  label: string // '1x', '2x', ...
  count: number
}

export const ecDashboardKpis: KpiSummary[] = [
  { label: 'Cobranças criadas',     value: 'R$ 200,00', subLabel: 'Total que você cobrou' },
  { label: 'Cobranças autorizadas', value: 'R$ 20,00',  subLabel: 'Total já pago pelos clientes' },
  { label: 'Número de cobranças',   value: '120',        subLabel: 'Quantas vendas no período' },
  { label: 'Ticket médio',          value: 'R$ 20,00',  subLabel: 'Valor médio por venda' },
]

// Gráfico TPV — volume total transacionado por dia (últimos 30 dias).
// Picos pra simular padrão real (terça e quinta com volume maior).
export const ecDashboardTpv: TpvPoint[] = [
  { date: '01/04', value: 180 },  { date: '02/04', value: 320 },  { date: '03/04', value: 450 },
  { date: '04/04', value: 280 },  { date: '05/04', value: 220 },  { date: '06/04', value: 190 },
  { date: '07/04', value: 240 },  { date: '08/04', value: 1180 }, { date: '09/04', value: 380 },
  { date: '10/04', value: 290 },  { date: '11/04', value: 210 },  { date: '12/04', value: 1050 },
  { date: '13/04', value: 260 },  { date: '14/04', value: 340 },  { date: '15/04', value: 220 },
  { date: '16/04', value: 470 },  { date: '17/04', value: 310 },  { date: '18/04', value: 240 },
  { date: '19/04', value: 280 },  { date: '20/04', value: 580 },  { date: '21/04', value: 320 },
  { date: '22/04', value: 250 },  { date: '23/04', value: 290 },  { date: '24/04', value: 700 },
  { date: '25/04', value: 410 },  { date: '26/04', value: 230 },  { date: '27/04', value: 270 },
  { date: '28/04', value: 220 },  { date: '29/04', value: 250 },  { date: '30/04', value: 200 },
]

export const ecDashboardStatus: StatusBreakdown[] = [
  { status: 'Pago',           value: 200, count: 50, percent: 50 },
  { status: 'Pendente',       value: 20,  count: 25, percent: 10 },
  { status: 'Cancelado',      value: 120, count: 20, percent: 20 },
  { status: 'Não autorizado', value: 20,  count: 15, percent: 20 },
  { status: 'Outros',         value: 20,  count: 0,  percent: 0  },
]

export const ecDashboardPaymentMethods: PaymentMethodShare[] = [
  { method: 'Cartão de crédito', iconKey: 'creditCard', percent: 99.11 },
  { method: 'PIX',                iconKey: 'pix',         percent: 0.89  },
]

export const ecDashboardBrands: BrandShare[] = [
  { brand: 'Visa',       percent: 56.76 },
  { brand: 'Mastercard', percent: 43.24 },
]

export const ecDashboardConversion: ConversionRate[] = [
  { channel: 'Cartão',  percent: 84 },
  { channel: 'Boleto',  percent: 0 },
  { channel: 'Pix',     percent: 0 },
  { channel: 'Outros',  percent: 0 },
]

export const ecDashboardInstallments: InstallmentBucket[] = [
  { label: '1x', count: 100 },
  { label: '2x', count: 0 },
  { label: '3x', count: 0 },
  { label: '4x', count: 0 },
  { label: '5x', count: 0 },
  { label: '6x', count: 0 },
]

import type { Meta, StoryObj } from '@storybook/react'
import EcAgenda from './EcAgenda'

const meta: Meta<typeof EcAgenda> = {
  title: 'Domain/Estabelecimento V0/Agenda',
  component: EcAgenda,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Agenda de Recebíveis do Estabelecimento Comercial — V0. 4 KPIs (Entrada, Saída, Líquido para o dia, Entradas futuras), calendário mensal com status por dia (Recebido / A receber) e painel lateral de drill com Entradas e Deduções. Pixel/Rian: dias já liquidados são CINZA, não vermelho — vermelho é reservado pra falha real (Enviesados cap. 6, enquadramento).',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcAgenda>

export const Default: Story = { name: 'Janeiro 2025 com dia 11 selecionado' }

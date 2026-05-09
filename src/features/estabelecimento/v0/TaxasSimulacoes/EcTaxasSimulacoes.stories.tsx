import type { Meta, StoryObj } from '@storybook/react'
import EcTaxasSimulacoes from './EcTaxasSimulacoes'

const meta: Meta<typeof EcTaxasSimulacoes> = {
  title: 'Domain/Estabelecimento V0/TaxasSimulacoes',
  component: EcTaxasSimulacoes,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcTaxasSimulacoes>
export const Default: Story = { name: 'Estado padrão (CP expandido)' }

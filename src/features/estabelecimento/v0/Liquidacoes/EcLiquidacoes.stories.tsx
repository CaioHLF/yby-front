import type { Meta, StoryObj } from '@storybook/react'
import EcLiquidacoes from './EcLiquidacoes'

const meta: Meta<typeof EcLiquidacoes> = {
  title: 'Domain/Estabelecimento V0/Liquidacoes',
  component: EcLiquidacoes,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcLiquidacoes>
export const Default: Story = { name: 'Estado padrão' }

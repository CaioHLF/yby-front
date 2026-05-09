import type { Meta, StoryObj } from '@storybook/react'
import EcEmpresas from './EcEmpresas'

const meta: Meta<typeof EcEmpresas> = {
  title: 'Domain/Estabelecimento V0/Empresas',
  component: EcEmpresas,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcEmpresas>
export const Default: Story = { name: 'Estado padrão' }

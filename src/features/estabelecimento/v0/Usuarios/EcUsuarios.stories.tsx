import type { Meta, StoryObj } from '@storybook/react'
import EcUsuarios from './EcUsuarios'

const meta: Meta<typeof EcUsuarios> = {
  title: 'Domain/Estabelecimento V0/Usuarios',
  component: EcUsuarios,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcUsuarios>
export const Default: Story = { name: 'Estado padrão' }

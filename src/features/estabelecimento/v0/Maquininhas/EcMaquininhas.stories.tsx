import type { Meta, StoryObj } from '@storybook/react'
import EcMaquininhas from './EcMaquininhas'

const meta: Meta<typeof EcMaquininhas> = {
  title: 'Domain/Estabelecimento V0/Maquininhas',
  component: EcMaquininhas,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcMaquininhas>

export const Placeholder: Story = { name: 'Em breve (sem Figma definido)' }

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';
import { Input } from '../Input/Input';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '이메일 주소' },
};

export const Required: Story = {
  args: { children: '이메일 주소', required: true },
};

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-col gap-3">
      <Label size="sm">Small 라벨</Label>
      <Label size="md">Medium 라벨</Label>
      <Label size="lg">Large 라벨</Label>
    </div>
  ),
};

export const WithInput: Story = {
  name: 'Label + Input 조합',
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="email" required>이메일</Label>
      <Input id="email" placeholder="hello@example.com" />
    </div>
  ),
};

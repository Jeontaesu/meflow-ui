import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const FRUITS = [
  { label: '사과', value: 'apple' },
  { label: '바나나', value: 'banana' },
  { label: '포도', value: 'grape' },
  { label: '딸기 (품절)', value: 'strawberry', disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { options: FRUITS, placeholder: '선택하세요' },
};

export const WithLabel: Story = {
  args: { options: FRUITS, label: '과일 선택', placeholder: '선택하세요' },
};

export const WithDefaultValue: Story = {
  args: { options: FRUITS, label: '과일 선택', value: 'banana' },
};

export const ErrorState: Story = {
  args: {
    options: FRUITS,
    label: '과일 선택',
    placeholder: '선택하세요',
    error: '필수 항목입니다.',
  },
};

export const Disabled: Story = {
  args: { options: FRUITS, label: '과일 선택', value: 'apple', disabled: true },
};

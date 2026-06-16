import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: '입력하세요' },
};

export const WithLabel: Story = {
  args: { label: '이메일', placeholder: 'hello@example.com' },
};

export const WithHint: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '8자 이상 입력',
    hint: '영문, 숫자, 특수문자를 포함해주세요.',
  },
};

export const ErrorState: Story = {
  args: {
    label: '이메일',
    placeholder: 'hello@example.com',
    variant: 'error',
    error: '올바른 이메일 형식이 아닙니다.',
  },
};

export const SuccessState: Story = {
  args: {
    label: '이메일',
    placeholder: 'hello@example.com',
    variant: 'success',
    defaultValue: 'hello@example.com',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호 입력',
    rightIcon: <EyeIcon />,
  },
};

export const Small: Story = {
  args: { size: 'sm', placeholder: 'Small input' },
};

export const Large: Story = {
  args: { size: 'lg', placeholder: 'Large input' },
};

export const Disabled: Story = {
  args: { label: '비활성화', defaultValue: '수정 불가', disabled: true },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input label="기본" placeholder="Default" />
      <Input label="에러" placeholder="Error" variant="error" error="오류 메시지" />
      <Input label="성공" placeholder="Success" variant="success" defaultValue="확인됨" />
    </div>
  ),
};

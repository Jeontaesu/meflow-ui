import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: '동의합니다' },
};

export const Checked: Story = {
  args: { label: '동의합니다', checked: true },
};

export const WithHint: Story = {
  args: {
    label: '마케팅 수신 동의',
    hint: '이벤트 및 혜택 정보를 받아보실 수 있습니다.',
  },
};

export const Indeterminate: Story = {
  args: { label: '전체 선택', indeterminate: true },
};

export const Disabled: Story = {
  args: { label: '비활성화', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: '비활성화 (선택됨)', checked: true, disabled: true },
};

export const GroupExample: Story = {
  name: 'Group (전체선택 패턴)',
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="전체 동의" indeterminate />
      <div className="flex flex-col gap-2 pl-6 border-l border-gray-200">
        <Checkbox label="이용약관 동의 (필수)" checked />
        <Checkbox label="개인정보 처리방침 동의 (필수)" />
        <Checkbox
          label="마케팅 수신 동의 (선택)"
          hint="이벤트 및 혜택 정보를 받아보실 수 있습니다."
        />
      </div>
    </div>
  ),
};

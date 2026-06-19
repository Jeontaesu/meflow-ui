import React from 'react';
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
  render: () => {
    const [items, setItems] = React.useState([
      {id: '1', label: '이용약관 동의 (필수)', checked: true},
      {id: '2', label: '개인정보 처리방침 동의 (필수)', checked: false},
      {id: '3', label: '마케팅 수신 동의 (선택)', checked: false},
    ]);

    const allChecked = items.every((i) => i.checked);
    const isIndeterminate = items.some((i) => i.checked) && !allChecked;

    const handleAllChange = (checked: boolean) => {
      setItems(items.map((i) => ({ ...i, checked})));
    };

    const handleItemChange = (id: string, checked: boolean) => {
      setItems(items.map((i) => (i.id === id ? { ...i, checked} : i)));
    };

    return (
      <div className='flex flex-col gap-3'>
        <Checkbox label='전체 동의' checked={allChecked} indeterminate={isIndeterminate} onCheckedChange={handleAllChange} />
        <div className='flex flex-col gap-2 pl-6 border-l border-gray-200'>
          {items.map((item) => (
            <Checkbox key={item.id} label={item.label} checked={item.checked} onCheckedChange={(checked) => handleItemChange(item.id, checked)} />
          ))}
        </div>
      </div>
    )
  }

};

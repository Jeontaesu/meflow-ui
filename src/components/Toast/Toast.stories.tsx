import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Toast, ToastProvider, ToastViewport } from './Toast';

// Toast는 Provider가 필요하므로 decorator로 감쌈
const meta = {
  title: 'Components/Toast',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 버튼을 눌러 토스트를 띄우는 인터랙티브 래퍼
const ToastDemo = ({ variant, title, description }: {
  variant: 'default' | 'success' | 'error' | 'warning';
  title: string;
  description?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => { setOpen(false); setTimeout(() => setOpen(true), 50); }}>
        토스트 띄우기
      </Button>
      <Toast
        variant={variant}
        title={title}
        description={description}
        open={open}
        onOpenChange={setOpen}
        duration={3000}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <ToastDemo variant="default" title="알림" description="작업이 처리되었습니다." />,
};

export const Success: Story = {
  render: () => <ToastDemo variant="success" title="저장 완료" description="변경 사항이 저장되었습니다." />,
};

export const Error: Story = {
  render: () => <ToastDemo variant="error" title="오류 발생" description="다시 시도해주세요." />,
};

export const Warning: Story = {
  render: () => <ToastDemo variant="warning" title="주의" description="이 작업은 되돌릴 수 없습니다." />,
};

export const TitleOnly: Story = {
  render: () => <ToastDemo variant="success" title="복사되었습니다." />,
};

export const AllVariants: Story = {
  name: 'All Variants (정적)',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport className="static flex flex-col gap-2 w-80" />
      </ToastProvider>
    ),
  ],
  render: () => (
    <>
      <Toast variant="default" title="기본 알림" description="일반적인 안내 메시지입니다." open />
      <Toast variant="success" title="저장 완료" description="변경 사항이 저장되었습니다." open />
      <Toast variant="error" title="오류 발생" description="다시 시도해주세요." open />
      <Toast variant="warning" title="주의" description="이 작업은 되돌릴 수 없습니다." open />
    </>
  ),
};

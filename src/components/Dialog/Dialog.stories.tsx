import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogClose,
} from './Dialog';

const meta = {
  title: 'Components/Dialog',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: '기본 확인 다이얼로그',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠어요?</DialogTitle>
          <DialogDescription>이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로 삭제됩니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button variant="danger">삭제</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const FormDialog: Story = {
  name: '폼 다이얼로그',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>프로필 수정</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>변경 후 저장 버튼을 눌러주세요.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" required>이름</Label>
            <Input id="name" placeholder="홍길동" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" required>이메일</Label>
            <Input id="email" type="email" placeholder="hello@example.com" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

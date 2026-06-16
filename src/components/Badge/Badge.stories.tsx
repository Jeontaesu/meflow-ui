import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'success', 'danger', 'warning'] },
  },
} satisfies Meta<typeof Badge>;
 
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {args: {children: '기본'}};
export const Primary: Story = {args: {variant: 'primary', children: '신규'}};

export const AllVariants: Story = {
    render: () => (
        <div className='flex gap-2'>
            <Badge>기본</Badge>
            <Badge variant="primary">신규</Badge>
            <Badge variant="success">완료</Badge>
            <Badge variant="danger">오류</Badge>
            <Badge variant="warning">주의</Badge>
        </div>
    )
};
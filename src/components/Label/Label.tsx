import * as RadixLabel from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const labelVariants = cva('text-gray-700 font-medium leading-none', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-danger",
      false: '',
    },
  },
  defaultVariants: { size: 'md', required: false },
});

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof RadixLabel.Root>,
    VariantProps<typeof labelVariants> {}

export const Label = ({ size, required, className, children, ...props }: LabelProps) => (
  <RadixLabel.Root
    className={cn(labelVariants({ size, required }), className)}
    {...props}
  >
    {children}
  </RadixLabel.Root>
);

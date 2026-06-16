import {cva, type VariantProps} from 'class-variance-authority';
import {cn} from '../../utils/cn';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
    {
        variants: {
            variant: {
                default: 'bg-gray-100 text-gray-700',
                primary: 'bg-primary/10 text-primary',
                success: 'bg-success/10 text-success',
                danger: 'bg-danger/10 text-danger',
                warning: 'bg-warning/10 text-warning',
            },
        },
        defaultVariants: {variant: 'default'},
    }
);

interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

export const Badge = ({variant, className, ...props}: BadgeProps) => (
    <span className={cn(badgeVariants({variant}), className)} {...props} />
);
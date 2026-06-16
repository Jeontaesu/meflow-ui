import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary',
                secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                danger: 'bg-danger text-white hover:opacity-90',
                ghost: 'hover:bg-gray-100 text-gray-700',
                outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-10 px-4 text-sm',
                lg: 'h-11 px-6 text-base',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = ({ variant, size, loading, className, children, ...props }: ButtonProps) => (
    <button
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={loading || props.disabled}
        {...props}
    >
        {loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
        )}
        {children}
    </button>
);

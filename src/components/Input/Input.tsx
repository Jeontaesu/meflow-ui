import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  'flex w-full rounded-md border bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus-visible:ring-primary',
        error:   'border-danger focus-visible:ring-danger',
        success: 'border-success focus-visible:ring-success',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10',
        lg: 'h-11 text-base',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = ({
  variant,
  size,
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}: InputProps) => {
  const resolvedVariant = error ? 'error' : variant;
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-gray-400 flex items-center pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            inputVariants({ variant: resolvedVariant, size }),
            leftIcon && 'pl-9',
            rightIcon && 'pr-9',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-gray-400 flex items-center pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
      {error ? (
        <p className="text-xs text-danger">{error}</p>
      ) : hint ? (
        <p className="text-xs text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
};

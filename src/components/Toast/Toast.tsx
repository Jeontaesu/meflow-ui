import * as RadixToast from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// Provider는 앱 루트에 한 번만 감싸면 됨
export const ToastProvider = RadixToast.Provider;
export const ToastViewport = ({ className, ...props }: RadixToast.ToastViewportProps) => (
  <RadixToast.Viewport
    className={cn(
      'fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]',
      className
    )}
    {...props}
  />
);

const toastVariants = cva(
  'relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-white border-gray-200 text-gray-900',
        success: 'bg-white border-success text-gray-900',
        error:   'bg-white border-danger text-gray-900',
        warning: 'bg-white border-warning text-gray-900',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const iconMap = {
  default: null,
  success: (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
      <path d="M22 4 12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4m0 4h.01" strokeLinecap="round" />
    </svg>
  ),
};

interface ToastProps
  extends Omit<RadixToast.ToastProps, 'title'>,
    VariantProps<typeof toastVariants> {
  title: string;
  description?: string;
}

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
);

export const Toast = ({ variant = 'default', title, description, className, ...props }: ToastProps) => (
  <RadixToast.Root
    className={cn(toastVariants({ variant }), className)}
    {...props}
  >
    {iconMap[variant ?? 'default']}
    <div className="flex-1 min-w-0">
      <RadixToast.Title className="text-sm font-semibold">{title}</RadixToast.Title>
      {description && (
        <RadixToast.Description className="mt-0.5 text-xs text-gray-500">
          {description}
        </RadixToast.Description>
      )}
    </div>
    <RadixToast.Close className="shrink-0 rounded p-0.5 text-gray-400 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      <CloseIcon />
      <span className="sr-only">닫기</span>
    </RadixToast.Close>
  </RadixToast.Root>
);

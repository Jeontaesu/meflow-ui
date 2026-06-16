import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '../../utils/cn';

// 개별 Radix primitive를 그대로 re-export — 조합이 자유로움
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
);

export const DialogContent = ({ className, children, ...props }: RadixDialog.DialogContentProps) => (
  <RadixDialog.Portal>
    {/* 딤 배경 */}
    <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    {/* 모달 패널 */}
    <RadixDialog.Content
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
        'rounded-lg border border-gray-200 bg-white p-6 shadow-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'focus-visible:outline-none',
        className
      )}
      {...props}
    >
      {children}
      <RadixDialog.Close className="absolute right-4 top-4 rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <CloseIcon />
        <span className="sr-only">닫기</span>
      </RadixDialog.Close>
    </RadixDialog.Content>
  </RadixDialog.Portal>
);

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4 flex flex-col gap-1.5', className)} {...props} />
);

export const DialogTitle = ({ className, ...props }: RadixDialog.DialogTitleProps) => (
  <RadixDialog.Title className={cn('text-lg font-semibold text-gray-900', className)} {...props} />
);

export const DialogDescription = ({ className, ...props }: RadixDialog.DialogDescriptionProps) => (
  <RadixDialog.Description className={cn('text-sm text-gray-500', className)} {...props} />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-6 flex justify-end gap-2', className)} {...props} />
);

import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { cn } from '../../utils/cn';
import { useId } from 'react';

interface CheckboxProps {
  id?: string;
  label?: string;
  hint?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MinusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Checkbox = ({
  id,
  label,
  hint,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  indeterminate,
  className,
}: CheckboxProps) => {
  const generatedId = useId(); // 고유 ID 생성
  const checkboxId = id ?? generatedId; // 외부 전달 ID가 없으면 생성된 ID 사용
  const checkedState = indeterminate ? 'indeterminate' : checked;

  return (
    <div className={cn('flex items-start gap-2', className)}>
      <RadixCheckbox.Root
        id={checkboxId}
        checked={checkedState}
        defaultChecked={defaultChecked}
        onCheckedChange={(val) => onCheckedChange?.(val === true)}
        disabled={disabled}
        className={cn(
          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=unchecked]:border-gray-300 data-[state=unchecked]:bg-white',
          'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white',
          'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-white',
        )}
      >
        <RadixCheckbox.Indicator>
          {indeterminate ? <MinusIcon /> : <CheckIcon />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      {(label || hint) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={checkboxId} // 여기서 생성된 고유 ID와 매칭.
              className={cn(
                'text-sm font-medium leading-none text-gray-900',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
          {hint && (
            <p className={cn('text-xs text-gray-500', disabled && 'opacity-50')}>
              {hint}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

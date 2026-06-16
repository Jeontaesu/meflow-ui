// src/components/Select/Select.tsx
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '../../utils/cn';

interface SelectOption { label: string; value: string; disabled?: boolean; }

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select = ({ options, value, onChange, placeholder = '선택', label, error, disabled, className }: SelectProps) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <RadixSelect.Root value={value} onValueChange={onChange} disabled={disabled}>
      <RadixSelect.Trigger
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm',
          'border-gray-300 bg-white outline-none transition-colors',
          'focus:border-primary focus:ring-1 focus:ring-primary',
          'disabled:bg-gray-50 disabled:cursor-not-allowed',
          'data-[placeholder]:text-gray-400',
          error && 'border-danger focus:border-danger focus:ring-danger',
          className
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          <RadixSelect.Viewport className="p-1">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="flex h-9 cursor-pointer items-center rounded px-3 text-sm text-gray-700 outline-none hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
    {error && <p className="text-xs text-danger">{error}</p>}
  </div>
);
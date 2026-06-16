import { forwardRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  label?: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: { target: { id?: string; value: string } }) => void;
  placeholder?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      error,
      id,
      options,
      value,
      onChange,
      placeholder = "Select an option...",
    },
    ref,
  ) => {
    const handleValueChange = (newValue: string) => {
      if (onChange) {
        onChange({ target: { id, value: newValue } });
      }
    };

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--color-foreground)]"
          >
            {label}
          </label>
        )}

        <RadixSelect.Root
          value={value}
          onValueChange={handleValueChange}
        >
          <RadixSelect.Trigger
            ref={ref}
            id={id}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl text-[var(--color-foreground)] focus:outline-none focus:border-[var(--color-accent)] transition-all cursor-pointer text-left text-sm group"
          >
            <RadixSelect.Value placeholder={placeholder} />

            <RadixSelect.Icon className="text-white transition-transform duration-200 group-data-[state=open]:rotate-180">
              <ChevronDown className="w-4 h-4 stroke-[2.5]" />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              position="popper"
              sideOffset={4}
              className="w-[var(--radix-select-trigger-width)] max-h-60 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden shadow-xl z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150"
            >
              <RadixSelect.Viewport className="p-1">
                {options.map((option) => (
                  <RadixSelect.Item
                    key={option.value}
                    value={option.value}
                    className="flex items-center justify-between px-3 py-2 text-sm text-[var(--color-foreground)] rounded-lg cursor-pointer outline-none select-none hover:bg-[var(--color-border)] focus:bg-[var(--color-border)] transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>

                    <RadixSelect.ItemIndicator>
                      <Check className="w-4 h-4 text-[var(--color-accent)]" />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

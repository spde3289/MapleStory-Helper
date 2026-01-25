import { ChangeEvent } from 'react'

interface LabeledInputProps {
  id: string
  label: string
  value?: string | number
  placeholder?: string
  type?: 'text' | 'number' | 'password'
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const LabeledInput = ({
  id,
  label,
  value,
  placeholder,
  type = 'text',
  disabled = false,
  onChange,
}: LabeledInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className="rounded-md border border-gray-300 dark:border-white/[0.2] dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none"
      />
    </div>
  )
}

export default LabeledInput

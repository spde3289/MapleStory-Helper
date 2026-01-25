import { ChangeEvent } from 'react'

interface SelectOption {
  label: string
  value: string | number
}

interface LabeledSelectProps {
  id: string
  label: string
  value?: string
  options: SelectOption[]
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const LabeledSelect = ({
  id,
  label,
  value,
  options,
  onChange,
}: LabeledSelectProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="rounded-md border border-gray-300 dark:border-white/[0.2] dark:bg-neutral-900 px-3 py-2 text-sm focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LabeledSelect

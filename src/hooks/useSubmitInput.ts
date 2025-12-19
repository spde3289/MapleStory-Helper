import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react'

interface UseSubmitInputOptions {
  onSubmit: (value: string) => void
}

export const useSubmitInput = ({ onSubmit }: UseSubmitInputOptions) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value.target.value)
  }

  const handleSubmit = () => {
    if (!inputValue.trim()) return
    onSubmit(inputValue)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  return {
    inputValue,
    handleChange,
    handleKeyDown,
    handleFormSubmit,
  }
}

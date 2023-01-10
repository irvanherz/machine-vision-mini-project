import { useMemo, useState } from 'react'

type UseCustomComponentProps = {
  value?: any,
  defaultValue?: any
  onChange?: (value: any) => any
}

export default function useCustomComponent ({ value, defaultValue, onChange }: UseCustomComponentProps) {
  const [internalValue, setInternalValue] = useState()
  const computedValue = useMemo(() => {
    const res = value === undefined ? internalValue : value
    return res === undefined ? defaultValue : res
  }, [internalValue, value, defaultValue])

  const triggerChange = (newValue: any) => {
    if (newValue === computedValue) return
    if (value === undefined) setInternalValue(newValue)
    if (onChange) return onChange(newValue)
  }

  return [computedValue, triggerChange]
}

import { Input, InputProps } from 'antd'
import useCustomComponent from '../../hooks/useCustomComponent'

type InputFilteredProps = Omit<InputProps, 'onChange'> & {
  onChange?: (value: any) => any
  filter?: (value: any) => any
}

export default function InputFiltered ({ filter, value, defaultValue, onChange, ...props }: InputFilteredProps) {
  const [computedValue, triggerChange] = useCustomComponent({ value, defaultValue, onChange })

  const handleChange = (e: any) => {
    let val = e.target.value
    if (filter) val = filter(val)
    triggerChange(val)
  }
  return (
    <Input value={computedValue} onChange={handleChange} {...props} />
  )
}

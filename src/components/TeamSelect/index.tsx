import React, { useRef } from 'react'
import Select, {
  GroupBase,
  SelectInstance,
  SingleValue,
  StylesConfig,
} from 'react-select'

const ReactSelectStyle: StylesConfig<
  {
    value: string
    label: string
  },
  false,
  GroupBase<{
    value: string
    label: string
  }>
> = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    minHeight: '56px',
    width: '100%',
    ':hover': {
      backgroundColor: 'hsl(var(--nextui-default-200)',
    },
    border: 'none',
    borderRadius: 'var(--nextui-radius-medium)',
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color:
      'hsl(var(--nextui-foreground-500) / var(--nextui-foreground-500-opacity, var(--tw-text-opacity)))',
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: 'none',
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor:
      'hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))',
    borderRadius: 'var(--nextui-radius-medium)',
    padding: '4px',
    zIndex: 1000,
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    zIndex: 1000,
  }),
  menuPortal: (baseStyles) => ({
    ...baseStyles,
    zIndex: 1000,
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    borderRadius: 'var(--nextui-radius-medium)',
    backgroundColor: state.isFocused
      ? 'hsl(var(--nextui-default-200) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))'
      : 'hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))',
    ':hover': {
      backgroundColor:
        'hsl(var(--nextui-default-200) / var(--nextui-default-100-opacity, var(--tw-bg-opacity)))',
    },
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color:
      'hsl(var(--nextui-default-foreground) / var(--nextui-default-foreground-opacity, var(--tw-text-opacity)))',
    ':focus-visible': {
      backgroundColor: 'red',
    },
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color:
      'hsl(var(--nextui-default-foreground) / var(--nextui-default-foreground-opacity, var(--tw-text-opacity)))',
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor:
      'hsl(var(--nextui-content1) / var(--nextui-content1-opacity, var(--tw-bg-opacity)))',
    borderRadius: 'var(--nextui-radius-medium)',
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color:
      'hsl(var(--nextui-default-foreground) / var(--nextui-default-foreground-opacity, var(--tw-text-opacity)))',
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    ':hover': {
      color: 'inherit',
    },
  }),
  clearIndicator: (baseStyles) => ({
    ...baseStyles,
    ':hover': {
      color: 'inherit',
    },
  }),
}

type SearchableSelectProps = {
  label: string
  options: { value: string; label: string }[]
  defaultValue?: { value: string; label: string }
  placeholder?: string
  onChange?: (value: string | undefined) => void
  value?: { value: string; label: string }
  isInvalid?: boolean
  isRequired?: boolean
}

const TeamSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  defaultValue,
  placeholder,
  onChange,
  value,
  isInvalid,
  isRequired,
}: SearchableSelectProps) => {
  const inputSelectRef = useRef<SelectInstance<any>>(null)

  const handleChange = (
    value: SingleValue<{
      value: string
      label: string
    }>
  ) => {
    if (!onChange) return

    if (Array.isArray(value)) {
      const values = value.map((v) => v.value) as string[]
      onChange(values.join(','))
    } else {
      onChange(value?.value)
    }
  }

  console.log()

  return (
    <div>
      <Select
        ref={inputSelectRef}
        tabIndex={0}
        classNames={{
          control: () =>
            ` ${
              isInvalid ? '!bg-danger-50' : '!bg-default-100'
            }  text-black w-full !border-0`,
          option: (state) =>
            state.isSelected ? 'bg-default-200' : 'bg-content1',
          menu: () => 'bg-content1',
          menuPortal: () => 'z-50',
          menuList: () => 'z-50',
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Enter':
              if (inputSelectRef.current?.menuListRef?.checkVisibility()) return
              e.preventDefault()
              inputSelectRef.current?.openMenu('first')
              break
            default:
              break
          }
        }}
        isClearable
        menuPosition="fixed"
        menuPlacement="auto"
        placeholder={placeholder}
        defaultValue={defaultValue}
        isSearchable
        name={label}
        styles={ReactSelectStyle}
        options={options}
        onChange={handleChange}
        value={value}
        required={isRequired}
      />
    </div>
  )
}

export default TeamSelect

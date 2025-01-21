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
      backgroundColor: 'hsl(var(--heroui-default-200)',
    },
    border: 'none',
    borderRadius: 'var(--heroui-radius-medium)',
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color:
      'hsl(var(--heroui-foreground-500) / var(--heroui-foreground-500-opacity, var(--tw-text-opacity)))',
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: 'none',
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor:
      'hsl(var(--heroui-content1) / var(--heroui-content1-opacity, var(--tw-bg-opacity)))',
    borderRadius: 'var(--heroui-radius-medium)',
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
    borderRadius: 'var(--heroui-radius-medium)',
    backgroundColor: state.isFocused
      ? 'hsl(var(--heroui-default-200) / var(--heroui-default-100-opacity, var(--tw-bg-opacity)))'
      : 'hsl(var(--heroui-content1) / var(--heroui-content1-opacity, var(--tw-bg-opacity)))',
    ':hover': {
      backgroundColor:
        'hsl(var(--heroui-default-200) / var(--heroui-default-100-opacity, var(--tw-bg-opacity)))',
    },
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color:
      'hsl(var(--heroui-default-foreground) / var(--heroui-default-foreground-opacity, var(--tw-text-opacity)))',
    ':focus-visible': {
      backgroundColor: 'red',
    },
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color:
      'hsl(var(--heroui-default-foreground) / var(--heroui-default-foreground-opacity, var(--tw-text-opacity)))',
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor:
      'hsl(var(--heroui-content1) / var(--heroui-content1-opacity, var(--tw-bg-opacity)))',
    borderRadius: 'var(--heroui-radius-medium)',
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color:
      'hsl(var(--heroui-default-foreground) / var(--heroui-default-foreground-opacity, var(--tw-text-opacity)))',
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

type OptionType = {
  value: string
  label: string
}

type SearchableSelectProps = {
  label: string
  options: OptionType[]
  defaultValue?: { value: string; label: string }
  placeholder?: string
  onChange?: (value: string | undefined) => void
  value?: { value: string; label: string }
  isInvalid?: boolean
  isRequired?: boolean
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
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

  return (
    <div className="w-full">
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

export type { OptionType }

export default SearchableSelect

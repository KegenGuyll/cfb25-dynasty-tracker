import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  SortDescriptor,
} from '@heroui/react'
import React, { useCallback, useMemo, useState } from 'react'

type DataRow<T> = T

type TableColumn<T> = {
  title: string
  key: string
  render?: (rowData: DataRow<T>, index: number) => React.ReactNode
  allowSort?: boolean
}

type GenericDataTableProps<T> = {
  topContent?: React.ReactNode
  columns: TableColumn<T>[]
  data: DataRow<T>[]
  defaultSortDescriptor?: SortDescriptor
  keySelector: (rowData: T, index: number) => string | number
}

const propertyPath = <T extends unknown>(
  key: string,
  dataRow: DataRow<T>,
  undefinedReturn: string = 'N/A'
) => {
  const propertyPath = key.split('.')
  let nestedValue = dataRow
  let isPropertyNull = false

  propertyPath.forEach((property) => {
    if ((nestedValue as any)[property]) {
      nestedValue = (nestedValue as any)[property]
    } else {
      isPropertyNull = true
    }
  })

  return isPropertyNull ? undefinedReturn : nestedValue
}

const renderCellData = <T extends unknown>(
  tableColumn: TableColumn<T>,
  dataRow: DataRow<T>,
  index: number
) => {
  const { key, render } = tableColumn

  if (render) return render(dataRow, index)

  if (typeof key === 'string' && key.includes('.')) {
    return propertyPath<T>(key, dataRow)
  }

  return (dataRow as any)[key]
}

const GenericDataTable = <T extends unknown>({
  columns,
  data,
  keySelector,
  defaultSortDescriptor,
  topContent,
}: GenericDataTableProps<T>) => {
  const [sortDescriptor, setSortDescriptor] = useState<
    SortDescriptor | undefined
  >(defaultSortDescriptor)

  const handleSort = useCallback(
    (dataRows: DataRow<T>[], descriptor: SortDescriptor): DataRow<T>[] => {
      return dataRows.sort((a, b) => {
        const aValue = propertyPath<T>(descriptor.column.toString(), a)
        const bValue = propertyPath<T>(descriptor.column.toString(), b)

        if (aValue === bValue) {
          return 0
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          console.log('sorting strings')
          return descriptor.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return descriptor.direction === 'ascending'
            ? aValue - bValue
            : bValue - aValue
        }

        return 0
      })
    },
    []
  )

  const sortedData = useMemo(() => {
    if (!sortDescriptor) return data

    return handleSort(data, sortDescriptor)
  }, [data, sortDescriptor, handleSort])

  const onSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor)
  }

  return (
    <Table
      topContent={topContent}
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      aria-label="Example static collection table"
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn allowsSorting={column.allowSort} key={column.key}>
            {column.title}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {sortedData.map((dataRow, dataIndex) => (
          <TableRow key={keySelector(dataRow, dataIndex)}>
            {columns.map((column, rowIndex) => (
              <TableCell key={rowIndex}>
                {renderCellData(column, dataRow, rowIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export type { TableColumn, GenericDataTableProps }

export default GenericDataTable

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react'

type TableColumn<T> = {
  title: string
  key: string
  render?: (rowData: T, rowIndex: number) => React.ReactNode
}

type GenericDataTableProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
}

const renderCellData = <T extends unknown>(
  tableColumn: TableColumn<T>,
  dataRow: T,
  index: number
) => {
  const { key, render } = tableColumn

  if (render) return render(dataRow, index)

  if (typeof key === 'string' && key.includes('.')) {
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

    return isPropertyNull ? 'N/A' : nestedValue
  }

  return (dataRow as any)[key]
}

const GenericDataTable = <T extends unknown>({
  columns,
  data,
}: GenericDataTableProps<T>) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.title}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((dataRow, dataIndex) => (
          <TableRow key={dataIndex}>
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

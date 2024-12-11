import { Input } from '@nextui-org/input'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'

type TableColumn = {
  title: string
  key: string
  render?: (rowIndex: number) => JSX.Element
}

type GenericInputTableProps = {
  columns: TableColumn[]
  rowCount?: number
}

/**
 * A generic table component uses inputs for creating and editing data.
 */
const GenericInputTable: React.FC<GenericInputTableProps> = ({
  columns,
  rowCount = 1,
}: GenericInputTableProps) => {
  return (
    <table className=" table-auto rounded border-collapse w-full bg-default-50">
      <thead className="bg-default-100 uppercase text-md font-semibold rounded-t">
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-4 py-3 text-left bg-default-100">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="gap-4">
        {Array.from({ length: rowCount }, (_, i) => i).map((row, i) => (
          <tr tabIndex={-1} key={row.toString()}>
            {columns.map((column) => (
              <td key={column.key} className="px-4 py-3 w-full">
                {column.render ? column.render(i) : null}
              </td>
            ))}
          </tr>
        ))}
        {/* Add an empty row for adding new data */}
      </tbody>
    </table>
  )
}

export type { TableColumn }

export default GenericInputTable

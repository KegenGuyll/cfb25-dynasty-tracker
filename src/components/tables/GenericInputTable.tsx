type TableColumn = {
  title: string
  key: string
  render?: (rowIndex: number) => JSX.Element
}

type GenericInputTableProps = {
  title: string
  columns: TableColumn[]
  rowCount?: number
}

/**
 * A generic table component uses inputs for creating and editing data.
 */
const GenericInputTable: React.FC<GenericInputTableProps> = ({
  columns,
  rowCount = 1,
  title,
}: GenericInputTableProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl">{title}</h3>
      <div className="overflow-x-scroll rounded">
        <table className="table-auto rounded border-collapse w-full bg-default-50">
          <thead className="bg-default-100 uppercase text-md font-semibold rounded-t">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left bg-default-100"
                >
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
          </tbody>
        </table>
      </div>
    </div>
  )
}

export type { TableColumn }

export default GenericInputTable

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState, type ReactNode } from "react";
import { Spinner } from "../Spinner";

export type ChSortDirection = "asc" | "desc";

export interface ChColumn<T> {
  key: string;
  header: ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
}

export interface ChDataTableProps<T> {
  columns: ChColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  loading?: boolean;
  emptyMessage?: ReactNode;
  actions?: (row: T) => ReactNode;
  actionsHeader?: ReactNode;
  actionsWidth?: string | number;
  fixedLayout?: boolean;
}

function fieldValue<T>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key];
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  loading = false,
  emptyMessage = "Aucune donnée",
  actions,
  actionsHeader = "",
  actionsWidth,
  fixedLayout = false,
}: ChDataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: ChSortDirection } | null>(null);
  const colSpan = columns.length + (actions ? 1 : 0);

  function toggleSort(key: string) {
    setSort((current) => {
      if (current?.key !== key) return { key, dir: "asc" };
      return current.dir === "asc" ? { key, dir: "desc" } : null;
    });
  }

  let displayedRows = rows;
  if (sort) {
    const column = columns.find((c) => c.key === sort.key);
    if (column) {
      const accessor =
        column.sortValue ??
        ((row: T) => {
          const v = fieldValue(row, column.key);
          return typeof v === "number" ? v : String(v ?? "");
        });
      const factor = sort.dir === "asc" ? 1 : -1;
      displayedRows = [...rows].sort((a, b) => {
        const va = accessor(a);
        const vb = accessor(b);
        if (typeof va === "number" && typeof vb === "number") {
          return (va - vb) * factor;
        }
        return String(va).localeCompare(String(vb)) * factor;
      });
    }
  }

  return (
    <TableContainer>
      <Table sx={fixedLayout ? { tableLayout: "fixed" } : undefined}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} align={col.align ?? "left"} sx={col.width != null ? { width: col.width } : undefined}>
                {col.sortable ? (
                  <TableSortLabel
                    active={sort?.key === col.key}
                    direction={sort?.key === col.key ? sort.dir : "asc"}
                    onClick={() => toggleSort(col.key)}
                  >
                    {col.header}
                  </TableSortLabel>
                ) : (
                  col.header
                )}
              </TableCell>
            ))}
            {actions ? <TableCell align="center" sx={actionsWidth != null ? { width: actionsWidth } : undefined}>{actionsHeader}</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={colSpan} align="center">
                <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                  <Spinner />
                </Box>
              </TableCell>
            </TableRow>
          ) : displayedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan} align="center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            displayedRows.map((row) => (
              <TableRow key={getRowKey(row)} hover>
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align ?? "left"}>
                    {col.render ? col.render(row) : (fieldValue(row, col.key) as ReactNode)}
                  </TableCell>
                ))}
                {actions ? <TableCell align="right">{actions(row)}</TableCell> : null}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

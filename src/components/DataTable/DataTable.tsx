import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Spinner } from "../Spinner";

export type ChSortDirection = "asc" | "desc";

export interface ChColumn<T> {
  key: string;
  header: ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  sortable?: boolean;
  hideOnMobile?: boolean;
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
  rowSx?: (row: T) => Record<string, unknown>;
  /** En-têtes figées en haut au scroll (sticky). */
  stickyHeader?: boolean;
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
  rowSx,
  stickyHeader = false,
}: ChDataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: ChSortDirection } | null>(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  // Hauteur réelle de l'entête, pour caler la zone de fondu et l'animation de scroll.
  const headRef = useRef<HTMLTableSectionElement | null>(null);
  const [headH, setHeadH] = useState(0);
  useEffect(() => {
    if (!stickyHeader) return;
    const el = headRef.current;
    if (!el) return;
    const measure = () => setHeadH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [stickyHeader]);
  const visibleColumns = isMobile ? columns.filter((col) => !col.hideOnMobile) : columns;
  const colSpan = visibleColumns.length + (actions ? 1 : 0);
  const cardShadow = "0 0 1rem rgba(28, 30, 33, 0.12)";

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

  // En-tête figée : reste collée en haut au scroll, fond opaque pour masquer
  // les lignes qui défilent derrière (sinon transparence).
  const stickyHeadSx = stickyHeader
    ? { position: "sticky" as const, top: 0, zIndex: 2, backgroundColor: "transparent" }
    : {};

  const cardRowSx = {
    boxShadow: cardShadow,
    borderRadius: "0.875rem",
    "& td": { backgroundColor: "background.paper", borderBottom: "none" },
    "& td:first-of-type": { borderTopLeftRadius: "0.875rem", borderBottomLeftRadius: "0.875rem" },
    "& td:last-of-type": { borderTopRightRadius: "0.875rem", borderBottomRightRadius: "0.875rem" },
  };

  // Inset bas de la zone d'effet : sur mobile, on remonte au-dessus de la navbar
  // flottante (bottom 16 + ~64 de haut ≈ 80) ; sur desktop, petit décalage.
  const bottomInset = isMobile ? 100 : 24;

  // Léger rétrécissement + flou + fondu des lignes quand elles atteignent l'entête,
  // piloté par le scroll (CSS scroll-driven animations). No-op si non supporté.
  const rowExitSx =
    stickyHeader && headH > 0
      ? {
          "@keyframes chRowExit": {
            from: { opacity: 1, transform: "scale(1)", filter: "blur(0px)" },
            to: { opacity: 0, transform: "scale(0.9)", filter: "blur(0.1875rem)" },
          },
          "@supports (animation-timeline: view())": {
            "& tbody > tr": {
              // Deux animations sur la même timeline (même inset) :
              //  1) HAUT  : phase "exit"  (normal → disparu) quand la ligne passe sous l'entête.
              //  2) BAS   : phase "entry" en INVERSÉ (disparu → normal) quand la ligne surgit du bas.
              // Inset = (bas de l'entête + 5px) en haut, 5px en bas. fill forwards/none pour
              // que les deux ne se chevauchent jamais sur les mêmes propriétés.
              animationName: "chRowExit, chRowExit",
              animationTimingFunction: "linear, linear",
              animationDirection: "normal, reverse",
              // Bas en `backwards` sur mobile : sous la zone, la ligne reste cachée
              // (opacity 0) et ne réapparaît pas autour de la navbar flottante.
              animationFillMode: isMobile ? "forwards, backwards" : "forwards, none",
              animationTimeline: `view(block ${headH + 5}px ${bottomInset}px), view(block ${headH + 5}px ${bottomInset}px)`,
              // Monter/baisser les 2es % pour rallonger/raccourcir chaque zone.
              animationRange: "exit 0% exit 50%, entry 0% entry 60%",
              transformOrigin: "center top",
            },
          },
        }
      : {};

  return (
    <Box position="relative">
      <TableContainer sx={{ overflow: "visible" }}>
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 0.875rem",
            ...(fixedLayout ? { tableLayout: "fixed" } : {}),
            ...rowExitSx,
          }}
        >
          <TableHead ref={headRef}>
            <TableRow>
            {visibleColumns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align ?? "left"}
                sx={{
                  borderBottom: "none",
                  color: "text.secondary",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  ...stickyHeadSx,
                  ...(col.width != null ? { width: col.width } : {}),
                }}
              >
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
            {actions ? (
              <TableCell
                align="center"
                sx={{ borderBottom: "none", ...stickyHeadSx, ...(actionsWidth != null ? { width: actionsWidth } : {}) }}
              >
                {actionsHeader}
              </TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={colSpan} align="center" sx={{ borderBottom: "none" }}>
                <Box display="flex" justifyContent="center" paddingY="1.5rem">
                  <Spinner />
                </Box>
              </TableCell>
            </TableRow>
          ) : displayedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan} align="center" sx={{ borderBottom: "none" }}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            displayedRows.map((row) => (
              <TableRow key={getRowKey(row)} sx={{ ...cardRowSx, ...(rowSx ? rowSx(row) : {}) }}>
                {visibleColumns.map((col) => (
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
    </Box>
  );
}

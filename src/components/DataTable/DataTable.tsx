import Box from "@mui/material/Box";
import MuiCheckbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Spinner } from "../Spinner";
import { AnimatedRow } from "./AnimatedRow";
import { useKeyboardNav } from "./useKeyboardNav";
import { useScrollGradients } from "./useScrollGradients";

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
  fillHeight?: boolean;
  maxHeight?: string | number;
  /** Rend la ligne déplaçable (glisser-déposer). */
  draggableRow?: (row: T) => boolean;
  /** Indique si la ligne peut recevoir un élément déposé. */
  canDropRow?: (row: T) => boolean;
  /** Appelé au dépôt : (ligne cible, clé de la ligne déposée). */
  onRowDrop?: (target: T, draggedKey: string) => void;
  /** Appelé au double-clic sur une ligne. */
  onRowDoubleClick?: (row: T) => void;
  /** Active la sélection : colonne de cases à cocher, clic, Ctrl/Maj+clic, cadre. */
  selectable?: boolean;
  /** Clés sélectionnées (sélection contrôlée). */
  selectedKeys?: string[];
  /** Appelé quand la sélection change. */
  onSelectionChange?: (keys: string[]) => void;
  /** Appelé au clic droit sur une ligne (menu contextuel). */
  onRowContextMenu?: (row: T, event: React.MouseEvent) => void;
  /** Anime l'apparition des lignes quand elles entrent dans le viewport. */
  animateRows?: boolean;
  /** Affiche des fondus haut/bas pilotés par le scroll sur le conteneur scrollable. */
  showGradients?: boolean;
  /** Active la navigation clavier (flèches haut/bas, Entrée) avec scroll auto. */
  enableKeyboardNav?: boolean;
  /** Affiche la scrollbar du conteneur scrollable (masquée si false). */
  displayScrollbar?: boolean;
  /** Appelé à l'activation d'une ligne au clavier (Entrée). */
  onRowActivate?: (row: T) => void;
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
  fillHeight = false,
  maxHeight,
  draggableRow,
  canDropRow,
  onRowDrop,
  onRowDoubleClick,
  selectable = false,
  selectedKeys,
  onSelectionChange,
  onRowContextMenu,
  animateRows = false,
  showGradients = false,
  enableKeyboardNav = false,
  displayScrollbar = true,
  onRowActivate,
}: ChDataTableProps<T>) {
  const internalScroll = fillHeight || maxHeight != null;
  const [sort, setSort] = useState<{ key: string; dir: ChSortDirection } | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width:48rem)");
  const { scrollRef, scrollEl, topOpacity, bottomOpacity } = useScrollGradients(
    showGradients && internalScroll,
  );

  const isSelControlled = selectedKeys != null;
  const [internalSel, setInternalSel] = useState<string[]>([]);
  const selected = isSelControlled ? selectedKeys : internalSel;
  const selectedSet = new Set(selected);
  const showSelect = selectable && selected.length > 0;
  const anchorRef = useRef<string | null>(null);
  const animatedKeys = useRef<Set<string>>(new Set());
  const clickTimer = useRef<number | null>(null);
  const tbodyRef = useRef<HTMLTableSectionElement | null>(null);
  const marqueeStart = useRef<{ x: number; y: number } | null>(null);
  const marqueeBase = useRef<Set<string>>(new Set());
  const [marqueeRect, setMarqueeRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const commitSelection = useCallback(
    (keys: string[]) => {
      if (!isSelControlled) setInternalSel(keys);
      onSelectionChange?.(keys);
    },
    [isSelControlled, onSelectionChange],
  );

  const onMarqueeMove = useCallback(
    (e: MouseEvent) => {
      const start = marqueeStart.current;
      if (!start) return;
      const left = Math.min(start.x, e.clientX);
      const top = Math.min(start.y, e.clientY);
      const width = Math.abs(e.clientX - start.x);
      const height = Math.abs(e.clientY - start.y);
      setMarqueeRect({ left, top, width, height });
      const hit = new Set(marqueeBase.current);
      tbodyRef.current?.querySelectorAll<HTMLTableRowElement>("tr[data-rowkey]").forEach((tr) => {
        const r = tr.getBoundingClientRect();
        const intersects = !(
          r.right < left ||
          r.left > left + width ||
          r.bottom < top ||
          r.top > top + height
        );
        if (intersects) hit.add(tr.getAttribute("data-rowkey") as string);
      });
      commitSelection([...hit]);
    },
    [commitSelection],
  );

  const onMarqueeUp = useCallback(() => {
    marqueeStart.current = null;
    setMarqueeRect(null);
    window.removeEventListener("mousemove", onMarqueeMove);
    window.removeEventListener("mouseup", onMarqueeUp);
  }, [onMarqueeMove]);

  const onContainerMouseDown = (e: React.MouseEvent) => {
    if (!selectable || e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, label, [contenteditable="true"], tr[draggable="true"]'))
      return;
    e.preventDefault();
    const additive = e.ctrlKey || e.metaKey;
    marqueeStart.current = { x: e.clientX, y: e.clientY };
    marqueeBase.current = additive ? new Set(selected) : new Set();
    if (!additive) {
      commitSelection([]);
      anchorRef.current = null;
    }
    window.addEventListener("mousemove", onMarqueeMove);
    window.addEventListener("mouseup", onMarqueeUp);
  };

  useEffect(
    () => () => {
      window.removeEventListener("mousemove", onMarqueeMove);
      window.removeEventListener("mouseup", onMarqueeUp);
      if (clickTimer.current) window.clearTimeout(clickTimer.current);
    },
    [onMarqueeMove, onMarqueeUp],
  );

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
  const colSpan = visibleColumns.length + (actions ? 1 : 0) + (showSelect ? 1 : 0);
  const cardShadow = "0 0 1rem rgba(28, 30, 33, 0.12)";
  const shadowInset = "1rem";

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

  const displayedKeys = displayedRows.map(getRowKey);
  const allSelected = displayedKeys.length > 0 && displayedKeys.every((k) => selectedSet.has(k));
  const someSelected = !allSelected && displayedKeys.some((k) => selectedSet.has(k));

  const { selectedIndex, onKeyDown, tabIndex } = useKeyboardNav<T>({
    enabled: enableKeyboardNav,
    rows: displayedRows,
    getRowKey,
    scrollEl,
    onActivate: onRowActivate ?? onRowDoubleClick,
  });

  const toggleSelectAll = () => {
    commitSelection(allSelected ? [] : displayedKeys);
    anchorRef.current = null;
  };

  const handleRowClick = (e: React.MouseEvent, key: string) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input, label, [contenteditable="true"], [data-no-select="true"]'))
      return;
    if (e.shiftKey && anchorRef.current) {
      const a = displayedKeys.indexOf(anchorRef.current);
      const b = displayedKeys.indexOf(key);
      if (a >= 0 && b >= 0) {
        const [lo, hi] = a < b ? [a, b] : [b, a];
        const base = e.ctrlKey || e.metaKey ? new Set(selected) : new Set<string>();
        displayedKeys.slice(lo, hi + 1).forEach((k) => base.add(k));
        commitSelection([...base]);
      }
    } else if (e.ctrlKey || e.metaKey) {
      const next = new Set(selected);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      commitSelection([...next]);
      anchorRef.current = key;
    } else if (onRowDoubleClick) {
      // Diffère la sélection pour qu'un double-clic (navigation) ne déclenche pas
      // d'abord la sélection — ce qui décalait la ligne sous le curseur.
      if (clickTimer.current) window.clearTimeout(clickTimer.current);
      clickTimer.current = window.setTimeout(() => {
        commitSelection([key]);
        anchorRef.current = key;
        clickTimer.current = null;
      }, 220);
    } else {
      commitSelection([key]);
      anchorRef.current = key;
    }
  };

  const handleRowDoubleClick = onRowDoubleClick
    ? (row: T) => {
        if (clickTimer.current) {
          window.clearTimeout(clickTimer.current);
          clickTimer.current = null;
        }
        onRowDoubleClick(row);
      }
    : undefined;

  const toggleRow = (key: string) => {
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    commitSelection([...next]);
    anchorRef.current = key;
  };

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

  const bottomInset = isMobile && !internalScroll ? 100 : 24;

  // Léger rétrécissement + flou + fondu des lignes quand elles atteignent l'entête,
  // piloté par le scroll (CSS scroll-driven animations). No-op si non supporté.
  const rowExitSx =
    stickyHeader && headH > 0
      ? {
          "@keyframes chRowExit": {
            from: { opacity: 1, transform: "scale(1)", filter: "blur(0rem)" },
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

  const scrollbarSx = (theme: Theme) => ({
    scrollbarWidth: "thin" as const,
    scrollbarColor: `${theme.palette.primary.main} transparent`,
    "&::-webkit-scrollbar": { width: "0.625rem" },
    "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "0.5rem",
      border: "0.125rem solid transparent",
      backgroundClip: "content-box",
    },
    "&::-webkit-scrollbar-thumb:hover": { backgroundColor: theme.palette.primary.dark },
  });

  const hiddenScrollbarSx = {
    scrollbarWidth: "none" as const,
    "&::-webkit-scrollbar": { display: "none" },
  };

  const containerScrollbarSx = (theme: Theme) =>
    displayScrollbar ? scrollbarSx(theme) : hiddenScrollbarSx;

  const gradientHeight = "2.5rem";
  const showTopGradient = showGradients && internalScroll && topOpacity > 0;
  const showBottomGradient = showGradients && internalScroll && bottomOpacity > 0;

  return (
    <Box
      position="relative"
      {...(fillHeight ? { display: "flex", flexDirection: "column", flex: 1, minHeight: 0 } : {})}
    >
      <TableContainer
        ref={internalScroll ? scrollRef : undefined}
        onMouseDown={selectable ? onContainerMouseDown : undefined}
        onKeyDown={enableKeyboardNav ? onKeyDown : undefined}
        tabIndex={tabIndex}
        sx={(theme) =>
          fillHeight
            ? {
                flex: 1,
                minHeight: 0,
                overflow: "auto",
                paddingX: shadowInset,
                marginX: `-${shadowInset}`,
                ...containerScrollbarSx(theme),
              }
            : maxHeight != null
              ? {
                  maxHeight,
                  overflow: "auto",
                  paddingX: shadowInset,
                  marginX: `-${shadowInset}`,
                  ...containerScrollbarSx(theme),
                }
              : { overflow: "visible" }
        }
      >
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
            {showSelect ? (
              <TableCell
                padding="checkbox"
                sx={{ borderBottom: "none", width: "3rem", ...stickyHeadSx }}
              >
                <MuiCheckbox
                  color="primary"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleSelectAll}
                  inputProps={{ "aria-label": "Tout sélectionner" }}
                />
              </TableCell>
            ) : null}
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
        <TableBody ref={tbodyRef}>
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
            displayedRows.map((row, index) => {
              const key = getRowKey(row);
              const isDraggable = draggableRow?.(row) ?? false;
              const isDropTarget = canDropRow?.(row) ?? false;
              const isDragOver = isDropTarget && dragOverKey === key;
              const isSelected = selectedSet.has(key);
              const isKeyboardFocused = enableKeyboardNav && selectedIndex === index;
              return (
                <AnimatedRow
                  key={key}
                  animate={animateRows}
                  scrollRoot={scrollEl}
                  index={index}
                  alreadyAnimated={animatedKeys.current.has(key)}
                  onAnimated={() => animatedKeys.current.add(key)}
                  data-rowkey={key}
                  selected={isSelected}
                  draggable={isDraggable}
                  onDragStart={
                    isDraggable
                      ? (e: React.DragEvent) => {
                          e.dataTransfer.setData("text/plain", key);
                          e.dataTransfer.effectAllowed = "move";
                        }
                      : undefined
                  }
                  onDragOver={
                    isDropTarget
                      ? (e: React.DragEvent) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                          if (dragOverKey !== key) setDragOverKey(key);
                        }
                      : undefined
                  }
                  onDragLeave={
                    isDropTarget
                      ? () => setDragOverKey((k) => (k === key ? null : k))
                      : undefined
                  }
                  onDrop={
                    isDropTarget
                      ? (e: React.DragEvent) => {
                          e.preventDefault();
                          const draggedKey = e.dataTransfer.getData("text/plain");
                          setDragOverKey(null);
                          if (draggedKey && draggedKey !== key) onRowDrop?.(row, draggedKey);
                        }
                      : undefined
                  }
                  onClick={selectable ? (e) => handleRowClick(e, key) : undefined}
                  onContextMenu={
                    onRowContextMenu
                      ? (e) => {
                          e.preventDefault();
                          onRowContextMenu(row, e);
                        }
                      : undefined
                  }
                  onDoubleClick={handleRowDoubleClick ? () => handleRowDoubleClick(row) : undefined}
                  sx={{
                    ...cardRowSx,
                    ...(rowSx ? rowSx(row) : {}),
                    ...(onRowDoubleClick || selectable ? { userSelect: "none" } : {}),
                    ...(isDraggable || onRowDoubleClick || selectable ? { cursor: "pointer" } : {}),
                    ...(isSelected
                      ? { "& td": { backgroundColor: "action.selected" } }
                      : {}),
                    ...(isKeyboardFocused && !isSelected
                      ? { "& td": { backgroundColor: "action.hover" } }
                      : {}),
                    ...(isDragOver
                      ? {
                          boxShadow: "0 0 0 0.125rem var(--ch-palette-primary-main)",
                          "& td": { backgroundColor: "action.hover" },
                        }
                      : {}),
                  }}
                >
                  {showSelect ? (
                    <TableCell padding="checkbox">
                      <MuiCheckbox
                        color="primary"
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => toggleRow(key)}
                        inputProps={{ "aria-label": "Sélectionner la ligne" }}
                      />
                    </TableCell>
                  ) : null}
                  {visibleColumns.map((col) => (
                    <TableCell key={col.key} align={col.align ?? "left"}>
                      {col.render ? col.render(row) : (fieldValue(row, col.key) as ReactNode)}
                    </TableCell>
                  ))}
                  {actions ? <TableCell align="right">{actions(row)}</TableCell> : null}
                </AnimatedRow>
              );
            })
          )}
        </TableBody>
      </Table>
      </TableContainer>
      {showTopGradient ? (
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: stickyHeader ? `${headH}px` : 0,
            left: 0,
            right: 0,
            height: gradientHeight,
            opacity: topOpacity,
            pointerEvents: "none",
            zIndex: 1,
            background: `linear-gradient(to bottom, ${theme.palette.background.paper}, transparent)`,
          })}
        />
      ) : null}
      {showBottomGradient ? (
        <Box
          sx={(theme) => ({
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: gradientHeight,
            opacity: bottomOpacity,
            pointerEvents: "none",
            zIndex: 1,
            background: `linear-gradient(to top, ${theme.palette.background.paper}, transparent)`,
          })}
        />
      ) : null}
      {marqueeRect ? (
        <Box
          sx={{
            position: "fixed",
            left: marqueeRect.left,
            top: marqueeRect.top,
            width: marqueeRect.width,
            height: marqueeRect.height,
            border: "0.0625rem solid",
            borderColor: "primary.main",
            backgroundColor: "rgba(33, 150, 243, 0.12)",
            zIndex: 1400,
            pointerEvents: "none",
          }}
        />
      ) : null}
    </Box>
  );
}

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCallback, useRef, useState, type DragEvent } from "react";
import { Icon } from "../../components/Icon";
import { Stack } from "../../components/Stack";

export interface ChUploadDropZoneProps {
  title: string;
  hint: string;
  disabled?: boolean;
  onFileSelected: (file: File) => void;
}

export function UploadDropZone({
  title,
  hint,
  disabled = false,
  onFileSelected,
}: ChUploadDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openPicker = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      if (disabled) {
        return;
      }
      const file = event.dataTransfer.files.item(0);
      if (file) {
        onFileSelected(file);
      }
    },
    [disabled, onFileSelected]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  return (
    <Box
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={title}
      aria-disabled={disabled}
      onClick={openPicker}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPicker();
        }
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      padding="2rem"
      borderRadius="0.75rem"
      border="0.125rem dashed"
      borderColor={isDragging ? "accent.main" : "divider"}
      bgcolor={isDragging ? "action.hover" : "background.paper"}
      sx={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        outline: "none",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
        "&:hover": disabled ? undefined : { borderColor: "accent.main" },
        "&:focus-visible": { borderColor: "accent.main" },
      }}
    >
      <Stack gap="sm" alignItems="center">
        <Icon name="upload" size="xl" color="accent" />
        <Typography variant="subtitle1" color="text.primary" align="center">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {hint}
        </Typography>
      </Stack>
      <input
        ref={inputRef}
        type="file"
        hidden
        disabled={disabled}
        onChange={(event) => {
          const file = event.target.files?.item(0);
          if (file) {
            onFileSelected(file);
          }
          event.target.value = "";
        }}
      />
    </Box>
  );
}

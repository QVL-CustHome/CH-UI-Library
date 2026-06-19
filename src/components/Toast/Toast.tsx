import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { Icon, type ChIconName } from "../Icon";

export type ChToastSeverity = "success" | "error" | "info";

export interface ChToastProps {
  open: boolean;

  message: string;

  onClose: () => void;

  severity?: ChToastSeverity;

  duration?: number;
}

const severityStyles: Record<ChToastSeverity, { bg: string; fg: string; icon: ChIconName }> = {
  success: { bg: "primary.main", fg: "primary.contrastText", icon: "check" },
  error: { bg: "error.main", fg: "error.contrastText", icon: "cancel" },
  info: { bg: "secondary.main", fg: "secondary.contrastText", icon: "shield" },
};

export function Toast({ open, message, onClose, severity = "success", duration = 3000 }: ChToastProps) {
  const style = severityStyles[severity];
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={(_, reason) => {
        if (reason !== "clickaway") onClose();
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Box
        role="status"
        display="flex"
        alignItems="center"
        gap="0.625rem"
        paddingX="1.75rem"
        paddingY="0.875rem"
        borderRadius="0.75rem"
        bgcolor={style.bg}
        color={style.fg}
        boxShadow={3}
        fontSize="1.05rem"
        fontWeight={500}
        maxWidth="35rem"
      >
        <Icon name={style.icon} variant="solid" size="md" color="inherit" />
        {message}
      </Box>
    </Snackbar>
  );
}

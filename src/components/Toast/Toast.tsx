import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

export interface ChToastProps {
  
  open: boolean;
  
  message: string;
  
  onClose: () => void;
  
  duration?: number;
}


export function Toast({ open, message, onClose, duration = 3000 }: ChToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={(_, reason) => {
        if (reason !== "clickaway") onClose();
      }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box
        role="status"
        sx={{
          px: 2.5,
          py: 1.25,
          borderRadius: "10px",
          bgcolor: "text.primary",
          color: "background.paper",
          boxShadow: 3,
          fontSize: "0.9rem",
          fontWeight: 500,
          maxWidth: 420,
        }}
      >
        {message}
      </Box>
    </Snackbar>
  );
}

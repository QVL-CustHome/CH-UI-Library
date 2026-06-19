import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Icon } from "../Icon";

export interface ChMultiSelectOption {
  value: string;
  label?: string;
}

export interface ChMultiSelectProps {
  options: ChMultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  placeholder?: string;
}

export function MultiSelect({ options, value, onChange, label, placeholder }: ChMultiSelectProps) {
  const available = options.filter((option) => !value.includes(option.value));
  const labelOf = (target: string) =>
    options.find((option) => option.value === target)?.label ?? target;

  const add = (next: string) => {
    if (next && !value.includes(next)) onChange([...value, next]);
  };
  const remove = (target: string) => onChange(value.filter((item) => item !== target));

  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      {label ? (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      ) : null}

      {value.length > 0 ? (
        <Box display="flex" flexWrap="wrap" gap="0.5rem">
          {value.map((item) => (
            <Chip
              key={item}
              label={labelOf(item)}
              onDelete={() => remove(item)}
              sx={{
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "& .MuiChip-deleteIcon": {
                  color: "primary.contrastText",
                  "&:hover": { color: "primary.contrastText", opacity: 0.8 },
                },
              }}
            />
          ))}
        </Box>
      ) : null}

      <Select
        size="small"
        value=""
        displayEmpty
        onChange={(event) => add(event.target.value as string)}
        renderValue={() => (
          <Typography component="span" color="text.secondary">
            {placeholder ?? ""}
          </Typography>
        )}
      >
        {available.length === 0 ? (
          <MenuItem value="" disabled>
            {placeholder ?? ""}
          </MenuItem>
        ) : (
          available.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                gap="0.5rem"
              >
                {option.label ?? option.value}
                <Icon name="plus" size="xs" />
              </Box>
            </MenuItem>
          ))
        )}
      </Select>
    </Box>
  );
}

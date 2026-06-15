import Box from "@mui/material/Box";
import { useTranslation } from "../../i18n";
import { PASSWORD_MIN_LENGTH, passwordCriteriaState, type ChPasswordCriterionId } from "../../validation";
import { Icon } from "../Icon";

const labelKey: Record<ChPasswordCriterionId, string> = {
  length: "ch.password.length",
  uppercase: "ch.password.uppercase",
  lowercase: "ch.password.lowercase",
  digit: "ch.password.digit",
  special: "ch.password.special",
};

export interface ChPasswordStrengthProps {
  value: string;
}

export function PasswordStrength({ value }: ChPasswordStrengthProps) {
  const { t } = useTranslation();
  const criteria = passwordCriteriaState(value);
  const passedCount = criteria.filter((criterion) => criterion.passed).length;

  return (
    <Box sx={{ mt: 1 }}>
      <Box
        role="meter"
        aria-label={t("ch.password.strengthLabel")}
        aria-valuenow={passedCount}
        aria-valuemin={0}
        aria-valuemax={criteria.length}
        sx={{ display: "flex", gap: 0.5 }}
      >
        {criteria.map((criterion) => (
          <Box
            key={criterion.id}
            sx={{
              flex: 1,
              height: 6,
              borderRadius: 999,
              bgcolor: criterion.passed ? "primary.main" : "divider",
              transition: "background-color 0.2s ease",
            }}
          />
        ))}
      </Box>
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          p: 0,
          m: 0,
          mt: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 0.5,
        }}
      >
        {criteria.map((criterion) => (
          <Box
            component="li"
            key={criterion.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              fontSize: "0.8rem",
              color: criterion.passed ? "primary.main" : "text.secondary",
            }}
          >
            <Icon name={criterion.passed ? "check" : "close"} variant="outline" size={14} />
            {t(labelKey[criterion.id], { min: PASSWORD_MIN_LENGTH })}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

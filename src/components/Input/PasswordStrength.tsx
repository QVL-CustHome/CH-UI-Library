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
    <Box marginTop="0.5rem">
      <Box
        role="meter"
        aria-label={t("ch.password.strengthLabel")}
        aria-valuenow={passedCount}
        aria-valuemin={0}
        aria-valuemax={criteria.length}
        display="flex"
        gap="0.25rem"
      >
        {criteria.map((criterion) => (
          <Box
            key={criterion.id}
            flex={1}
            height="0.375rem"
            borderRadius={999}
            bgcolor={criterion.passed ? "primary.main" : "divider"}
            sx={{ transition: "background-color 0.2s ease" }}
          />
        ))}
      </Box>
      <Box
        component="ul"
        padding={0}
        margin={0}
        marginTop="0.5rem"
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap="0.25rem"
        sx={{ listStyle: "none" }}
      >
        {criteria.map((criterion) => (
          <Box
            component="li"
            key={criterion.id}
            display="flex"
            alignItems="center"
            gap="0.375rem"
            fontSize="0.8rem"
            color={criterion.passed ? "primary.main" : "text.secondary"}
          >
            <Icon name={criterion.passed ? "check" : "close"} variant="outline" size={14} />
            {t(labelKey[criterion.id], { min: PASSWORD_MIN_LENGTH })}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

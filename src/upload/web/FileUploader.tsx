import Typography from "@mui/material/Typography";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Feedback } from "../../components/Feedback";
import { ProgressBar } from "../../components/ProgressBar";
import { Stack } from "../../components/Stack";
import type { TokenProvider, UploadPhase, UploadResult } from "../core";
import { UploadDropZone } from "./UploadDropZone";
import { formatBytes } from "./formatBytes";
import {
  defaultFileUploaderLabels,
  type ChFileUploaderLabels,
} from "./labels";
import { useChunkedUpload } from "./useChunkedUpload";

export interface ChFileUploaderProps {
  basePath: string;
  getToken: TokenProvider;
  parentId?: string;
  filesPath?: string;
  chunkSize?: number;
  title?: string;
  labels?: Partial<ChFileUploaderLabels>;
  onCompleted?: (result: UploadResult) => void;
  onError?: (error: unknown) => void;
}

const phaseStatusKey: Record<UploadPhase, keyof ChFileUploaderLabels | null> = {
  idle: null,
  opening: "opening",
  uploading: "uploading",
  completing: "completing",
  completed: "completed",
  paused: "paused",
  aborted: "aborted",
  error: null,
};

export function FileUploader({
  basePath,
  getToken,
  parentId,
  filesPath,
  chunkSize,
  title,
  labels,
  onCompleted,
  onError,
}: ChFileUploaderProps) {
  const resolvedLabels = { ...defaultFileUploaderLabels, ...labels };
  const {
    progress,
    fileName,
    errorMessage,
    isActive,
    canPause,
    canResume,
    selectFile,
    start,
    pause,
    resume,
    abort,
    reset,
  } = useChunkedUpload({
    basePath,
    getToken,
    parentId,
    filesPath,
    chunkSize,
    onCompleted,
    onError,
  });

  const statusKey = phaseStatusKey[progress.phase];
  const isCompleted = progress.phase === "completed";
  const showProgress = progress.phase !== "idle";

  return (
    <Card title={title} elevation="md">
      <Stack gap="md">
        {fileName ? (
          <Stack
            direction="row"
            gap="sm"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1" color="text.primary" noWrap>
              {fileName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatBytes(progress.totalBytes)}
            </Typography>
          </Stack>
        ) : (
          <UploadDropZone
            title={resolvedLabels.dropZoneTitle}
            hint={resolvedLabels.dropZoneHint}
            onFileSelected={selectFile}
          />
        )}

        {showProgress ? (
          <Stack gap="xs">
            <ProgressBar
              value={progress.percentage}
              label={statusKey ? resolvedLabels[statusKey] : undefined}
              color={isCompleted ? "success" : "accent"}
              showValue
            />
            <Typography variant="caption" color="text.secondary">
              {formatBytes(progress.uploadedBytes)} /{" "}
              {formatBytes(progress.totalBytes)}
            </Typography>
          </Stack>
        ) : null}

        {errorMessage ? (
          <Feedback severity="error">{errorMessage}</Feedback>
        ) : null}

        {fileName ? (
          <Stack direction="row" gap="sm" justifyContent="end" wrap>
            {progress.phase === "idle" ? (
              <>
                <Button variant="secondary" onClick={reset}>
                  {resolvedLabels.change}
                </Button>
                <Button onClick={start}>{resolvedLabels.start}</Button>
              </>
            ) : null}
            {canPause ? (
              <Button variant="secondary" onClick={pause}>
                {resolvedLabels.pause}
              </Button>
            ) : null}
            {canResume ? (
              <Button onClick={resume}>{resolvedLabels.resume}</Button>
            ) : null}
            {isActive || canResume ? (
              <Button variant="danger" onClick={abort}>
                {resolvedLabels.abort}
              </Button>
            ) : null}
            {isCompleted || progress.phase === "aborted" ? (
              <Button variant="secondary" onClick={reset}>
                {resolvedLabels.change}
              </Button>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
    </Card>
  );
}

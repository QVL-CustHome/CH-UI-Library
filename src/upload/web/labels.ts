export interface ChFileUploaderLabels {
  dropZoneTitle: string;
  dropZoneHint: string;
  start: string;
  pause: string;
  resume: string;
  abort: string;
  change: string;
  opening: string;
  uploading: string;
  completing: string;
  completed: string;
  paused: string;
  aborted: string;
}

export const defaultFileUploaderLabels: ChFileUploaderLabels = {
  dropZoneTitle: "Glissez un fichier ou cliquez pour parcourir",
  dropZoneHint: "Fichiers jusqu'a 10 Gio",
  start: "Televerser",
  pause: "Mettre en pause",
  resume: "Reprendre",
  abort: "Annuler",
  change: "Changer de fichier",
  opening: "Initialisation",
  uploading: "Televersement en cours",
  completing: "Finalisation",
  completed: "Televersement termine",
  paused: "Televersement en pause",
  aborted: "Televersement annule",
};

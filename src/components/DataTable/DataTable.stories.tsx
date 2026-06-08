import { Button } from "../Button";
import { StatusChip } from "../StatusChip";
import { DataTable, type ChColumn } from "./DataTable";

interface DemoUser {
  id: string;
  email: string;
  status: "active" | "pending" | "disabled";
  createdAt: string;
}

const rows: DemoUser[] = [
  { id: "1", email: "alice@custhome.fr", status: "active", createdAt: "2026-01-12" },
  { id: "2", email: "bob@custhome.fr", status: "pending", createdAt: "2026-03-04" },
  { id: "3", email: "carol@custhome.fr", status: "disabled", createdAt: "2026-02-20" },
];

const toneByStatus = {
  active: "success",
  pending: "warning",
  disabled: "error",
} as const;

const columns: ChColumn<DemoUser>[] = [
  { key: "email", header: "Email", sortable: true },
  {
    key: "status",
    header: "Statut",
    render: (row) => <StatusChip tone={toneByStatus[row.status]} label={row.status} />,
  },
  { key: "createdAt", header: "Créé le", sortable: true, align: "right" },
];

export default {
  title: "Composants / DataTable",
};

export const Standard = () => (
  <DataTable
    columns={columns}
    rows={rows}
    getRowKey={(row) => row.id}
    actions={(row) => (
      <Button size="small" variant="secondary" onClick={() => alert(row.email)}>
        Éditer
      </Button>
    )}
  />
);

export const Chargement = () => (
  <DataTable columns={columns} rows={[]} getRowKey={(row) => row.id} loading />
);

export const Vide = () => (
  <DataTable
    columns={columns}
    rows={[]}
    getRowKey={(row) => row.id}
    emptyMessage="Aucun utilisateur"
  />
);

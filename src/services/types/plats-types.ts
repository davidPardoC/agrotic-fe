export type PlantTableResponse = {
  docs: plantTableItem[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number | null;
  pagingCounter: number | null;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
  key: number;
  qrCode: () => void;
  actions: () => void;
};

type plantTableItem = {
  commonName: string;
  createdAt: string;
  createdBy: { firstName: string; lastName: string } | null;
  type: string;
  _id: string;
};

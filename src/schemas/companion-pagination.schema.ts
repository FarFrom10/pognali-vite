import { Companion } from "./companion.schema";

export interface CompanionPagination {
  entities: Companion[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

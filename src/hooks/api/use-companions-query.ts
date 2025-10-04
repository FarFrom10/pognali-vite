import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchFilteredCompanions } from '../../api/actions';
import { CompanionsFilter } from '../../types/api';
import { CompanionPagination } from '../../schemas/companion-pagination.schema';


export const useCompanionsQuery = (
  filters?: CompanionsFilter,
  options?: Partial<UseQueryOptions<CompanionPagination, Error>>
) =>
  useQuery<CompanionPagination, Error>({
    queryKey: ['companions', filters],
    queryFn: () => fetchFilteredCompanions(filters),
    staleTime: 1000 * 60 * 5,
    ...options
  });

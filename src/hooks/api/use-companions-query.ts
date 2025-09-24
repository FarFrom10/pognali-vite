import { useQuery } from '@tanstack/react-query';
import { fetchFilteredCompanions } from '../../api/actions';
import { CompanionsFilter } from '../../types/api';
import { CompanionPagination } from '../../schemas/companion-pagination.schema';

export const useCompanionsQuery = (filters?: CompanionsFilter) =>
  useQuery<CompanionPagination, Error>({
    queryKey: ['companions', filters],
    queryFn: () => fetchFilteredCompanions(filters),
    staleTime: 1000 * 60 * 5,
  });

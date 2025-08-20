import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/users';

export const useActiveUsersQuery = () => {
  return useQuery({
    queryKey: ['users', 'active'],
    queryFn: usersApi.getAllActiveUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: usersApi.getProfile,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

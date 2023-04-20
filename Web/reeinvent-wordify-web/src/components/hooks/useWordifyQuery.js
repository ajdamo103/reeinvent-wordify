import { useQuery } from "@tanstack/react-query";

// abstraction of the useQuery, because there is an open issue for the isLoading
// didn't want to have to write isLoading && isFetching everywhere
const useWordifyQuery = ({ tag, parameters, queryFn, enabled, ...options }) => {
  const query = useQuery([tag, ...parameters], () => queryFn(), {
    enabled: enabled,
    ...options,
  });

  const { isLoading, isFetching } = query;

  return { ...query, isLoading: isLoading && isFetching };
};

export default useWordifyQuery;

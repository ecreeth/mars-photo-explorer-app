import useSWR from 'swr';

function useRoverList() {
  const {data, error, mutate, isValidating} = useSWR('/rovers');

  return {
    mutate,
    isValidating,
    isError: error,
    rovers: data?.rovers,
    isLoading: !error && !data,
  };
}

export default useRoverList;

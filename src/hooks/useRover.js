import useSWR from 'swr';

function useRoverList() {
  const {data, error, mutate} = useSWR('/rovers');

  return {
    mutate,
    isError: error,
    rovers: data?.rovers,
    isLoading: !error && !data,
  };
}

export default useRoverList;

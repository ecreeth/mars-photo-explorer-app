import useSWR from 'swr';

function useRoverList() {
  const {data, error} = useSWR('/rovers');

  return {
    isError: error,
    rovers: data?.rovers,
    isLoading: !error && !data,
  };
}

export default useRoverList;

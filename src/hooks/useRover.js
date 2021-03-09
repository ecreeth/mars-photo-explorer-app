import useSWR from 'swr';

function useRoverList() {
  const {data, error} = useSWR('/rovers');

  return {
    rovers: data?.rovers,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useRoverList;

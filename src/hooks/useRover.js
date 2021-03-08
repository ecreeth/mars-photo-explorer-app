import useSWR from 'swr';

function useRoverList() {
  const {data} = useSWR('/rovers');

  return {
    rovers: data?.rovers,
    isLoading: !data,
  };
}

export default useRoverList;

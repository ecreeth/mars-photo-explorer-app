import useSWR from 'swr';

function useRoverCamera(rover, camera) {
  const {data} = useSWR(`/rovers/${rover}/?camera=${camera}`);

  return {
    photos: data?.photos,
    isLoading: !data,
  };
}

export default useRoverCamera;

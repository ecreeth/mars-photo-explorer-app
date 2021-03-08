import KEY from './api_key'; // Yout should find your own key in NASA's page

const API_URL = 'https://api.nasa.gov/mars-photos/api/v1';

const ROVERS_URL = `${API_URL}/rovers/?api_key=${KEY}`;

const getRoverInfo = (rover) => `${API_URL}/rovers/${rover}/?api_key=${KEY}`;

const getCameraImages = (rover, camera) =>
  `${API_URL}/rovers/${rover}/photos?sol=2889&camera=${camera}&api_key=${KEY}`;

const LATEST_PHOTOS = `${API_URL}/rovers/curiosity/latest_photos?api_key=${KEY}`;

const LOGO = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/717px-NASA_logo.svg.png',
};

const BACKGROUND_IMAGE = {
  uri:
    'https://imagevars.gulfnews.com/2018/12/17/Mars-planet-(Read-Only)_resources1_16a085441a6_large.jpg',
};

export {
  LOGO,
  ROVERS_URL,
  LATEST_PHOTOS,
  API_URL,
  BACKGROUND_IMAGE,
  getRoverInfo,
  getCameraImages,
};

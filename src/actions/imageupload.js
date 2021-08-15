import axiosService from 'services/AxiosService';

const BASE_URL = '/image-upload/';
const { biAxios } = axiosService;

export function uploadImage(image) {
  const formData = new FormData();
  formData.append('image', image);

  return biAxios.post(BASE_URL, formData);
}

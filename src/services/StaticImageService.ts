import { URL } from "../constants";
const getFlagIcon = (
  code = "IN",
  style = URL.COUNTRY_FLAG.STYLE.FLAT,
  size = URL.COUNTRY_FLAG.SIZE[64]
) => `${URL.COUNTRY_FLAG.BASE_URL}/${code}/${style}/${size}.png`;
const getLogo = (imageId: any) =>
  `${URL.STATIC_IMAGE.BASE_URL}/logo/${imageId}.png`;

const getPoster = (imageId: any, quality = URL.STATIC_IMAGE.QUALITY.SD) =>
  `${URL.STATIC_IMAGE.BASE_URL}/poster/${quality}/${imageId}.png`;

const getGalleryImage = (
  imageId: any,
  size: any,
  quality = URL.STATIC_IMAGE.QUALITY.SD
) => `${URL.STATIC_IMAGE.BASE_URL}/gallery/${size}/${quality}/${imageId}.png`;

export default { getFlagIcon, getLogo, getPoster, getGalleryImage };

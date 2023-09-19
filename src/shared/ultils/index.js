import { BASE_URL } from "../constants/App";
export const getImageProduct = (imageName)=>{
    return `${BASE_URL}/assets/uploads/products/${imageName}`;
}
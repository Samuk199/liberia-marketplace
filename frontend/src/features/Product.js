import { URL } from '../screens/Constants';

export const getProducts = async () => {
  try {
    const response = await fetch(`${URL}/products`, {
      method: "GET"});

    if (response.ok) {
      const products = await response.json();
      return products;
    } else {
      throw new Error(" products not found ");
    }
  } catch (error) {
    console.error(error);
  }
};

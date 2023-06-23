import axios from "axios";

export const getProducts = async (id) => {
    try {
      const response = await axios.get(`http://localhost/php/index.php/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };


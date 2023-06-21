import axios from "axios";

export const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost/php/index.php');
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  
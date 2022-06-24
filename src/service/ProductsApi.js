import axios from "axios";

class ProductsApi {
  constructor() {
    axios.defaults.baseURL = "http://localhost:3004";
  }

  async getCategories(id) {
    const request = id ? `?id=${id}` : "";
    const response = await axios.get(`/categories${request}`);
    return response.data;
  }
  async getProducts(id, page) {
    const request = id
      ? `?category_id=${id}&_page=${page}&_limit=6`
      : `?_page=${page}&_limit=6`;
    const response = await axios.get(`/products${request}`);
    return response.data;
  }

  async deleteProduct(id) {
    const response = await axios.delete(`/products/${id}`);
    return response;
  }
}

export default new ProductsApi();

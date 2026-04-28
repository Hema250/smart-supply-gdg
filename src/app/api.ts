const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },
  addProduct: async (product: any) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to add product');
    return response.json();
  },
  deleteProduct: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },
  getSuppliers: async () => {
    const response = await fetch(`${API_BASE_URL}/suppliers`);
    if (!response.ok) throw new Error('Failed to fetch suppliers');
    return response.json();
  },
  addSupplier: async (supplier: any) => {
    const response = await fetch(`${API_BASE_URL}/suppliers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supplier),
    });
    if (!response.ok) throw new Error('Failed to add supplier');
    return response.json();
  },
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      return response.ok;
    } catch {
      return false;
    }
  }
};

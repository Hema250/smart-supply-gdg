const API_BASE_URL = 'http://localhost:3001/api';

// Helper to handle local storage fallback for deployment demos
const getLocalData = (key: string) => JSON.parse(localStorage.getItem(key) || '[]');
const setLocalData = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

export const api = {
  getProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) return response.json();
    } catch (e) {
      console.warn("Backend unreachable, using local storage");
    }
    return getLocalData('fallback_products');
  },

  addProduct: async (product: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (response.ok) return response.json();
    } catch (e) {
      console.warn("Backend unreachable, saving to local storage");
    }
    const products = getLocalData('fallback_products');
    const newProduct = { ...product, id: Date.now() };
    setLocalData('fallback_products', [...products, newProduct]);
    return newProduct;
  },

  deleteProduct: async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) return response.json();
    } catch (e) {
      console.warn("Backend unreachable, deleting from local storage");
    }
    const products = getLocalData('fallback_products');
    setLocalData('fallback_products', products.filter((p: any) => p.id !== id));
    return { success: true };
  },

  getSuppliers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers`);
      if (response.ok) return response.json();
    } catch (e) {
      console.warn("Backend unreachable, using local storage");
    }
    return getLocalData('fallback_suppliers');
  },

  addSupplier: async (supplier: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/suppliers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplier),
      });
      if (response.ok) return response.json();
    } catch (e) {
      console.warn("Backend unreachable, saving to local storage");
    }
    const suppliers = getLocalData('fallback_suppliers');
    const newSupplier = { ...supplier, id: Date.now() };
    setLocalData('fallback_suppliers', [...suppliers, newSupplier]);
    return newSupplier;
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

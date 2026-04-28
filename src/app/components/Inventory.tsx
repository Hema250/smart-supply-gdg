import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
  Search,
  Filter,
  Plus,
  Trash2,
  AlertCircle,
  Package,
  TrendingUp,
  X,
  LayoutGrid,
  List,
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../api";

export function Inventory() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    if (location.state?.openAddModal) {
      setShowAddModal(true);
    }
  }, [location]);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products from database");
    } finally {
      setIsLoading(false);
    }
  };

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Electronics",
    stock: "",
    price: "",
    supplier: "",
    sku: "",
    description: "",
  });

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const stockNum = parseInt(newProduct.stock as string);
    const status = stockNum === 0 ? "Out of Stock" : stockNum <= 20 ? "Low Stock" : "In Stock";
    
    const imgMap: Record<string, string> = {
      Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
      Footwear: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      Furniture: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=400&h=400&fit=crop",
    };

    const product = {
      ...newProduct,
      image: imgMap[newProduct.category] || imgMap.Electronics,
      stock: stockNum,
      threshold: 20,
      price: `$${parseFloat(newProduct.price as string).toFixed(2)}`,
      status,
      expiry: "N/A",
      rating: 4.5,
    };

    try {
      await api.addProduct(product);
      toast.success("Product added to database!");
      loadProducts();
      setShowAddModal(false);
      setNewProduct({ name: "", category: "Electronics", stock: "", price: "", supplier: "", sku: "", description: "" });
    } catch (err) {
      toast.error("Failed to save product to database");
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await api.deleteProduct(id);
      toast.error("Product removed from database");
      loadProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const categories = ["all", "Electronics", "Footwear", "Furniture"];

  const filteredProducts = products.filter(
    (product) =>
      (filterCategory === "all" || product.category === filterCategory) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const ProductCard = ({ product }: { product: any }) => (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stock <= (product.threshold || 20) && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg">
            Limited Stock
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({(product.rating || 4.5).toFixed(1)})</span>
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-gray-900 mt-auto">{product.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <Truck className="w-3 h-3 text-green-600" />
          <p className="text-[10px] text-green-600 font-medium">FREE Delivery Tomorrow</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Inventory <span className="text-blue-600">Forge</span></h1>
          <p className="text-gray-500 mt-1 font-medium italic">Precision tracking for global logistics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm ring-4 ring-gray-50">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-xl transition-all ${viewMode === "grid" ? "bg-blue-600 text-white shadow-lg scale-110" : "text-gray-400 hover:text-gray-600"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode("table")}
              className={`p-2.5 rounded-xl transition-all ${viewMode === "table" ? "bg-blue-600 text-white shadow-lg scale-110" : "text-gray-400 hover:text-gray-600"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-2xl hover:bg-blue-600 transition-all shadow-xl font-bold active:scale-95 group"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
            Initialize Asset
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Amazon-style inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt="" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock} units</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.status === "In Stock" ? "bg-green-100 text-green-800" : 
                        product.status === "Low Stock" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-gray-900 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="max-w-full max-h-[400px] object-contain drop-shadow-2xl"
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 overflow-y-auto">
              <div className="space-y-4">
                <nav className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  <span>{selectedProduct.category}</span>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-blue-600">{selectedProduct.sku}</span>
                </nav>
                
                <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                  {selectedProduct.name}
                </h2>
                
                <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                    1,248 ratings
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">M.R.P.: <span className="line-through">$499.00</span></p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{selectedProduct.price}</span>
                    <span className="text-sm text-gray-500">Inclusive of all taxes</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                    <div className="text-xs">
                      <p className="font-bold text-green-800 uppercase tracking-tighter">In Stock</p>
                      <p className="text-green-600">{selectedProduct.stock} units left</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <Truck className="w-6 h-6 text-blue-600" />
                    <div className="text-xs">
                      <p className="font-bold text-blue-800 uppercase tracking-tighter">Fast Delivery</p>
                      <p className="text-blue-600">By Tomorrow</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900">About this item</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedProduct.description || "Premium product designed for high performance and durability in modern supply chains."}
                  </p>
                </div>

                <div className="pt-6 space-y-3">
                  <button 
                    onClick={() => {
                      setSelectedProduct(null);
                      setShowCheckoutModal(true);
                    }}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3.5 rounded-full shadow-md transition-all active:scale-95"
                  >
                    Place Order Now
                  </button>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-full shadow-md transition-all active:scale-95">
                    Restock Inventory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center space-y-4 mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Confirm Your Order</h2>
              <p className="text-sm text-gray-500">Complete the transaction for your supply chain restocking.</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 space-y-4 border border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">$299.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping & Handling</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Taxes (GST/VAT)</span>
                <span className="font-semibold">$18.50</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">Total Due</span>
                <span className="text-blue-600">$318.49</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border-2 border-blue-600 bg-blue-50 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Secure Supply Transaction</p>
                  <p className="text-xs text-gray-500">Verified and encrypted gateway</p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  toast.success("Order Placed Successfully!");
                  setShowCheckoutModal(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all active:scale-95 text-lg"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  required
                  type="text"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. Sony WH-1000XM4"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    required
                    type="text"
                    value={newProduct.sku}
                    onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="SKU-882"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {categories.filter(c => c !== "all").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Level</label>
                  <input
                    required
                    type="number"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="29.99"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  required
                  type="text"
                  value={newProduct.supplier}
                  onChange={e => setNewProduct({...newProduct, supplier: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Tech Solutions Ltd"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  placeholder="Enter product description..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

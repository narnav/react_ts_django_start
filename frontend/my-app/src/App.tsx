// src/App.tsx
import React, { useState } from 'react';
import { Product } from './Product';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>(new Product());
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleAddProduct = () => {
        if (newProduct.desc && newProduct.price) {
            setProducts([...products, { ...newProduct, id: products.length + 1 }]);
            setNewProduct(new Product());
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = () => {
        if (editingProduct && editingProduct.id !== undefined) {
            setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
            setEditingProduct(null);
        }
    };

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div>
            <h1>Product Management</h1>

            <div>
                <h2>Add New Product</h2>
                <input
                    type="text"
                    placeholder="Description"
                    // value={newProduct.desc}
                    onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    // value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                />
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            {editingProduct && (
                <div>
                    <h2>Edit Product</h2>
                    <input
                        type="text"
                        placeholder="Description"
                        // value={editingProduct.desc}
                        onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        // value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    />
                    <button onClick={handleUpdateProduct}>Update Product</button>
                </div>
            )}

            <div>
                <h2>Product List</h2>
                <ul>
                    {products.map((product) => (
                        <li >
                            {product.desc} - ${""+product.price}
                            <button onClick={() => handleEditProduct(product)}>Edit</button>
                            <button >Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;

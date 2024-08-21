// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Product } from './Product';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [desc, setdesc] = useState<String>("")
    const [price, setprice] = useState<Number>(0)
    const SERVER = "http://127.0.0.1:8000/products/"
    const [refreshFlag, setrefreshFlag] = useState<Boolean>(false)
    /** send data to server */
    const sendData = (prod: Product) => axios.post(SERVER, prod).then(res => setProducts([...products, res.data]))
    useEffect(() => { axios(SERVER).then(res => setProducts(res.data)) 
    }, [refreshFlag])

    const updData = (prod: Product, id: Number = -1) => {
        axios.put(SERVER + id + "/", prod).then(res => setrefreshFlag(!refreshFlag))
    }
    const delData1 = ( id: Number = -1) => {
        axios.delete(SERVER + id + "/").then(res =>setProducts(products.filter(item => item.id != id)))
    }

    return (
        <div>
            Desc <input onChange={(e) => setdesc(e.target.value)} />
            price <input onChange={(e) => setprice(+e.target.value)} />
            <button onClick={() => sendData({ desc: desc, price: price })}>send</button>
            <button onClick={()=> delData1(7)}>test </button>
            <h1>Products list</h1>
            {/* List start */}
            <ul>
                {products.map((product, ind) => (
                    <li key={ind}>
                        {product.desc} - ${String(product.price)}
                        <button onClick={() => delData1(product.id)}>Delete</button>
                        <button onClick={() => updData({ desc: desc, price: price }, product.id)}>upd</button>
                    </li>
                ))}
            </ul>
            {/* List end */}
        </div>
    )
};

export default App;

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const url = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    const [loading, setLoading] = useState(false);


    const fetchProducts = async () => {
        const response = await axios.get(`${url}/api/products/all`)
        const data = response.data
        setProducts(data)
    }

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prevCart) => ({ ...prevCart, [itemId]: 1 }))
        } else {
            setCartItems((prevCart) => ({ ...prevCart, [itemId]: prevCart[itemId] + 1 }))
        }

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };


    const removeFromCart = async (itemId) => {
        setCartItems((prevCart) => {
            const updatedCart = { ...prevCart };
            delete updatedCart[itemId];
            return updatedCart;
        }); if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const loadCartData = async (token) => {
        const response = await axios.post(
            `${url}/api/cart/get`,
            {},
            { headers: { token } }
        );
        setCartItems(response.data.cartData);

    };


    useEffect(() => {
        async function loadData() {
            setLoading(true)
            await fetchProducts();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }
            setLoading(false)
        }
        loadData()
    }, []);


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += parseFloat(itemInfo.price) * cartItems[item];
                }
            }
        }
        return totalAmount.toFixed(2);
    };



    const contextStore = {
        products,
        fetchProducts,
        setProducts,
        cartItems,
        setCartItems,
        addToCart,
        url,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loading,
        setLoading

    }

    return (
        <StoreContext.Provider value={contextStore}>
            {children}
        </StoreContext.Provider>
    )
};


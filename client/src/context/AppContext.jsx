import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

// Create the context
export const AppContext = createContext();

// Context Provider Component
export const AppContextProvider = function AppContextProvider({ children }) {
 const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  //Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const {data} = await axios.get("/api/seller/is-auth");
      if(data.success){
        setIsSeller(true);
      }else{
        setIsSeller(false);
      }
      
    } catch (error) {
      setIsSeller(false);
    }
  }
  // fetch User Auth Status ,User Data and Cart Items 
  const fetchUser = async () => {
    try {
      const {data} = await axios.get("/api/user/is-auth");
      if(data.success){
        setUser(data.user);
        setCartItems(data.user.cart);
      }else{
        setUser(null);
        
      }
      
    } catch (error) {
      setUser(null);
      
    }
  }
  
  // Fetch All Products
  const fetchProducts = async () => {
  try {
    const {data} = await axios.get("/api/product/list");
    if(data.success){
     setProducts(data.products); 
    }else{
      toast.error(data.message);
    }
    
  } catch (error) {
    toast.error(data.message);
  }

  }
  // Add Products to Cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems|| {});
    if(cartData[itemId]){
      cartData[itemId] += 1;

    }else{
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Product added to cart");
  }
  // Update Cart Item Quantity
  const updateCartItem =(itemId,quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  }
  //Remove Product From cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] -= 1;
      if(cartData[itemId] === 0){
        delete cartData[itemId];
    }
  }
  toast.success("Product removed from cart");
  setCartItems(cartData);   
}
// Get cart Item Count
const getCartCount = () => {
  let totalCount = 0;
  for(const item in cartItems){
    totalCount += cartItems[item];
  }
  return totalCount;
}
// Return total Amount of Card
const getCartAmount = () => {
  let totalAmount = 0;
  for (const items in cartItems) {
    let itemInfo = products.find((product) => product._id === items);
    if(cartItems[items] > 0){
      totalAmount += cartItems[items] * itemInfo.offeredPrice * cartItems[items];
    }

  }
  return Math.floor(totalAmount * 100)/100;
}
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  },[])

  // Update the Database Cart Items

  useEffect(()=>{
    const updateCart = async() =>{
      try {
        const {data} = await axios.post("/api/cart/update",{cartItems});
        if(!data.success){
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    if(user){
      updateCart();
    }
  },[cartItems,user])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,products,currency,addToCart,
    updateCartItem,removeFromCart,cartItems,searchQuery,setSearchQuery,
    getCartCount,getCartAmount,axios,fetchProducts,setCartItems
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;

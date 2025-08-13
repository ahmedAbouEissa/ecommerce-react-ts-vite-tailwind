import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import { createContext, useState } from "react";
import { products } from "./assets/assets";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";

interface ProductsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string | string[];
  date: string;
  bestseller: boolean;
  qty?: number | undefined;
}

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}

interface CartContextType {
  cartItems: ProductsProps[];
  setCartItems: React.Dispatch<React.SetStateAction<ProductsProps[]>>;
  addToCart: (
    product: ProductsProps,
    size: string | string[] | undefined
  ) => void;
  updateCart: (
    product: ProductsProps,
    size: string | string[],
    action: string
  ) => void;
  removeFromCart: (product: ProductsProps) => void;
}

interface CartTotalProps {
  subtotal: number;
  total: number;
}

export const ProductsContext = createContext([
  {
    id: 0,
    name: "",
    description: "",
    price: 0,
    image: [""],
    category: "",
    subCategory: "",
    sizes: [""],
    date: "",
    bestseller: false,
  },
]);

export const SearchContext = createContext<SearchProps>({
  search: "",
  setSearch: () => {},
  showSearch: true,
  setShowSearch: () => {},
});

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
  updateCart: () => {},
  removeFromCart: () => {},
});

export const CartTotalContext = createContext<CartTotalProps>({
  subtotal: 0,
  total: 0,
});

function App() {
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductsProps[]>([]);

  const searchValue = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  const addToCart = (
    product: ProductsProps,
    size: string | string[] | undefined
  ) => {
    if (!size) {
      toast.error("Select Product Size");
    } else {
      setCartItems([...cartItems, { ...product, sizes: size, qty: 1 }]);
    }
  };

  const updateCart = (
    product: ProductsProps,
    size: string | string[],
    action: string
  ) => {
    const isProductInCart = cartItems.filter(
      // (item) => item.id === product.id && size.includes(item.sizes)
      (item) => {
        const sizesArray = Array.isArray(size) ? size : [size];
        const itemSizesArray = Array.isArray(item.sizes)
          ? item.sizes
          : [item.sizes];
        const isOverlap = itemSizesArray.some((s) => sizesArray.includes(s));
        return item.id === product.id && isOverlap;
      }
    ).length;

    if (isProductInCart) {
      switch (action) {
        case "increase":
          setCartItems((prev) => {
            return prev.map((item) =>
              item.id === product.id && item.sizes === size
                ? { ...item, sizes: size, qty: (item.qty ?? 0) + 1 }
                : item
            );
          });
          break;

        case "decrease":
          setCartItems((prev) => {
            return prev
              .map((item) =>
                item.id === product.id && item.sizes === size
                  ? { ...item, sizes: size, qty: (item.qty ?? 1) - 1 }
                  : item
              )
              .filter((item) => (item.qty ?? 0) >= 1);
          });
          break;

        default:
          break;
      }
    }
  };

  const removeFromCart = (product: ProductsProps) => {
    setCartItems((prev) => {
      return prev.filter((items) => {
        if (items.id === product.id) {
          return items.sizes !== product.sizes;
        } else if (items.id !== product.id) {
          return items.id !== product.id;
        }
      });
    });
  };

  const cartValue = {
    cartItems,
    setCartItems,
    addToCart,
    updateCart,
    removeFromCart,
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.qty ?? 0) * item.price,
    0
  );
  const total = subtotal + 10.0;

  const cartTotal = {
    subtotal,
    total,
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ProductsContext.Provider value={products}>
        <SearchContext.Provider value={searchValue}>
          <CartContext.Provider value={cartValue}>
            <CartTotalContext value={cartTotal}>
              <ToastContainer />
              <Navbar />
              <SearchBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
              <Footer />
            </CartTotalContext>
          </CartContext.Provider>
        </SearchContext.Provider>
      </ProductsContext.Provider>
    </div>
  );
}

export default App;

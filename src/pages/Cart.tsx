import { useContext } from "react";
import { CartContext, CartTotalContext } from "../App";
import TitleDesc from "../components/TitleDesc";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateCart, removeFromCart } = useContext(CartContext);
  const { subtotal, total } = useContext(CartTotalContext);
  const navigate = useNavigate();

  return (
    <div className="border-t border-gray-300 pt-14">
      <div className="text-2xl mb-3">
        <TitleDesc text1={"YOUR"} text2={"CART"} />
      </div>
      {cartItems.length ? (
        cartItems.map((product, index) => (
          <div key={index}>
            <div className="py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img
                  src={product.image[0]}
                  alt="image"
                  className="w-16 sm:w-20"
                  onClick={() => removeFromCart(product)}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>${product.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border border-gray-300 bg-slate-200">
                      {product.sizes}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center max-w-[8rem]">
                {product.qty === 1 ? (
                  <img
                    src={assets.bin_icon}
                    alt="trash"
                    className="min-w-8 py-2 px-2 h-8 bg-slate-200 rounded-s-lg cursor-pointer"
                    onClick={() =>
                      updateCart(product, product.sizes, "decrease")
                    }
                  />
                ) : (
                  <button
                    className="bg-slate-200 text-black min-w-8 px-3 py-1.5 text-sm rounded-s-lg cursor-pointer"
                    onClick={() =>
                      updateCart(product, product.sizes, "decrease")
                    }
                  >
                    -
                  </button>
                )}
                <p className="flex align-center justify-center text-black text-sm min-w-10">
                  {product.qty}
                </p>
                <button
                  className="bg-slate-200 text-black min-w-8 px-3 py-1.5 text-sm rounded-e-lg cursor-pointer"
                  onClick={() => updateCart(product, product.sizes, "increase")}
                >
                  +
                </button>
              </div>
              <img
                src={assets.bin_icon}
                alt="trash"
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                onClick={() => removeFromCart(product)}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center pt-15 pb-15 text-pink-800 text-xl">
          Your Shopping Cart is empty.
        </p>
      )}
      {cartItems.length ? (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal subtotal={subtotal} total={total} />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;

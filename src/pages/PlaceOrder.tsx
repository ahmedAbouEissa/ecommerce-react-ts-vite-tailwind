import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import TitleDesc from "../components/TitleDesc";
import { useNavigate } from "react-router-dom";
import { CartTotalContext } from "../App";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { subtotal, total } = useContext(CartTotalContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <TitleDesc text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal subtotal={subtotal} total={total} />
        </div>

        <div className="mt-12">
          <TitleDesc text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p
                onClick={() => setPaymentMethod("stripe")}
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  paymentMethod === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="stripe" className="h-5 mx-4" />
            </div>

            <div className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p
                onClick={() => setPaymentMethod("razorpay")}
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  paymentMethod === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="razorpay"
                className="h-5 mx-4"
              />
            </div>

            <div className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer">
              <p
                onClick={() => setPaymentMethod("cod")}
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  paymentMethod === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on delivery
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

import TitleDesc from "./TitleDesc";

interface CartSumProps {
  subtotal: number;
  total: number;
}

const CartTotal = ({ subtotal, total }: CartSumProps) => {
  return (
    <div className="w-full">
      <div className="text-2xl">
        <TitleDesc text1={"CART"} text2={"TOTAL"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          {subtotal ? <p>${subtotal}</p> : <p>$0.00</p>}
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          {subtotal ? <p>$10.00</p> : <p>$0.00</p>}
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between">
          <b>Total</b>
          {subtotal ? <p>${total}</p> : <b>$0.00</b>}
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

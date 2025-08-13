import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface ProductItemProps {
  id: number;
  image: string[];
  name: string;
  price: number;
}

const ProductItem = ({ id, image, name, price }: ProductItemProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname.includes(`/product/${id}`)]);

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt={name}
          className="hover:scale-110 transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">${price}</p>
    </Link>
  );
};

export default ProductItem;

import { useContext } from "react";
import { ProductsContext } from "../App";
import TitleDesc from "./TitleDesc";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const products = useContext(ProductsContext);

  const latestProducts = products
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <TitleDesc text1={"Latest"} text2={"Collections"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;

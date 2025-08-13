import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../App";
import ProductItem from "./ProductItem";
import TitleDesc from "./TitleDesc";

interface RelatedProductsProps {
  category: string;
  subCategory: string;
  id: number;
}

interface ProductsProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: string;
  bestseller: boolean;
}

const RelatedProducts = ({
  category,
  subCategory,
  id,
}: RelatedProductsProps) => {
  const products = useContext(ProductsContext);
  const [relatedProducts, setRelatedProducts] = useState<ProductsProps[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter(
        (product) => category === product.category && id !== product.id
      );
      productsCopy = productsCopy.filter(
        (product) => subCategory === product.subCategory && id !== product.id
      );

      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, id]);

  return (
    <div className="my-24">
      <div className="text-center py-2 text-3xl">
        <TitleDesc text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((product) => (
          <ProductItem
            key={product?.id}
            id={product?.id}
            name={product?.name}
            image={product?.image}
            price={product?.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;

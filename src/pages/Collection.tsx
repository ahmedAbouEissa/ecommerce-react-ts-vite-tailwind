import React, { useContext, useEffect, useState } from "react";
import { ProductsContext, SearchContext } from "../App";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";
import TitleDesc from "../components/TitleDesc";

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

const Collection = () => {
  const products = useContext(ProductsContext);
  const { search, showSearch } = useContext(SearchContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [FilterProducts, setFilterProducts] = useState<ProductsProps[]>([]);
  const [sortType, setSortType] = useState("relavent");

  const getCategories = products
    .filter(
      (product, index, arr) =>
        arr.findIndex((product2) => product.category === product2.category) ===
        index
    )
    .map((product) => product.category);

  const getTypes = products
    .filter(
      (product, index, arr) =>
        arr.findIndex(
          (product2) => product.subCategory === product2.subCategory
        ) === index
    )
    .map((product) => product.subCategory);

  const filterByCategory = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    if (category.includes(inputValue)) {
      setCategory(category.filter((item) => item !== inputValue));
    } else {
      setCategory((prev) => [...prev, inputValue]);
    }
  };

  const filterBySubCategory = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    if (subCategory.includes(inputValue)) {
      setSubCategory(subCategory.filter((item) => item !== inputValue));
    } else {
      setSubCategory((prev) => [...prev, inputValue]);
    }
  };

  const handleProductsFilters = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        category.includes(product.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let FilterProductsCopy = FilterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(FilterProductsCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(FilterProductsCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        handleProductsFilters();
        break;
    }
  };

  useEffect(() => {
    handleProductsFilters();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300">
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt="dropdown"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Category</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {getCategories.map((category, index) => (
              <p className="flex gap-2" key={index}>
                <input
                  type="checkbox"
                  className="w-3"
                  value={category}
                  onClick={filterByCategory}
                />{" "}
                {category}
              </p>
            ))}
          </div>
        </div>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {getTypes.map((type, index) => (
              <p className="flex gap-2" key={index}>
                <input
                  type="checkbox"
                  className="w-3"
                  value={type}
                  onClick={filterBySubCategory}
                />{" "}
                {type}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <TitleDesc text1={"All"} text2={"Collections"} />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {FilterProducts.map((product) => {
            return (
              <ProductItem
                key={product?.id}
                id={product?.id}
                name={product?.name}
                image={product?.image}
                price={product?.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;

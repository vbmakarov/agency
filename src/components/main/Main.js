import "./style.scss";
import { useEffect, useState, useCallback } from "react";
import ProductsApi from "../../service/ProductsApi";
import Products from "./components/Poducts";
import Categories from "./components/Categories";
import { useQuery } from "react-query";

export default function Main({ isMobileDevice }) {
  const [currentCat, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [activeProd, setActiveProd] = useState("");
  const [deleteProd, setDeleteProd] = useState(null);
  const [page, setPage] = useState(1);
  const categories = useQuery(
    ["fetch categories", currentCat],
    () => ProductsApi.getCategories(currentCat),
    { keepPreviousData: false, refetchOnWindowFocus: false }
  );
  const productsData = useQuery(
    ["fetch products", currentCat, page],
    async () => {
      const result = await ProductsApi.getProducts(currentCat, page);
      setProducts((prev) => {
        return [...prev, ...result];
      });
    },
    { keepPreviousData: false, refetchOnWindowFocus: false }
  );

  useQuery(
    ["delete products", deleteProd],
    async () => {
      if (deleteProd) {
        const response = await ProductsApi.deleteProduct(deleteProd);
        if (response.status == 200) {
          setProducts((prevPoducts) => {
            return prevPoducts.filter((product, index) => {
              return product.id !== deleteProd;
            });
          });
        }
      }
    },
    { keepPreviousData: false, refetchOnWindowFocus: false }
  );

  const changeCategory = (id) => {
    setActiveProd("");
    setProducts([]);
    setPage(1);
    setCategory(id);
  };

  const deleteProducts = useCallback((e) => {
    if (activeProd && e.code === "Delete") {
      const result = window.confirm("Вы хотите удалить товар?");
      if (result) {
        setDeleteProd(activeProd);
      }
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", deleteProducts);
    return () => {
      document.removeEventListener("keydown", deleteProducts);
    };
  });

  if (categories.isLoading || productsData.isLoading) {
    return "<div>Подгружаем данные...</div>";
  }
  return (
    <main className="main">
      <div className="main__body">
        <div className="container">
          <Categories
            isMobileDevice={isMobileDevice}
            categoriesData={categories.data}
            changeCategory={changeCategory}
            currentCat={currentCat}
          />
          <Products
            categoriesData={categories.data}
            changeCategory={changeCategory}
            productsData={products}
            setActiveProd={setActiveProd}
            activeProd={activeProd}
          />
          <div className="main__button">
            <button onClick={() => setPage((prev) => prev + 1)}>
              Load More
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

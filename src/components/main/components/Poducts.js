export default function Products({
  categoriesData,
  productsData,
  changeCategory,
  setActiveProd,
  activeProd,
}) {
  return (
    <>
      <div className="main__products products">
        <div className="products__body">
          {productsData?.length
            ? productsData.map((product, index) => {
                return (
                  <div
                    className="products__item"
                    key={index}
                    onClick={() => setActiveProd(product.id)}
                  >
                    <div
                      className={
                        activeProd === product.id
                          ? "products__img products__img_active"
                          : "products__img"
                      }
                    >
                      <img
                        src={require("../../../images/" + product.img)}
                        alt="товар"
                      />
                      <div className="products__overlay"></div>
                    </div>
                    <div className="products__description">
                      <div className="products__category">
                        {categoriesData.map((cat, index) => {
                          if (cat.id === product.category_id) {
                            return (
                              <div
                                key={index}
                                onClick={() => changeCategory(cat.id)}
                                style={{ cursor: "pointer" }}
                              >
                                {cat.name}
                              </div>
                            );
                          }
                        })}
                      </div>
                      <div className="products__name">{product.name}</div>
                    </div>
                  </div>
                );
              })
            : "Товары отсутствуют"}
        </div>
      </div>
    </>
  );
}

export default function Categories({
  categoriesData,
  isMobileDevice,
  changeCategory,
  currentCat,
}) {
  return (
    <nav className="main__navigation">
      {!isMobileDevice.tablet ? (
        <ul className="main__categories categories">
          <li
            className={currentCat === "" ? "categories__active" : ""}
            onClick={() => changeCategory("")}
          >
            Show All
          </li>
          {categoriesData.map((category, index) => {
            return (
              <li
                key={index}
                onClick={() => changeCategory(category.id)}
                className={
                  currentCat === category.id ? "categories__active" : ""
                }
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <select
          className="main__select"
          onChange={(event) => changeCategory(event.target.value)}
          value={currentCat}
        >
          <option value="">Show All</option>
          {categoriesData.map((category, index) => {
            return (
              <option value={category.id} key={index}>
                {category.name}
              </option>
            );
          })}
        </select>
      )}
    </nav>
  );
}

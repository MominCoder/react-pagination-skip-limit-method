import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();

    if (data && data?.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  const handlePage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      <section className="container">
        {products.length > 0 && (
          <div className="flex wrap row">
            {products.map((p) => (
              <div className="col-4" key={p.id}>
                <figure className="flex column">
                  <img className="flexible" src={p.thumbnail} alt={p.title} />
                  <figcaption>{p.title}</figcaption>
                </figure>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="container">
        {products.length > 0 && (
          <div className="row flex pagination">
            <span
              onClick={() => handlePage(page - 1)}
              className={page > 1 ? "" : "btn__disbled"}
            >
              -
            </span>
            {[...Array(totalPages)].map((_, i) => (
              <span
                className={page === i + 1 ? "selectedPage" : null}
                onClick={() => handlePage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            ))}
            <span
              onClick={() => handlePage(page + 1)}
              className={page < totalPages ? "" : "btn__disbled"}
            >
              +
            </span>
          </div>
        )}
      </section>
    </>
  );
}

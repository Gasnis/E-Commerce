import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from ".././Card/Card";
import { getProducts, searchProduct, logout } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import ScrollUpButtom from "../ScrollUpButton/ScrollUpButton.jsx";
import style from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { searchInput } = useSelector((state) => state);
  let products = useSelector((state) => state.products);
  let productsEnabled = products.filter(
    (product) => product.status === "enabled"
  );

  let auth = useSelector((state) => state.profile);

  if (!auth.id) {
    history.push("/login");
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [currentProducts, setCurrentProducts] = useState(9);

  function handleProduct(e) {
    e.preventDefault();
    setCurrentProducts(currentProducts + 9);
  }
  let renderProducts = productsEnabled.slice(0, currentProducts);

  const handleSearchBar = (e) => {
    dispatch(searchProduct(e.target.value));
  };

  const handleLogout = (e) => {
    dispatch(logout());
  };

  return (
    <div className={style.principalDiv}>
      <div className={style.navbar}>
          <div>
          <h3>{auth.name} </h3>
          </div>

          <div className={style.logout}>
          <button className={style.logoutButton} onClick={handleLogout}>Logout</button>
          </div>

         <div>
          <input
            className={style.searchbar}
            onChange={handleSearchBar}
            type="search"
            placeholder="Buscar..."
          />
         </div>

      </div>

      <div className={style.info}>
        <div>
          <div className={style.info}>
            <div className={style.cardsContainer}>
              {renderProducts.length ? (
                renderProducts === "404" ? (
                  <h1>Not Found</h1>
                ) : (
                  renderProducts.map((product) => {
                    return <Card key={product.id} product={product}></Card>;
                  })
                )
              ) : searchInput ? (
                <div>
                  <h1>No hay sitios con este nombre</h1>
                </div>
              ) : (
                <div>
                  <div className={style.cargando}>
                    <h1>
                      Cargando...{" "}
                      <img
                        src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                        alt=""
                        height="40x"
                        width="40px"
                      />
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>

          {renderProducts.length + 1 ? null : (
            <div>
              <button className={style.botonpaginado} onClick={handleProduct}>
                +
              </button>
            </div>
          )}
          <ScrollUpButtom />
        </div>
      </div>
    </div>
  );
}

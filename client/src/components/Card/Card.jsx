import React from "react";
import style from "./card.module.css";
import { deleteProduct, getProducts, updateProduct } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function Product({ product }) {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.products);

  const [open, setOpen] = React.useState(false);

  const [edit, setEdit] = React.useState(false);

  console.log(product);

  const [newproduct, setNewProduct] = React.useState({
    //
    id: product.id,
    name: product.name,
    image: product.image,
    observations: product.observations,
    status: product.status,
  });

  function handleChange(event) {
    setNewProduct({
      ...newproduct,
      [event.target.name]: event.target.value,
    });
  }

  const handleOptions = () => {
    setOpen(!open);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    swal({
      title: "¿Estás seguro?",
      text: "El producto sera eliminado pero se puede recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal("Este product ha sido ELIMINADO ", {
          icon: "success",
        });
        const productEliminado = allProducts?.find(
          (product) => product.id === event.target.value
        );
        await dispatch(deleteProduct(productEliminado));
        await dispatch(getProducts());
        
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(newproduct);
    await dispatch(updateProduct(newproduct));
    await dispatch(getProducts());
    setEdit(!edit);
    setOpen(!open);

  };

  return (
    <div className={style.cards}>
      <div className={style.card}>
        <div className={style.observations}>
          <p>{product.observations}</p>
        </div>

        <div className={style.image}>
          <img src={product.image} alt="" />
        </div>

        <div className={style.variaciones}>
          <select name="" id="">
          {product.color?.map(color=> <option>{color}</option>)}
          </select>
          <select name="" id="">
          {product.size?.map(size=> <option>{size}</option>)}
          </select>
          <button onClick={handleOptions}>OPCIONES</button>
          {open === false ? null : (
            <div className={style.dropOpt}>
              <p>Administrar Producto</p>
              <button value={product.id} onClick={handleDelete}>
                Eliminar
              </button>
              <button onClick={handleEdit}>Editar</button>
              {edit === false ? null : (
                <div>
                  <p>Editar Producto</p>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input
                        type="text"
                        placeholder="Nombre de Producto"
                        name="name"
                        value={newproduct.name}
                        onChange={handleChange}
                      />
                    </div>
                    <input
                      type="url"
                      placeholder="Url Image"
                      name="image"
                      value={newproduct.image}
                      onChange={handleChange}
                    />
                    <textarea
                      type="text"
                      placeholder="Observaciones"
                      name="observations"
                      value={newproduct.observations}
                      onChange={handleChange}
                    />

                    <button type="submit">Confirmar</button>
                  </form>
                </div>
              )}
            </div>
          )}
          <button>AÑADIR</button>
        </div>
        <div>
          <p>{product.name}</p>
        </div>
      </div>
    </div>
  );
}

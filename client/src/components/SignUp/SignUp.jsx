import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser, getUserId } from "../../redux/actions";
import { validation } from "./ValidationSignUp";
import swal from "sweetalert";
import styles from "../FormsStyles/forms.module.css";

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [signUp, setSignUp] = useState({
    name: "",
    id: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    id: "",
  });

  function handleChange(event) {
    setErrors(
      validation({
        ...signUp,
        [event.target.name]: event.target.value,
      })
    );

    setSignUp({
      ...signUp,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = await dispatch(createUser(signUp));
    if (newUser.id) {
      swal("Usuario creado con exito!", {
        icon: "success",
      });
      setSignUp({
        name: "",
        id: "",
        password: "",
      });
      await dispatch(getUserId(newUser.id));
      history.push(`/home`);
    } else {
      swal(newUser.response.data, {
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Registrate</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <input
                type="text"
                placeholder="Nombre"
                value={signUp.name}
                name="name"
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Email"
                value={signUp.id}
                name="id"
                onChange={handleChange}
                className={styles.input}
              />
              <div>{errors.id && <p color={"red"}>{errors.id} </p>}</div>
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={signUp.password}
                name="password"
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.linksContainer}>
              <button
                type="submit"
                id="signUpButton"
                disabled={
                  !signUp.name || !signUp.id || !signUp.password || errors.id
                }
                className={styles.submitButton}
              >
                Registrarse
              </button>

              <Link to="/login" className={styles.link}>
                Ya tienes una cuenta?
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

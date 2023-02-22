import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserId } from "../../redux/actions";
import swal from "sweetalert";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import styles from "../FormsStyles/forms.module.css";


export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentProfile = useSelector((state) => state.profile);
  
  
  if(currentProfile.id){
    history.push("/home");
  }

  const [login, setLogin] = useState({  // 
    id: "",
    password: "",
  });

  const [passwordType, setPasswordType] = useState("password");

  const seePassword = (event) => {
    event.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }

  function handleChange(event) {
    setLogin({
      ...login,
      [event.target.name]: [event.target.value],
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const usuarios = await dispatch(getUser());
    const currentUser = usuarios.payload.filter(
      (user) => user.id === login.id[0]
    );
    if (currentUser.length) {
        if (currentUser[0].password === login.password[0]) {
          dispatch(getUserId(login.id));
          history.push("/home");
          setLogin({
            id: "",
            password: "",
          });
          
        } else {
          swal("El usuario o contraseña es incorrecto", {
            icon: "error",
            className: styles.swal,
          });
        }
    } else {
      swal("El usuario o contraseña es incorrecto", {
        icon: "error",
      });
    }
  }



  return (
    <div>
      <div className={ styles.containerLogin }>
        <div className={ styles.formContainer }>
          <h1 className={ styles.title }>Ingresa</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <input
                className={ styles.input }
                type="text"
                placeholder="Email"
                value={login.id}
                name="id"
                onChange={handleChange}
              />
            </div>

            <div className={styles.passwordInputCont}>
              <input
                className={styles.passwordInput}
                type={passwordType}
                placeholder="Contraseña"
                value={login.password}
                name="password"
                onChange={handleChange}
              />
              <div>
                <button onClick={seePassword} className={styles.eyes}>
                  {passwordType === "password" ?
                    <HiOutlineEye />
                    : <HiOutlineEyeSlash />}
                </button>
              </div>
            </div>

            <div className={styles.linksContainer}>

              <button
                name="where"
                type="submit"
                id="loginButton"
                className={styles.submitButton}
                disabled={!login.id || !login.password}
              >
                Ingresar
              </button>

              <Link to="/sign-up" className={ styles.link }>Todavia no tienes cuenta?</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

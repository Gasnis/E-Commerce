import React, { useState, useEffect  } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUserByid } from '../../redux/actions';
import { validation } from './ValidationSignUp';
import { gapi } from "@emailjs/browser"
import GoogleLogin from "react-google-login";
import axios from 'axios';
import swal from "sweetalert";
import styles from '../FormsStyles/forms.module.css';

export default function SignUp() {

    const dispatch = useDispatch();
    const history = useHistory();


    const [signUp, setSignUp] = useState({
        name: "",
        id: "",
        password: "",
    })

    const [errors, setErrors] = useState({
        id: "",
    })

    function handleChange(event) {
        setErrors(
            validation({
                ...signUp,
                [event.target.name]: event.target.value,
            })
        );

        setSignUp({
            ...signUp,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUser = await dispatch(createUser(signUp))
        if (newUser.id) {
            swal("Usuario creado con exito!", {
                icon: "success",
            });
            setSignUp({
                name: "",
                id: "",
                password: "",
            })
            await dispatch(getUserByid(newUser.id))
            history.push(`/home`)
        } else {
            swal(newUser.response.data, {
                icon: "error",
            });
        }
    }


    const clientId = "553757960148-cs9ei96qh12hekvt7kecuo3fdf9d6ofp.apps.googleusercontent.com"

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clientId,
            })
        }
        gapi.load("client:auth2", start)
    }, [])

    const responseGoogle = async (respuesta) => {
        const userName = respuesta.profileObj.name;
        const userEmail = respuesta.profileObj.email;
        const userPassword = await generarString(10)

        let newUser = {
            name: userName,
            id: userEmail,
            password: userPassword,
            phone: "Completar",
            birthday: "1111-11-11",
            city: "Completar",
            image: respuesta.profileObj.imageUrl
        }
        const userCreated = await dispatch(createUser(newUser))

        if (userCreated.id) {
            alert('¡Usuario creado con éxito!')
            await dispatch(getUserByid(userCreated.id))
            history.push(`/profile`)
        } else {
            alert(userCreated.response.data)
        }
        // emailjs.sendForm("service_e1td9mr", "template_xya2hg7", newUser,"ra0ajVxUcOBmQYZPK")
        // .then(response => console.log(response))
        // .catch(error => console.log(error))

        var data = {
            service_id: 'service_e1td9mr',
            template_id: 'template_xya2hg7',
            user_id: 'ra0ajVxUcOBmQYZPK',
            template_params: {
                'userPassword': userPassword,
                'gmail': userEmail,
                'userName': userName,
            }
        };

        await axios.post('https://api.emailjs.com/api/v1.0/email/send', data)

    }
    return (
        <div>
            <Navbar />
            <div className={checked ? styles.container : styles.containerDark}>
                <div className={checked ? styles.formContainer : styles.formContainerDark}>
                    <h1 className={checked ? styles.title : styles.titleDark}>Registrate</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div>
                            <input
                                type='text'
                                placeholder='Nombre'
                                value={signUp.name}
                                name="name"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <div >
                            <input
                                type='text'
                                placeholder='Mail'
                                value={signUp.id}
                                name="id"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                            <div>{errors.id && <p>{errors.id}</p>}</div>
                        </div>

                        <div>
                            <input
                                type='password'
                                placeholder='Contraseña'
                                value={signUp.password}
                                name="password"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <div>
                            <input
                                type='text'
                                placeholder='Teléfono'
                                value={signUp.phone}
                                name="phone"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <div>
                            <input
                                type='date'
                                placeholder='Fecha de cumpleaños'
                                value={signUp.birthday}
                                max={getMaxDate(15)}
                                name="birthday"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        <div>
                            <input
                                type='text'
                                placeholder='Ciudad'
                                value={signUp.city}
                                name="city"
                                onChange={handleChange}
                                className={checked ? styles.input : styles.inputDark}
                            />
                        </div>

                        {/* <h3>Sos dueño de un bar?</h3> */}

                        <div className={styles.linksContainer}>
                            <button
                                type="submit"
                                id="signUpButton"
                                disabled={!signUp.name || !signUp.id || !signUp.password || !signUp.phone || !signUp.city || !signUp.birthday || errors.id}
                                className={styles.submitButton}
                            >Registrarse</button>
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Registrarse con Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                            />
                            <Link to="/login" className={checked ? styles.link : styles.linkDark}>Ya tenes una cuenta?</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
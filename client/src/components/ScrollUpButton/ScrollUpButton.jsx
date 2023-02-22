import React, { useEffect, useState } from "react";
import style from "../ScrollUpButton/ScrollUpButton.module.css";
import {IoArrowUpSharp} from "react-icons/io5"

export default function BackToTopButton() {

    const [BackToTop, setBackToTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 200) {
                setBackToTop(true)
            } else {
                setBackToTop(false)
            }
        } )
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div>
            {BackToTop && (
                <button className={  style.scrollButton } 
                onClick={scrollToTop}><IoArrowUpSharp className={style.icon}/></button>
            )}
        </div>
    )
}

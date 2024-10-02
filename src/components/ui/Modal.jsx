import React, { useState, useEffect, useRef } from "react";
import typeScriptImg from "../../assets/typescript-badge.png";
import htmlImg from "../../assets/HTML5_Badge.png";
import cssImg from "../../assets/css-badge.png";
import javaScriptImg from "../../assets/javascript-badge.png";
import nodeJsImg from "../../assets/nodejs-logo.png";
import reactImg from "../../assets/react-badge.png";
import jQueryImg from "../../assets/jQuery-badge.png";
import mySqlImg from "../../assets/mysql-badge.webp";
import emailjs from "@emailjs/browser";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom"; // For navigation
import "./Modal.css";

const Modal = ({ showModal, setShowModal, isVisible, setIsVisible, setCartItems }) => {
    const [loading, setLoading] = useState(false); // LOADING STATE
    const [success, setSuccess] = useState(false); // SUCCESS STATE
    const form = useRef();
    const history = useHistory(); // INIT HISTORY FOR NAVIGATION

    const openModal = () => {
        const timer = setTimeout(() => {
            setShowModal(true); // SET MODAL STATE TO OPEN
        }, 300);

        return () => clearTimeout(timer); // CLEANUP TIMEOUT ON STATE CHANGE OR UNMOUNT
    };

    const closeModal = () => {
        setShowModal(false); // CLOSE OUT MODAL
        const timer = setTimeout(() => {
            setIsVisible(false); // HIDE MODAL
        }, 300);

        return () => clearTimeout(timer);
    };

    useEffect(() => {
        // INITIALIZE EmailJS WHEN MODAL IS MOUNTED (ONE TIME)
        emailjs.init("M5JGTBwzcn6wIf6a7");
    }, []);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflowY = "hidden";
            document.body.style.height = "100vh";

            openModal();
        } else {
            document.body.style.overflowY = "auto";
            document.body.style.height = "auto";
        }
    }, [isVisible]);

    function contact() {
        setLoading(true);

        emailjs
            .sendForm(
                "service_2zh7gkh", // EMAILJS SERVICE ID
                "template_athyrzu", // TEMPLATE ID
                form.current, // FORM REFERENCE
                "M5JGTBwzcn6wIf6a7" // PUBLIC KEY
            )
            .then(
                (result) => {
                    setLoading(false); // HIDE LOADING STATE
                    setSuccess(true);  // SHOW SUCCESS STATE

                    setCartItems([]); // CLEAR THE CART

                    setTimeout(() => {
                        history.push("/");
                    }, 2000);
                },
                (error) => {
                    console.log(error.text);
                    setLoading(false); // STOP LOADING STATE IF ERROR
                    alert(error.text);
                }
            );

        const navElement = document.querySelector("nav");
        if (navElement) {
            navElement.style.pointerEvents = "all";
        }

        const progressTrackerElement = document.querySelector(
            ".progress-tracker--wrapper"
        );
        if (progressTrackerElement) {
            progressTrackerElement.style.pointerEvents = "all";
        }

        document.body.style.overflowY = "auto";
        document.body.style.height = "auto";
    }

    return (
        <div
            className={`modal ${showModal ? "open" : ""} ${
                isVisible ? "visible" : ""
            }`}
        >
            <div
                className={`modal__half modal__about ${
                    showModal ? "open" : "closed"
                }`}
            >
                <h3 className="modal__title modal__title--about">
                    Here's a bit about me.
                </h3>
                <h4 className="modal__sub-title modal__sub-title--about">
                    Full-Stack Web Developer
                </h4>
                <p className="modal__para">
                    I'm a 39-year-old
                    <strong
                        className="purple purple--modal"
                        style={{ marginRight: 4 + "px", marginLeft: 4 + "px" }}
                    >
                        Fullstack Web Developer
                    </strong>
                    with a strong passion for developing websites with great
                    <strong
                        className="purple purple--modal"
                        style={{ marginRight: 0, marginLeft: 4 + "px" }}
                    >
                        user experiences
                    </strong>
                    .
                    <br />
                    Currently, I'm honing my skills by tackling difficult
                    engineering challenges while learning from a team of some of
                    the industry's most
                    <strong
                        className="purple purple--modal"
                        style={{ marginLeft: 4 + "px" }}
                    >
                        talented
                    </strong>{" "}
                    and
                    <strong
                        className="purple purple--modal"
                        style={{ marginLeft: 4 + "px" }}
                    >
                        experienced
                    </strong>{" "}
                    software engineers. I am passionate about continuous
                    learning and leveraging my skills to contribute to
                    innovative and impactful projects.
                </p>
                <div className="modal__languages">
                    <figure className="modal__language">
                        <img
                            className="modal__language--img"
                            src={htmlImg}
                            alt="Language Icon"
                        />
                        <span className="language__name">HTML</span>
                    </figure>
                    <figure className="modal__language">
                        <img
                            className="modal__language--img"
                            src={cssImg}
                            alt="Language Icon"
                        />
                        <span className="language__name">CSS</span>
                    </figure>
                    <figure className="modal__language">
                        <img
                            className="modal__language--img"
                            src={javaScriptImg}
                            alt="Language Icon"
                        />
                        <span className="language__name">JavaScript</span>
                    </figure>
                    <figure className="modal__language">
                        <img
                            className="modal__language--img"
                            src={typeScriptImg}
                            alt="Language Icon"
                        />
                        <span className="language__name">TypeScript</span>
                    </figure>
                    <figure className="modal__language">
                        <img
                            className="modal__language--img"
                            src={nodeJsImg}
                            alt="Language Icon"
                        />
                        <span className="language__name">Node.JS</span>
                    </figure>
                    <figure className="modal__language">
                        <img
                            className="modal__language--img"
                            src={reactImg}
                            alt="Language Icon"
                        />
                        <span className="language__name">React</span>
                    </figure>
                    <figure className="modal__language">
                        <img
                            className="modal__language--img"
                            src={jQueryImg}
                            alt="Language Icon"
                        />
                        <span className="language__name">jQuery</span>
                    </figure>
                    <figure className="modal__language">
                        <img
                            className="modal__language--img"
                            src={mySqlImg}
                            alt="Language Icon"
                        />
                        <span className="language__name">MySQL</span>
                    </figure>
                </div>
            </div>
            <div
                className={`modal__half modal__contact ${
                    showModal ? "open" : "closed"
                }`}
            >
                <FontAwesomeIcon
                    icon={faTimes}
                    className="fa-solid fa-xmark modal__exit click"
                    onClick={() => {
                        document.body.style.overflowY = "auto";
                        document.body.style.height = "auto";

                        const navElement = document.querySelector("nav");
                        if (navElement) {
                            navElement.style.pointerEvents = "all";
                        }

                        const progressTrackerElement = document.querySelector(
                            ".progress-tracker--wrapper"
                        );
                        if (progressTrackerElement) {
                            progressTrackerElement.style.pointerEvents = "all";
                        }

                        closeModal();
                    }}
                />
                <h3 className="modal__title modal__title--contact">
                    Let's have a chat!
                </h3>
                <h4 className="modal__sub-title modal__sub-title--contact">
                    I'm currently open to new opportunities.
                </h4>
                <form ref={form} id="contact__form" onSubmit={() => contact()}>
                    <div className="form__item">
                        <label className="form__item--label">
                            <span className="purple required-field">*</span>
                            Name
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            className="contact__input"
                            required
                        />
                    </div>
                    <div className="form__item">
                        <label className="form__item--label">
                            <span className="purple required-field">*</span>
                            E-mail
                        </label>
                        <input
                            type="email"
                            name="user_email"
                            className="contact__input"
                            required
                        />
                    </div>
                    <div className="form__item">
                        <label className="form__item--label">
                            <span className="purple required-field">*</span>
                            Message
                        </label>
                        <textarea
                            type="text"
                            name="message"
                            className="contact__input"
                            required
                        ></textarea>
                    </div>
                    <button
                        id="contact__submit"
                        className="form__submit"
                        onClick={(event) => {
                            event.preventDefault();
                            contact();
                        }}
                    >
                        Send it my way
                    </button>
                </form>

                {/* Loading state */}
                {loading && (
                    <div
                        className="loading-overlay"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "#332D2D",
                            color: "whitesmoke",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 3,
                        }}
                    >
                        <FontAwesomeIcon
                            className="modal__spinner"
                            icon={faSpinner}
                        />
                    </div>
                )}

                {/* Success state */}
                {success && (
                    <div
                        className="success-overlay"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(25, 135, 84, 1)",
                            color: "whitesmoke",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 3,
                        }}
                    >
                        <p className="modal-success--para">
                            Thanks for the message! I look forward to speaking
                            with you soon.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;

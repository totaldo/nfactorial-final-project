import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components";

import "./Header.css";

const Header = () => {
    const location = useLocation();

    let isSigned = sessionStorage.getItem("logged")
        ? sessionStorage.getItem("logged")
        : false;

    const handleExit = () => {
        sessionStorage.setItem("logged", false);
        window.location.reload();
    };

    useEffect(() => {
        isSigned = sessionStorage.getItem("logged");
    }, [sessionStorage.getItem("logged")]);

    return (
        <div className="header">
            <div className="header__container">
                {location.pathname !== "/" ? (
                    <Link to="/">
                        <img
                            src="/svgs/chevron-left.svg"
                            alt="logo"
                            className="header__logo"
                        />
                    </Link>
                ) : (
                    <div></div>
                )}
                <div className="header__logo__container">
                    <img
                        src="/img/logo-small.png"
                        alt="logo"
                        className="header__logo"
                    />
                    <div>ECO FOODS GROUP</div>
                </div>
                <div>
                    {isSigned && isSigned != "false" ? (
                        <Button
                            text="Выйти из аккаунта"
                            style={{ width: "100%" }}
                            action={handleExit}
                        />
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;

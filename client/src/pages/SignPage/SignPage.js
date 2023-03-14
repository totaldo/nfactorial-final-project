import { Input, Button } from "../../components";

import "./SignPage.css";

const SignPage = ({ setIsSigned }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const target = e.target;

        if (target.login.value === "1" && target.password.value === "1") {
            setIsSigned(true);
            sessionStorage.setItem("logged", true);
            window.location.reload();
        }
    };

    return (
        <div className="sign-page">
            <div className="sign-page__main">
                <div className="sign-page__logo">
                    <img
                        src="img/logo-big.JPG"
                        alt="logo-big"
                        width="200px"
                        style={{ marginBottom: "2rem" }}
                    />
                </div>

                <form className="sign-page__form" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Логин"
                        type="text"
                        styleType="sign"
                        name="login"
                        style={{ marginBottom: "30px" }}
                    />
                    <Input
                        placeholder="Пароль"
                        type="password"
                        styleType="sign"
                        name="password"
                        style={{ marginBottom: "30px" }}
                    />

                    <Button text="Войти" styleType="sign" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default SignPage;

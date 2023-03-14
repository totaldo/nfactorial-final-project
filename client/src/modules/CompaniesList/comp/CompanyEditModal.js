import { useParams } from "react-router-dom";

import { Modal, Input, Button, InputFile, Select } from "../../../components";
import inputs from "./inputs";

const CompaniesEditModal = ({ setShowModal, company }) => {
    const { name } = company;

    const handleForm = async (e) => {
        e.preventDefault();

        const comps = JSON.parse(localStorage.getItem("companies"));

        comps.find((comp) => comp.name === name).name = e.target.name.value;

        localStorage.setItem("companies", JSON.stringify(comps));

        setShowModal(false);
        window.location.reload();
    };

    return (
        <Modal
            style={{ width: "30%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="manager-modal__header">Изменить организацию</div>
            <div className="manager-modal__description">
                Изменить данные организации
            </div>

            <form className="manager-modal__form_main" onSubmit={handleForm}>
                {inputs.map((el) => (
                    <Input
                        label={el.label}
                        type={el.type}
                        name={el.name}
                        style={{ marginBottom: "2rem" }}
                    />
                ))}

                <Button
                    text="Добавить"
                    style={{ width: "100%" }}
                    type="submit"
                />
            </form>
        </Modal>
    );
};

export default CompaniesEditModal;

import { Modal, Input, Button, InputFile, Select } from "../../../components";

import inputs from "./inputs";

const CompaniesListModal = ({ setShowModal }) => {
    const handleForm = async (e) => {
        e.preventDefault();

        // if (!items) return;

        const companyObj = {
            name: e.target.name.value,
        };

        const comps = JSON.parse(localStorage.getItem("groups"));

        if (comps) {
            comps.push(companyObj);
            localStorage.setItem("groups", JSON.stringify(comps));
        } else {
            localStorage.setItem("groups", JSON.stringify([companyObj]));
        }

        setShowModal(false);

        window.location.reload();
    };

    return (
        <Modal
            style={{ width: "30%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="manager-modal__header">Добавить организацию</div>
            <div className="manager-modal__description">
                Добавьте новую организацию
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

export default CompaniesListModal;

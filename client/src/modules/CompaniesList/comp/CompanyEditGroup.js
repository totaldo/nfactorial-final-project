import { useParams } from "react-router-dom";

import { Modal, Input, Button, InputFile, Select } from "../../../components";
import inputs from "./inputs";

const generateOptions = (company, companyid) => {
    const options = company
        .map((company) => ({
            value: company.name,
            text: company.name,
        }))
        .filter((company) => company.value !== companyid);

    return options;
};

const CompaniesEditGroupModal = ({ setShowModal, company }) => {
    const { groupsid } = useParams();
    const groups = JSON.parse(localStorage.getItem("groups"));

    const { name } = company;

    const handleForm = async (e) => {
        e.preventDefault();

        const comps = JSON.parse(localStorage.getItem("companies"));

        comps.find((comp) => comp.name === name).groupsid =
            e.target.select.value;

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
                <Select
                    options={generateOptions(groups, groupsid)}
                    name="select"
                    style={{ marginBottom: "2rem" }}
                />

                <Button
                    text="Добавить"
                    style={{ width: "100%" }}
                    type="submit"
                />
            </form>
        </Modal>
    );
};

export default CompaniesEditGroupModal;

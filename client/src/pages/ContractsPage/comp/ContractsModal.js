import { useState } from "react";
import { useParams } from "react-router-dom";
import { read, utils } from "xlsx";

import { Modal, Input, Button, InputFile, Select } from "../../../components";

import inputs from "./inputs";

const convertHeaders = (json) => {
    return json.map((el) => ({
        amount_init: el["Кол-во"],
        item_name: el["Наименование"],
        price: el["Цена"],
        unit: el["Ед. Изм."],
    }));
};

const ContractsModal = ({ setShowModal }) => {
    const { companyid } = useParams();
    const [items, setItems] = useState(null);

    const readUploadFile = (e) => {
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);
                setItems(convertHeaders(json));
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    const handleForm = async (e) => {
        e.preventDefault();

        if (!items) return;

        const companyObj = {
            name: e.target.name.value,
            info: e.target.info.value,
            percentage: e.target.percentage.value,
            items: items,
            dates: [],
        };

        const comps = JSON.parse(localStorage.getItem("companies"));

        if (comps) {
            comps
                .find((comp) => comp.name === companyid)
                .contracts.push({ ...companyObj });

            localStorage.setItem("companies", JSON.stringify(comps));
        }

        setShowModal(false);
        window.location.reload();
    };

    return (
        <Modal
            style={{ width: "30%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="manager-modal__header">Добавить контракт</div>
            <div className="manager-modal__description">
                Добавьте новый контракт
            </div>

            <form className="manager-modal__form_main" onSubmit={handleForm}>
                {/* <div className="manager-modal__form"> */}
                {inputs.map((el) => (
                    <Input
                        label={el.label}
                        type={el.type}
                        name={el.name}
                        style={{ marginBottom: "2rem" }}
                    />
                ))}

                <InputFile
                    onChange={readUploadFile}
                    style={{ marginBottom: "2rem" }}
                />

                {/* </div> */}
                <Button
                    text="Добавить"
                    style={{ width: "100%" }}
                    type="submit"
                />
            </form>
        </Modal>
    );
};

export default ContractsModal;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

import { Modal, Input, Button, Select } from "../../../components";
import Calendar from "react-calendar";

const AddDateModal = ({ setShowModal, setContracts }) => {
    const [date, setDate] = useState(new Date());

    const { companyid } = useParams();
    const currCompany = JSON.parse(localStorage.getItem("companies")).find(
        (company) => company.name === companyid
    );

    const createFormattedDate = () => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day < 10 ? "0" + day : day}.${
            month < 10 ? "0" + month : month
        }.${year}`;
    };

    const compare = (a, b) => {
        let d1 = a.date.split(".");
        let d2 = b.date.split(".");
        if (d1 == d2) return 0;

        if (d1[2] < d2[2]) return -1;
        if (d1[2] > d2[2]) return 1;
        if (d1[2] == d2[2]) {
            if (d1[1] < d2[1]) return -1;
            if (d1[1] > d2[1]) return 1;
            if (d1[1] == d2[1]) {
                if (d1[0] < d2[0]) return -1;
                if (d1[0] > d2[0]) return 1;
            }
        }
    };

    const handleAddDate = (e) => {
        e.preventDefault();

        const currentDate = createFormattedDate();

        setContracts((prev) => {
            const res = prev.map((prevContract) => ({
                ...prevContract,
                dates: [
                    ...prevContract.dates,
                    {
                        id: v4(),
                        date: currentDate,
                        items: prevContract.items.map((item) => ({
                            item_name: item.item_name,
                            unit: item.unit,
                        })),
                        company:
                            currCompany.type === "Бумажный"
                                ? e.target.company.value
                                : "Нету",
                    },
                ].sort(compare),
            }));

            const comp = JSON.parse(localStorage.getItem("companies"));
            comp.find((company) => company.name === companyid).contracts = res;
            localStorage.setItem("companies", JSON.stringify(comp));

            return res;
        });

        window.location.reload();

        setShowModal(false);
    };

    return (
        <Modal
            style={{ width: "30%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="manager-modal__header">Выберите дату</div>
            <div className="manager-modal__header">
                Дата: {createFormattedDate()}
            </div>

            <form className="manager-modal__form_main" onSubmit={handleAddDate}>
                {/* <div className="manager-modal__form"> */}

                {/* </div> */}
                {currCompany.type === "Бумажный" && (
                    <Input
                        placeholder="Компания"
                        name="company"
                        label="Компания"
                        style={{ marginBottom: "2rem" }}
                    />
                )}
                <div className="manager-modal__form_main__el">
                    {/* <Select options={[]} style={{ marginRight: "1rem" }} />
                    <Select options={[]} style={{ marginRight: "1rem" }} />
                    <Select options={[]} /> */}
                    <Calendar onChange={setDate} value={date} />
                </div>
                <Button
                    text="Создать"
                    style={{ width: "100%" }}
                    type="submit"
                />
            </form>
        </Modal>
    );
};

export default AddDateModal;

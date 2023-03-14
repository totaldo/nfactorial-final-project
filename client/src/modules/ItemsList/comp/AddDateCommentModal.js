import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

import { Modal, Button, Textarea } from "../../../components";

const AddDateCommentModal = ({ setShowModal, contract, date }) => {
    const { companyid } = useParams();
    const { name, items, dates } = contract;

    const handleAddDate = (e) => {
        e.preventDefault();

        const currDates = dates.map((cDate) =>
            cDate.id === date.id
                ? { ...cDate, comment: e.target.textarea.value }
                : cDate
        );

        const comp = JSON.parse(localStorage.getItem("companies"));
        comp
            .find((company) => company.name === companyid)
            .contracts.find((contract) => contract.name === name).dates =
            currDates;

        localStorage.setItem("companies", JSON.stringify(comp));

        window.location.reload();

        setShowModal(false);
    };

    console.log(date, date?.comment ? date.comment : "Нету");

    return (
        <Modal
            style={{ width: "40%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="manager-modal__header">Напишите комментарий</div>
            <div className="manager-modal__header">
                Ваш прошлый комментарий: {date?.comment ? date.comment : "Нету"}
            </div>

            <form className="manager-modal__form_main" onSubmit={handleAddDate}>
                <Textarea style={{ marginBottom: "2rem" }} />
                <Button
                    text="Создать"
                    style={{ width: "100%" }}
                    type="submit"
                />
            </form>
        </Modal>
    );
};

export default AddDateCommentModal;

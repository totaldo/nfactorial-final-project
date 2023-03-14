import { useState } from "react";
import { useParams } from "react-router-dom";

import { Modal, Input, Button, Select } from "../../../components";
import Calendar from "react-calendar";
import CsvDownloadButton from "react-json-to-csv";

import inputs from "./inputs";

const ExportModal = ({ setShowModal, contracts }) => {
    const { companyid } = useParams();

    const [date, setDate] = useState(new Date());
    const [mockData, setMockData] = useState([]);

    const handleExport = () => {
        const result = [];
        const allDates = [];

        for (let contract of contracts) {
            const date = contract.dates.find(
                (date) => date.date === createFormattedDate(date)
            );

            if (date) {
                allDates.push({
                    date: date,
                    company: contract.name,
                });
            }
        }

        if (!allDates.length) return;

        const company = JSON.parse(localStorage.getItem("companies")).find(
            (company) => company.name === companyid
        );

        result.push({
            id: `Адрес: ${company.address}`,
            second: `Заказчик: ${company.name}`,
            third: ` `,
        });

        for (let date of allDates) {
            result.push({
                id: `Компания:`,
                second: date.company,
                third: ` `,
            });

            for (let item of date.date.items) {
                if (item.shipment_count) {
                    result.push({
                        id: item.item_name,
                        second: `кг`,
                        third: item.shipment_count,
                    });
                }
            }
        }

        return result;
    };

    const createFormattedDate = () => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day < 10 ? "0" + day : day}.${
            month < 10 ? "0" + month : month
        }.${year}`;
    };

    const handleForm = async (e) => {
        e.preventDefault();
        // handleExport();
    };

    return (
        <Modal
            style={{ width: "30%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="manager-modal__header">Выберите дату экспорта</div>
            <div className="manager-modal__header">
                Дата: {createFormattedDate()}
            </div>

            <form className="manager-modal__form_main" onSubmit={handleForm}>
                {/* <div className="manager-modal__form"> */}

                {/* </div> */}
                <div className="manager-modal__form_main__el">
                    <Calendar onChange={setDate} value={date} />
                </div>
                <CsvDownloadButton
                    className="button_outline"
                    data={handleExport()}
                    headers={["Наименование", "ЕдИзм", "Кол-во"]}
                    style={{ width: "100%" }}
                    type="submit"
                >
                    Экспорт
                </CsvDownloadButton>
            </form>
        </Modal>
    );
};

export default ExportModal;

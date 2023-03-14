import { useState } from "react";
import { useParams } from "react-router-dom";

import { Modal, Input, Button, Select } from "../../../components";
import Calendar from "react-calendar";
import CsvDownloadButton from "react-json-to-csv";

import { utils, writeFile, writeFileXLSX } from "xlsx";

import divideTrucks from "../../../utils/divideTrucks";
import inputs from "./inputs";

const ExportAllModal = ({ setShowModal, companies }) => {
    const { companyid } = useParams();

    const [date, setDate] = useState(new Date());
    const [mockData, setMockData] = useState([]);

    const handleExport = async (e) => {
        e.preventDefault();

        const wb = utils.book_new();

        const allAddresses = companies
            .map((company) => ({
                lat: company.lat,
                lng: company.lng,
                items: company.contracts
                    .map((contract) => {
                        const filteredDates = contract.dates.filter(
                            (fDate) => fDate.date === createFormattedDate(date)
                        );

                        return filteredDates.map((fDate) =>
                            fDate.items.filter(
                                (item) =>
                                    typeof item.shipment_count !== "undefined"
                            )
                        );
                    })
                    .flat(2),
            }))
            .filter((address) => address.items.length !== 0);

        const paths = await divideTrucks({
            addresses: allAddresses,
            numberOfTrucks: 2,
        });

        let k = 1;
        for (let path of paths) {
            const result = [];

            const filteredCompanies = companies.filter((_, index) =>
                path.includes(index + 1)
            );

            if (!filteredCompanies.length) continue;

            result.push({
                id: createFormattedDate(date),
                second: `Sprinter 025LW`,
                third: `Садир Рустам`,
                fourth: ``,
            });

            for (let company of filteredCompanies) {
                const allDates = [];
                for (let contract of company.contracts) {
                    const date = contract.dates
                        .filter(
                            (date) => date.date === createFormattedDate(date)
                        )
                        .map((fDate) =>
                            fDate.items.filter(
                                (item) =>
                                    typeof item.shipment_count !== "undefined"
                            )
                        );

                    if (date) {
                        for (let d of date) {
                            allDates.push({
                                date: d,
                                company: contract.name,
                                info: contract.info,
                            });
                        }
                    }
                }

                if (!allDates.length) continue;

                for (let date of allDates) {
                    if (!date.date.length) continue;

                    result.push({
                        id: company.address,
                        second: "",
                        third: date.company,
                        fourth: ``,
                    });

                    const dateItems = date.date;
                    for (let i = 0; i < dateItems.length; i++) {
                        if (dateItems[i].shipment_count) {
                            result.push({
                                id: date.info,
                                second: dateItems[i].item_name,
                                third: dateItems[i].unit,
                                fourth: dateItems[i].shipment_count,
                            });
                        }
                    }

                    result.push({
                        id: date.company,
                        second: k,
                        third: `Накл от ${createFormattedDate(date)}г. ${
                            date.company
                        }`,
                        fourth: "",
                    });

                    if (typeof date.date.comment !== "undefined") {
                        result.push({
                            id: date.company,
                            second: k,
                            third: date.date.comment,
                            fourth: "",
                        });
                    }
                }
                result.push({ id: ``, second: "", third: ` ` });
            }

            if (!result.length) continue;

            const resultJson = utils.json_to_sheet(result);

            let Heading = [["1", "2", "3", "4"]];
            utils.sheet_add_aoa(resultJson, Heading);
            utils.book_append_sheet(wb, resultJson, "Результат" + k);
            k++;
        }
        writeFileXLSX(wb, "result.xlsx");
    };

    const createFormattedDate = () => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day < 10 ? "0" + day : day}.${
            month < 10 ? "0" + month : month
        }.${year}`;
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

            <form className="manager-modal__form_main" onSubmit={handleExport}>
                <div className="manager-modal__form_main__el">
                    <Calendar onChange={setDate} value={date} />
                </div>
                <Button
                    type="submit"
                    style={{ width: "100%" }}
                    text="Экспорт"
                />
            </form>
        </Modal>
    );
};

export default ExportAllModal;

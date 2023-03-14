import { useState } from "react";

import { Modal, Input, Button, Select } from "../../../components";
import Calendar from "react-calendar";

import { utils, writeFile, writeFileXLSX } from "xlsx";

const ExportAllModal = ({ setShowModal }) => {
    const companies = JSON.parse(localStorage.getItem("companies"));
    const groups = JSON.parse(localStorage.getItem("groups"));
    const generateOptions = () => {
        return getAllContractNames().map((name) => ({
            value: name,
            text: name,
        }));
    };
    const getAllContractNames = () => {
        return companies
            .map((company) =>
                company.contracts.map((contract) => contract.name).flat(1)
            )
            .flat(1);
    };

    const [date, setDate] = useState(new Date());
    const [currentContract, setCurrentContract] = useState(
        generateOptions() ? generateOptions()[0].value : null
    );
    const [allMergeDates, setAllMergeDates] = useState([]);

    const getAllDates = () => {
        if (!currentContract) return;

        const allDates = [];
        for (let company of companies) {
            for (let contract of company.contracts) {
                if (contract.name === currentContract) {
                    for (let date of contract.dates) {
                        if (date.date <= date)
                            allDates.push({
                                value: date.id,
                                text: date.date,
                            });
                    }
                }
            }
        }
        return allDates;
    };

    const handleExport = async (e) => {
        e.preventDefault();

        const getAllAddresses = () => {
            return companies
                .map((company) => ({
                    ...company,
                    // get all dates from contracts
                    items: company.contracts
                        .map((contract) => {
                            const mergedDates = allMergeDates.find(
                                (date) => date.contract === contract.name
                            );

                            let filteredDates = contract.dates.filter(
                                (fDate) =>
                                    fDate.date === createFormattedDate(date)
                            );

                            for (let i = 1; i < filteredDates.length; i++) {
                                for (
                                    let j = 0;
                                    j < filteredDates[0].items.length;
                                    j++
                                ) {
                                    const currD =
                                        filteredDates[i].items[j]
                                            .shipment_count;
                                    const initD =
                                        filteredDates[0].items[j]
                                            .shipment_count;
                                    if (typeof currD === "undefined") continue;

                                    if (typeof initD !== "undefined") {
                                        filteredDates[0].items[
                                            j
                                        ].shipment_count = (
                                            +initD + +currD
                                        ).toString();
                                    } else {
                                        filteredDates[0].items[
                                            j
                                        ].shipment_count = currD;
                                    }
                                }
                            }

                            filteredDates = filteredDates[0];

                            if (mergedDates) {
                                let mdates = contract.dates.filter((fDate) =>
                                    mergedDates.date
                                        .map((md) => md)
                                        .includes(fDate.date)
                                );

                                for (let i = 0; i < mdates.length; i++) {
                                    for (
                                        let j = 0;
                                        j < filteredDates.items.length;
                                        j++
                                    ) {
                                        const currD =
                                            mdates[i].items[j].shipment_count;
                                        const initD =
                                            filteredDates.items[j]
                                                .shipment_count;

                                        if (typeof currD === "undefined")
                                            continue;

                                        if (typeof initD !== "undefined") {
                                            filteredDates.items[
                                                j
                                            ].shipment_count = (
                                                +initD + +currD
                                            ).toString();
                                        } else {
                                            filteredDates.items[
                                                j
                                            ].shipment_count = currD;
                                        }
                                    }
                                }
                            }

                            return filteredDates.items.filter(
                                (item) =>
                                    typeof item.shipment_count !== "undefined"
                            );
                        })
                        .flat(2),
                }))
                .filter((address) => address.items.length !== 0);
        };

        const wb = utils.book_new();

        const allAddresses = getAllAddresses();

        const paths = groups.map((group) =>
            allAddresses.filter((address) => address.groupsid === group.name)
        );

        let k = 1;
        const result = [];
        for (let path of paths) {
            if (!path.length) continue;

            result.push({
                id: createFormattedDate(date),
                second: `Sprinter 025LW`,
                third: `Садир Рустам`,
                fourth: ``,
            });

            for (let company of path) {
                result.push({
                    id: company.address,
                    second: "",
                    third: date.company,
                    fourth: ``,
                });

                const dateItems = company.items;
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

                // for (let i = 0; i < allMergeDates; i++) {
                //     result.push({
                //         id: company.name,
                //         second: k,
                //         third: `Накл от ${createFormattedDate(
                //             getAllDates().find(
                //                 (date) => date.value === allMergeDates[i]
                //             ).text
                //         )}г. ${company.name}`,
                //         fourth: "",
                //     });
                // }

                // if (
                //     company.contracts
                //         .map((contract) => contract.name)
                //         .includes(allMergeDates.contract)
                // ) {
                //     for (let i = 0; i < allMergeDates.date.length; i++) {
                //         result.push({
                //             id: company.name,
                //             second: k,
                //             third: `Накл от ${createFormattedDate(
                //                 allMergeDates.date[i]
                //             )}г. ${company.name}`,
                //             fourth: "",
                //         });
                //     }
                // }

                // if (typeof date.date.comment !== "undefined") {
                //     result.push({
                //         id: company.name,
                //         second: k,
                //         third: "date.date.comment",
                //         fourth: "",
                //     });
                // }
            }
            result.push({ id: ``, second: "", third: ` ` });

            k++;
        }
        const resultJson = utils.json_to_sheet(result);

        let Heading = [["1", "2", "3", "4"]];
        utils.sheet_add_aoa(resultJson, Heading);
        utils.book_append_sheet(wb, resultJson, "Результат");
        writeFileXLSX(wb, "result.xlsx");
    };

    const handleMergeDate = (e) => {
        e.preventDefault();

        setAllMergeDates((prev) => {
            const temp = [...prev];
            const contrIndex = temp.findIndex(
                (date) => date.contract === currentContract
            );
            if (contrIndex === -1) {
                return [
                    ...temp,
                    {
                        contract: currentContract,
                        date: [
                            getAllDates().find(
                                (date) =>
                                    date.value === e.target["select-date"].value
                            ).text,
                        ],
                    },
                ];
            }

            temp[contrIndex] = {
                ...temp[contrIndex],
                date: [
                    ...temp[contrIndex].date,
                    getAllDates().find(
                        (date) => date.value === e.target["select-date"].value
                    ).text,
                ],
            };

            return temp;
        });
    };

    console.log(allMergeDates);

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
            style={{ width: "70%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="manager-modal__container">
                <div className="manager-modal__el">
                    <div className="manager-modal__header">
                        Выберите дату экспорта
                    </div>
                    <div className="manager-modal__header">
                        Дата: {createFormattedDate()}
                    </div>

                    <form
                        className="manager-modal__form_main"
                        onSubmit={handleExport}
                    >
                        <div className="manager-modal__form_main__el">
                            <Calendar onChange={setDate} value={date} />
                        </div>

                        <Button
                            type="submit"
                            style={{ width: "100%" }}
                            text="Экспорт"
                        />
                    </form>
                </div>
                <div className="manager-modal__el">
                    <form
                        className="manager-modal__form_main"
                        onSubmit={handleMergeDate}
                    >
                        <Select
                            onChange={(e) => setCurrentContract(e.target.value)}
                            options={generateOptions()}
                            style={{ marginBottom: "2rem" }}
                        />
                        {currentContract && (
                            <Select
                                name="select-date"
                                options={getAllDates()}
                                style={{ marginBottom: "2rem" }}
                            />
                        )}
                        {allMergeDates.map((mergeDate) => (
                            <div
                                style={{
                                    display: "flex",
                                    fontSize: "1.4rem",
                                }}
                            >
                                {mergeDate.contract}{" "}
                                {mergeDate.date.map((date) => (
                                    <>{date} </>
                                ))}
                            </div>
                        ))}
                        <Button
                            styleType="outline"
                            type="submit"
                            style={{ width: "100%", marginTop: "2rem" }}
                            text="Добавить дату"
                        />
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default ExportAllModal;

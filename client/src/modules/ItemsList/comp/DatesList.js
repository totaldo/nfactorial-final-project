import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DateListMainRow from "./DateListMainRow";
import AddDateCommentModal from "./AddDateCommentModal";

const datesHeaders = ["Заявка", "Отгруз", "Cписан"];

const DatesList = ({
    contract,
    setDateChanged,
    dateChanged,
    dateDeleted,
    setDateDeleted,
    allColumnShipmentCount,
}) => {
    const { companyid } = useParams();
    const { name, items, dates } = contract;

    const [datesShipment, setDataShipment] = useState(dates);
    const [dateClicked, setDateClicked] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setDataShipment(dates);
    }, [dates, dateChanged]);

    const comp = JSON.parse(localStorage.getItem("companies"));

    const handleShipment = (e, date, item) => {
        setDataShipment((prev) => {
            const temp = prev;

            const indexi = temp.findIndex((pDate) => pDate.id === date.id);

            const indexj = temp[indexi].items.findIndex(
                (pItems) => pItems.item_name === item.item_name
            );

            temp[indexi].items[indexj].shipment_count = e.target.value;

            comp
                .find((company) => company.name === companyid)
                .contracts.find((contract) => contract.name === name).dates[
                indexi
            ].items[indexj].shipment_count = e.target.value;

            localStorage.setItem("companies", JSON.stringify(comp));

            return temp;
        });

        setDateChanged(!dateChanged);
    };

    const handleCompanyShipment = (e, date, item) => {
        setDataShipment((prev) => {
            const temp = prev;

            const indexi = temp.findIndex((pDate) => pDate.id === date.id);

            const indexj = temp[indexi].items.findIndex(
                (pItems) => pItems.item_name === item.item_name
            );

            temp[indexi].items[indexj].company_shipment_count = e.target.value;

            comp
                .find((company) => company.name === companyid)
                .contracts.find((contract) => contract.name === name).dates[
                indexi
            ].items[indexj].company_shipment_count = e.target.value;

            localStorage.setItem("companies", JSON.stringify(comp));

            return temp;
        });

        setDateChanged(!dateChanged);
    };

    const handleWriteOff = (e, date, item) => {
        setDataShipment((prev) => {
            const temp = prev;

            const indexi = temp.findIndex((pDate) => pDate.id === date.id);

            const indexj = temp[indexi].items.findIndex(
                (pItems) => pItems.item_name === item.item_name
            );

            temp[indexi].items[indexj].write_off_count = e.target.value;

            comp
                .find((company) => company.name === companyid)
                .contracts.find((contract) => contract.name === name).dates[
                indexi
            ].items[indexj].write_off_count = e.target.value;

            localStorage.setItem("companies", JSON.stringify(comp));

            return temp;
        });

        setDateChanged(!dateChanged);
    };

    const handleDelete = (date) => {
        setDataShipment((prev) => {
            let temp = prev;

            const indexi = temp.findIndex((pDate) => pDate.id === date.id);

            const dates = comp
                .find((company) => company.name === companyid)
                .contracts.find((contract) => contract.name === name).dates;

            const slisedDates = [
                ...dates.slice(0, indexi),
                ...dates.slice(indexi + 1, dates.length),
            ];

            temp = slisedDates;

            comp
                .find((company) => company.name === companyid)
                .contracts.find((contract) => contract.name === name).dates =
                slisedDates;

            localStorage.setItem("companies", JSON.stringify(comp));

            return temp;
        });

        setDateDeleted(!dateDeleted);
    };

    if (!allColumnShipmentCount) return <>Loading...</>;

    const compType = comp.find((comp) => comp.name === companyid).type;

    return (
        <>
            {dates.map((date, indexi) => {
                const currDate =
                    datesShipment[
                        datesShipment.findIndex((dateS) => dateS.id === date.id)
                    ];

                const currShipmentCount =
                    allColumnShipmentCount[
                        allColumnShipmentCount.findIndex(
                            (dateS) => dateS.date === date.id
                        )
                    ];

                return (
                    <div className="item-list__container__wrap">
                        {showModal && date.id === dateClicked && (
                            <AddDateCommentModal
                                setShowModal={setShowModal}
                                contract={contract}
                                date={date}
                            />
                        )}
                        <table className="item-list__table item-list__table-dates">
                            <thead>
                                <tr className="item-list__table-row">
                                    <th
                                        colSpan={
                                            compType === "Бумажный" ? 4 : 3
                                        }
                                        className="item-list__table__header"
                                    >
                                        {date.date}
                                        <div
                                            className="item-list__table__comment"
                                            style={{ backgroundColor: "blue" }}
                                            onClick={() => {
                                                setShowModal(true);
                                                setDateClicked(date.id);
                                            }}
                                        >
                                            <img
                                                src="/svgs/comment.svg"
                                                alt="x"
                                                width="25px"
                                                height="25px"
                                            />
                                        </div>
                                        <div
                                            className="item-list__table__delete"
                                            style={{ backgroundColor: "red" }}
                                            onClick={() => handleDelete(date)}
                                        >
                                            <img
                                                src="/svgs/circle-x.svg"
                                                alt="x"
                                                width="40px"
                                                height="40px"
                                            />
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="item-list__table-row">
                                    {compType === "Бумажный" && (
                                        <td className="item-list__table__header">
                                            {date.company}
                                        </td>
                                    )}
                                    {datesHeaders.map((header) => (
                                        <td className="item-list__table__header">
                                            {header}
                                        </td>
                                    ))}
                                </tr>

                                <DateListMainRow
                                    items={items}
                                    compType={compType}
                                    datesShipment={datesShipment}
                                    date={date}
                                    handleCompanyShipment={
                                        handleCompanyShipment
                                    }
                                    handleShipment={handleShipment}
                                    handleWriteOff={handleWriteOff}
                                />
                            </tbody>

                            <tbody>
                                <tr className="item-list__table-row">
                                    <td className="item-list__table-row__el">
                                        Отгруз
                                    </td>
                                    <td
                                        colSpan={
                                            compType === "Бумажный" ? 3 : 2
                                        }
                                        className="item-list__table-row__el"
                                    >
                                        {currShipmentCount?.shipment_count}
                                    </td>
                                </tr>
                                <tr className="item-list__table-row">
                                    <td className="item-list__table-row__el">
                                        Списан
                                    </td>
                                    <td
                                        className="item-list__table-row__el"
                                        colSpan={
                                            compType === "Бумажный" ? 2 : 1
                                        }
                                    >
                                        {currDate?.items.reduce(
                                            (p, item, index) => {
                                                if (
                                                    typeof item.write_off_count ===
                                                    "undefined"
                                                )
                                                    return p;

                                                return (
                                                    p +
                                                    +item.write_off_count *
                                                        +items[index].price
                                                );
                                            },
                                            0
                                        )}
                                    </td>
                                    <td className="item-list__table-row__el">
                                        {(
                                            (currDate?.items.reduce(
                                                (p, item, index) => {
                                                    if (
                                                        typeof item.write_off_count ===
                                                        "undefined"
                                                    )
                                                        return p;

                                                    return (
                                                        p +
                                                        +item.write_off_count *
                                                            +items[index].price
                                                    );
                                                },
                                                0
                                            ) *
                                                +contract.percentage) /
                                            100
                                        ).toFixed(3)}
                                    </td>
                                </tr>
                                <tr className="item-list__table-row">
                                    <td className="item-list__table-row__el">
                                        Итого
                                    </td>
                                    <td
                                        colSpan={
                                            compType === "Бумажный" ? 3 : 2
                                        }
                                        className="item-list__table-row__el"
                                    >
                                        {(
                                            currDate?.items.reduce(
                                                (p, item, index) => {
                                                    if (
                                                        typeof item.write_off_count ===
                                                        "undefined"
                                                    )
                                                        return p;

                                                    return (
                                                        p +
                                                        +item.write_off_count *
                                                            +items[index].price
                                                    );
                                                },
                                                0
                                            ) +
                                            currShipmentCount?.shipment_count
                                        ).toFixed(3)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </>
    );
};

export default DatesList;

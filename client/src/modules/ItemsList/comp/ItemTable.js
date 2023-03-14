import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
    tableHeaders,
    tableMainHeaders,
    tablePaperHeaders,
    tablePaperMainHeaders,
} from "../utils/data";
import {
    handleAllColumnShipmentCount,
    handleAllRowShipmentCount,
    handleAllShipmentCount,
    handleAllCount,
} from "../utils/count";

import DatesList from "./DatesList";
import MonthStatsHorizontal from "./MonthStatsHorizontal";

const ItemTable = ({
    contract,
    dateDeleted,
    setDateDeleted,
    dateChanged,
    setDateChanged,
    showMonthStats,
}) => {
    const { companyid } = useParams();
    const { name, items, dates } = contract;

    const [allColumnShipmentCount, setAllColumnShipmentCount] = useState(null);
    const [allShipmentRowCount, setAllShipmentRowCount] = useState(null);
    const [allCount, setAllCount] = useState(null);
    const [allShipmentCount, setAllShipmentCount] = useState(null);

    const countColumnShipment = () => {
        setAllColumnShipmentCount(handleAllColumnShipmentCount(dates, items));
    };

    const countRowShipment = () => {
        setAllShipmentRowCount(handleAllRowShipmentCount(dates));
    };
    const countAll = () => {
        setAllCount(handleAllCount(items));
    };
    const countAllShipment = () => {
        setAllShipmentCount(handleAllShipmentCount(dates, items));
    };

    const handleDelete = () => {
        const comp = JSON.parse(localStorage.getItem("companies"));

        const companyIndex = comp.findIndex(
            (company) => company.name === companyid
        );

        const contractIndex = comp[companyIndex].contracts.findIndex(
            (contract) => contract.name === name
        );

        const slisedContract = [
            ...comp[companyIndex].contracts.slice(0, contractIndex),
            ...comp[companyIndex].contracts.slice(
                contractIndex + 1,
                comp[companyIndex].contracts.length
            ),
        ];

        comp[companyIndex].contracts = slisedContract;

        localStorage.setItem("companies", JSON.stringify(comp));

        setDateDeleted(!dateDeleted);
    };

    useEffect(() => {
        countRowShipment();
        countColumnShipment();
        countAll();
        countAllShipment();
    }, [dateChanged]);

    const currCompany = JSON.parse(localStorage.getItem("companies")).find(
        (company) => company.name === companyid
    );

    const currMainHeaders =
        currCompany.type === "Электронный"
            ? tableMainHeaders
            : tablePaperMainHeaders;

    const currHeaders =
        currCompany.type === "Электронный" ? tableHeaders : tablePaperHeaders;

    return (
        <div className="item-list__container">
            <div className="item-list__container__wrap">
                <table className="item-list__table item-list__table-main">
                    <thead>
                        <tr className="item-list__table__headers">
                            {currMainHeaders.map((header, index) => (
                                <th
                                    colSpan={header.columns}
                                    className="item-list__table__header"
                                >
                                    {header.name === "allCount"
                                        ? allCount
                                        : header.name === "allShipment"
                                        ? allShipmentCount
                                        : header.name === "info"
                                        ? contract.info
                                        : header.name === "percentage"
                                        ? contract.percentage + "%"
                                        : header.text}

                                    {index === tableMainHeaders.length - 1 && (
                                        <div
                                            className="item-list__table__delete"
                                            style={{
                                                backgroundColor: "red",
                                            }}
                                            onClick={() => handleDelete()}
                                        >
                                            <img
                                                src="/svgs/circle-x.svg"
                                                alt="x"
                                                width="40px"
                                                height="40px"
                                            />
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="item-list__table-row">
                            {currHeaders.map((header) => (
                                <td className="item-list__table__header">
                                    {header}
                                </td>
                            ))}
                        </tr>

                        {items.map((item, index) => (
                            <tr className="item-list__table-row">
                                <td className="item-list__table-row__el">
                                    {index + 1}
                                </td>
                                <td className="item-list__table-row__el">
                                    {item.item_name}
                                </td>
                                <td className="item-list__table-row__el">
                                    {item.unit}
                                </td>
                                <td className="item-list__table-row__el">
                                    {item.price}
                                </td>
                                <td className="item-list__table-row__el">
                                    {item.amount_init}
                                </td>
                                <td className="item-list__table-row__el">
                                    {item.amount_init * item.price}
                                </td>

                                {currCompany.type === "Электронный" ? (
                                    <>
                                        <td className="item-list__table-row__el">
                                            {allShipmentRowCount
                                                ? allShipmentRowCount[index]
                                                : 0}
                                        </td>
                                        <td className="item-list__table-row__el">
                                            {allShipmentRowCount
                                                ? item.amount_init -
                                                  allShipmentRowCount[index]
                                                : 0}
                                        </td>
                                        <td className="item-list__table-row__el">
                                            {allShipmentRowCount
                                                ? item.amount_init *
                                                      item.price -
                                                  allShipmentRowCount[index] *
                                                      item.price
                                                : 0}
                                        </td>
                                    </>
                                ) : (
                                    <td className="item-list__table-row__el">
                                        {allShipmentRowCount
                                            ? item.amount_init * item.price -
                                              allShipmentRowCount[index] *
                                                  item.price
                                            : 0}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>

                    <tbody>
                        {new Array(3).fill(0).map((item, index) => (
                            <tr className="item-list__table-row">
                                {new Array(
                                    currCompany.type === "Электронный" ? 9 : 7
                                )
                                    .fill(0)
                                    .map((el) => (
                                        <td className="item-list__table-row__el"></td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showMonthStats === "horizontal" ? (
                <div className="item-list__table__dates flipped">
                    <div className="content">
                        <MonthStatsHorizontal
                            contract={contract}
                            dateChanged={dateChanged}
                        />
                    </div>
                </div>
            ) : (
                dates.length && (
                    <div className="item-list__table__dates flipped">
                        <div className="content">
                            <DatesList
                                contract={contract}
                                dateChanged={dateChanged}
                                setDateChanged={setDateChanged}
                                dateDeleted={dateDeleted}
                                setDateDeleted={setDateDeleted}
                                allColumnShipmentCount={allColumnShipmentCount}
                            />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default ItemTable;

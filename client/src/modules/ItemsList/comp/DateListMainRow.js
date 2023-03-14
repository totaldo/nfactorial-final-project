import React from "react";

const DateListMainRow = ({
    items,
    datesShipment,
    date,
    handleCompanyShipment,
    handleShipment,
    handleWriteOff,
    compType,
}) => {
    return (
        <>
            {items.map((item, indexj) => {
                const currDate =
                    datesShipment[
                        datesShipment.findIndex((dateS) => dateS.id === date.id)
                    ];

                return (
                    <tr className="item-list__table-row">
                        {compType === "Бумажный" && (
                            <td className="item-list__table-row__el">
                                <input
                                    type="text"
                                    className="item-list__table-row__el__input"
                                    placeholder={
                                        currDate?.items[indexj]
                                            .company_shipment_count
                                    }
                                    onChange={(e) =>
                                        handleCompanyShipment(e, date, item)
                                    }
                                />
                            </td>
                        )}
                        <td className="item-list__table-row__el">
                            <input
                                type="text"
                                className="item-list__table-row__el__input"
                            />
                        </td>
                        <td className="item-list__table-row__el item-list__table-row__el-changeable">
                            <input
                                type="text"
                                className="item-list__table-row__el__input"
                                placeholder={
                                    currDate?.items[indexj].shipment_count
                                }
                                onChange={(e) => handleShipment(e, date, item)}
                            />
                        </td>
                        <td className="item-list__table-row__el item-list__table-row__el-changeable">
                            <input
                                type="text"
                                className="item-list__table-row__el__input"
                                placeholder={
                                    currDate?.items[indexj].write_off_count
                                }
                                onChange={(e) => handleWriteOff(e, date, item)}
                            />
                        </td>
                    </tr>
                );
            })}
        </>
    );
};

export default DateListMainRow;

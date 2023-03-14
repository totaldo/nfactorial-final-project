import { useState, useEffect } from "react";

import { countMonthHorizontalShipmentCount } from "../utils/count";

const MonthStatsHorizontal = ({ contract, dateChanged }) => {
    const { dates, items, percentage } = contract;

    const [monthHorizontalShipmentCount, setMonthHorizontalShipmentCount] =
        useState(null);

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    useEffect(() => {
        setMonthHorizontalShipmentCount(
            countMonthHorizontalShipmentCount(dates, items)
        );
    }, []);

    if (!monthHorizontalShipmentCount) return <>Loading...</>;

    console.log(items);

    return (
        <div>
            <table className="item-list__table item-list__table-main">
                <thead>
                    <tr className="item-list__table__headers">
                        {months.map((month) => (
                            <th
                                colSpan={2}
                                className="item-list__table__header"
                            >
                                {month}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    <tr className="item-list__table-row">
                        {months.map((month) => (
                            <>
                                <td className="item-list__table-row__el">
                                    Кол-во
                                </td>
                                <td className="item-list__table-row__el">
                                    Сумма
                                </td>
                            </>
                        ))}
                    </tr>
                    {items.map((item, i) => (
                        <tr className="item-list__table-row">
                            {months.map((month, j) => (
                                <>
                                    <td className="item-list__table-row__el">
                                        {monthHorizontalShipmentCount[j] &&
                                        monthHorizontalShipmentCount[j][i]
                                            ? monthHorizontalShipmentCount[j][i]
                                            : 0}
                                    </td>
                                    <td className="item-list__table-row__el">
                                        {monthHorizontalShipmentCount[j] &&
                                        monthHorizontalShipmentCount[j][i]
                                            ? (
                                                  monthHorizontalShipmentCount[
                                                      j
                                                  ][i] * item.price
                                              ).toFixed(3)
                                            : 0}
                                    </td>
                                </>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthStatsHorizontal;

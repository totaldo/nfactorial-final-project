import { useState, useEffect } from "react";

import { countMonthCount, countMonthWriteOffCount } from "../utils/count";

const MonthStats = ({ contract, dateChanged }) => {
    const { dates, items, percentage } = contract;

    const [monthCount, setMonthCount] = useState(null);
    const [monthWriteOffCount, setMonthWriteOffCount] = useState(null);

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
        setMonthCount(countMonthCount(months, dates, items));
        setMonthWriteOffCount(
            countMonthWriteOffCount(months, dates, items, percentage)
        );
    }, [dateChanged]);

    if (!monthCount) return <>Loading</>;

    return (
        <div>
            <table className="item-list__table item-list__table-main">
                <thead>
                    <tr className="item-list__table__headers">
                        <th className="item-list__table__header">#</th>
                        <th className="item-list__table__header">Месяц</th>
                        <th className="item-list__table__header">Приход</th>
                        <th className="item-list__table__header">Списание</th>
                    </tr>
                </thead>

                <tbody>
                    {months.map((el, index) => (
                        <tr className="item-list__table-row">
                            <td className="item-list__table-row__el">
                                {index + 1}
                            </td>
                            <td className="item-list__table-row__el">{el}</td>
                            <td className="item-list__table-row__el">
                                {monthCount[index]}
                            </td>
                            <td className="item-list__table-row__el">
                                {monthWriteOffCount[index]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthStats;

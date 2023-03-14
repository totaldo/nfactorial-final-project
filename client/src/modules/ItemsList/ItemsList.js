import "./ItemList.css";

import { useState } from "react";

import AddDateModal from "./comp/AddDateModal";
import ItemTable from "./comp/ItemTable";
import MonthStats from "./comp/MonthStats";
import MonthStatsHorizontal from "./comp/MonthStatsHorizontal";

import { Button } from "../../components";

const ItemsList = ({ contract, setContracts, dateDeleted, setDateDeleted }) => {
    const { name } = contract;

    const [showModal, setShowModal] = useState(false);
    const [showMonthStats, setShowMonthStats] = useState(false);
    const [dateChanged, setDateChanged] = useState(false);

    return (
        <div className="item-list">
            <div className="item-list__el">
                <h3 className="item-list__header">{name}</h3>

                <Button
                    text="Даты"
                    styleType="outline"
                    style={{ marginLeft: "1rem", width: "20%" }}
                    action={() => setShowMonthStats("default")}
                />
                <Button
                    text="Данные по месяцам"
                    styleType="outline"
                    style={{ marginLeft: "1rem", width: "20%" }}
                    action={() => setShowMonthStats("vertical")}
                />
                <Button
                    text="Данные по месяцам горизонталь"
                    styleType="outline"
                    style={{ marginLeft: "1rem" }}
                    action={() => setShowMonthStats("horizontal")}
                />
            </div>

            {showMonthStats === "vertical" ? (
                <MonthStats contract={contract} dateChanged={dateChanged} />
            ) : (
                <ItemTable
                    dateChanged={dateChanged}
                    setDateChanged={setDateChanged}
                    contract={contract}
                    dateDeleted={dateDeleted}
                    setDateDeleted={setDateDeleted}
                    showMonthStats={showMonthStats}
                />
            )}
        </div>
    );
};

export default ItemsList;

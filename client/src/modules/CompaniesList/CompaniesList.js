import { useState, useEffect } from "react";

import CompaniesListHeader from "./comp/CompaniesListHeader";
import CompaniesListContainer from "./comp/CompaniesListContainer";
import { Button } from "../../components";

import "./styles/manager.css";
import "./styles/manager-students.css";
import "./styles/manager-modal.css";
import "./styles/manager-footer.css";
import "./styles/CompaniesListHeader.css";

// const tempCompanies = [
//     {
//         name: "ЦКБ",
//         address: "г.Алматы, КЕРЕЙ, ЖАНИБЕК ХАНДАР, 470",
//         contracts: [
//             {
//                 name: "Ecoproduct",
//                 dates: [],
//                 items: [
//                     {
//                         item_name: "товар1",
//                         unit: "кг",
//                         price: 1000,
//                         amount_init: 10,
//                     },
//                     {
//                         item_name: "товар2",
//                         unit: "кг",
//                         price: 1000,
//                         amount_init: 10,
//                     },
//                     {
//                         item_name: "товар3",
//                         unit: "кг",
//                         price: 1000,
//                         amount_init: 10,
//                     },
//                 ],
//             },
//         ],
//     },
// ];

const CompaniesList = () => {
    const [companies, setCompanies] = useState([]);
    const [filter, setFilter] = useState(null);
    const [filterContracts, setFilterContracts] = useState("Электронный");

    useEffect(() => {
        const comps = JSON.parse(localStorage.getItem("companies"));
        if (comps) {
            setCompanies(comps);
        } else {
            localStorage.setItem("companies", JSON.stringify([]));
            setCompanies([]);
        }
    }, []);

    return (
        <div className="manager">
            <div className="container">
                <h2 className="manager-head">Список организаций</h2>
                <div className="contracts-page__main__el">
                    <Button
                        text="Электронные договора"
                        styleType="outline"
                        action={() => setFilterContracts("Электронный")}
                        style={{ width: "30%", marginRight: "2rem" }}
                    />

                    <Button
                        text="Бумажные договора"
                        styleType="outline"
                        action={() => setFilterContracts("Бумажный")}
                        style={{ width: "30%" }}
                    />
                </div>

                <div className="manager-main">
                    <CompaniesListHeader
                        companies={companies}
                        setFilter={setFilter}
                    />
                    <CompaniesListContainer
                        filter={filter}
                        filterContracts={filterContracts}
                        companies={companies}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompaniesList;

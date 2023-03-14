import { useState, useEffect } from "react";

import CompaniesListHeader from "./comp/CompaniesListHeader";
import CompaniesListContainer from "./comp/CompaniesListContainer";
import { Button } from "../../components";

import "./styles/manager.css";
import "./styles/manager-students.css";
import "./styles/manager-modal.css";
import "./styles/manager-footer.css";
import "./styles/CompaniesListHeader.css";

const GroupsList = () => {
    const [companies, setCompanies] = useState([]);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        const comps = JSON.parse(localStorage.getItem("groups"));
        if (comps) {
            setCompanies(comps);
        } else {
            localStorage.setItem("groups", JSON.stringify([]));
            setCompanies([]);
        }
    }, []);

    return (
        <div className="manager">
            <div className="container">
                <h2 className="manager-head">Список групп</h2>

                <div className="manager-main">
                    <CompaniesListHeader
                        companies={companies}
                        setFilter={setFilter}
                    />
                    <CompaniesListContainer
                        filter={filter}
                        companies={companies}
                    />
                </div>
            </div>
        </div>
    );
};

export default GroupsList;

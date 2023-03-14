import { useState } from "react";

import { Button, Search } from "../../../components";

import CompaniesListModal from "./CompaniesListModal";
import ExportAllModal from "./ExportAllModal";

const CompaniesListHeader = ({ setFilter, companies }) => {
    const [showModal, setShowModal] = useState(null);
    const [showExportModal, setShowExportModal] = useState(null);

    return (
        <div className="companies-list-header">
            {showModal && <CompaniesListModal setShowModal={setShowModal} />}
            {showExportModal && (
                <ExportAllModal setShowModal={setShowExportModal} />
            )}

            <div className="companies-list-header-container companies-list-header-upper">
                <h2 className="companies-list-header-text">Группы</h2>

                <div className="companies-list-header-el">
                    <form className="companies-list-header-form">
                        <Search
                            setFilter={setFilter}
                            placeholder="Найти группу"
                            style={{ marginRight: "2.3rem" }}
                        />
                    </form>
                    <Button
                        text="Экспорт"
                        style={{ width: "30%", marginRight: "1rem" }}
                        action={() => setShowExportModal(true)}
                    />
                    <Button
                        text="Добавить группу"
                        style={{ width: "100%" }}
                        action={() => setShowModal(true)}
                    />
                </div>
            </div>

            <div className="companies-list-header-container companies-list-header-list">
                <div className="companies-list-header-list__left">
                    <div className="companies-list-header-list-el companies-list-header-list__number">
                        Номер
                    </div>
                    <div className="companies-list-header-list-el companies-list-header-list-student">
                        Группа
                    </div>
                </div>

                <div className="companies-list-header-list-el">Действие</div>
            </div>
        </div>
    );
};

export default CompaniesListHeader;

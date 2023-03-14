import "./ContactsPage.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ContractsModal from "./comp/ContractsModal";
import ExportModal from "./comp/ExportModal";
import AddDateModal from "../../modules/ItemsList/comp/AddDateModal";

import { ItemsList } from "../../modules";
import { Button } from "../../components";

const ContractsPage = () => {
    const { companyid } = useParams();

    const [mockData, setMockData] = useState(null);

    const [contracts, setContracts] = useState(null);
    const [showModal, setShowModal] = useState(null);
    const [showExportModal, setShowExportModal] = useState(null);
    const [showAddDateModal, setShowAddDateModal] = useState(null);

    const [dateDeleted, setDateDeleted] = useState(false);

    const getCompanies = () => {
        setContracts(
            JSON.parse(localStorage.getItem("companies")).find(
                (company) => company.name === companyid
            ).contracts
        );
    };

    useEffect(() => {
        getCompanies();
    }, [dateDeleted]);

    if (!contracts) return <>Loading...</>;

    return (
        <div className="contracts-page">
            {showModal && <ContractsModal setShowModal={setShowModal} />}
            {showExportModal && (
                <ExportModal
                    setShowModal={setShowExportModal}
                    contracts={contracts}
                />
            )}
            {showAddDateModal && (
                <AddDateModal
                    setShowModal={setShowAddDateModal}
                    setContracts={setContracts}
                />
            )}

            <div className="contracts-page__main container">
                <h2 className="contracts-page__header">
                    Организация: {companyid}
                </h2>
                <img
                    src="/svgs/circle-plus.svg"
                    alt="circle-plus"
                    className="item-list__add-date"
                    onClick={() => setShowAddDateModal(true)}
                />
                <div className="contracts-page__main__el">
                    {/* <Button
                        text="Экспорт"
                        styleType="outline"
                        action={() => setShowExportModal(true)}
                        style={{ width: "100%", marginRight: "1rem" }}
                    /> */}

                    <Button
                        text="Создать"
                        styleType="outline"
                        action={() => setShowModal(true)}
                        style={{ width: "100%" }}
                    />
                </div>
            </div>

            <div className="contracts-page__items-list container">
                {contracts.map((contract) => (
                    <ItemsList
                        contract={contract}
                        setContracts={setContracts}
                        dateDeleted={dateDeleted}
                        setDateDeleted={setDateDeleted}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContractsPage;

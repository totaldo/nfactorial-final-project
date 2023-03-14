import { useState } from "react";
import { Link } from "react-router-dom";

import CompaniesEditModal from "./CompanyEditModal";
import CompaniesEditGroupModal from "./CompanyEditGroup";

import { Button } from "../../../components";

const Company = ({ company, number }) => {
    const { name } = company;
    const [showModal, setShowModal] = useState(false);
    const [showEditGroupModal, setShowEditGroupModal] = useState(false);

    const comps = JSON.parse(localStorage.getItem("companies"));

    const handleUp = () => {
        if (number > 0) {
            const temp = comps[number];
            comps[number] = comps[number - 1];
            comps[number - 1] = temp;

            localStorage.setItem("companies", JSON.stringify(comps));
            window.location.reload();
        }
    };

    const handleDown = () => {
        if (number < comps.length - 1) {
            const temp = comps[number];
            comps[number] = comps[number + 1];
            comps[number + 1] = temp;

            localStorage.setItem("companies", JSON.stringify(comps));
            window.location.reload();
        }
    };

    const handleDelete = () => {
        localStorage.setItem(
            "companies",
            JSON.stringify(comps.filter((comp) => comp.name !== name))
        );
        window.location.reload();
    };

    return (
        <div className="manager-student">
            {showModal && (
                <CompaniesEditModal
                    setShowModal={setShowModal}
                    company={company}
                />
            )}
            {showEditGroupModal && (
                <CompaniesEditGroupModal
                    setShowModal={setShowEditGroupModal}
                    company={company}
                />
            )}

            <div className="manager-student-number">{number + 1}</div>
            <div className="manager-student-name">{name}</div>
            <div className="manager-student-buttons">
                <img
                    src="svgs/chevron-up.svg"
                    alt="up"
                    className="manager-student-button__up"
                    onClick={handleUp}
                />
                <img
                    src="svgs/chevron-down.svg"
                    alt="down"
                    className="manager-student-button__down"
                    onClick={handleDown}
                />

                <Button
                    text="Удалить"
                    style={{ marginRight: "1rem", width: "20%" }}
                    action={handleDelete}
                />
                <Button
                    text="Редактировать"
                    style={{ marginRight: "1rem", width: "30%" }}
                    action={() => setShowModal(true)}
                />
                <Button
                    text="Перенести"
                    style={{ marginRight: "1rem", width: "30%" }}
                    action={() => setShowEditGroupModal(true)}
                />

                <Link
                    to={`${company.name}/contracts`}
                    state={{ company: company }}
                >
                    <Button text="Перейти" style={{ width: "100%" }} />
                </Link>
                {/* <Button text="Информация" /> */}
            </div>
        </div>
    );
};

export default Company;

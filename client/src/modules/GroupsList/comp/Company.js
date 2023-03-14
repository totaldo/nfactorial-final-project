import { useState } from "react";
import { Link } from "react-router-dom";

import CompaniesEditModal from "./CompanyEditModal";
import { Button } from "../../../components";

const Company = ({ company, number }) => {
    const { name } = company;
    const [showModal, setShowModal] = useState(false);

    const comps = JSON.parse(localStorage.getItem("groups"));

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
            "groups",
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

            <div className="manager-student-number">{number + 1}</div>
            <div className="manager-student-name">{name}</div>
            <div className="manager-student-buttons">
                <Button
                    text="Удалить"
                    style={{ marginRight: "1rem", width: "40%" }}
                    action={handleDelete}
                />
                <Button
                    text="Редактировать"
                    style={{ marginRight: "1rem", width: "40%" }}
                    action={() => setShowModal(true)}
                />

                <Link to={company.name} state={{ company: company }}>
                    <Button text="Перейти" style={{ width: "100%" }} />
                </Link>
            </div>
        </div>
    );
};

export default Company;

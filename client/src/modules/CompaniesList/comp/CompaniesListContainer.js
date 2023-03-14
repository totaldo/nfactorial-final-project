import { useParams } from "react-router-dom";
import Company from "./Company";

const CompaniesListContainer = ({ filter, companies, filterContracts }) => {
    const { groupsid } = useParams();
    return (
        <div className="manager-students">
            {[...companies]
                .sort()
                .filter((el) => {
                    if (!filter) return el;
                    return el.name.toLowerCase().includes(filter.toLowerCase());
                })
                .filter((contract) => contract.type === filterContracts)
                .filter((contract) => contract.groupsid === groupsid)
                .map((company, index) => (
                    <Company company={company} number={index} />
                ))}
        </div>
    );
};

export default CompaniesListContainer;

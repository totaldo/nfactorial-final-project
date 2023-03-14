import Company from "./Company";

const CompaniesListContainer = ({ filter, companies, filterContracts }) => {
    return (
        <div className="manager-students">
            {[...companies]
                .sort()
                .filter((el) => {
                    if (!filter) return el;
                    return el.name.toLowerCase().includes(filter.toLowerCase());
                })
                .map((company, index) => (
                    <Company company={company} number={index} />
                ))}
        </div>
    );
};

export default CompaniesListContainer;

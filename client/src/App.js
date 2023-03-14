import { useState, useEffect } from "react";

import { MapPage, SignPage, CompaniesPage, GroupsPage } from "./pages";

function App() {
    const [isSigned, setIsSigned] = useState(
        sessionStorage.getItem("logged")
            ? sessionStorage.getItem("logged")
            : false
    );

    // login: eatmeat
    // password: eatmeat123 

    useEffect(() => {
        setIsSigned(sessionStorage.getItem("logged"));
    }, [sessionStorage.getItem("logged")]);

    if (isSigned === "false" || !isSigned)
        return <SignPage setIsSigned={setIsSigned} />;

    return (
        <div className="App">
            <GroupsPage />
        </div>
    );
}

export default App;

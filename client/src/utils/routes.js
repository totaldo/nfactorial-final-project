import App from "../App";
import { ContractsPage, CompaniesPage } from "../pages";

import { MainLayout } from "../layouts";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout>
                <App />
            </MainLayout>
        ),
    },
    {
        path: "/:groupsid",
        element: (
            <MainLayout>
                <CompaniesPage />
            </MainLayout>
        ),
    },
    {
        path: "/:groupsid/:companyid/contracts",
        element: (
            <MainLayout>
                <ContractsPage />
            </MainLayout>
        ),
    },
]);

export default router;

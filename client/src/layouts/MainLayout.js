import { Header } from "../modules";

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            {/* <div className="map__footer"></div> */}
        </>
    );
};

export default MainLayout;

import { useState } from "react";
import { read, utils } from "xlsx";
import {
    Autocomplete,
    useJsApiLoader,
    GoogleMap,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";

import { Modal, Input, Button, InputFile, Select } from "../../../components";

import inputs from "./inputs";

const convertHeaders = (json) => {
    return json.map((el) => ({
        amount: el["Количество"],
        item_name: el["Товары"],
        price: el["Цена"],
    }));
};

// const config = {
//     googleMapsApiKey: "AIzaSyBgTcFoIhWsin6cdfqBwQS7TNbmC1iTPRM",
//     libraries: ["places"],
// };

const CompaniesListModal = ({ setShowModal }) => {
    const { groupsid } = useParams();
    const [items, setItems] = useState(null);
    const [searchResult, setSearchResult] = useState("Result: none");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [placeRef, setPlaceRef] = useState();
    const google = window.google;

    const readUploadFile = (e) => {
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);
                setItems(convertHeaders(json));
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    const handleForm = async (e) => {
        e.preventDefault();

        // if (!items) return;

        const companyObj = {
            name: e.target.name.value,
            address: placeRef.current.value,
            lat: lat,
            lng: lng,
            type: e.target.select.value,
            // items: items,
            groupsid: groupsid,
            contracts: [],
        };

        console.log(companyObj);

        const comps = JSON.parse(localStorage.getItem("companies"));

        if (comps) {
            comps.push(companyObj);
            localStorage.setItem("companies", JSON.stringify(comps));
        } else {
            localStorage.setItem("companies", JSON.stringify([companyObj]));
        }

        setShowModal(false);

        window.location.reload();

        // const studentObj = {
        //     email: e.target.email.value,
        //     IIN: e.target.IIN.value,
        //     activity: "manager",
        //     name: e.target.name.value,
        //     surname: e.target.surname.value,
        // };

        // const result = await axios.post(
        //     "http://localhost:5000/admin/manager",
        //     studentObj,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${getCookie("token")}`,
        //         },
        //     }
        // );

        // if (result.status === 201) {
        //     setShowModal(false);
        // }
    };

    const handleChange = () => {
        if (searchResult != null) {
            const place = searchResult.getPlace();

            setLat(place.geometry.location.lat());
            setLng(place.geometry.location.lng());
        }
    };

    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
    }

    return (
        <Modal
            style={{ width: "30%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="manager-modal__header">Добавить организацию</div>
            <div className="manager-modal__description">
                Добавьте новую организацию
            </div>

            <form className="manager-modal__form_main" onSubmit={handleForm}>
                {/* <div className="manager-modal__form"> */}
                {inputs.map((el) => (
                    <Input
                        label={el.label}
                        type={el.type}
                        name={el.name}
                        style={{ marginBottom: "2rem" }}
                    />
                ))}

                <Autocomplete onPlaceChanged={handleChange} onLoad={onLoad}>
                    <Input
                        placeholder="Адрес доставки"
                        style={{ marginBottom: "10px" }}
                        setRef={setPlaceRef}
                    />
                </Autocomplete>

                <Select
                    name="select"
                    options={[
                        { value: "Электронный", text: "Электронный" },
                        { value: "Бумажный", text: "Бумажный" },
                    ]}
                    style={{ marginBottom: "2rem" }}
                />

                {/* <InputFile
                    onChange={readUploadFile}
                    style={{ marginBottom: "2rem" }}
                /> */}

                {/* </div> */}
                <Button
                    text="Добавить"
                    style={{ width: "100%" }}
                    type="submit"
                />
            </form>
        </Modal>
    );
};

export default CompaniesListModal;

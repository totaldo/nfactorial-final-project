import React from "react";
import CsvDownloadButton from "react-json-to-csv";
import { useEffect, useState } from "react";

import "./ShowTrucks.css";

const ShowTrucks = ({
    numberOfTrucks,
    activeTruck,
    setActiveTruck,
    paths,
    addresses,
}) => {
    const [mockData, setMockData] = useState(null);

    const generateData = () => {
        if (!paths || !addresses) return;
        const result = [];

        for (let i = 0; i < paths.length; i++) {
            result.push({ id: `Машина №${i + 1}`, second: "" });
            for (let addr of paths[i]) {
                const address = addresses[addr];
                result.push({
                    id: `Адрес: ${address.address}`,
                    second: `Заказчик: ${address.client}`,
                });

                for (let item of address.items) {
                    result.push({
                        id: `Товар: ${item.item_name}`,
                        second: `Вес: ${item.item_weight}`,
                    });
                }
                result.push([]);
            }
            result.push([]);
        }

        setMockData(result);
    };

    useEffect(() => {
        generateData();
    }, [paths, addresses]);

    return (
        <div
            className="show-trucks"
            style={
                numberOfTrucks > 10
                    ? {
                          gridTemplateColumns: `repeat(${Math.floor(
                              numberOfTrucks / 10
                          )}, 1fr)`,
                      }
                    : {}
            }
        >
            <CsvDownloadButton
                className="button"
                style={{ width: "200px" }}
                data={mockData}
                headers={null}
            >
                Скачать данные
            </CsvDownloadButton>
            {new Array(+numberOfTrucks).fill(0).map((truck, index) => (
                <div
                    className={`show-trucks__item ${
                        index === activeTruck
                            ? "show-trucks__item_active"
                            : "show-trucks__item_not-active"
                    }`}
                    onMouseDown={() => setActiveTruck(index)}
                >
                    <img src="svgs/truck.svg" alt="truck" />
                    Авто {index + 1}
                </div>
            ))}
        </div>
    );
};

export default ShowTrucks;

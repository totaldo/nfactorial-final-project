import { Button } from "../../components";

import DeliveryAddressesItem from "./comp/DeliveryAddressesItem";

import "./DeliveryAddresses.css";

const DeliveryAddresses = ({
    addresses,
    setAddresses,
    setAddressesAdded,
    showTrucks,
}) => {
    const handleCancel = () => {
        setAddresses([]);
    };

    const handleDone = async () => {
        setAddressesAdded(true);
    };

    return (
        <div className="delivery-addresses">
            <div className="delivery-addresses__header">Адреса доставки</div>

            <div className="delivery-addresses__items">
                {addresses.map((address) => (
                    <DeliveryAddressesItem
                        address={address}
                        setAddresses={setAddresses}
                    />
                ))}
            </div>
            {showTrucks && (
                <div className="search-address__form__el search-address__form__el_jc-spbt">
                    <Button
                        text="Отмена"
                        styleType="outline"
                        style={{ width: "40%" }}
                        action={handleCancel}
                    />
                    <Button
                        text="Готово"
                        style={{ width: "40%" }}
                        action={handleDone}
                    />
                </div>
            )}
        </div>
    );
};

export default DeliveryAddresses;

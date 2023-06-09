import { useState, useEffect } from "react";

import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    DirectionsRenderer,
} from "@react-google-maps/api";

import {
    SearchAddress,
    DeliveryAddresses,
    TruckNumber,
    ShowTrucks,
    DeliveryAddressesItem,
    Header,
} from "../../modules";

import "./MapPage.css";
import "./loader.css";

const center = { lat: 43.258227, lng: 76.8890358 };

const config = {
    googleMapsApiKey: "AIzaSyBgTcFoIhWsin6cdfqBwQS7TNbmC1iTPRM",
    libraries: ["places"],
};

const MapPage = () => {
    const { isLoaded } = useJsApiLoader(config);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));

    const [addresses, setAddresses] = useState([]);
    const [directionsResponse, setDirectionsResponse] = useState([]);
    const [activeTruck, setActiveTruck] = useState(0);
    const [paths, setPaths] = useState(null);

    const getNav = () => {
        const google = window.google;
        var directionsService = new google.maps.DirectionsService();
        let origin = "улица Федосеева 50a, Алматы, Kazakhstan";

        for (let i = 0; i < paths.length; i++) {
            if (paths[i].length == 0) continue;
            let waypts = [];
            for (let j = 0; j < paths[i].length - 1; j++) {
                waypts.push({
                    location: addresses[paths[i][j]].address,
                    stopover: true,
                });
            }

            var request = {
                origin: origin,
                //destination: origin,
                destination: addresses[paths[i][paths[i].length - 1]].address,
                waypoints: waypts,
                travelMode: "DRIVING",
                optimizeWaypoints: true,
            };
            directionsService.route(request, (result, status) => {
                setDirectionsResponse((prev) => [...prev, result]);
            });
        }
    };

    useEffect(() => {
        if (isLoaded && paths) {
            getNav();
        }
    }, [paths]);

    if (!isLoaded || !paths) {
        return (
            <div className="loader-container">
                <span class="loader"></span>
            </div>
        );
    }

    const matchDirections = () => {
        if (!paths || !addresses) return;

        const currentPaths = paths[activeTruck].map((path) => addresses[path]);

        const directions = directionsResponse.findIndex((direction) => {
            const finalDestination = direction.request.destination.query;

            return (
                finalDestination ===
                currentPaths.find((addr) => addr.address === finalDestination)
                    ?.address
            );
        });

        return directionsResponse[directions];
    };

    const direction = matchDirections();

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <GoogleMap
                center={center}
                zoom={11}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
            >
                <Header />
                <>
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer
                            directions={direction}
                            //draggable={true}
                        />
                    )}
                    {/* <div className="map__container-left">
                        <DeliveryAddresses
                            addresses={paths[activeTruck].map(
                                (path) => addresses[path]
                            )}
                            setAddresses={setAddresses}
                            setAddressesAdded={setAddressesAdded}
                            showTrucks={false}
                        />
                    </div> */}
                    {/* <div className="map__container-right">
                        <ShowTrucks
                            numberOfTrucks={numberOfTrucks}
                            activeTruck={activeTruck}
                            setActiveTruck={setActiveTruck}
                            paths={paths}
                            addresses={addresses}
                        /> */}
                    {/* </div> */}
                </>

                <div className="map__footer"></div>
            </GoogleMap>
        </div>
    );
};

export default MapPage;

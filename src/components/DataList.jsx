import React, { useEffect, useState } from "react";
import "./Driver/DriversData";
import DriversData from "./Driver/DriversData";
import useFetch from "./hook/useFetch";
import VehiclesList from "./Vehicle/VehiclesList";
import OrderedItem from "./OrdersList/OrderedItem";

const DataList = () => {

  const [driverData, setDriverData] = useState([]);
  const [vehicleData, setvehicleData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [driver, setDriver] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [totals,setTotals] = useState(0);

  const { sendRequest } = useFetch();

  useEffect(() => {
    const DataTask = (data) => {
      setDriverData(data);
    };
    sendRequest(
      {
        url: `http://trainingsite.zerone-consulting.net/api.publish/api/Driver`,
      },
      DataTask
    );
  }, [driver]);

  useEffect(() => {
    const DataTask = (data) => {
      setvehicleData(data);
    };
    sendRequest(
      {
        url: `http://trainingsite.zerone-consulting.net/api.publish/api/Vehicle`,
      },
      DataTask
    );
  }, [vehicle,sendRequest])

  useEffect(() => {
    const DataTask = (data) => {
      setOrdersData(data);
    };
    sendRequest(
      {
        url: `http://trainingsite.zerone-consulting.net/api.publish/api/TravelOrder`,
      },
      DataTask
    );
  }, []);

  const addDriver = (driver) => {
    setDriver(driver);
  };
  const addVehicle = (vehicle) => {
    setVehicle(vehicle);
  };

  return (
    <div className="DataList">
      <div className="DataList-driver">
        {driverData?.map((list) => {
          return (
            <>
              <DriversData key={list.id} list={list} />
            </>
          );
        })}
      </div>
      <div className="OrdersList">
        <OrderedItem
          sendRequest={sendRequest}
          addVehicle={addVehicle}
          addDriver={addDriver}
          ordersData={ordersData}
          driverData={driverData}
          vehicleData={vehicleData}
          setTotals={setTotals}
          totals={totals}
        />
      </div>
      <div className="total-amount">
          <p>Total Amount : {totals}Rs/-</p>
      </div>
      <div className="DataList-vehicle">
        {vehicleData.map((list) => {
          return (
            <>
              <VehiclesList key={list.id} list={list} />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DataList;

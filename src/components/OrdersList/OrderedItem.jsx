import React, { useState } from "react";
import "../Driver/DriversData.scss";
import OrdersDetails from "./OrdersDetails";

const OrderedItem = ({
  ordersData,
  driverData,
  vehicleData,
  totals,
  addDriver,
  addVehicle,
  setTotals,
}) => {

  const addDrivers = (driver) => {
    addDriver(driver)
  }
  const addVehicles = (vehicle) => {
    addVehicle(vehicle)
  }
  
  return (
    <>
      <div className="Orders">
        {ordersData.map((list) => (
          <OrdersDetails
            driverData={driverData}
            vehicleData={vehicleData}
            addDrivers={addDrivers}
            addVehicles={addVehicles}
            setTotals={setTotals}
            totals={totals}
            list={list}
          />
        ))}
      </div>
    </>
  );
};

export default OrderedItem;


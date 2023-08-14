import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";

const OrdersDetails = ({
  list,
  driverData,
  vehicleData,
  addDrivers,
  addVehicles,
  setTotals,
}) => {

  const [driverListDataLocal, setDriverListDataLocal] = useState([]);
  console.log(driverListDataLocal,"driverLocalData");
  const [latestVehicle,setLatestVehicle] = useState([])
  const [vehicleListDataLocal, setVehicleListDataLocal] = useState([]);
  const [driverAdded, setDriverAdded] = useState(false);
  const [vehicleAdd,setVehicleAdd] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0);
  const [driverCost,setDriverCost] = useState(0);
  const [vehicleCost,setVehicleCost] = useState(0);

  useEffect(() => {
    let totalDriverCost = 0;
    driverListDataLocal.forEach((driver) => {
      if (list.timeNeeded < 8) {
        const totalHours = 8 / list.timeNeeded;
        totalDriverCost += driver.perDayRate / totalHours;
      } else {
        const extraHours = list.timeNeeded - 8;
        totalDriverCost += driver.perDayRate + driver.overtimeRate * extraHours;
      }
    });
    setTotalPrice(vehicleCost + totalDriverCost);
    setDriverCost(totalDriverCost)
  }, [driverListDataLocal,list.timeNeeded]);

  useEffect(() => {
    let totalVehicleCost = 0;
    latestVehicle.forEach((vehicle) => {
      totalVehicleCost += vehicle.perKMCost * list.approxDistance;
    });
    setVehicleCost(totalVehicleCost)
    setTotalPrice(driverCost + totalVehicleCost)
    setTotals((prev) => {
      return prev + (driverCost + totalVehicleCost)
    })
  }, [latestVehicle, list.approxDistance]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "driver",
    drop: (item) => {
      if(!driverAdded){
      addDriverToList(item.id)
    }
  },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addDriverToList = (id) => {
    const updatedDriverData = driverData.filter((listItem) => {
        return listItem.id === id
    })
    setDriverListDataLocal(updatedDriverData)
    addDrivers(driverListDataLocal);
    setDriverAdded(true);
  }

  const [{ isOvered }, dropp] = useDrop(() => ({
    accept: "vehicle",
    drop: (items) => {
      if (!vehicleAdd) {
      addVehicleToList(items.id);
    } else {
      alert("You can only have one vehicle at a time.");
    }
  },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addVehicleToList = (id) => {
    const updatedVehicle = vehicleData.filter((vehicle) => {
      return vehicle.id === id
    })
    setVehicleListDataLocal(updatedVehicle)
    addVehicles(vehicleListDataLocal)
    setVehicleAdd(true)
  }

  const handleDeleteVehicle = (id) => {
    const deletedItem = latestVehicle.filter((data) => {
      return data.id !== id
    })
    setLatestVehicle(deletedItem)
    setDriverListDataLocal([])
    setTotalPrice(0)
    setDriverCost(0)
    setVehicleCost(0)
    setDriverAdded(false)
    setTotals((prev) => {
      return prev - totalPrice  
    })
  }

  useEffect(() => {
    const driverData = driverListDataLocal.some((driver) => driver.posessHeavyVehicleLicence === true)
    const driverDataTwo = driverListDataLocal.some((driver) => driver.posessHeavyVehicleLicence === false)
    const vehicleIsHeavy = vehicleListDataLocal.some((vehicle) => vehicle.vehicleType === "H")
    const vehicleIsNotHeavy = vehicleListDataLocal.some((vehicle) => vehicle.vehicleType === "L")
    if(driverData && vehicleIsHeavy){
      const updatedVehicleData = vehicleListDataLocal.filter((listData) => {
        return listData.vehicleType === "H"
      })
      setLatestVehicle(updatedVehicleData)
    }
    else if(driverData && vehicleIsNotHeavy){
      const updatedVehicleData = vehicleListDataLocal.filter((listData) => {
        return listData.vehicleType === "L"
      })
      setLatestVehicle(updatedVehicleData)
    }
    else if(driverDataTwo && vehicleIsHeavy){
      alert("Heavy vehicles not allowed for LMV Licensed driver")
      setVehicleAdd(false)
      return
    }
    else if(vehicleIsHeavy){
      alert("Please select driver first")
    }
    else if(driverDataTwo && vehicleIsNotHeavy){
      const updatedVehicleData = vehicleListDataLocal.filter((listData) => {
        return listData.vehicleType === "L"
      })
      setLatestVehicle(updatedVehicleData)
    }
    else if(vehicleIsNotHeavy){
      alert("Please select driver first")
    }
  },[vehicleListDataLocal])

  return (
    <div className="OrdersList-items">
      <div className="content">
        <h3>
          from {list.fromLocation} to {list.toLocation}
        </h3>
        <p>Time : {list.timeNeeded}</p>
        <p className="p">Distance : {list.approxDistance}</p>
      </div>
      <div className="list" ref={!driverAdded ? drop : null}>
        {driverListDataLocal.map((list) => (
          <>
            <h3>Name : {list.name}</h3>
            <p>Ph No : {list.mobileNumber}</p>
            <p>Overtime Rate : {list.overtimeRate}Rs/-</p>
            <p>Per day Rate : {list.perDayRate}Rs/-</p>
            <p className='p-driver'>License : {list.posessHeavyVehicleLicence === false ? "LMV" : "HMV"}</p>
          </>
        ))}
      </div>
      <div className="list-vehicle" ref={!vehicleAdd ? dropp : null}>
        {latestVehicle.map((listItem) => (
          <>
            <h3>Name : {listItem.name}</h3>
            <p>Model : {listItem.makeModel}</p>
            <p>Coast : {listItem.perKMCost}Rs/-</p>
            <p>Reg No : {listItem.registrationNumber}</p>
            <p>Type : {listItem.vehicleType}</p>
            <button className="delete" onClick={() => handleDeleteVehicle(listItem.id)}>Remove</button>
          </>
        ))}
      </div>
      <p className="Total">Total : {totalPrice.toFixed(2)}Rs/-</p>
    </div>
  );
};

export default OrdersDetails;


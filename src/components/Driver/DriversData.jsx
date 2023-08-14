import React from 'react'
import "./DriversData.scss";
import { useDrag } from 'react-dnd';

const DriversData = ({list}) => {

  const [{isDragging},drag] = useDrag(() => ({
    type : "driver",
    item : { id : list.id },
    collect : (monitor) => ({
      isDragging : !!monitor.isDragging()
    }),
  }))

  return (
    <div className='drivers-list' ref={drag}  key={list.id} style={{border : isDragging ? "1px solid red" : ""}}>
        <div className="drivers-list-data" >
            <h3>Name : {list.name}</h3>
            <p>Ph No : {list.mobileNumber}</p>
            <p>Overtime Rate : {list.overtimeRate}</p>
            <p>Per day Rate : {list.perDayRate}</p>
            <p className='p-driver'>License : {list.posessHeavyVehicleLicence === false ? "LMV" : "HMV"}</p>
        </div>
    </div>
  )
}

export default DriversData
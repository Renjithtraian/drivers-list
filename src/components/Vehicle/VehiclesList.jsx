import React from 'react'
import { useDrag } from 'react-dnd'

const VehiclesList = ({list}) => {

  const [{isDragging},drag] = useDrag(() => ({
    type : "vehicle",
    item : { id : list.id },
      collect : (monitor) => ({
      isDragging : !!monitor.isDragging()
    })
  }))

  return (
    <div className='vehicle-list' ref={drag}  key={list.id} style={{border : isDragging ? "1px solid red" : ""}}>
      <div className="vehicle-list-data">
        <h3>Name : {list.name}</h3>
        <p>Model : {list.makeModel}</p>
        <p>Coast : {list.perKMCost}</p>
        <p>Reg No : {list.registrationNumber}</p>
        <p>Type : {list.vehicleType}</p>
      </div>
    </div>
  )
}

export default VehiclesList
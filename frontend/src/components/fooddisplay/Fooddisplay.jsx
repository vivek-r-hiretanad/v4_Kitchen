import React, { useContext } from 'react'
import './Fooddisplay.css'
import { Storecontext } from '../../context/Storecontext'
import Fooditem from '../fooditem/Fooditem'


const Fooddisplay = ({category}) => {

    const {food_list}=useContext(Storecontext)

  return (
    <div className='fooddisplay' id='fooddispaly'>
        <h2>Top dishes near you</h2>
        <div className="fooddisplaylist">
            {food_list.map((item,index)=>{
              if(category==="All" || category===item.category){
                return  <Fooditem 
                key={index} 
                id={item._id}
                name={item.name} 
                price={item.price} 
                image={item.image} 
                description={item.description}
            />
              }
                
                

            })}
        </div>
      
    </div>
  )
}

export default Fooddisplay

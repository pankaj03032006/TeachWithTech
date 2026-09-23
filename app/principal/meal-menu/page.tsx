"use client";

import { useState } from "react";

export default function MealMenu(){

  const [menu,setMenu] = useState({
    Monday:"",
    Tuesday:"",
    Wednesday:"",
    Thursday:"",
    Friday:"",
    Saturday:""
  });

  function handleChange(day:string,value:string){

    setMenu({
      ...menu,
      [day]:value
    });

  }

  async function updateMenu(){

    const weeklyMenu = Object.entries(menu).map(
      ([day,food])=>({
        day,
        menu:food
      })
    );

    await fetch("/api/principal/update-meal-menu",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        menu:weeklyMenu
      })
    });

    alert("Weekly menu updated successfully");

  }

  return(

    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-yellow-100">
        Weekly Mid-Day Meal Menu
      </h1>

      <div className="bg-white p-6 rounded shadow">

        <table className="w-full border">

          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Day</th>
              <th className="border p-2">Meal Menu</th>
            </tr>
          </thead>

          <tbody>

            {Object.keys(menu).map(day=>(

              <tr key={day}>

                <td className="border p-2 font-semibold">
                  {day}
                </td>

                <td className="border p-2">

                  <input
                    className="border p-2 w-full rounded"
                    placeholder="Enter meal"
                    value={(menu as any)[day]}
                    onChange={(e)=>
                      handleChange(day,e.target.value)
                    }
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="mt-4 text-center">

          <button
            onClick={updateMenu}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Update Weekly Menu
          </button>

        </div>

      </div>

    </div>

  )

}
"use client";

import { useEffect,useState } from "react";

export default function MealMenu(){

  const [menu,setMenu] = useState<any[]>([]);

  useEffect(()=>{
    loadMenu();
  },[]);

  async function loadMenu(){

    const res = await fetch("/api/meal-menu");
    const data = await res.json();

    setMenu(data.menu);

  }

  return(

    <div className="bg-yellow-50 p-6 rounded shadow">

      <h1 className="text-xl font-bold mb-4">
        Weekly Mid-Day Meal Menu
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-300">
          <tr>
            <th className="border p-2">Day</th>
            <th className="border p-2">Meal</th>
          </tr>
        </thead>

        <tbody>

          {menu.map((m:any)=>(

            <tr key={m._id}>
              <td className="border p-2">{m.day}</td>
              <td className="border p-2">{m.menu}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}
import { connectDB } from "@/lib/db";
import MealMenu from "@/models/MealMenu";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const today = new Date().toLocaleString("en-US",{
    weekday:"long"
  });

  const meal = await MealMenu.findOne({
    day: today
  });

  return NextResponse.json({
    meal
  });

}
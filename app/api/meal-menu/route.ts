import { connectDB } from "@/lib/db";
import MealMenu from "@/models/MealMenu";
import { NextResponse } from "next/server";

export async function GET(){

  await connectDB();

  const menu = await MealMenu.find().sort({day:1});

  return NextResponse.json({menu});

}
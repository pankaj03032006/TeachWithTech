import { connectDB } from "@/lib/db";
import MealMenu from "@/models/MealMenu";
import { NextResponse } from "next/server";

export async function POST(req:Request){

  await connectDB();

  const body = await req.json();

  if(!body.menu){
    return NextResponse.json(
      {error:"Menu required"},
      {status:400}
    );
  }

  await MealMenu.deleteMany({});

  await MealMenu.insertMany(body.menu);

  return NextResponse.json({
    message:"Weekly meal menu updated successfully"
  });

}
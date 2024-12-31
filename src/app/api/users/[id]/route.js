import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, password } = await request.json();
  await connectMongoDB();
  const foundUser = await User.findOne({ username, password });
  return NextResponse.json({ foundUser });
}

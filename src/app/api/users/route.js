import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, password, status = false, totalTime = 0 } = await request.json();
  await connectMongoDB();
  await User.create({ name, password, status, totalTime });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users });
}


import mongoose from "mongoose";
import { connectToDB } from "../../../lib/mongodb";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { file, submittedAt, responses } = body;

    const collection = mongoose.connection.db.collection("responses");

    const doc = {
      file: file || null,
      submittedAt: submittedAt ? new Date(submittedAt) : new Date(),
      responses: responses || {},
      createdAt: new Date(),
    };

    const result = await collection.insertOne(doc);

    return new Response(
      JSON.stringify({ message: "Responses stored!", id: result.insertedId }),
      { status: 200 }
    );
  } catch (error) {
    console.error("/api/submit error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

import clientPromise from "../../../../lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("surveyDB");
    const collection = db.collection("responses");

    const body = await req.json();
    const { name, feedback } = body;

    const result = await collection.insertOne({ name, feedback, createdAt: new Date() });

    return new Response(JSON.stringify({ message: "Data stored!", result }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

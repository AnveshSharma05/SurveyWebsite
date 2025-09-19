import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("surveyDB");
    const collection = db.collection("responses");

    const responses = await collection.find({}).toArray();

    return new Response(JSON.stringify(responses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

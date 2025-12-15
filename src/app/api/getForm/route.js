import fs from "fs";
import path from "path";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");
    if (!file)
      return Response.json({ error: "No file specified" }, { status: 400 });

    const filePath = path.join(process.cwd(), "src", "constant", file);
    if (!fs.existsSync(filePath))
      return Response.json({ error: "File not found" }, { status: 404 });

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

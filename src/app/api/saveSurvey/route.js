import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { email, survey } = await req.json();

    // Sanitize email for filename
    const sanitizedEmail = email.replace(/[@.]/g, "_");

    // Find the next form number by checking existing files
    const constantDir = path.join(process.cwd(), "src", "constant");
    const files = fs
      .readdirSync(constantDir)
      .filter((f) => f.startsWith(sanitizedEmail) && f.endsWith(".json"));
    const formNumber = files.length + 1;

    const fileName = `${sanitizedEmail}_${formNumber}.json`;
    const filePath = path.join(constantDir, fileName);

    const data = {
      email,
      survey: [survey],
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return Response.json({ success: true, fileName });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

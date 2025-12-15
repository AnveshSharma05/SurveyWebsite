import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const sanitizedEmail = email.replace(/[@.]/g, "_");
    const constantDir = path.join(process.cwd(), "src", "constant");
    const files = fs
      .readdirSync(constantDir)
      .filter((f) => f.startsWith(sanitizedEmail) && f.endsWith(".json"));

    const forms = files.map((file) => {
      const filePath = path.join(constantDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const survey = data.survey[0]; // assuming one survey per file
      return { fileName: file, surveyTitle: survey.surveyTitle };
    });

    return Response.json({ forms });
  } catch (error) {
    console.error(error);
    return Response.json({ forms: [] }, { status: 500 });
  }
}

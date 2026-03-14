import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const notes = body?.notes;

    if (!notes || !notes.trim()) {
      return NextResponse.json(
        { error: "Meeting notes are required." },
        { status: 400 }
      );
    }

    const prompt = `
Analyze these meeting notes and return only valid JSON.

Format:
{
  "summary": "short summary",
  "actionItems": [
    {
      "owner": "person name",
      "task": "task description",
      "deadline": "deadline if mentioned or Not specified"
    }
  ],
  "deadlines": ["deadline1", "deadline2"],
  "blockers": ["blocker1", "blocker2"],
  "followUpEmail": "professional follow-up email"
}

Meeting notes:
${notes}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices?.[0]?.message?.content ?? "";

    const cleaned = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json(
        {
          error: "OpenAI returned invalid JSON.",
          raw: cleaned,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("ROUTE ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Internal server error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward the request to the n8n webhook
    // This is done server-side to avoid CORS issues from the browser
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!webhookUrl) {
      throw new Error("N8N_WEBHOOK_URL environment variable is not defined");
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook proxy error:", error);
    return NextResponse.json(
      { error: "Failed to forward webhook" },
      { status: 500 }
    );
  }
}

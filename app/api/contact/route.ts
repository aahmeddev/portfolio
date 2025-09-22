// File: app/api/contact/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log("✅ Contact API route hit!"); // 1. Check if the route is running

  try {
    const body = await request.json();
    console.log("📦 Received data from form:", body); // 2. Check if you received the data

    const googleFormLink = process.env.GOOGLE_FORM_LINK;

    // 3. Check if your environment variables are loaded correctly
    console.log("🔗 Google Form Link:", googleFormLink);
    console.log("👤 Name Field ID:", process.env.GOOGLE_FORM_FIELD_ID_NAME);

    if (!googleFormLink) {
      throw new Error("Google Form link is not configured.");
    }

    const formData = new URLSearchParams();
    formData.append(process.env.GOOGLE_FORM_FIELD_ID_NAME as string, body.name);
    formData.append(process.env.GOOGLE_FORM_FIELD_ID_EMAIL as string, body.email);
    formData.append(process.env.GOOGLE_FORM_FIELD_ID_MESSAGE as string, body.message);
    formData.append(process.env.GOOGLE_FORM_FIELD_ID_SOCIAL as string, body.social);

    console.log("🚀 Sending this data to Google:", formData.toString()); // 4. Check the formatted data

    const response = await fetch(googleFormLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    console.log("📈 Google's response status:", response.status); // 5. Check Google's response

    if (response.ok) {
      return NextResponse.json({ message: "Form submitted successfully!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Google Forms submission failed." }, { status: response.status });
    }

  } catch (error) {
    console.error("❌ Error in API route:", error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
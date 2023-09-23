import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const { name, email, message } = body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_GMAIL_EMAIL,
      pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.NEXT_PUBLIC_GMAIL_EMAIL,
      to:
        typeof process.env.NEXT_PUBLIC_EMAILS !== "string" ||
        JSON.parse(process.env.NEXT_PUBLIC_EMAILS),
      subject: "Furnish In",
      html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: null }));
  }
}

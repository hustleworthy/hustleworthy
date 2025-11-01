import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, websiteName, domain } = await request.json();

    // Validate required fields
    if (!userEmail || !websiteName || !domain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please sign up first.' },
        { status: 404 }
      );
    }

    // Find website by name or domain
    const website = await prisma.websites.findFirst({
      where: {
        OR: [
          { websiteName: { contains: websiteName, mode: 'insensitive' } },
          { url: { contains: domain, mode: 'insensitive' } }
        ]
      }
    });

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found in our database' },
        { status: 404 }
      );
    }

    // Check if verification request already exists
    const existingRequest = await prisma.verificationRequest.findFirst({
      where: {
        userId: user.id,
        websiteId: website.sNo
      }
    });

    let verificationRequest;
    if (existingRequest) {
      verificationRequest = existingRequest;
    } else {
      // Create verification request
      verificationRequest = await prisma.verificationRequest.create({
        data: {
          userId: user.id,
          websiteId: website.sNo
        }
      });
    }

    // Create transporter using SMTP (using Brevo SMTP)
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.BREVO_SMTP_LOGIN, // Your Brevo SMTP login
        pass: process.env.BREVO_SMTP_KEY, // Your Brevo SMTP key
      },
    });

    // Create verification link
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const verificationLink = `${baseUrl}/admin/verification?vid=${verificationRequest.id}`;

    // Email content
    const mailOptions = {
      from: `"Hustleworthy" <${process.env.BREVO_VERIFIED_SENDER}>`, // Use verified Brevo sender
      replyTo: userEmail, // User can reply directly to the requester
      to: process.env.ADMIN_EMAIL, // Admin email
      subject: `Manual Verification Request - ${websiteName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Manual Verification Request
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Request Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">User Name:</td>
                <td style="padding: 8px 0; color: #6b7280;">${user.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">User Email:</td>
                <td style="padding: 8px 0; color: #6b7280;">${userEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Website Name:</td>
                <td style="padding: 8px 0; color: #6b7280;">${websiteName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Domain:</td>
                <td style="padding: 8px 0; color: #6b7280;">
                  <a href="${domain}" target="_blank" style="color: #2563eb; text-decoration: none;">${domain}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Requested At:</td>
                <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a; margin: 20px 0;">
            <h3 style="color: #166534; margin-top: 0; margin-bottom: 15px;">
              🔗 Quick Verification Action
            </h3>
            <p style="margin: 0 0 15px 0; color: #166534;">
              Click the button below to review and verify this website ownership request:
            </p>
            <div style="text-align: center;">
              <a href="${verificationLink}" 
                 style="display: inline-block; background: linear-gradient(135deg, #16a34a, #15803d); 
                        color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; 
                        font-weight: bold; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                🔍 Review Verification Request
              </a>
            </div>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please review the verification request and approve or reject it through the admin panel.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
            This email was automatically generated from the Hustleworthy verification system.
            <br>
            <strong>Verification Request ID:</strong> ${verificationRequest.id}
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        message: 'Manual verification request sent successfully',
        verificationRequestId: verificationRequest.id,
        websiteId: website.sNo
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending manual verification email:', error);
    return NextResponse.json(
      { error: 'Failed to send verification request' },
      { status: 500 }
    );
  }
}

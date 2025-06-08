
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'
import { Resend } from 'npm:resend@2.0.0'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  submission_id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge function called - checking API key...");
    const apiKey = Deno.env.get('RESEND_API_KEY');
    console.log("API key exists:", !!apiKey);
    console.log("API key length:", apiKey ? apiKey.length : 0);
    
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set in environment variables");
    }

    const resend = new Resend(apiKey);

    const { submission_id, name, email, message, created_at }: ContactSubmission = await req.json();

    console.log("Received contact submission notification:", { submission_id, name, email });

    // Format the date nicely
    const submissionDate = new Date(created_at).toLocaleString();

    // Send email notification using Resend
    const emailResponse = await resend.emails.send({
      from: 'JD Development <onboarding@resend.dev>',
      to: ['jdevelopersd@gmail.com'],
      subject: 'New Contact Form Submission - JD Development',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4f46e5; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Date:</strong> ${submissionDate}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #4f46e5;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Submission ID:</strong> ${submission_id}<br>
              You can view and manage this submission in your admin portal.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email notification sent",
        submission_id,
        email_id: emailResponse.data?.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Failed to send email notification"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

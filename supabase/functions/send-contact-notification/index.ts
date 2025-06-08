
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

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
    const { submission_id, name, email, message, created_at }: ContactSubmission = await req.json();

    console.log("Received contact submission notification:", { submission_id, name, email });

    // Initialize Supabase client for sending emails
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Format the date nicely
    const submissionDate = new Date(created_at).toLocaleString();

    // Send email notification using Supabase Auth (if email templates are configured)
    // For now, we'll log the email content that would be sent
    const emailContent = `
      New Contact Form Submission Received!
      
      From: ${name} (${email})
      Date: ${submissionDate}
      
      Message:
      ${message}
      
      ---
      Submission ID: ${submission_id}
      
      You can view and manage this submission in your admin portal.
    `;

    console.log("Email notification content:", emailContent);

    // Note: To actually send emails, you would need to:
    // 1. Set up email templates in Supabase Auth
    // 2. Or use a third-party service like Resend, SendGrid, etc.
    // 3. For now, this logs the notification

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification processed",
        submission_id 
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
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

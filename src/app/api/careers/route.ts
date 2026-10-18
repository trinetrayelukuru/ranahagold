
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const contentLength = Number(req.headers.get('content-length') || 0);

    if (contentLength > 20_000) {
      return NextResponse.json(
        { success: false, error: 'Application request is too large.' },
        { status: 413 }
      );
    }

    const body = await req.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: 'Invalid application details.' },
        { status: 400 }
      );
    }

    const textField = (value: unknown, maxLength: number) =>
      typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

    const fullName = textField(body.fullName, 100);
    const email = textField(body.email, 150).toLowerCase();
    const mobile = textField(body.mobile, 20);
    const state = textField(body.state, 100);
    const district = textField(body.district, 100);

    if (!fullName || !email || !mobile) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide your full name, email address and mobile number.',
        },
        { status: 400 }
      );
    }

    if (!state || !district) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please select your state and district.',
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const digits = mobile.replace(/\D/g, '');

    if (digits.length < 10 || digits.length > 15) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid mobile number.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Career application storage configuration is missing.');

      return NextResponse.json(
        {
          success: false,
          error: 'Applications are temporarily unavailable. Please try again later.',
        },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase
      .from('career_applications')
      .insert({
        full_name: fullName,
        email,
        mobile,
        address: textField(body.address, 300) || null,
        state,
        district,
        qualification: textField(body.qualification, 150) || null,
        degree: textField(body.degree, 150) || null,
        specialisation: textField(body.specialisation, 150) || null,
        college: textField(body.college, 200) || null,
        graduation_year: textField(body.graduationYear, 10) || null,
        submitted_by_email: email,
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error('Failed to save career application:', error?.message);

      return NextResponse.json(
        {
          success: false,
          error: 'We could not save your application. Please try again later.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        reference: `RGH-CAREER-${data.id.slice(0, 8).toUpperCase()}`,
        message: 'Your application has been received successfully.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request.' },
      { status: 400 }
    );
  }
}

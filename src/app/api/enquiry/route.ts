import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const allowedTypes = ['franchise', 'membership', 'funding', 'general'] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      !body ||
      typeof body.fullName !== 'string' ||
      typeof body.phone !== 'string' ||
      typeof body.type !== 'string'
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide your Full Name, Phone Number, and Enquiry Type.',
        },
        { status: 400 }
      );
    }

    const fullName = body.fullName.trim().slice(0, 100);
    const cleanPhone = body.phone.replace(/[\s\-()]/g, '').slice(0, 20);
    const type = body.type.trim();

    if (!fullName || !cleanPhone || !allowedTypes.includes(type as (typeof allowedTypes)[number])) {
      return NextResponse.json(
        { success: false, error: 'Please provide valid enquiry details.' },
        { status: 400 }
      );
    }

    const phoneDigits = cleanPhone.replace(/\D/g, '');

    if (phoneDigits.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please enter a valid phone number with at least 10 digits.',
        },
        { status: 400 }
      );
    }

    const email =
      typeof body.email === 'string' ? body.email.trim().slice(0, 100) : '';

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const organization =
      typeof body.organization === 'string'
        ? body.organization.trim().slice(0, 120)
        : '';

    const city =
      typeof body.city === 'string' ? body.city.trim().slice(0, 80) : '';

    const interestTier =
      typeof body.interestTier === 'string'
        ? body.interestTier.trim().slice(0, 80)
        : null;

    const fundingInterest =
      typeof body.fundingInterest === 'string'
        ? body.fundingInterest.trim().slice(0, 80)
        : null;

    const fundingRange =
      typeof body.fundingRange === 'string'
        ? body.fundingRange.trim().slice(0, 80)
        : null;

    const message =
      typeof body.message === 'string'
        ? body.message.trim().slice(0, 1000)
        : '';

    const investmentBudget =
      typeof body.investmentBudget === 'string'
        ? body.investmentBudget.trim().slice(0, 60)
        : null;

    const applicantState =
      typeof body.applicantState === 'string'
        ? body.applicantState.trim().slice(0, 60)
        : null;

    const applicantDistrict =
      typeof body.applicantDistrict === 'string'
        ? body.applicantDistrict.trim().slice(0, 60)
        : null;

    const preferredState =
      typeof body.preferredState === 'string'
        ? body.preferredState.trim().slice(0, 60)
        : null;

    const preferredDistrict =
      typeof body.preferredDistrict === 'string'
        ? body.preferredDistrict.trim().slice(0, 60)
        : null;

    const preferredTier =
      typeof body.preferredTier === 'string'
        ? body.preferredTier.trim().slice(0, 60)
        : null;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Enquiry storage configuration is missing.');

      return NextResponse.json(
        { success: false, error: 'Enquiries are temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // Server-only client. Never import this code into browser components.
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase
      .from('enquiries')
      .insert({
        type,
        full_name: fullName,
        email: email || null,
        phone: cleanPhone,
        organization: organization || null,
        city: city || null,
        interest_tier: preferredTier || interestTier,
        funding_interest: fundingInterest,
        funding_range: fundingRange,
        message: message || null,
        // New fields — schema must be updated via migration (see proposed SQL)
        investment_budget: investmentBudget,
        applicant_state: applicantState,
        applicant_district: applicantDistrict,
        preferred_state: preferredState,
        preferred_district: preferredDistrict,
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error('Failed to save enquiry:', error?.message);

      return NextResponse.json(
        {
          success: false,
          error: 'We could not save your enquiry. Please try again later.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Your enquiry has been received successfully. An authorised Ranaha Gold Company representative will connect with you.',
        referenceId: `RGH-${data.id.slice(0, 8).toUpperCase()}`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again or contact us directly.',
      },
      { status: 400 }
    );
  }
}

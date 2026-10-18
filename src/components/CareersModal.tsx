
"use client";

import React, { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import CareerStateMap from "./CareerStateMap";
import CareerDistrictMap from "./CareerDistrictMap";
import CareerApplicantForm from "./CareerApplicantForm";
import CareerEducationForm from "./CareerEducationForm";
import CareerReview from "./CareerReview";
import { STEPS } from "@/data/careersData";

export default function CareersModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stateSel, setStateSel] = useState("");
  const [districtSel, setDistrictSel] = useState("");

  const handleBack = useCallback(() => {
    if (step > 1) {
      setSubmitError("");
      setStep(step - 1);
    }
  }, [step]);

  const handleNext = useCallback(() => {
    if (step < 6) {
      setSubmitError("");
      setStep(step + 1);
    }
  }, [step]);

  const handleStateSelect = (st: string) => {
    setStateSel(st);
    setForm((f) => ({ ...f, state: st, district: "" }));
    setDistrictSel("");
    setSubmitError("");
    setStep(2);
  };

  const handleDistrictSelect = (district: string) => {
    setDistrictSel(district);
    setForm((f) => ({ ...f, district }));
    setSubmitError("");
    setStep(3);
  };

  const handleSubmit = async (): Promise<void> => {
    if (isSubmitting) return;

    setSubmitError("");

    const fullName = (form.fullName || "").trim();
    const email = (form.email || "").trim();
    const mobile = (form.mobile || "").trim();

    if (!form.state || !form.district) {
      setSubmitError("Please select your state and district.");
      setStep(!form.state ? 1 : 2);
      return;
    }

    if (!fullName) {
      setSubmitError("Please enter your full name.");
      setStep(3);
      return;
    }

    if (!email) {
      setSubmitError("Please enter your email address.");
      setStep(3);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setSubmitError("Please enter a valid email address.");
      setStep(3);
      return;
    }

    if (!mobile) {
      setSubmitError("Please enter your mobile number.");
      setStep(3);
      return;
    }

    const digits = mobile.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      setSubmitError("Please enter a valid mobile number.");
      setStep(3);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          fullName,
          email,
          mobile,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to submit your application. Please try again."
        );
      }

      setSubmitted(true);
      setStep(6);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Join Our Team"
    >
      <div
        className="absolute inset-0 bg-navy-950/90 backdrop-blur-md"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-3xl bg-gradient-to-b from-navy-900/95 to-navy-950 rounded-3xl border border-gold-500/30 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gold-500/20">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
              Join Our Team
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Interested in building your career with RANAHA Gold Company?
            </p>
          </div>

          <button
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="p-2 rounded-xl hover:bg-navy-800 text-slate-300 hover:text-white transition disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <>
            <div className="flex gap-2 px-5 sm:px-6 pt-5 overflow-x-auto">
              {STEPS.map((s, i) => (
                <button
                  key={s}
                  onClick={() => {
                    if (i < step - 1 || step > i + 1) {
                      setSubmitError("");
                      setStep(i + 1);
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition ${
                    i + 1 === step
                      ? "bg-gold-500 text-navy-950"
                      : i + 1 < step
                        ? "bg-gold-500/20 text-gold-300 border border-gold-500/30"
                        : "bg-navy-900 text-slate-400 border border-gold-500/10"
                  }`}
                  aria-current={i + 1 === step ? "step" : undefined}
                >
                  {i + 1}. {s}
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-lg text-white">
                    Select State
                  </h3>
                  <CareerStateMap onSelect={handleStateSelect} />
                  <p className="text-[11px] text-slate-400">
                    Hover over a state to highlight it, then click the
                    geographic area to continue.
                  </p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    Selected:
                    <span className="font-bold text-gold-200">
                      {stateSel}
                    </span>
                    <button
                      onClick={() => {
                        setStep(1);
                        setStateSel("");
                        setDistrictSel("");
                        setForm((f) => ({
                          ...f,
                          state: "",
                          district: "",
                        }));
                        setSubmitError("");
                      }}
                      className="underline"
                    >
                      Back to State
                    </button>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white">
                    Select District — {stateSel}
                  </h3>

                  <CareerDistrictMap
                    state={stateSel}
                    onSelect={handleDistrictSelect}
                  />

                  <p className="text-[11px] text-slate-400">
                    District polygons from verified GeoJSON:{" "}
                    {stateSel === "Andhra Pradesh"
                      ? "26 districts"
                      : stateSel === "Telangana"
                        ? "33 districts"
                        : "source"}
                    .
                  </p>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    State:
                    <span className="font-bold text-gold-200">
                      {form.state || stateSel}
                    </span>
                    · District:
                    <span className="font-bold text-gold-200">
                      {form.district || districtSel}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white">
                    Applicant Details
                  </h3>

                  <CareerApplicantForm form={form} setForm={setForm} />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-lg text-white">
                    Education Details
                  </h3>
                  <CareerEducationForm form={form} setForm={setForm} />
                </div>
              )}

              {step === 5 && (
                <CareerReview
                  form={form}
                  onEdit={() => {
                    setSubmitError("");
                    setStep(3);
                  }}
                  onBack={() => {
                    setSubmitError("");
                    setStep(4);
                  }}
                />
              )}

              {step === 6 && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                    <Check className="w-8 h-8 text-gold-400" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white">
                    Thank you
                  </h3>

                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for your interest in joining RANAHA Gold Company.
                    Our team will contact you soon.
                  </p>

                  <button
                    onClick={handleClose}
                    className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-sm"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {!submitted && step !== 6 && (
              <div className="flex flex-col gap-3 p-5 sm:p-6 border-t border-gold-500/20 bg-navy-950/40">
                {submitError && (
                  <p
                    role="alert"
                    className="text-sm text-red-400"
                  >
                    {submitError}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    disabled={step === 1 || isSubmitting}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition ${
                      step === 1
                        ? "opacity-30 cursor-not-allowed border-slate-700 text-slate-500"
                        : "border-gold-500/30 text-gold-300 hover:bg-gold-500/10"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  {step === 3 || step === 4 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-sm"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : step === 5 ? (
                    <button
                      onClick={() => {
                        void handleSubmit();
                      }}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-navy-950 bg-gradient-to-r from-gold-300 to-gold-500 shadow-gold-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10 space-y-4">
            <p className="text-lg font-serif text-white">
              Thank you for your interest.
            </p>
            <p className="text-sm text-slate-300">
              Our team will contact you soon.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase text-navy-950 bg-gradient-to-r from-gold-300 to-gold-500"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

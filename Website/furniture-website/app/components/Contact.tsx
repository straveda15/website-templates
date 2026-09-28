"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const interested_in = String(
      formData.get("interested_in") || ""
    ).trim();

    const nameRegex = /^[A-Za-z ]{2,50}$/;
    const phoneRegex = /^[6-9][0-9]{9}$/;
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!nameRegex.test(name)) {
      setError(
        "Please enter a valid name using letters and spaces only."
      );
      setLoading(false);
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError(
        "Please enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
      );
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!interested_in) {
      setError("Please select what you are interested in.");
      setLoading(false);
      return;
    }

    const data = {
      name,
      phone,
      email,
      interested_in,
      status: "New",
      next_follow_up: null,
    };

    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to submit enquiry"
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Contact Form Error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Contact Section */}
      <section
        id="contact"
        className="bg-[#F7F1E8] px-5 py-20 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            {/* ================= LEFT SIDE ================= */}
            <div>
              <div className="mb-14">
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#C96A32]">
                  Get In Touch
                </p>

                <h1 className="font-serif text-[44px] leading-[1.05] tracking-[-0.03em] text-[#2B211B] sm:text-[56px]">
                  Let&apos;s Create
                  <br />
                  Something Beautiful
                </h1>

                <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-[#2B211B]/65">
                  Have a question about our furniture, need help choosing the
                  perfect piece, or want to discuss something custom? We&apos;d
                  love to hear from you.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">

                {/* Visit Us */}
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#C96A32]">
                    Visit Us
                  </p>

                  <p className="text-[15px] leading-7 text-[#2B211B]/75">
                    24 Design Street
                    <br />
                    Pune, Maharashtra
                    <br />
                    India
                  </p>
                </div>

                {/* Call Us */}
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#C96A32]">
                    Call Us
                  </p>

                  <p className="text-[15px] text-[#2B211B]/75">
                    +91 98765 43210
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#C96A32]">
                    Email
                  </p>

                  <p className="text-[15px] text-[#2B211B]/75">
                    hello@maison.com
                  </p>
                </div>

              </div>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="border border-[#2B211B]/10 bg-white/40 p-6 sm:p-8 lg:p-10">

              {submitted ? (
                <div className="flex min-h-[500px] items-center justify-center text-center">
                  <div>
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#C96A32] text-white">
                      ✓
                    </div>

                    <h2 className="font-serif text-[30px] text-[#2B211B]">
                      Thank You
                    </h2>

                    <p className="mt-3 text-[14px] text-[#2B211B]/60">
                      We&apos;ve received your enquiry and will get back to
                      you soon.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >

                  {/* Name + Phone */}
                  <div className="grid gap-6 sm:grid-cols-2">

                    {/* Name */}
                    <div>
                      <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-[#2B211B]/60">
                        Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        required
                        minLength={2}
                        maxLength={50}
                        pattern="[A-Za-z ]{2,50}"
                        title="Name should contain letters and spaces only."
                        placeholder="Your name"
                        autoComplete="name"
                        className="w-full border-b border-[#2B211B]/20 bg-transparent px-0 py-3 text-[14px] text-[#2B211B] outline-none placeholder:text-[#2B211B]/35 focus:border-[#C96A32]"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-[#2B211B]/60">
                        Phone
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        required
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        title="Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
                        placeholder="9876543210"
                        autoComplete="tel"
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                        }}
                        className="w-full border-b border-[#2B211B]/20 bg-transparent px-0 py-3 text-[14px] text-[#2B211B] outline-none placeholder:text-[#2B211B]/35 focus:border-[#C96A32]"
                      />
                    </div>

                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-[#2B211B]/60">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={100}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full border-b border-[#2B211B]/20 bg-transparent px-0 py-3 text-[14px] text-[#2B211B] outline-none placeholder:text-[#2B211B]/35 focus:border-[#C96A32]"
                    />
                  </div>

                  {/* Interested In */}
                  <div>
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.15em] text-[#2B211B]/60">
                      Interested In
                    </label>

                    <select
                      name="interested_in"
                      required
                      defaultValue=""
                      className="w-full border-b border-[#2B211B]/20 bg-transparent px-0 py-3 text-[14px] text-[#2B211B] outline-none focus:border-[#C96A32]"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>

                      <option value="sofas">Sofas</option>
                      <option value="dining">Dining</option>
                      <option value="bedroom">Bedroom</option>
                      <option value="chairs">Chairs</option>
                      <option value="custom">Custom Furniture</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 bg-[#C96A32] px-7 py-3.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-[#2B211B] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Enquiry"}

                    {!loading && <span>→</span>}
                  </button>

                </form>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
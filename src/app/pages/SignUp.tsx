"use client";

import axios from "axios";
import React, { useState } from "react";
import {toast} from "sonner"
import {LoaderCircle} from "lucide-react"
import { useNavigate } from "react-router";

export default function Signup() {
  const [organiationName, setOrganiationName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);


  // Validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!organiationName.trim()) {
      toast.error("Institute name is required");
      return;
    }
    if (!adminName.trim()) {
      toast.error("Admin name is required");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain 8+ chars, uppercase, lowercase, number & special character"
      );
      return;
    }

    setProcessing(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/codeflame/payroll/api/auth/signup",
        {
          organization_name:organiationName,
          name:adminName,
          email,
          phone,
          password,
        }
      );

      toast.success(response.data.message || "Signup successful 🎉");
      toast.info("Sending verification OTP…");

      navigate(`/email/verify/${email}`);

      setOrganiationName("");
      setAdminName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed ❌");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full  m-3.5  max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-8">
        {/* Header */}
        <div className="text-center">
        
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Create Admin Account
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Register your payroll to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div className="space-y-4">

            {/* Institute Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Organization Name
              </label>
              <input
                value={organiationName}
                onChange={(e) => setOrganiationName(e.target.value)}
                type="text"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter institute name"
              />
            </div>

            {/* Admin Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Admin Name
              </label>
              <input
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                type="text"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter admin full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter phone number"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Enter strong password"
              />
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={processing}
            className={`group relative flex items-center gap-1.5 w-full justify-center rounded-lg ${
              processing ? "bg-blue-300" : "bg-blue-600"
            } cursor-pointer px-4 py-3 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none`}
            onClick={handleSignup}
          >
            
            {processing ? <LoaderCircle/> : ""}
            <span>Signup</span>
          </button>
        </form>
      </div>
    </div>
  );
}
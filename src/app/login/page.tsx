"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LeafBorder, HangingPlant, CornerVine, SmallLeaf } from "@/components/PlantIcon";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
      setIsLoading(false);
    } else {
      router.push("/calendar");
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 watercolor-bg flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative plants */}
      <div className="absolute top-0 left-8 text-sage-500 pointer-events-none opacity-50">
        <HangingPlant className="w-20 h-28" />
      </div>
      <div className="absolute top-0 right-16 text-sage-500 pointer-events-none opacity-40">
        <HangingPlant className="w-16 h-24" />
      </div>
      <div className="absolute bottom-0 left-0 text-sage-500 pointer-events-none">
        <CornerVine className="w-48 h-48" />
      </div>
      <div className="absolute bottom-0 right-0 text-sage-500 pointer-events-none rotate-y-180" style={{ transform: "scaleX(-1)" }}>
        <CornerVine className="w-36 h-36" />
      </div>

      {/* Floating leaves background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <SmallLeaf className="absolute top-[15%] left-[10%] w-8 h-8 text-sage-300 opacity-20 animate-sway" />
        <SmallLeaf className="absolute top-[25%] right-[15%] w-6 h-6 text-moss-300 opacity-15 animate-sway" />
        <SmallLeaf className="absolute bottom-[30%] left-[20%] w-7 h-7 text-sage-400 opacity-15 animate-sway" />
        <SmallLeaf className="absolute top-[60%] right-[25%] w-8 h-8 text-moss-400 opacity-10 animate-sway" />
      </div>

      {/* Login card */}
      <div className="w-full max-w-sm relative z-10">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-sage-100 to-moss-100 mb-4 shadow-md">
            <span className="text-4xl">🪴</span>
          </div>
          <h1 className="font-heading text-4xl text-sage-800 mb-1">
            Boo&apos;s Garden
          </h1>
          <p className="text-sage-500 text-sm">
            Welcome back, let&apos;s tend your garden
          </p>
          <LeafBorder className="w-40 h-6 mx-auto mt-2 text-sage-400" />
        </div>

        {/* Form card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sage-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm animate-fade-in">
                <span>🥀</span>
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-sage-700 mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="
                    w-full rounded-xl border border-sage-200 bg-cream-50
                    px-4 py-3 text-sm text-sage-800 placeholder:text-sage-300
                    focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent
                    transition-shadow
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-sage-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="
                  w-full rounded-xl border border-sage-200 bg-cream-50
                  px-4 py-3 text-sm text-sage-800 placeholder:text-sage-300
                  focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent
                  transition-shadow
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full py-3 px-4 rounded-xl text-sm font-semibold
                text-white bg-linear-to-r from-sage-500 to-moss-500
                hover:from-sage-600 hover:to-moss-600
                focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2
                transition-all duration-200 shadow-md hover:shadow-lg
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-sway">🌿</span>
                  Entering the garden...
                </span>
              ) : (
                "Enter the Garden"
              )}
            </button>
          </form>
        </div>

        {/* Footer text */}
        <p className="text-center text-sage-400 text-xs mt-6">
          Every day is a new chance to bloom 🌸
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../lib/user-context";
import api from "../hooks/axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const KolOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Multi-step state
  const [step, setStep] = useState(1);

  // Form data
  const [form, setForm] = useState({
    email: user?.email || "",
    password: "",
    name: "",
    country: "",
    postPrice: "",
    socialMedia: [{ platform: "", account: "", followers: "" }],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle social media field changes
  const handleSocialChange = (index, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = [...prev.socialMedia];
      updated[index][name] = value;
      return { ...prev, socialMedia: updated };
    });
  };

  const addSocialPlatform = () => {
    setForm((prev) => ({
      ...prev,
      socialMedia: [
        ...prev.socialMedia,
        { platform: "", account: "", followers: "" },
      ],
    }));
  };

  const removeSocialPlatform = (index) => {
    setForm((prev) => {
      const updated = prev.socialMedia.filter((_, i) => i !== index);
      return { ...prev, socialMedia: updated };
    });
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data) => {
      const res = await api.post(`auth/onboarding`, {
        ...data,
        inviter: user?.id || null,
      });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Onboarding successful:", data);
      // ✅ Redirect to login page instead of profile
      navigate("/login");
    },
    onError: (err) => {
      console.error("Onboarding failed:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Validate credentials before going next
      if (!form.email || !form.password) {
        alert("Please enter your email and password to continue.");
        return;
      }
      setStep(2);
    } else {
      mutate(form);
    }
  };

  return (
    <section className="mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle>KOL Onboarding</CardTitle>
          <CardDescription>
            {step === 1
              ? "Verify your account to continue onboarding."
              : "Fill in your KOL details to complete onboarding."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Basic Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="postPrice">Post Price (₦ or USD)</Label>
                  <Input
                    id="postPrice"
                    name="postPrice"
                    type="number"
                    value={form.postPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Social Media Accounts */}
                <div className="space-y-4">
                  <Label>Social Media Accounts</Label>
                  {form.socialMedia.map((item, index) => (
                    <div
                      key={index}
                      className="grid gap-3 md:grid-cols-3 items-center border p-3 rounded-md"
                    >
                      <Input
                        name="platform"
                        placeholder="Platform (e.g. Instagram)"
                        value={item.platform}
                        onChange={(e) => handleSocialChange(index, e)}
                        required
                      />
                      <Input
                        name="account"
                        placeholder="Account URL or Handle"
                        value={item.account}
                        onChange={(e) => handleSocialChange(index, e)}
                        required
                      />
                      <Input
                        name="followers"
                        placeholder="Followers Count"
                        value={item.followers}
                        onChange={(e) => handleSocialChange(index, e)}
                        required
                      />
                      {form.socialMedia.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeSocialPlatform(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={addSocialPlatform}
                  >
                    + Add Another Platform
                  </Button>
                </div>
              </>
            )}

            {/* Error */}
            {isError && (
              <p className="text-sm text-red-500 text-center">
                {error?.response?.data?.message || error.message}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex justify-between mt-6">
            {step === 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                disabled={isPending}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto"
            >
              {isPending
                ? "Submitting..."
                : step === 1
                ? "Continue"
                : "Complete Onboarding"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default KolOnboarding;

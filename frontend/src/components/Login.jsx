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

const Logging = () => {
  const navigate = useNavigate();
  const { setUser: setAuthUser } = useUser();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and password required");
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      console.log("Login successful:", data);

      if (data?.requireOnboarding) {
        setAuthUser({
          id: data.id,
          email: data.email,
          username: data.username,
          role: data.role,
        });
        navigate("/onboarding");
        return;
      }

      setAuthUser(data);
      if (data.role !== "kol") navigate("/kol");
      else navigate("/profile");
    },
    onError: (err) => {
      console.error("Login failed:", err);

      if (err?.response?.status === 403 || err?.response?.requireOnboarding) {
        const data = err.response.data;
        if (data?.requireOnboarding) {
          setAuthUser({
            id: data.id,
            email: data.email,
            username: data.username,
            role: data.role,
          });
          navigate("/onboarding");
          return;
        }
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <section className="min-h-svh flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-md rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-muted-foreground">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-6 sm:gap-8 md:gap-10">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={user.email}
                placeholder="m@example.com"
                required
                onChange={handleUserDetails}
                className="text-sm sm:text-base"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center flex-wrap justify-between gap-2">
                <Label htmlFor="password" className="text-sm sm:text-base">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs sm:text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleUserDetails}
                required
                className="text-sm sm:text-base"
              />
            </div>

            {/* Error message */}
            {isError && (
              <p className="text-sm text-red-500 text-center">
                {error?.response?.data?.message || error.message}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex-col gap-3 mt-6 sm:mt-8 md:mt-10">
            <Button
              type="submit"
              className="w-full text-sm sm:text-base py-2 sm:py-3 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Logging;

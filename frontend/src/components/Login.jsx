import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import api from "../hooks/axios";
import { useUser } from "../lib/user-context";

export function Logging() {
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
      setAuthUser(data);
      if (data.role !== "kol") {
        navigate("/kol");
      } else {
        navigate("/profile");
      }
    },
    onError: (err) => {
      console.error("Login failed:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <section className="mx-auto flex items-center justify-center h-svh">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={user.email}
                  placeholder="m@example.com"
                  required
                  onChange={handleUserDetails}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
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
                />
              </div>

              {isError && (
                <p className="text-sm text-red-500">{error.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2 mt-10">
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}

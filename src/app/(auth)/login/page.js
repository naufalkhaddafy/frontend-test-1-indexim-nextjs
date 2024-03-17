"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import nookies from "nookies";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function page() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function doLogin(e) {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/login`, form)
      .then((res) => {
        const response = res.data;
        const token = response.access_token;
        if (token) {
          nookies.set(null, "token", token);
          router.replace("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <main className="flex min-h-screen justify-center items-center">
      <form onSubmit={doLogin}>
        <Card className="w-96">
          <CardHeader className="text-center">
            <CardTitle>Indexim Coalindo</CardTitle>
            <CardDescription>Login to access</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              className="text-black mb-5 mt-3"
              name="username"
              onChange={onChange}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              className="text-black mb-5 mt-3"
              onChange={onChange}
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              className="rounded-lg py-5 text-center w-full "
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}

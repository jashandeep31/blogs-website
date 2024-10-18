"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            SignUp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" variant="outline">
            <Github className="mr-2 h-4 w-4" />
            SignUp with GitHub
          </Button>
          <Button className="w-full" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            SignUp with Google
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;

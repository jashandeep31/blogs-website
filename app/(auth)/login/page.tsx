import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth, signIn } from "@/lib/auth";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" variant="outline">
            <Github className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button className="w-full" variant="outline" type="submit">
              <Mail className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;

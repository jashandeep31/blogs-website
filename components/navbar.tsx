import React from "react";
import NavbarClient from "./navbar-client";
import { auth } from "@/lib/auth";

const navbar = async () => {
  const session = await auth();
  return (
    <div>
      <NavbarClient session={session} />
    </div>
  );
};

export default navbar;

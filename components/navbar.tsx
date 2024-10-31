import React from "react";
import NavbarClient from "./navbar-client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const navbar = async () => {
  const session = await auth();
  const categories = await db.category.findMany({});

  return (
    <div>
      <NavbarClient session={session} categories={categories} />
    </div>
  );
};

export default navbar;

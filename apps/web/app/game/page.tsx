import { redirect } from "next/navigation";
import React from "react";

const GameIdDoNotExist = () => {
  return redirect("/");
};

export default GameIdDoNotExist;

import React from "react";
import { useBottomTabOverflow } from "./ui/TabBarBackground.ios";

function HolesList() {
  const bottom = useBottomTabOverflow();

  return <div>Holes</div>;
}

export default HolesList;

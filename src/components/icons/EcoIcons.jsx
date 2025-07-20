import React from "react";
import LeafSVG from './LeafLoader.svg?react';
import CarbonSVG from './CarbonFootprintLoader.svg?react';


export const LeafLoader = (props) => (
  <LeafSVG {...props} className={`animate-spin ${props.className || ""}`} />
);

export const CarbonFootprintLoader = (props) => (
  <CarbonSVG {...props} className={`animate-pulse ${props.className || ""}`} />
);

import React from "react";
import { IAddReviewContext } from "../interface";
export const AddReviewContext = React.createContext<IAddReviewContext | null>(
  null
);

import React from "react";
import { GlobalContext } from "./globalContext";

export const useGlobalContext = () => {
    return React.useContext(GlobalContext);
};
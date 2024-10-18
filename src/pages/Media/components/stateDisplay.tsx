
//Core
import React from "react";
//App
import Spinner from "../../../components/Spinner/Spinner";

//types
import { StateDisplayProps } from "./lib/type";


const StateDisplay: React.FC<StateDisplayProps> = ({ isLoading, pageTitle }) => {
  return (
    <div className="flex flex-row items-center justify-center text-center text-white h-[50vh] gap-10">
      {isLoading ? (
        <>
          <Spinner />
          <p className="text-xl md:text-2xl text-opacity-50">
            Loading {pageTitle}, please wait...
          </p>
        </>
      ) : (
        <p className="text-xl md:text-2xl text-white text-opacity-50">
          No {pageTitle} found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default StateDisplay;

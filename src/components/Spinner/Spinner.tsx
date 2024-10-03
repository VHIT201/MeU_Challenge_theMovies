// Spinner.tsx
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

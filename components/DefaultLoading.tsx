import React from "react";
import { Loader2 } from "lucide-react";

const DefaultLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <Loader2 className="animate-spin text-accent" size={100} />
    </div>
  );
};

export default DefaultLoading;

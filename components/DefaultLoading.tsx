import React from "react";
import { Loader2 } from "lucide-react";

const DefaultLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader2 className="animate-spin text-accent" size={100} />
    </div>
  );
};

export default DefaultLoading;

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { FC } from "react";

interface QuantityButtonsProps {
  productQuantity: number;
}

const QuantityButtons: FC<QuantityButtonsProps> = ({ productQuantity }) => {
  return (
    <div className="flex items-center space-x-4 py-2 ">
      <Button size="icon" variant="outline">
        <Plus />
      </Button>
      <span>{productQuantity}</span>
      <Button size="icon" variant="outline">
        <Minus />
      </Button>
    </div>
  );
};

export default QuantityButtons;

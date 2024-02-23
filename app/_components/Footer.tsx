import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowDownRightFromSquare, ShieldCheck, Truck } from "lucide-react";
import React from "react";

const perks = [
  {
    title: "Fast Delivery",
    icon: Truck,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, impedit!",
  },
  {
    title: "Guarantee of quality",
    icon: ShieldCheck,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, impedit!",
  },
  {
    title: "Possibility of return",
    icon: ArrowDownRightFromSquare,
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, impedit!",
  },
];
const Footer = () => {
  return (
    <>
      <hr className="my-4 h-[2px] bg-accent" />
      <div className="grid w-full grid-cols-1 justify-items-center gap-10 lg:grid-cols-3">
        {perks.map((perk) => (
          <Accordion key={perk.title} type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger className="justify-center">
                <div>
                  <div className="inline-block rounded-full bg-primary/90 p-3">
                    <perk.icon className="text-primary-foreground" />
                  </div>
                  <h3>{perk.title}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-1 items-center justify-center">
                  <p className="inline-block max-w-[250px] p-4">
                    {perk.description}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Footer;

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const categories = [
  {
    label: "Electronics",
    value: "electronics",
    imageUrl: "/images/electronics.png",
  },
  { label: "Gaming", value: "gaming", imageUrl: "/images/gaming.png" },
  {
    label: "Robotics",
    value: "robotics",
    imageUrl: "/images/robotics.png",
  },
  {
    label: "Wearable Tech",
    value: "wearable tech",
    imageUrl: "/images/wearable-tech.png",
  },
  {
    label: "Home Automation",
    value: "home automation",
    imageUrl: "/images/home-automation.png",
  },
  {
    label: "Audio and Music",
    value: "audio music",
    imageUrl: "/images/audio-music.png",
  },
  {
    label: "Science and Education",
    value: "science education",
    imageUrl: "/images/science-and-education.png",
  },
  {
    label: "Retro Gadgets",
    value: "retro gadgets",
    imageUrl: "/images/retro-gadgets.png",
  },
  {
    label: "3D Printing",
    value: "3d printing",
    imageUrl: "/images/3d-printing.png",
  },
];

const CategoriesGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          href={`/products?category=${category.value}`}
          key={category.value}
          className={cn(
            "group relative flex min-h-[100px] items-center justify-center overflow-hidden rounded-md md:min-h-[150px]",
          )}
        >
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={category.label}
            src={category.imageUrl}
            className=" object-cover opacity-50 transition-opacity group-hover:opacity-100"
            fill
          />
          <h3 className="absolute rounded-md bg-accent p-1 text-center text-lg font-semibold">
            {category.label}
          </h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesGrid;

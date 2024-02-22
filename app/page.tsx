import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <h1 className="flex justify-center px-4 text-6xl font-bold">GG</h1>
        <p className="text-base text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
          officiis iure inventore deserunt dolor aliquam!
        </p>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          neque repellat, doloremque modi numquam fugit?
        </p>
        <div className="flex flex-col">
          <Button>primary</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="link">link</Button>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

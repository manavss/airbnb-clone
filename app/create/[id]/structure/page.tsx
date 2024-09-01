import { addCategory } from "@/app/actions";
import BottomBar from "@/app/components/BottomBar";
import SelectCategory from "@/app/components/SelectCategory";
import { CreationSubmit } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>
      <form action={addCategory}>
        <input type="hidden" name="homeId" value={params.id} />

        <SelectCategory />
        <BottomBar />
      </form>
    </>
  );
}

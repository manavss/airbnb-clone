"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/catergories";
import Image from "next/image";
import { useState } from "react";

function SelectCategory() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
      <input type="hidden" name="categoryName" value={selected || ""} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            onClick={() => {
              setSelected(item.name);
            }}
            className={`flex justify-center ${
              selected === item.name ? "border-2 border-primary" : ""
            }`}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
                className="w-8 h-8"
              />
              <h3>{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default SelectCategory;

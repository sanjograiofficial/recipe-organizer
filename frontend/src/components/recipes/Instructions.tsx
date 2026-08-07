import { useEffect } from "react";

interface Instruction {
  id: number;
  order: number;
  description: string;
}

interface Props {
  instructions: Instruction[];
}

const Instructions = ({ instructions }: Props) => {
  return (
    <section className="bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-8">Instructions</h2>

      <div className="space-y-6">
        {instructions.map((instruction) => (
          <div key={instruction.id} className="flex gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
              {instruction.order}
            </div>

            <p className="leading-7 text-gray-700">{instruction.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Instructions;

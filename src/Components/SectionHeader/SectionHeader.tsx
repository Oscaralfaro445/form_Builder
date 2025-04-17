import { ReactNode } from "react";

interface DetailsPropType {
  title?: string;
  description?: string;
}

export function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-20 mb-4 px-4 shadow-sm rounded-md bg-white flex justify-between items-center">
      {children}
    </div>
  );
}

function Details({ title, description }: DetailsPropType) {
  return (
    <div className="flex flex-col">
      <p className="font-bold text-base text-gray-600">{title}</p>
      <p className="font-normal text-xs text-gray-400">{description}</p>
    </div>
  );
}

function Buttons({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center sm:flex-row">{children}</div>
  );
}

SectionHeader.Details = Details;
SectionHeader.Buttons = Buttons;

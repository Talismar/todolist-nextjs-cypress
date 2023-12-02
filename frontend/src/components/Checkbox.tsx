import React from "react";
import checkIconSvg from "../../public/icons/check-icon-white-sm.svg";
import Image from "next/image";

type CheckboxProps = {
  checked: boolean;
  id: string;
  onClick(): void;
};

function Checkbox({ checked, id, onClick }: CheckboxProps) {
  const style = checked
    ? "bg-purpleDark hover:bg-purple"
    : "box-border border-[1.5px] border-blue hover:bg-[#0C1C26]";

  return (
    <div
      id={id}
      className={`min-w-[17.45px] h-[17.45px] ${style} cursor-pointer rounded-full flex items-center`}
      onClick={onClick}
    >
      {checked && <Image src={checkIconSvg} alt="..." className="m-auto" />}
    </div>
  );
}

export default Checkbox;

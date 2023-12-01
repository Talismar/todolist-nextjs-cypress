import React, { ComponentProps } from "react";
import plusCircle from "../../public/icons/plus-circle-gray100-sm.svg";
import Image from "next/image";
type ButtonProps = ComponentProps<"button">;

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="bg-blue p-4 hover:bg-blueDark focus:border-[2px]  focus:border-gray-100 outline-none cursor-pointer flex items-center gap-2 rounded-lg font-bold text-sm text-gray-100"
      {...rest}
    >
      {children}
      <Image src={plusCircle} alt="Plus circle svg." />
    </button>
  );
}

export default Button;

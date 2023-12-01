import React, { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

function Input({ ...rest }: InputProps) {
  return (
    <input
      className="bg-gray-500 outline-none placeholder:text-gray-300 text-gray-100 p-4 leading-6 w-full border-gray-700 focus:border-purpleDark border-[1px] rounded-lg"
      {...rest}
    />
  );
}

export default Input;

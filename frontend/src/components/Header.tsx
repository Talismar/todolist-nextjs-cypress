import React from "react";
import Button from "./Button";
import systemLogo from "../../public/icons/system-logo.svg";
import Image from "next/image";

function Header() {
  return (
    <header className="flex justify-center pt-16 pb-20">
      <Image src={systemLogo} alt="System Logo" />
    </header>
  );
}

export default Header;

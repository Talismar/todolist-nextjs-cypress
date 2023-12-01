import Image from "next/image";
import React from "react";
import clipboardImg from "../../public/clipboard-md.png";

function ListEmpty() {
  return (
    <div className="flex flex-col items-center px-6 py-16 border-t-[1px] border-gray-400 w-full rounded-lg">
      <Image src={clipboardImg} alt="Clipboard Image" className="mb-4" />
      <strong className="text-gray-300">
        Você ainda não tem tarefas cadastradas
      </strong>
      <span className="text-gray-300">
        Crie tarefas e organize seus itens a fazer
      </span>
    </div>
  );
}

export default ListEmpty;

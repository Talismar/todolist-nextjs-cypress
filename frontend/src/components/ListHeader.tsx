import React from "react";
import ListEmpty from "./ListEmpty";

type ListHeaderProps = {
  total: number;
  totalDone: number;
  totalDoing: number;
};

function ListHeader({ total, totalDoing, totalDone }: ListHeaderProps) {
  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex gap-2 items-center">
          <h3 className="text-blue font-bold text-sm">Tarefas criadas</h3>
          <p className="rounded-full px-2 py-[2px] text-[12px] bg-gray-400 font-bold text-gray-200">
            {total}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h3 className="text-purple font-bold text-sm">Concluídas</h3>
          <p className="rounded-full px-2 py-[2px] text-[12px] bg-gray-400 font-bold text-gray-200">
            {totalDone} de {totalDoing}
          </p>
        </div>
      </div>

      {total === 0 && <ListEmpty />}
    </>
  );
}

export default ListHeader;

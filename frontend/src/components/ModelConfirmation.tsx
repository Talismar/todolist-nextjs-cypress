import React from "react";

type ModelConfirmationProps = {
  label: string;
  isOpen: boolean;
  handleCancel(): void;
  handleConfirm(): void;
};

function ModelConfirmation({
  label,
  isOpen,
  handleCancel,
  handleConfirm,
}: ModelConfirmationProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl flex flex-col space-y-8">
        <p className="text-gray-700 font-bold">{label}</p>

        <div className="flex justify-around">
          <button
            onClick={handleCancel}
            className="bg-dangler hover:bg-red-600 p-2 rounded-md font-bold text-sm px-8 text-gray-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue hover:bg-blueDark p-2 rounded-md font-bold text-sm px-8 text-gray-100 cursor-pointer"
          >
            Confirme
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModelConfirmation;

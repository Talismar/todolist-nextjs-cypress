"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

function UploadFile() {
  const [fileURL, setFileURL] = useState("");

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files instanceof FileList) {
      const file = files[0];

      setFileURL((window.URL || window.webkitURL).createObjectURL(file));
    }
  }

  return (
    <div>
      <form>
        <input type="file" name="upload" id="upload" onChange={handleUpload} />
      </form>

      {fileURL.trim().length > 0 && (
        <div className="file-demo">
          <Image src={fileURL} alt="Altenative text" width={400} height={400} />
        </div>
      )}
    </div>
  );
}

export default UploadFile;

import React, { useState, useRef } from "react";
import { Download, Clipboard } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const ProfileLink = ({ username }: { username: string }) => {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const profileUrl = `${process.env.NEXT_PUBLIC_API_URL}${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const qrCanvas = qrRef.current as HTMLCanvasElement;
      const link = document.createElement("a");
      link.href = qrCanvas.toDataURL("image/png");
      link.download = `${username}_qr.png`;
      link.click();
    }
  };

  return (
    <div className="bg-gray-100 h-fit rounded-[30px] p-5 ">
      <h2 className="text-lg font-medium text-left pb-3">
        Your Portfolio Link
      </h2>
      <div className="flex items-center justify-center flex-col">
        <div className="flex flex-row gap-2 justify-center items-center">
          {/* QR Code */}
          <div className="bg-white p-2 rounded-md shadow-md">
            <QRCodeCanvas value={profileUrl} size={128} ref={qrRef} />
          </div>
          <button
            className="p-2 bg-[--primary]   text-black rounded-full hover:bg-gray-200 transition"
            onClick={handleDownloadQR}
          >
            <Download size={20} />
          </button>
        </div>

        {/* Copy Link Section */}
        <div
          className="border border-gray-700 w-full h-fit rounded-full mt-5 flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition"
          onClick={handleCopy}
        >
          <p className="text-sm text-center truncate">{profileUrl}</p>
          <Clipboard size={16} />
        </div>

        {copied && <p className="text-green-600 text-xs mt-2">Copied!</p>}
      </div>
    </div>
  );
};

export default ProfileLink;

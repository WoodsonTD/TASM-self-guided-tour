import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import Button from '../ButtonPanel/Button.js';

function QRCodeComponent({ value, exhibitID }) {
  const qrCodeRef = useRef(null);

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(qrCodeRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save("QRCode_"+exhibitID + ".pdf");
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-black">Generated QR Code:</h3>
      <div ref={qrCodeRef} className="mb-1 pt-2 drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]">
        <QRCode value={value} size={128} />
        <p className="text-black py-2">Exhibit ID: {exhibitID}</p>
      </div>
      <Button
        label="Download as PDF"
        onClick={handleDownloadPDF}
        className="btn rounded-full p-3 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}

export default QRCodeComponent;

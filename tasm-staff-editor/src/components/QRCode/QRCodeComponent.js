import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import Button from '../ButtonPanel/Button.js';

function QRCodeComponent({ value }) {
  const qrCodeRef = useRef(null);

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(qrCodeRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('QRCode.pdf');
  };

  return (
    <div>
      <div ref={qrCodeRef}>
        <QRCode value={value} className="w-28 h-28" />
      </div>
      {/* <button onClick={handleDownloadPDF}>Download QR Code as PDF</button> */}
      <Button
        label="Download as PDF"
        onClick={handleDownloadPDF}
        className="btn rounded-full p-3 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}

export default QRCodeComponent;

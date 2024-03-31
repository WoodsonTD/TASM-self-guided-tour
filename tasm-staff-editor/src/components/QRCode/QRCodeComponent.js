import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';

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
                <QRCode value={value} size={256} />
            </div>
            {/* <button onClick={handleDownloadPDF}>Download QR Code as PDF</button> */}
            <button onClick={handleDownloadPDF} type="submit" name='submit' className="btn rounded-r-full pr-1 pl-3 py-1 text-xl drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]">Download QR Code as PDF</button>
        </div>
    );
}

export default QRCodeComponent;

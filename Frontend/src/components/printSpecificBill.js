import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Button } from "@chakra-ui/react";

export const FetchAndGeneratePDF = ({billId}) => {
  const [data, setData] = useState(null);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/specific-bill/${billId}`); // Replace with your API URL
      const jsonData = await response.json();
      setData(jsonData);

      // Generate the PDF after setting the data
      generatePDF(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Generate the PDF
  const generatePDF = (billData) => {
    const doc = new jsPDF();

    // Constants for layout
    const marginLeft = 10;
    const marginTop = 20;
    let yOffset = marginTop;

    // Header Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text('Billing Invoice', marginLeft, yOffset);
    
    // Line under the header
    doc.setLineWidth(0.5);
    yOffset += 5;
    doc.line(marginLeft, yOffset, 200, yOffset);
    
    yOffset += 10;  // Space after line

    // Customer Name
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Customer Name: ${billData.customerName}`, marginLeft, yOffset);
    yOffset += 10;  // Move down for the next line

    // Bill Date
    doc.text(`Bill Date: ${new Date(billData.billDate).toLocaleString()}`, marginLeft, yOffset);
    yOffset += 10;  // Move down for the next line

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(marginLeft, yOffset, 200, yOffset);
    yOffset += 5;  // Move down after the line

    // Table Header for Products
    doc.setFont("helvetica", "bold");
    doc.text('Product Name', marginLeft, yOffset);
    doc.text('Quantity', marginLeft + 80, yOffset);
    doc.text('Price', marginLeft + 130, yOffset);
    doc.text('Total', marginLeft + 160, yOffset);
    
    yOffset += 10;  // Move down for the product rows

    // Reset font to normal for product rows
    doc.setFont("helvetica", "normal");

    // Add products
    billData.products.forEach((product) => {
        const productName = product.productId.name;
        const quantity = product.quantity;
        const price = product.price;
        const total = quantity * price;

        doc.text(productName, marginLeft, yOffset);
        doc.text(`${quantity}`, marginLeft + 80, yOffset);
        doc.text(`$${price.toFixed(2)}`, marginLeft + 130, yOffset);
        doc.text(`$${total.toFixed(2)}`, marginLeft + 160, yOffset);

        yOffset += 10;  // Move down for the next product
    });

    // Line separator before total amount
    yOffset += 5;
    doc.setLineWidth(0.5);
    doc.line(marginLeft, yOffset, 200, yOffset);
    yOffset += 5;  // Move down for the total amount

    // Total Amount
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount: $${billData.totalAmount.toFixed(2)}`, marginLeft, yOffset);
    
    // Footer Section
    yOffset += 20;
    doc.setFont("helvetica", "italic");
    doc.text('Thank you for your business!', marginLeft, yOffset);

    // Save the PDF
    doc.save('bill.pdf');
};

  return (
    <Button onClick={fetchData} colorScheme="blue" mt={4}>
      Print Bill
    </Button>
  );
};

import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class ReportsService {
  constructor(
    private readonly mailService: MailService,
    private readonly statisticsService: StatisticsService,
  ) {}

  async sendSalesReportByEmail(recipientEmail: string): Promise<void> {
    // Get sales data for the report
    const totalSalesCount = await this.statisticsService.getTotalSalesCount();
    const totalRevenue = await this.statisticsService.getTotalRevenue();
    const topSoldMedications =
      await this.statisticsService.getTopSoldMedications();
    const averageSalesPerDay =
      await this.statisticsService.getAverageSalesCountPerDay();

    // Create a PDF document
    const pdfDoc = new PDFDocument();
    const uniqueFileName = `receipt_${Date.now()}_${Math.floor(
      Math.random() * 1000,
    )}.pdf`;
    const pdfFilePath = path.join(__dirname, uniqueFileName);
    const pdfStream = fs.createWriteStream(pdfFilePath);

    pdfDoc.pipe(pdfStream);

    // Add report details
    pdfDoc.fontSize(16).text('Sales Report', { align: 'center' });
    pdfDoc.fontSize(12).text('--------------------------');

    // Add total sales information
    pdfDoc.fontSize(14).text('Total Sales', { underline: true });
    pdfDoc.fontSize(12).text(`Total Sales Count: ${totalSalesCount}`);
    pdfDoc.fontSize(12).text('--------------------------');
    pdfDoc.fontSize(12).text(`Total Revenue: $${totalRevenue}`);
    pdfDoc.fontSize(12).text('--------------------------');

    // Add top sold medications information
    pdfDoc.fontSize(14).text('Top Sold Medications', { underline: true });
    for (const medication of topSoldMedications) {
      pdfDoc.fontSize(12).text(`Medication: ${medication.TradeName}`);
      pdfDoc.fontSize(12).text(`Total Sold: ${medication.TotalSold}`);
      pdfDoc.fontSize(12).text(`Total Revenue: $${medication.TotalRevenue}`);
      pdfDoc.fontSize(12).text('--------------------------');
    }

    // Add average sales count per day information
    pdfDoc
      .fontSize(14)
      .text('Average Sales Count Per Day', { underline: true });
    for (const day of averageSalesPerDay) {
      pdfDoc.fontSize(12).text(`Day: ${day.DayName}`);
      pdfDoc.fontSize(12).text(`Average Sales: ${day.AvgTotalQuantity}`);
      pdfDoc.fontSize(12).text('--------------------------');
    }

    pdfDoc
      .fontSize(12)
      .text(`This report was generated on: ${new Date().toLocaleDateString()}`);
    // End the PDF document
    pdfDoc.end();

    // Send the PDF report via email
    await this.mailService.sendEmailWithAttachment(pdfFilePath, recipientEmail);
  }

  async sendSaleReceiptByEmail(
    saleInfo: any,
    recipientEmail: string,
  ): Promise<void> {
    // Создайте PDF документ
    const pdfDoc = new PDFDocument();
    const uniqueFileName = `receipt_${Date.now()}_${Math.floor(
      Math.random() * 1000,
    )}.pdf`;
    const pdfFilePath = path.join(__dirname, uniqueFileName);
    const pdfStream = fs.createWriteStream(pdfFilePath);

    pdfDoc.pipe(pdfStream);

    // Заполните PDF данными из saleInfo
    pdfDoc.fontSize(14).text(`Receipt for Sale ID: ${saleInfo.SaleID}`);
    pdfDoc.fontSize(12).text(`Total Price: $${saleInfo.TotalPrice}`);
    // pdfDoc.fontSize(12).text(`Sale Date: ${saleInfo.SaleDate}`);
    pdfDoc.fontSize(12).text('--------------------------');

    // Переберите OrderItems
    // Переберите OrderItems
    for (const orderItem of saleInfo.OrderItems) {
      pdfDoc.fontSize(12).text(`Order ID: ${orderItem.OrderID}`);
      pdfDoc.fontSize(12).text(`Quantity: ${orderItem.Quantity}`);

      // Отобразите данные поставки (Supply)
      const supply = orderItem.Supply;
      pdfDoc.fontSize(12).text(`Supply ID: ${supply.SupplyID}`);
      pdfDoc.fontSize(12).text(`Supply Date: ${supply.SupplyDate}`);
      pdfDoc.fontSize(12).text(`Expiry Date: ${supply.ExpiryDate}`);

      // Отобразите данные о медикаменте (Medication)
      const medication = supply.Medication;

      if (medication) {
        pdfDoc.fontSize(12).text(`Medication ID: ${medication.MedicationID}`);
        pdfDoc.fontSize(12).text(`Trade Name: ${medication.TradeName}`);
        pdfDoc
          .fontSize(12)
          .text(`Packaging Quantity: ${medication.PackagingQuantity}`);

        // Вычислите и отобразите Subtotal
        const subtotal = supply.UnitPrice * orderItem.Quantity;
        pdfDoc
          .fontSize(12)
          .text(
            `Subtotal: $${subtotal.toFixed(2)} (${supply.UnitPrice} * ${
              orderItem.Quantity
            })`,
          );
      } else {
        pdfDoc.fontSize(12).text('Medication information not available');
      }

      pdfDoc.fontSize(12).text('--------------------------');
    }

    pdfDoc
      .fontSize(12)
      .text('Thank you for your purchase! We hope to see you again :)');

    pdfDoc.fontSize(12).text(`Sale Date: ${saleInfo.SaleDate}`);

    // Завершите создание PDF
    pdfDoc.end();

    // Отправьте PDF на адрес электронной почты
    await this.mailService.sendEmailWithAttachment(pdfFilePath, recipientEmail);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Medication } from 'src/medication/entities/medication.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async getTopSoldMedications(): Promise<any[]> {
    const query = `
      SELECT
        m.MedicationID,
        m.TradeName,
        m.PackagingQuantity,
        SUM(oi.Quantity) AS TotalSold,
        SUM(oi.Quantity * s.UnitPrice) AS TotalRevenue
      FROM
        emilevi4_db.dbo.medication m
      JOIN
        emilevi4_db.dbo.supply s ON m.MedicationID = s.medicationMedicationID
      JOIN
        emilevi4_db.dbo.order_item oi ON s.SupplyID = oi.supplySupplyID
      GROUP BY
        m.MedicationID,
        m.TradeName,
        m.PackagingQuantity
      ORDER BY
        TotalRevenue DESC,
        TotalSold DESC;
    `;

    return await this.medicationRepository.query(query);
  }

  async getAverageSalesCountPerDay(): Promise<any[]> {
    return this.saleRepository.query(`
      WITH DailySaleTotals AS (
        SELECT 
          DATEPART(WEEKDAY, SaleDate) AS DayOfWeek,
          SUM(CAST(oi.Quantity AS FLOAT)) AS TotalQuantity
        FROM 
          sale s
        JOIN 
          order_item oi ON s.SaleID = oi.saleSaleID
        GROUP BY 
          DATEPART(WEEKDAY, SaleDate)
      )
      SELECT 
        DayOfWeek,
        CASE 
          WHEN DayOfWeek = 1 THEN 'Sunday'
          WHEN DayOfWeek = 2 THEN 'Monday'
          WHEN DayOfWeek = 3 THEN 'Tuesday'
          WHEN DayOfWeek = 4 THEN 'Wednesday'
          WHEN DayOfWeek = 5 THEN 'Thursday'
          WHEN DayOfWeek = 6 THEN 'Friday'
          WHEN DayOfWeek = 7 THEN 'Saturday'
        END AS DayName,
        AVG(TotalQuantity) AS AvgTotalQuantity
      FROM 
        DailySaleTotals
      GROUP BY 
        DayOfWeek
      ORDER BY 
        DayOfWeek;
    `);
  }

  async getTopManufacturersBySalesCount(): Promise<any[]> {
    return this.manufacturerRepository.query(`
      SELECT 
        mf.ManufacturerID,
        mf.ManufacturerName,
        SUM(oi.Quantity) AS TotalSold
      FROM 
        manufacturer mf
      JOIN 
        medication m ON mf.ManufacturerID = m.manufacturerManufacturerID
      JOIN 
        supply s ON m.MedicationID = s.medicationMedicationID
      JOIN 
        order_item oi ON s.SupplyID = oi.supplySupplyID
      GROUP BY 
        mf.ManufacturerID, mf.ManufacturerName
      ORDER BY 
        TotalSold DESC;
    `);
  }

  async getDailySaleStatistics(): Promise<any[]> {
    return this.saleRepository.query(`
      WITH DailySaleTotals AS (
        SELECT 
          CONVERT(date, SaleDate) AS SaleDay,
          COUNT(*) AS TotalSales,
          SUM(TotalPrice) AS TotalRevenue
        FROM 
          sale
        GROUP BY 
          CONVERT(date, SaleDate)
      )

      SELECT 
        SaleDay,
        TotalSales,
        TotalRevenue
      FROM 
        DailySaleTotals
      ORDER BY 
        SaleDay DESC;
    `);
  }

  async getAverageUnitPriceByManufacturer(): Promise<any[]> {
    const query = `
      SELECT
        mf.ManufacturerID,
        mf.ManufacturerName,
        AVG(s.UnitPrice) AS AvgUnitPrice
      FROM 
        emilevi4_db.dbo.manufacturer mf
      JOIN 
        emilevi4_db.dbo.medication m ON mf.ManufacturerID = m.manufacturerManufacturerID
      JOIN 
        emilevi4_db.dbo.supply s ON m.MedicationID = s.medicationMedicationID
      GROUP BY 
        mf.ManufacturerID, mf.ManufacturerName
      ORDER BY 
        AvgUnitPrice DESC;
    `;

    return await this.manufacturerRepository.query(query);
  }
}

import { injectable } from '@needle-di/core';

@injectable()
export class ReportsService {
  findAll() {}
  generateOccupancyReport() {}
  generateWaitingListReport() {}
  generateStudentHistoryReport() {}
  generateRevenueReport() {}
  generateUnpaidFeesReport() {}
  generateApplicationSummaryReport() {}
  generateRoomUtilizationReport() {}
  generateCustomReport() {}
  downloadReport() {}
}

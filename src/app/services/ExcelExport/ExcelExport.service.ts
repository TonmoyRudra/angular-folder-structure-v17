import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  constructor() {}

  exportToExcelAllData(data: any[], fileName: string, sheetName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { [sheetName]: worksheet },
      SheetNames: [sheetName],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  exportToExcelWithSpecificColumn(
    data: any[],
    fileName: string,
    sheetName: string,
    columnsToExport: any[],
    extraColumns: any[] = [],
    patternData?: any[]
  ): void {
    const filteredData = data.map((item) => {
      const filteredItem = {};
      columnsToExport.forEach((column) => {
        filteredItem[column.header] = item[column.field];
      });
      extraColumns.forEach((column) => {
        filteredItem[column.header] = column.value;
      });
      return filteredItem;
    });
     
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);

    const worksheetPatternData: XLSX.WorkSheet = XLSX.utils.json_to_sheet(patternData);

    const workbook: XLSX.WorkBook = {
      Sheets: { [sheetName]: worksheet, ['Pattern&SeriesSetting']: worksheetPatternData },
      SheetNames: [sheetName,'Pattern&SeriesSetting'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.click();
  }
}

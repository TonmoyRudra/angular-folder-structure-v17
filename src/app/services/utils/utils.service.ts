import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResult } from 'src/app/shared/models/result';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { jsPDF } from 'jspdf'; 
import { saveAs } from 'file-saver-es';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private uploaderDataSourceLoadObs$: BehaviorSubject<any[]> =
    new BehaviorSubject([]);

  constructor(  public localStorageService : LocalStorageService) {}

  getUploaderDataSourceLoaderObs(): Observable<any> {
    return this.uploaderDataSourceLoadObs$.asObservable();
  }
  setUploaderDataSourceLoaderObs(data) {
    this.uploaderDataSourceLoadObs$.next(data);
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  dynamicSortForDate(property) {
    var sortOrder = 1;

    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        new Date(a[property]) < new Date(b[property])
          ? -1
          : new Date(a[property]) > new Date(b[property])
          ? 1
          : 0;
      return result * sortOrder;
    };
  }
  dynamicSortForDateDesc(property) {
    var sortOrder = 1;

    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        new Date(a[property]) < new Date(b[property])
          ? -1
          : new Date(a[property]) > new Date(b[property])
          ? -1
          : 0;
      return result * sortOrder;
    };
  }
  distinctCustom(arrayData, key) {
    const arrayUniqueByKey = [
      ...new Map(arrayData.map((item) => [item[key], item])).values(),
    ];

    console.log('Distinct key: ', key);
    console.log('Distinct data: ', arrayUniqueByKey);
    return arrayUniqueByKey;
  }

  formattedDate(dateValue: string): string {
    var date = new Date(dateValue);

    // Get year, month, and day part from the date
    var year = date.toLocaleString('default', { year: 'numeric' });
    var month = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + '-' + month + '-' + day;

    return formattedDate;
  }

  formattedDateddMMyyyy(dateValue: string): string {
    var date = new Date(dateValue);

    // Get year, month, and day part from the date
    var year = date.toLocaleString('default', { year: 'numeric' });
    var month = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });

    // Generate yyyy-mm-dd date string
    var formattedDate = day + '/' + month + '/' + year;

    return formattedDate;
  }
  formattedDateddMMMyyyy(dateValue: any, separator: string = '/'): string {
    var date = new Date(dateValue);

    // Get year, month, and day part from the date
    var year = date.toLocaleString('default', { year: 'numeric' });
    var month = date.toLocaleString('default', { month: 'short' });
    var day = date.toLocaleString('default', { day: '2-digit' });

    // Generate yyyy-mm-dd date string
    var formattedDate = day + separator + month + separator + year;

    return formattedDate;
  }
  public getSlNo(result: IResult) {
    let slNo = 1;
    result.values.forEach((element: any) => {
      element.slNo = slNo++;
    });
    return result;
  }

  getEmailApprover(){
    if(this.localStorageService.getEmailOnlineApprover().length > 0){
      return true;
    } else return false;
  }

  toCamelCase(obj) {
    const result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
          .replace(/^[A-Z]/, letter => letter.toLowerCase());
            result[camelKey] = obj[key];
        }
    }
    return result;
}

generateMonthArray() {

  let dayDiff = 15;
  if(this.localStorageService.getSessionUser().isAdmin == true || this.localStorageService.getSessionUser().isSuperAdmin == true){
    dayDiff = 45
  }
  const months = [];
  let currentDate = new Date(); // Current date
  let year = currentDate.getFullYear();

  // Logic: 1. Previous month will be kept opened up to 15th of current month for changing roster
  // Check if the current date is after the 15th of the month
  if (currentDate.getDate() <= dayDiff) {
    // If it is, set the start date to the beginning of the next month
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  // Loop through each month
  for (let month = 0; month < 12; month++) {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + month, 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + month + 1, 0);
  
    
    months.push({
      id: month + 1, // Month ID (1-based)
      name: startDate.toLocaleString('en-US', { month: 'short' }) + ', ' + startDate.getFullYear(), // Month name
      fromDate: this.formattedDateddMMMyyyy(startDate), // Start date of the month
      toDate: this.formattedDateddMMMyyyy(endDate), // End date of the month
    });
  }

  return months;
}

onExportingFromDataGrid(e, fileName) {
  if (e.format === 'pdf') {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save(fileName + '.pdf');
    });
  } else {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);

    exportDataGridToXLSX({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName+'.xlsx');
      });
    });
    e.cancel = true;
  }
}

}

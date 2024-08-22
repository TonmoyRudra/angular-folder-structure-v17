import { GlobalService } from '../../../services/global/global.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-uploader-from-excel',
  templateUrl: './uploader-from-excel.component.html',
  styleUrls: ['./uploader-from-excel.component.css'],
})
export class UploaderFromExcelComponent implements OnInit {
  @Output() showUploaderClick = new EventEmitter<any>();
  @Output() submitUploadDataClick = new EventEmitter<any>();
  @Input() catagory: string;
  @Input() subcatagory: string;
  @Input() title: string;
  @Input() downloadCSVTempleteLink: string;
  @Input() showDownloadTemplateButton: boolean = false;
  dataSource: any = [];

  columns: any = [];
  fileData: File;
  showType: string = 'bulk';
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(
    public globalService: GlobalService,
    public utilService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.utilService
      .getUploaderDataSourceLoaderObs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //this.dataSource = [];
          this.dataSource = result;
          this.makeColumn();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.onFileChange($event);
    //this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event) {
    this.onFileChange($event);
  }

  onFileChange(event: any) {
    /* wire up file reader */

    const target: DataTransfer = <DataTransfer>event.target;
    // if (target.files.length !== 1) {
    //   this.globalService.showSwal('Warning!!' ,'Cannot use multiple files', 'warning');
    //   throw new Error('Cannot use multiple files');
    // }

    if (target.files[0]) {
      this.fileData = target.files[0];
      if (this.fileData.name.split('.').pop() != 'xlsx') {
        this.globalService.showSwal(
          'Warning!!',
          'Please choose only xlsx file format.',
          'warning',
        );
      } else {
        this.dataSource = [];
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(this.fileData);
        reader.onload = (e: any) => {
          /* create workbook */
          const binarystr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

          /* selected the first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];

          /* save data */
          const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
          let slNo = 1;
          this.dataSource = data;
          // this.datasource.forEach((element) => {
          //   element.slNo = slNo++;
          // });

          this.makeColumn();
          //this.dataSource.splice(0,1); // slice 1st row [0 index], because of dummy info text
          console.log(this.dataSource); // Data will be logged in array format containing objects

          this.submitUploadDataClick.emit(this.dataSource); //
        };
      }
    }
    // Clear the file picker.
    let fileDropElemRef: any = document.getElementById('fileDropRef');
    fileDropElemRef.value = '';
  }
  makeColumn() {
    this.columns = []; // Make Column for Grid
    if (this.dataSource.length != 0) {
      var key = Object.keys(this.dataSource[0]);
      key.forEach((element) => {
        if (element == 'slNo') {
          this.columns.unshift(element);
        } else {
          this.columns.push(element);
        }
      });
    }
  }
  // Not use
  submitFile(e) {
    Swal.fire({
      title: 'Think!!',
      text: 'Do you want to upload bulk data?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Upload!',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.submitUploadDataClick.emit(this.dataSource);
        // this.uploaderService
        //   .uploadFile(this.fileData, this.subcatagory)
        //   .subscribe(
        //     (result) => {
        //       console.log(result);
        //       if (result.success) {
        //         this.globalService.showSwal(
        //           'Uploaded!!',
        //           'Data is uploading..... It will take some time. Please wait and check the list',
        //           'success'
        //         );
        //         this.datasource = [];
        //       }
        //     },
        //     (err) => {
        //       console.log(err);
        //       this.globalService.showSwal(
        //         'Warning!!',
        //         'File Parsing Error. Please check the file or Download from template.',
        //         'warning'
        //       );
        //     }
        //   );
      }
    });
  }

  backTolist() {
    this.showUploaderClick.emit(false);
  }

  downloadTemplete() {
    if (this.downloadCSVTempleteLink) {
      window.open(this.downloadCSVTempleteLink, '_blank');
    } else {
      Swal.fire('Warning', 'No Download file found.', 'warning');
    }
  }

  onRowPrepared(e) {
    if (e.rowType == 'data' && e.key.validationMessages != null) {
      e.rowElement.style.background = '#f44336';
      e.rowElement.style.color = 'white';
    }
  }
}

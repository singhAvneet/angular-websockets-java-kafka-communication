import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-message-stream',
  templateUrl: './message-stream.component.html',
  styleUrls: ['./message-stream.component.css']
})
export class MessageStreamComponent implements  OnDestroy {

  myForm: FormGroup;



  private destroy$ = new Subject();

  constructor(private frmBuilder: FormBuilder,
    private http: HttpClient,) {

    this.myForm = frmBuilder.group(
      { nMessage: '0',consumers:'' }
    );
  }



  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }

  submit(): void {
    const nMessage = this.myForm.controls.nMessage.value;
    const consumer = this.myForm.controls.consumers.value;  
    this.http.post(`http://localhost:8080/api/kafka/sample`, { message: nMessage,destination:consumer })
      .pipe(
        catchError(this.handleError.bind(this)),
        takeUntil(this.destroy$)
      ).subscribe((resp: HttpResponse<any>) => {

      });
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return of(null);
  }

}

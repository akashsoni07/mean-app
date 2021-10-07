import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  subject = new Subject();
  constructor() {}

  setMsg(msg:any) {
    this.subject.next(msg);
    setTimeout(() => {
      this.subject.next({ msg: '' });
    }, 5000);
  }

  getMsg(): Observable<any> {
    return this.subject.asObservable();
  }
}

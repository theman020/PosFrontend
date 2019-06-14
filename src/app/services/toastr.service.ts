import { Injectable } from '@angular/core';

declare let toastr
@Injectable()
export class ToastrService {

  constructor() { }

  success(message: string, title?: string) {
    toastr.success(message, title, { positionClass: 'toast-top-right' });
  }

  info(message: string, title?: string) {
    toastr.info(message, title, { positionClass: 'toast-top-right' });
  }

  warning(message: string, title?: string) {
    toastr.warning(message, title, { positionClass: 'toast-top-right' });
  }

  error(message: string, title?: string) {
    toastr.error(message, title, { positionClass: 'toast-top-right' });
  }

}

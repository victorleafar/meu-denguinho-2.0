import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  showInfo(message: string): void {
    this.toastr.info(message, 'Información');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error');
  }
}

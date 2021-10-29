import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.css'],
})
export class ErrorViewComponent implements OnInit {
  message: String = 'ERROR_API_UNREACHABLE';
  showError: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  close() {
    this.showError = false;
  }

  show() {
    this.showError = true;
    window.setTimeout(() => {
      this.showError = false;
    }, 1500);
  }
}

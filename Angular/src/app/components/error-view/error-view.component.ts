import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.css'],
})
export class ErrorViewComponent implements OnInit {
  message: String = 'sERROR_API_UNREACHABLE';
  showError: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}

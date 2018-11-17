import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() page: number;
  @Input() total_count: number;

  @Output() nextPage = new EventEmitter();
  @Output() previousPage = new EventEmitter();

  maxPages: number;

  ngOnInit() {
    this.maxPages = Math.ceil(this.total_count / 10);
  }

  onNext() {
    this.nextPage.emit();
  }

  onPrevious() {
    this.previousPage.emit();
  }

  firstPage() {
    return this.page === 1;
  }

  lastPage() {
    return this.page === this.maxPages || this.total_count < 11;
  }
}

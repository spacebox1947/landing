import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() numberOfPages!: number; //input from article list
  @Input() numberOfPages$!: Observable<number>;
  @Output() newPageNumber: EventEmitter<number> = new EventEmitter;
  pageOptions: number[];

  currentPage = 1;

  constructor() {
    // this needs work!
    // console.log(`Number of pagination pages: ${this.numberOfPages}`)
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2
    ].filter(pageNumber => pageNumber >= 1 && pageNumber <= this.numberOfPages)
  }

  ngOnInit(): void {
    this.numberOfPages$.subscribe((value) => {
      this.numberOfPages = value;
      this.paginate();
    })
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginate();
    this.newPageNumber.emit(page);
  }

  paginate(): void {
    //console.log(`Number of pagination pages: ${this.numberOfPages}`)
    this.pageOptions = [
      this.currentPage - 2,
      this.currentPage - 1,
      this.currentPage,
      this.currentPage + 1,
      this.currentPage + 2
    ].filter(pageNumber => pageNumber >= 1 && pageNumber <= this.numberOfPages)
  }

}

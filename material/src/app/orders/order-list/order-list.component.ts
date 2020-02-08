import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, PageEvent } from '@angular/material';

const ELEMENT_DATA = [
  {
    orderDate: new Date(),
    orderNumber: 100,
    total: 29.99,
    description: '21lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 101,
    total: 39.99,
    description: '51lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 102,
    total: 59.99,
    description: '11lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 103,
    total: 29.99,
    description: '21lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 104,
    total: 39.99,
    description: '51lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 105,
    total: 59.99,
    description: '11lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 106,
    total: 29.99,
    description: '21lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 107,
    total: 39.99,
    description: '51lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 108,
    total: 59.99,
    description: '11lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 109,
    total: 29.99,
    description: '21lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 110,
    total: 39.99,
    description: '51lb of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 111,
    total: 59.99,
    description: '11lb of tuna',
    isChecked: false
  }
]

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = ['action', 'orderNumber', 'orderDate', 'description', 'total'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource: MatTableDataSource<object>;

  length = 100;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [1, 2, 5, 10];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  pageEvent: PageEvent;

  constructor() { }

  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  loadData(pageIndex, pageSize)
  {
    this.dataSource = new MatTableDataSource<object> (ELEMENT_DATA.slice(pageIndex, pageIndex + pageSize));
  }

  ngOnInit() {
    this.loadData(0, this.pageSize);
    this.dataSource.sort = this.sort;
  }

  selectAll() {
    for(var elm of ELEMENT_DATA)
    {
      elm.isChecked = !elm.isChecked;
    }
  }

}

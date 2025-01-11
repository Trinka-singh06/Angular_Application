import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { ITEMS } from '../../datasource/data';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatChipsModule,
    MatExpansionModule, FormsModule, MatPaginatorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {
  lowQuantity = 5;
  isSortPanelOpen = false;
  filters = ['e-Voucher'];
  sortOrder: 'asc' | 'desc' = 'asc';
  pageSize = 5;
  pageIndex = 0;
  selectedCategory: string = '';

  items = ITEMS;
  sortedItems = [...this.items];
  pagedItems: any[] = [];

  constructor() { }

  ngOnInit() {
    this.updatePagedItems();
  }
 
  toggleSortPanel() {
    this.isSortPanelOpen = !this.isSortPanelOpen; 
  }
  applySort() {
    if (this.sortOrder === 'asc') {
      this.sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.sortedItems.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.toggleSortPanel();
    this.updatePagedItems();
  }

  resetSort() {
    this.sortedItems = [...this.items];
    this.sortOrder = 'asc';
    this.toggleSortPanel();
    this.updatePagedItems();
  }
  getDisplayImage(item: any): string {
    return item.display_img_url || 'assets/placeholder.png';
  }

  getStatusMessage(item: any): string {
    if (item.quantity === 0) {
      return 'Out of Stock';
    }
    if (item.quantity <= this.lowQuantity) {
      return `ON High Demand (Only ${item.quantity} rewards left)`;
    }
    return '';
  }

  removeFilter(filter: string) {
    this.filters = this.filters.filter((f) => f !== filter);
    this.updatePagedItems();
  }

  updatePagedItems() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedItems = this.sortedItems.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedItems();
  }
  selectCategory(category: string) {
    this.selectedCategory = category; 
    if (!this.filters.includes(category)) {
      this.filters.push(category); 
    }
    this.updatePagedItems();
  }
}
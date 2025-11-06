import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { GiftBoxTemplatesLocalService, GiftBoxTemplate } from '../../services/local/giftbox-templates-local.service';

@Component({
  selector: 'app-giftbox-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Header, Footer],
  templateUrl: './giftbox-list.html',
  styleUrl: './giftbox-list.css'
})
export class GiftboxList implements OnInit {
  constructor(private templatesService: GiftBoxTemplatesLocalService) {}

  allGiftboxes: GiftBoxTemplate[] = [];
  giftboxes: GiftBoxTemplate[] = [];
  readonly Math = Math;
  selectedSort = 'default';
  selectedPriceRange = '';
  searchText = '';
  isSortOpen = false;
  sortOptions = [
    { value: 'newest', label: 'Theo mới nhất' },
    { value: 'oldest', label: 'Theo cũ nhất' },
    { value: 'price-low', label: 'Theo giá thấp nhất' },
    { value: 'price-high', label: 'Theo giá cao nhất' }
  ];

  async ngOnInit() {
    window.scrollTo(0, 0);
    this.allGiftboxes = await this.templatesService.getTemplates();
    this.giftboxes = this.allGiftboxes;
  }

  getFinalPrice(g: GiftBoxTemplate): number {
    const discount = g.discountPercent || 0;
    return Math.round(g.price * (1 - discount));
  }

  applyPriceFilter() { this.applyFilters(); }

  applyFilters() {
    let data = this.allGiftboxes.slice();

    // price filter
    if (this.selectedPriceRange) {
      const [minStr, maxStr] = this.selectedPriceRange.split('-');
      const min = Number(minStr);
      const max = maxStr ? Number(maxStr) : Number.POSITIVE_INFINITY;
      data = data.filter(g => {
        const price = this.getFinalPrice(g);
        return price >= min && price <= max;
      });
    }

    // text search by name (case-insensitive, trims extra spaces)
    const q = this.searchText.trim().toLowerCase();
    if (q) {
      data = data.filter(g => g.name.toLowerCase().includes(q));
    }

    this.giftboxes = this.sortGiftboxes(data);
  }

  sortGiftboxes(data: GiftBoxTemplate[]): GiftBoxTemplate[] {
    const sorted = [...data];
    switch (this.selectedSort) {
      case 'price-low':
        return sorted.sort((a, b) => this.getFinalPrice(a) - this.getFinalPrice(b));
      case 'price-high':
        return sorted.sort((a, b) => this.getFinalPrice(b) - this.getFinalPrice(a));
      case 'newest':
        // Sort by sold count descending (most popular first) as proxy for newest
        return sorted.sort((a, b) => (b.sold || 0) - (a.sold || 0));
      case 'oldest':
        // Sort by sold count ascending (least popular first) as proxy for oldest
        return sorted.sort((a, b) => (a.sold || 0) - (b.sold || 0));
      default:
        return sorted;
    }
  }

  selectSort(value: string) {
    this.selectedSort = value;
    this.isSortOpen = false;
    this.applyFilters();
  }

  getSortLabel(): string {
    const opt = this.sortOptions.find(o => o.value === this.selectedSort);
    return opt ? opt.label : 'mặc định';
  }

  clearFilters() {
    this.selectedPriceRange = '';
    this.searchText = '';
    this.selectedSort = 'default';
    this.giftboxes = this.allGiftboxes;
  }
}



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface GiftBox {
  id: string;
  name: string;
  image: string;
  dimensions: string;
  price?: number;
  description?: string;
  type?: string;
}

interface ProductItem {
  id: string;
  name: string;
  price: number;
  images?: string[];
  categoryIds: string[];
  isActive?: boolean;
}

interface CardOption { name: string; image?: string; }
interface Category { id: string; name: string; slug?: string; }

@Component({
  selector: 'app-create-gift-box',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer, HttpClientModule],
  templateUrl: './create-gift-box.html',
  styleUrl: './create-gift-box.css'
})
export class CreateGiftBox implements OnInit {
  giftBoxes: GiftBox[] = [];
  selectedBox: GiftBox | null = null;
  currentStep = 1; // 1: box, 2: items, 3: card+message, 4: review

  // Items selection
  allProducts: ProductItem[] = [];
  filteredProducts: ProductItem[] = [];
  selectedItems: Record<string, number> = {};

  // Filters & sorting (like giftbox-list)
  searchText = '';
  selectedPriceRange = '';
  isSortOpen = false;
  selectedSort: 'popular' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' = 'popular';
  sortOptions = [
    { label: 'Phổ biến', value: 'popular' },
    { label: 'Giá tăng dần', value: 'price-asc' },
    { label: 'Giá giảm dần', value: 'price-desc' },
    { label: 'Tên A-Z', value: 'name-asc' },
    { label: 'Tên Z-A', value: 'name-desc' }
  ] as const;
  currentPage = 1;
  pageSize = 16;
  categories: Category[] = [];
  selectedCategoryIds = new Set<string>();

  // Cards & message
  cards: CardOption[] = [];
  selectedCard: CardOption | null = null;
  activeCardTab: 'choose' | 'write' = 'choose';
  messageTemplates: string[] = [
    'Chúc bạn một ngày thật vui vẻ!',
    'Chúc mừng sinh nhật! Mong bạn luôn hạnh phúc.',
    'Chúc bạn mau khỏe! Luôn vững vàng nhé.',
    'Cảm ơn bạn vì tất cả!'
  ];
  selectedMessageTemplate = '';
  messageText = '';
  messageCharLimit = 300;
  leaveCardBlank = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadGiftBoxes();
    this.loadProducts();
    this.loadCards();
    this.loadCategories();
  }

  loadGiftBoxes() {
    this.http.get<{giftBoxes: GiftBox[]}>('assets/data/gift-boxes.json')
      .subscribe({
        next: (data) => {
          this.giftBoxes = data.giftBoxes;
        },
        error: (error) => {
          console.error('Error loading gift boxes:', error);
          // Fallback data nếu không load được file
          this.giftBoxes = [
            {
              id: 'moments-in-bloom',
              name: 'Hộp Moments in the Bloom',
              image: 'https://res.cloudinary.com/dlci8havj/image/upload/v1762508816/moments_in_bloom.jpg',
              dimensions: '(25x21x9.5cm)'
            },
            {
              id: 'to-be-loved',
              name: 'Hộp To be Loved',
              image: 'https://res.cloudinary.com/dlci8havj/image/upload/v1762508816/to_be_loved.jpg',
              dimensions: '(24x24x10cm)'
            },
            {
              id: 'flowers-in-you',
              name: 'Hộp Flowers in You',
              image: 'https://res.cloudinary.com/dlci8havj/image/upload/v1762508816/flowers_in_you.jpg',
              dimensions: '(24x19x10cm)'
            },
            {
              id: 'love-yourself',
              name: 'Hộp Love Yourself',
              image: 'https://res.cloudinary.com/dlci8havj/image/upload/v1762508816/love_yourself.jpg',
              dimensions: '(24x19x10cm)'
            }
          ];
        }
      });
  }

  selectBox(box: GiftBox) {
    this.selectedBox = box;
    // Thêm animation effect
    const selectedCard = document.querySelector(`[data-box-id="${box.id}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selecting');
      setTimeout(() => {
        selectedCard.classList.remove('selecting');
      }, 300);
    }
  }

  nextStep() {
    if (this.currentStep === 1 && !this.selectedBox) return;
    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  // Data loads
  loadProducts() {
    this.http.get<ProductItem[]>('assets/data/products.json').subscribe({
      next: (data) => {
        this.allProducts = data.filter(p => p.isActive !== false);
        this.applyFilters();
      },
      error: () => {
        this.allProducts = [];
        this.filteredProducts = [];
      }
    });
  }

  loadCards() {
    this.http.get<CardOption[]>('assets/data/cards.json').subscribe({
      next: (data) => this.cards = data,
      error: () => this.cards = []
    });
  }

  loadCategories() {
    this.http.get<Category[]>('assets/data/categories.json').subscribe({
      next: (data) => this.categories = data,
      error: () => this.categories = []
    });
  }

  // Items selection helpers
  incItem(productId: string) {
    this.selectedItems[productId] = (this.selectedItems[productId] || 0) + 1;
  }

  decItem(productId: string) {
    const cur = (this.selectedItems[productId] || 0) - 1;
    if (cur <= 0) delete this.selectedItems[productId]; else this.selectedItems[productId] = cur;
  }

  getSelectedItems() {
    return Object.entries(this.selectedItems)
      .map(([id, qty]) => ({
        product: this.allProducts.find(p => p.id === id)!,
        quantity: qty
      }))
      .filter(x => !!x.product);
  }

  getSubtotal() {
    let total = this.getSelectedItems().reduce((sum, it) => sum + (it.product.price * it.quantity), 0);
    if (this.selectedBox?.price) {
      total += this.selectedBox.price;
    }
    return total;
  }

  // Card selection
  chooseCard(card: CardOption) {
    this.selectedCard = card;
    this.activeCardTab = 'write';
    this.leaveCardBlank = false;
    this.selectedMessageTemplate = '';
    this.messageText = '';
  }

  onTemplateChange(template: string) {
    this.selectedMessageTemplate = template;
    if (template) {
      this.messageText = template;
      this.leaveCardBlank = false;
    }
  }

  // Review
  createGiftBox() {
    this.goToCheckout();
  }

  removeSelectedItem(productId: string) {
    delete this.selectedItems[productId];
  }

  removeSelectedBox() {
    this.selectedBox = null;
    this.currentStep = 1;
  }

  removeSelectedCard() {
    this.selectedCard = null;
    this.activeCardTab = 'choose';
    this.leaveCardBlank = false;
    this.selectedMessageTemplate = '';
    this.messageText = '';
  }

  getSelectedThumbs() {
    const thumbs: { id: string; name: string; image: string; type: 'box' | 'card' | 'item'; }[] = [];
    if (this.selectedBox) {
      thumbs.push({
        id: this.selectedBox.id,
        name: this.selectedBox.name,
        image: this.selectedBox.image,
        type: 'box'
      });
    }
    if (this.selectedCard) {
      thumbs.push({
        id: this.selectedCard.name,
        name: this.selectedCard.name,
        image: this.selectedCard.image || '',
        type: 'card'
      });
    }
    this.getSelectedItems().forEach(it => {
      thumbs.push({
        id: it.product.id,
        name: it.product.name,
        image: (it.product.images && it.product.images[0]) || '',
        type: 'item'
      });
    });
    return thumbs;
  }

  // Filters & sorting
  getSortLabel() {
    const found = this.sortOptions.find(o => o.value === this.selectedSort);
    return found ? found.label : 'Phổ biến';
  }

  selectSort(val: typeof this.selectedSort) {
    this.selectedSort = val;
    this.isSortOpen = false;
    this.applyFilters();
  }

  applyPriceFilter() { this.applyFilters(); }
  clearFilters() {
    this.searchText = '';
    this.selectedPriceRange = '';
    this.selectedCategoryIds.clear();
    this.applyFilters();
  }

  applyFilters() {
    const text = this.searchText.trim().toLowerCase();
    let items = this.allProducts.filter(p => !text || p.name.toLowerCase().includes(text));

    if (this.selectedCategoryIds.size > 0) {
      items = items.filter(p => (p.categoryIds || []).some(id => this.selectedCategoryIds.has(id)));
    }

    if (this.selectedPriceRange) {
      const [minStr, maxStr] = this.selectedPriceRange.split('-');
      const min = minStr ? Number(minStr) : 0;
      const max = maxStr ? Number(maxStr) : Number.POSITIVE_INFINITY;
      items = items.filter(p => p.price >= min && p.price <= max);
    }

    switch (this.selectedSort) {
      case 'price-asc': items = items.sort((a,b) => a.price - b.price); break;
      case 'price-desc': items = items.sort((a,b) => b.price - a.price); break;
      case 'name-asc': items = items.sort((a,b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': items = items.sort((a,b) => b.name.localeCompare(a.name)); break;
      default: break;
    }

    this.filteredProducts = items;
    this.currentPage = 1;
  }

  toggleCategory(categoryId: string, checked: boolean) {
    if (checked) this.selectedCategoryIds.add(categoryId); else this.selectedCategoryIds.delete(categoryId);
    this.applyFilters();
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize));
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  handleThumbAction(thumb: { id: string; type: 'box' | 'card' | 'item'; }) {
    switch (thumb.type) {
      case 'box':
        this.removeSelectedBox();
        break;
      case 'card':
        this.removeSelectedCard();
        break;
      default:
        this.removeSelectedItem(thumb.id);
    }
  }

  toggleLeaveCardBlank(checked: boolean) {
    this.leaveCardBlank = checked;
    if (checked) {
      this.selectedMessageTemplate = '';
      this.messageText = '';
    }
  }

  private buildCheckoutState() {
    return {
      box: this.selectedBox,
      items: this.getSelectedItems(),
      card: this.selectedCard,
      messageTemplate: this.selectedMessageTemplate,
      leaveCardBlank: this.leaveCardBlank,
      message: this.leaveCardBlank ? '' : this.messageText,
      subtotal: this.getSubtotal()
    };
  }

  handleCompleteClick() {
    if (!this.selectedCard) {
      this.currentStep = 3;
      alert('Vui lòng chọn thiệp trước khi hoàn thành hộp quà.');
      return;
    }
    this.goToCheckout();
  }

  goToCheckout() {
    if (!this.selectedBox) {
      alert('Vui lòng chọn hộp quà.');
      this.currentStep = 1;
      return;
    }
    if (!this.selectedCard) {
      alert('Vui lòng chọn thiệp.');
      this.currentStep = 3;
      return;
    }
    this.router.navigate(['/checkout'], { state: this.buildCheckoutState() });
  }
}
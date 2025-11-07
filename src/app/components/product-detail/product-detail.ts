import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { GiftBoxTemplatesLocalService, GiftBoxTemplate } from '../../services/local/giftbox-templates-local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Header, Footer],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: GiftBoxTemplate | null = null;
  readonly Math = Math;
  
  selectedCard: string | null = null;
  quantity = 1;
  activeTab = 'description';
  // Message on card
  messageTemplates: string[] = [
    'Chúc bạn một ngày thật vui vẻ!',
    'Chúc mừng sinh nhật! Mong bạn luôn hạnh phúc.',
    'Chúc bạn mau khỏe! Luôn vững vàng nhé.',
    'Cảm ơn bạn vì tất cả!'
  ];
  selectedMessageTemplate = '';
  messageText = '';
  messageCharLimit = 300;
  
  cardOptionsMap: { [key: string]: { icon: string } } = {
    'Thiệp động viên': { icon: '💪' },
    'Thiệp động viên Frog': { icon: '🐸' },
    'Thiệp Animal': { icon: '🐾' },
    'Thiệp Girl change the world': { icon: '👩' },
    'Thiệp Girl power': { icon: '💪' },
    'Thiệp Super Woman': { icon: '🦸' },
    'Thiệp Love Yourself': { icon: '❤️' },
    'Thiệp Gấu Lovely': { icon: '🐻' },
    'Thiệp Gấu Surprise': { icon: '🎁' },
    'Thiệp Gấu Best Wish': { icon: '⭐' },
    'Thiệp Beautiful': { icon: '✨' },
    'Thiệp ConGradulations': { icon: '🎉' },
    'Thiệp Cheer': { icon: '🎊' },
    'Thiệp Blue Cheer': { icon: '🎈' }
  };
  
  async loadCardOptions(): Promise<any[]> {
    if (!this.product) return [];
    const cardOptions = await this.templatesService.getCardOptionsForProduct(this.product);
    return cardOptions.map(card => ({
      id: card.name,
      name: card.name,
      image: card.image || '',
      icon: this.cardOptionsMap[card.name]?.icon || '🎁'
    }));
  }

  cardOptionsList: any[] = [];

  getCardOptions() {
    return this.cardOptionsList;
  }
  
  tabs = [
    { id: 'description', label: 'Mô tả sản phẩm' },
    { id: 'includes', label: 'Set quà bao gồm' },
    { id: 'shipping', label: 'Đóng gói và vận chuyển' },
    { id: 'video', label: 'Video' }
  ];
  
  recentlyViewed: GiftBoxTemplate[] = [];
  currentImageIndex = 0;
  productImages: string[] = [];
  selectedCardImage: string = '';
  originalProductImage: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private templatesService: GiftBoxTemplatesLocalService
  ) {}

  async ngOnInit() {
    window.scrollTo(0, 0);
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const allTemplates = await this.templatesService.getTemplates();
      this.product = allTemplates.find(p => p.id === productId) || null;
      
      if (this.product) {
        // Set product images - start with product image
        this.originalProductImage = this.product.image || '';
        if (this.originalProductImage) {
          this.productImages = [this.originalProductImage];
        }
        // Load card options (không tự chọn mặc định)
        this.cardOptionsList = await this.loadCardOptions();
        
        // Load recently viewed (first 4 products excluding current)
        this.recentlyViewed = allTemplates
          .filter(p => p.id !== productId)
          .slice(0, 4);
      }
    }
  }

  getFinalPrice(): number {
    if (!this.product) return 0;
    const discount = this.product.discountPercent || 0;
    const basePrice = this.product.promoPrice ?? this.product.price;
    return Math.round(basePrice * (1 - discount));
  }

  getOriginalPrice(): number {
    if (!this.product) return 0;
    return this.product.promoPrice ?? this.product.price;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectCard(cardId: string) {
    this.selectedCard = cardId;
    this.selectedMessageTemplate = '';
    this.messageText = '';
    // Find the selected card and get its image
    const selectedCardOption = this.cardOptionsList.find(card => card.id === cardId);
    if (selectedCardOption && selectedCardOption.image) {
      this.selectedCardImage = selectedCardOption.image;
      // Keep original product image as main; add/update card image as secondary
      if (!this.originalProductImage && this.product?.image) {
        this.originalProductImage = this.product.image;
      }
      if (this.productImages.length === 0 && this.originalProductImage) {
        this.productImages = [this.originalProductImage];
      }
      if (this.productImages.length > 1) {
        this.productImages[1] = selectedCardOption.image;
      } else {
        this.productImages.push(selectedCardOption.image);
      }
      // Do not change currentImageIndex to avoid overriding user's current view
    } else {
      // If no card image, revert to original product image
      this.selectedCardImage = '';
      if (this.originalProductImage) {
        // Remove secondary card image if exists, keep only the original product image
          this.productImages = [this.originalProductImage];
      }
    }
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  addToCart() {
    if (!this.product) return;
    if (!this.selectedCard) {
      Swal.fire({
        icon: 'warning',
        title: 'Chưa chọn thiệp',
        text: 'Vui lòng chọn một mẫu thiệp trước khi thêm vào giỏ.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }
    console.log('Add to cart:', {
      product: this.product,
      quantity: this.quantity,
      card: this.selectedCard
    });
    // TODO: Implement cart logic
    Swal.fire({
      icon: 'success',
      title: 'Đã thêm vào giỏ hàng!',
      text: 'Sản phẩm đã được thêm vào giỏ hàng của bạn.',
      confirmButtonText: 'Đã hiểu',
      confirmButtonColor: '#B4232C'
    });
  }

  buyNow() {
    if (!this.product) return;
    if (!this.selectedCard) {
      Swal.fire({
        icon: 'warning',
        title: 'Chưa chọn thiệp',
        text: 'Vui lòng chọn một mẫu thiệp trước khi thanh toán.',
        confirmButtonText: 'Đã hiểu',
        confirmButtonColor: '#B4232C'
      });
      return;
    }
    console.log('Buy now:', {
      product: this.product,
      quantity: this.quantity,
      card: this.selectedCard,
      messageTemplate: this.selectedMessageTemplate,
      messageText: this.messageText
    });
    // TODO: Implement checkout logic
    Swal.fire({
      icon: 'info',
      title: 'Chuyển đến trang thanh toán',
      text: 'Đang chuyển đến trang thanh toán...',
      confirmButtonText: 'Đã hiểu',
      confirmButtonColor: '#B4232C'
    });
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
  }

  onTemplateChange() {
    if (this.selectedMessageTemplate) {
      this.messageText = this.selectedMessageTemplate;
    }
  }
}


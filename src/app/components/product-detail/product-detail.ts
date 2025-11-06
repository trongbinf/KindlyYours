import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';
import { GiftBoxTemplatesLocalService, GiftBoxTemplate } from '../../services/local/giftbox-templates-local.service';

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
  
  selectedCard = '';
  quantity = 1;
  activeTab = 'description';
  
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
        // Load card options
        this.cardOptionsList = await this.loadCardOptions();
        
        // Set default card option
        if (this.cardOptionsList && this.cardOptionsList.length > 0) {
          this.selectedCard = this.cardOptionsList[0].id;
          // If default card has image, show it
          const defaultCard = this.cardOptionsList[0];
          if (defaultCard && defaultCard.image) {
            this.selectedCardImage = defaultCard.image;
            if (this.productImages.length > 0) {
              this.productImages[0] = defaultCard.image;
            } else {
              this.productImages = [defaultCard.image];
            }
            this.currentImageIndex = 0;
          }
        }
        
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
    return Math.round(this.product.price * (1 - discount));
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
    // Find the selected card and get its image
    const selectedCardOption = this.cardOptionsList.find(card => card.id === cardId);
    if (selectedCardOption && selectedCardOption.image) {
      this.selectedCardImage = selectedCardOption.image;
      // If card has image, show it as the main product image
      if (this.productImages.length > 0) {
        // Replace first image with card image
        this.productImages[0] = selectedCardOption.image;
      } else {
        this.productImages = [selectedCardOption.image];
      }
      this.currentImageIndex = 0;
    } else {
      // If no card image, revert to original product image
      this.selectedCardImage = '';
      if (this.originalProductImage) {
        if (this.productImages.length > 0) {
          this.productImages[0] = this.originalProductImage;
        } else {
          this.productImages = [this.originalProductImage];
        }
        this.currentImageIndex = 0;
      }
    }
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  addToCart() {
    if (!this.product) return;
    console.log('Add to cart:', {
      product: this.product,
      quantity: this.quantity,
      card: this.selectedCard
    });
    // TODO: Implement cart logic
    alert('Đã thêm vào giỏ hàng!');
  }

  buyNow() {
    if (!this.product) return;
    console.log('Buy now:', {
      product: this.product,
      quantity: this.quantity,
      card: this.selectedCard
    });
    // TODO: Implement checkout logic
    alert('Chuyển đến trang thanh toán!');
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
  }
}


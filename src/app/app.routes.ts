import { Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage';
import { About } from './components/about/about';
import { GiftboxList } from './components/giftbox-list/giftbox-list';
import { CorporateGifts } from './components/corporate-gifts/corporate-gifts';
import { ProductDetail } from './components/product-detail/product-detail';
import { CreateGiftBox } from './components/create-gift-box/create-gift-box';
import { CheckoutPage } from './components/checkout/checkout';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'home', component: Homepage },
  { path: 'about', component: About },
  { path: 'collections/giftboxes', component: GiftboxList },
  { path: 'corporate-gifts', component: CorporateGifts },
  { path: 'product/:id', component: ProductDetail },
  { path: 'create-gift-box', component: CreateGiftBox },
  { path: 'checkout', component: CheckoutPage }
];

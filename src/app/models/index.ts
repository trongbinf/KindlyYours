export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  imageUrl?: string;
  createdAt?: number;
}

export interface ProductOption {
  name: string;
  values: string[]; // e.g. color: [red, blue]
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  categoryIds: string[];
  price: number; // base price (VND)
  images: string[];
  description?: string;
  options?: ProductOption[];
  stock?: number;
  isActive: boolean;
  tags?: string[];
  createdAt?: number;
}

// Items that can be put inside a gift-box
export interface GiftBoxItem {
  productId: string;
  quantity: number;
  note?: string;
}

export interface GiftCardSelection {
  productId: string; // a product that represents a card
  message?: string;
}

export interface GiftBox {
  id: string;
  title: string;
  boxProductId: string; // a product that represents the physical box
  items: GiftBoxItem[]; // gifts inside the box
  card?: GiftCardSelection; // selected greeting card
  ownerUserId?: string; // optional (guest can create without login)
  subtotal: number;
  discount?: number;
  total: number;
  createdAt: number;
  updatedAt?: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface ShippingAddress {
  receiverName: string;
  phone: string;
  addressLine: string;
  ward?: string;
  district?: string;
  province?: string;
  note?: string;
}

export type OrderItemType = 'product' | 'giftBox';

export interface OrderItem {
  type: OrderItemType;
  refId: string; // productId or giftBoxId snapshot
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  code: string; // human readable
  items: OrderItem[];
  customer: CustomerInfo;
  shipping: ShippingAddress;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  subtotal: number;
  shippingFee: number;
  discount?: number;
  total: number;
  createdAt: number;
  updatedAt?: number;
  notes?: string;
}



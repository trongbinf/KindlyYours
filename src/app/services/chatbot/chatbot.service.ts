import { Injectable } from '@angular/core';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatbotResponse {
  text: string;
  suggestions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private messages: ChatMessage[] = [];
  
  private responses: { [key: string]: ChatbotResponse } = {
    // Greetings
    'hello': { 
      text: 'Xin chào! Tôi là trợ lý ảo của Kindly Yours. Tôi có thể giúp bạn tìm hiểu về sản phẩm và dịch vụ của chúng tôi. Bạn cần hỗ trợ gì?',
      suggestions: ['Xem hộp quà', 'Giá cả', 'Liên hệ', 'Hướng dẫn đặt hàng']
    },
    'hi': { 
      text: 'Xin chào! Tôi là trợ lý ảo của Kindly Yours. Bạn muốn tìm hiểu gì về sản phẩm của chúng tôi?',
      suggestions: ['Xem hộp quà', 'Giá cả', 'Liên hệ', 'Hướng dẫn đặt hàng']
    },
    'chào': { 
      text: 'Chào bạn! Tôi có thể giúp bạn tìm hiểu về các hộp quà tại Kindly Yours. Bạn cần hỗ trợ gì?',
      suggestions: ['Xem hộp quà', 'Giá cả', 'Liên hệ', 'Hướng dẫn đặt hàng']
    },

    // Product inquiries
    'hộp quà': { 
      text: 'Chúng tôi có nhiều loại hộp quà đẹp:\n\n• Hộp Happy To See You Blue\n• Hộp Happy To See You Light Blue\n• Hộp Your Day Yellow\n• Hộp Your Day Pink\n\nBạn muốn xem chi tiết hộp nào?',
      suggestions: ['Xem giá', 'Tự làm hộp quà', 'Quà doanh nghiệp', 'Đặt hàng']
    },
    'gift box': { 
      text: 'Chúng tôi có nhiều mẫu hộp quà đẹp để bạn lựa chọn. Bạn có thể tự làm hộp quà theo ý thích hoặc chọn hộp quà có sẵn.',
      suggestions: ['Xem hộp quà', 'Tự làm hộp quà', 'Giá cả', 'Đặt hàng']
    },
    'sản phẩm': { 
      text: 'Kindly Yours chuyên cung cấp:\n\n• Hộp quà cá nhân\n• Hộp quà doanh nghiệp\n• Dịch vụ tự làm hộp quà\n• Thiệp chúc mừng\n\nBạn quan tâm đến loại nào?',
      suggestions: ['Hộp quà cá nhân', 'Hộp quà doanh nghiệp', 'Tự làm hộp quà', 'Giá cả']
    },

    // Pricing
    'giá': { 
      text: 'Giá hộp quà của chúng tôi từ 30.000đ tùy theo kích thước và nội dung. Bạn có thể xem chi tiết giá từng sản phẩm trên website hoặc liên hệ để được tư vấn cụ thể.',
      suggestions: ['Xem hộp quà', 'Liên hệ tư vấn', 'Đặt hàng', 'Khuyến mãi']
    },
    'giá cả': { 
      text: 'Chúng tôi có các mức giá phù hợp với mọi ngân sách:\n\n• Hộp quà cơ bản: từ 30.000đ\n• Hộp quà premium: từ 100.000đ\n• Hộp quà doanh nghiệp: tư vấn riêng\n\nBạn muốn xem chi tiết không?',
      suggestions: ['Xem hộp quà cơ bản', 'Xem hộp premium', 'Tư vấn doanh nghiệp', 'Đặt hàng']
    },
    'price': { 
      text: 'Our gift boxes start from 30,000 VND. Please contact us for detailed pricing and consultation.',
      suggestions: ['View products', 'Contact us', 'Order now', 'Promotions']
    },

    // Contact information
    'liên hệ': { 
      text: 'Bạn có thể liên hệ với chúng tôi qua:\n\n📞 Hotline: 039 541 4344\n📧 Email: kindlyyours.official@gmail.com\n📍 Địa chỉ: 125 Hoàng Ngân, Thanh Xuân, Hà Nội\n\n💬 Facebook: Kindly Yours\n📱 Zalo: 039 541 4344',
      suggestions: ['Gọi ngay', 'Chat Zalo', 'Chat Messenger', 'Xem địa chỉ']
    },
    'contact': { 
      text: 'Contact us:\n\n📞 Phone: 039 541 4344\n📧 Email: kindlyyours.official@gmail.com\n📍 Address: 125 Hoang Ngan, Thanh Xuan, Hanoi',
      suggestions: ['Call now', 'Chat Zalo', 'Chat Messenger', 'View location']
    },

    // Ordering process
    'đặt hàng': { 
      text: 'Quy trình đặt hàng tại Kindly Yours:\n\n1️⃣ Chọn hộp quà yêu thích\n2️⃣ Tùy chỉnh nội dung (nếu cần)\n3️⃣ Thêm thiệp chúc mừng\n4️⃣ Thanh toán và xác nhận\n5️⃣ Nhận hàng tại nhà\n\nBạn muốn bắt đầu đặt hàng ngay?',
      suggestions: ['Chọn hộp quà', 'Tự làm hộp quà', 'Xem giá ship', 'Liên hệ tư vấn']
    },
    'order': { 
      text: 'How to order:\n\n1. Choose your gift box\n2. Customize content\n3. Add greeting card\n4. Payment & confirmation\n5. Home delivery\n\nWould you like to start ordering?',
      suggestions: ['Choose gift box', 'Custom gift box', 'Contact us', 'View prices']
    },

    // Custom gift box
    'tự làm': { 
      text: 'Dịch vụ tự làm hộp quà của chúng tôi bao gồm:\n\n🎁 Chọn mẫu hộp quà\n🛍️ Chọn vật phẩm bên trong\n💌 Thiết kế thiệp chúc mừng\n🎨 Tùy chỉnh màu sắc, kiểu dáng\n\nBạn muốn bắt đầu tạo hộp quà riêng?',
      suggestions: ['Bắt đầu tạo', 'Xem mẫu có sẵn', 'Tư vấn thiết kế', 'Xem giá']
    },
    'custom': { 
      text: 'Create your own gift box:\n\n🎁 Choose box design\n🛍️ Select items inside\n💌 Design greeting card\n🎨 Customize colors & style\n\nReady to start creating?',
      suggestions: ['Start creating', 'View templates', 'Design consultation', 'View prices']
    },

    // Corporate gifts
    'doanh nghiệp': { 
      text: 'Dịch vụ quà tặng doanh nghiệp:\n\n🏢 Quà tặng khách hàng\n👥 Quà tặng nhân viên\n🎉 Quà sự kiện, hội nghị\n🎁 Quà tết, lễ hội\n📦 Đóng gói theo thương hiệu\n\nChúng tôi có ưu đãi đặc biệt cho đơn hàng lớn!',
      suggestions: ['Tư vấn báo giá', 'Xem mẫu doanh nghiệp', 'Liên hệ ngay', 'Ưu đãi số lượng']
    },

    // Shipping & delivery
    'giao hàng': { 
      text: 'Chính sách giao hàng:\n\n🚚 Miễn phí ship nội thành Hà Nội (đơn >200k)\n📦 Giao hàng toàn quốc\n⏰ Thời gian: 1-3 ngày làm việc\n💝 Đóng gói cẩn thận, chống sốc\n\nBạn muốn kiểm tra phí ship đến địa chỉ của mình?',
      suggestions: ['Tính phí ship', 'Xem chính sách đổi trả', 'Theo dõi đơn hàng', 'Liên hệ']
    },

    // Promotions
    'khuyến mãi': { 
      text: 'Ưu đãi hiện tại:\n\n🎉 Giảm 10% cho khách hàng mới\n💝 Miễn phí thiệp chúc mừng\n🚚 Free ship đơn hàng >200k\n🎁 Tặng kèm túi đựng cao cấp\n\nMã giảm giá: KINDLY10',
      suggestions: ['Đặt hàng ngay', 'Xem điều kiện', 'Các ưu đãi khác', 'Liên hệ']
    },

    // Default responses
    'default': { 
      text: 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn. Bạn có thể hỏi tôi về:\n\n• Sản phẩm hộp quà\n• Giá cả và khuyến mãi\n• Cách đặt hàng\n• Thông tin liên hệ\n\nHoặc gọi hotline: 039 541 4344 để được hỗ trợ trực tiếp!',
      suggestions: ['Xem sản phẩm', 'Hướng dẫn đặt hàng', 'Liên hệ hotline', 'Khuyến mãi']
    }
  };

  private welcomeMessage: ChatMessage = {
    id: 'welcome',
    text: 'Xin chào! Tôi là trợ lý ảo của Kindly Yours 👋\n\nTôi có thể giúp bạn:\n• Tìm hiểu về sản phẩm hộp quà\n• Hướng dẫn đặt hàng\n• Tư vấn giá cả\n• Thông tin liên hệ\n\nBạn cần hỗ trợ gì?',
    isUser: false,
    timestamp: new Date()
  };

  getWelcomeMessage(): ChatMessage {
    return this.welcomeMessage;
  }

  processMessage(userInput: string): ChatbotResponse {
    const input = userInput.toLowerCase().trim();
    
    // Check for exact matches first
    if (this.responses[input]) {
      return this.responses[input];
    }

    // Check for partial matches
    for (const key in this.responses) {
      if (input.includes(key) || key.includes(input)) {
        return this.responses[key];
      }
    }

    // Return default response
    return this.responses['default'];
  }

  addMessage(text: string, isUser: boolean): ChatMessage {
    const message: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random()}`,
      text,
      isUser,
      timestamp: new Date()
    };
    
    this.messages.push(message);
    return message;
  }

  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  clearMessages(): void {
    this.messages = [];
  }
}
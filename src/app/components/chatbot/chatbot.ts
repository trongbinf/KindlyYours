import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage, ChatbotResponse } from '../../services/chatbot/chatbot.service';
import { Nl2brPipe } from '../../pipes/nl2br.pipe';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, Nl2brPipe],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class Chatbot implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  isOpen = false;
  messages: ChatMessage[] = [];
  currentInput = '';
  isTyping = false;
  suggestions: string[] = [];

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    // Add welcome message
    const welcomeMessage = this.chatbotService.getWelcomeMessage();
    this.messages.push(welcomeMessage);
    this.suggestions = ['Xem hộp quà', 'Giá cả', 'Liên hệ', 'Hướng dẫn đặt hàng'];
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.currentInput.trim()) return;

    // Add user message
    const userMessage = this.chatbotService.addMessage(this.currentInput, true);
    this.messages.push(userMessage);
    
    const userInput = this.currentInput;
    this.currentInput = '';
    
    // Show typing indicator
    this.isTyping = true;
    
    // Simulate thinking time
    setTimeout(() => {
      const response = this.chatbotService.processMessage(userInput);
      
      // Add bot response
      const botMessage = this.chatbotService.addMessage(response.text, false);
      this.messages.push(botMessage);
      
      // Update suggestions
      this.suggestions = response.suggestions || [];
      this.isTyping = false;
    }, 1000);
  }

  sendSuggestion(suggestion: string) {
    this.currentInput = suggestion;
    this.sendMessage();
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    } catch(err) {}
  }

  clearChat() {
    this.chatbotService.clearMessages();
    this.messages = [];
    
    // Re-add welcome message
    const welcomeMessage = this.chatbotService.getWelcomeMessage();
    this.messages.push(welcomeMessage);
    this.suggestions = ['Xem hộp quà', 'Giá cả', 'Liên hệ', 'Hướng dẫn đặt hàng'];
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  trackByMessageId(index: number, item: ChatMessage): any {
    return item.id || index;
  }
}
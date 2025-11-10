import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../core/header/header';
import { Footer } from '../../core/footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  ngOnInit() {
    // Scroll to top when component is initialized
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}



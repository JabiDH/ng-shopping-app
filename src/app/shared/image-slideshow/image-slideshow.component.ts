import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-image-slideshow',
  templateUrl: './image-slideshow.component.html',
  styleUrl: './image-slideshow.component.css',
})
export class ImageSlideshowComponent implements AfterViewInit {
  @Input() images: string[] = [];
  slideIndex = 1;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if(!this.images || (this.images && this.images.length === 0)) return;
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: number) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: number) {
    const slides = this.el.nativeElement.getElementsByClassName('mySlides');
    const dots = this.el.nativeElement.getElementsByClassName('dot');

    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
      this.renderer.setStyle(slides[i], 'display', 'none');
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }

    this.renderer.setStyle(slides[this.slideIndex - 1], 'display', 'block');
    dots[this.slideIndex - 1].classList.add('active');
  }
}

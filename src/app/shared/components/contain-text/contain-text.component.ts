import { AfterViewInit, ChangeDetectorRef, OnChanges, Component, ElementRef, Input, Renderer2, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-contain-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contain-text.component.html',
  styleUrl: './contain-text.component.scss'
})
export class ContainTextComponent implements AfterViewInit, OnChanges {
  @Input() text: string = '';
  @Input() fontWeight: string = '400';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.adjustTextToFit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && !changes['text'].isFirstChange() && changes['text'].currentValue !== changes['text'].previousValue) {
      this.cdr.detectChanges();
      this.adjustTextToFit();
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.adjustTextToFit();
  }

  private adjustTextToFit() {
    const container = this.el.nativeElement.querySelector('.fit-container');
    const textElement = this.el.nativeElement.querySelector('.fit-text');

    if (!container || !textElement) {
      return;
    }

    let fontSize = 10;
    this.setFontSize(textElement, fontSize);

    while (this.isTextSmallerThanContainer(textElement, container) && fontSize < 600) {
      fontSize++;
      this.setFontSize(textElement, fontSize);
    }

    fontSize--;
    this.setFontSize(textElement, fontSize);

    while (this.isTextBiggerThanContainer(textElement, container)) {
      fontSize--;
      this.setFontSize(textElement, fontSize);
    }
  }

  private setFontSize(element: HTMLElement, size: number) {
    this.renderer.setStyle(element, 'font-size', `${size}px`);
  }

  private isTextSmallerThanContainer(textElement: HTMLElement, container: HTMLElement) {
    return textElement.offsetWidth <= container.offsetWidth && textElement.offsetHeight <= container.offsetHeight;
  }

  private isTextBiggerThanContainer(textElement: HTMLElement, container: HTMLElement) {
    return textElement.offsetWidth > container.offsetWidth || textElement.offsetHeight > container.offsetHeight;
  }
}

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
  @Input() fontWeight: string = '400';
  @Input() text: string = '';
  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text'] && !changes['text'].isFirstChange() && changes['text'].currentValue !== changes['text'].previousValue) {
      this.cdr.detectChanges();
      this.resizeTextForDisplay();
    }
  }
  ngAfterViewInit(): void {
    this.resizeTextForDisplay();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.resizeTextForDisplay();
  }

  private resizeTextForDisplay(): void {
    const container = this.el.nativeElement.querySelector('.contain-text__container');
    const textElement = this.el.nativeElement.querySelector('.contain-text__heading');

    if (!container || !textElement) {
      return;
    }

    let fontSize: number = 10;
    this.setFontSize(textElement, fontSize);

    while (this.isTextBiggerThanContainer(textElement, container)) {
      fontSize--;
      this.setFontSize(textElement, fontSize);
    }

    while (this.isTextSmallerThanContainer(textElement, container) && fontSize < 600) {
      fontSize++;
      this.setFontSize(textElement, fontSize);
    }

    fontSize--;
    this.setFontSize(textElement, fontSize);
  }

  private setFontSize(element: HTMLElement, size: number): void {
    this.renderer.setStyle(element, 'font-size', `${size}px`);
  }
  private isTextBiggerThanContainer(textElement: HTMLElement, container: HTMLElement): boolean{
    return textElement.offsetWidth > container.offsetWidth || textElement.offsetHeight > container.offsetHeight;
  }

  private isTextSmallerThanContainer(textElement: HTMLElement, container: HTMLElement): boolean {
    return textElement.offsetWidth <= container.offsetWidth && textElement.offsetHeight <= container.offsetHeight;
  }
}

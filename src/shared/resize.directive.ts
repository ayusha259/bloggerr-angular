import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTextArea]',
})
export class ResizeDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    setTimeout(() => this.resize());
  }

  @HostListener('input') onInput() {
    this.resize();
  }

  resize() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', '50px');
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'height',
      `${this.elementRef.nativeElement.scrollHeight}px`
    );
  }
}

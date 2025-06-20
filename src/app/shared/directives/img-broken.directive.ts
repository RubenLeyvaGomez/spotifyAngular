import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  
  @HostListener('error') handleError(): void{
    const elNative = this.elHost.nativeElement
    console.log('La imagen que se rompio fue --> ', this.elHost)

    elNative.src= '../../../assets/img/error.jpg'

  }


  constructor(private elHost: ElementRef) { }

}

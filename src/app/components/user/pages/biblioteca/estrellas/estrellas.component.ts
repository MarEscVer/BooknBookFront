import { AfterViewInit, Component, ElementRef, Input, Renderer2, forwardRef } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from './BaseControlValueAccessor';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EstrellasComponent),
      multi: true,
    },
  ],
})
export class EstrellasComponent extends BaseControlValueAccessor<any> implements AfterViewInit {

  @Input() stars = [0, 1, 2, 3, 4]; // default is 5 stars
  @Input() override value: number | null = null; // un-touched value should be null

  constructor(
    private fb: FormBuilder,
    private eRef: ElementRef,
    private renderer: Renderer2
  ) {
    super();
  }

  override writeValue(val: number | null) {
    this.value = val;
    super.writeValue(this.value);
  }

  setRating(rating: number) {
    if (this.disabled) {
      return;
    }
    let oldVal = rating;
    this.value = oldVal + 1;

    this.onChange(this.value);
    this.onTouched();

    const svgs = this.eRef.nativeElement.querySelectorAll('svg.star');

    for (let i = 0, j = svgs.length; i < j; i++) {
      if (i <= rating) {
        this.renderer.addClass(svgs[i], 'active');
      } else {
        this.renderer.removeClass(svgs[i], 'active');
      }
    }
  }

  ngAfterViewInit() {
    if (this.value !== null) {
      let initialValue = this.value;
      this.setRating(--initialValue);
    }
  }
}

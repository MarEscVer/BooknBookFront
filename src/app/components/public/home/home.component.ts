import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RandomBookService } from 'src/app/services/book/random-book.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  formNewsletter!: FormGroup;
  matcher!: FormErrorStateMatcher;

  constructor(
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public randomBookService: RandomBookService,
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }

  createForm(fb: FormBuilder) {
    this.formNewsletter = this.formBuilder.group(this.formControl.newsletter);
  }

  submit() {}
}

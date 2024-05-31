import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RandomBookService } from 'src/app/services/book/random-book.service';
import { EstadisticaService } from 'src/app/services/estadisticas/estadistica.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ContadorResponse } from 'src/app/shared/models/estadistica/estadistica';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  formNewsletter!: FormGroup;
  matcher!: FormErrorStateMatcher;
  data?: ContadorResponse;
 
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public randomBookService: RandomBookService,
    public estadisticaService: EstadisticaService
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }

  createForm(fb: FormBuilder) {
    this.formNewsletter = this.formBuilder.group(this.formControl.newsletter);
  }

  loadData() {
    this.subscriptions.add(
      this.estadisticaService.getContador().subscribe(contadores => {
        if (contadores) {
          this.data = contadores;
        }
      })
    );
  }

  submit() {

  }

  ngOnInit() {
    this.loadData();
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

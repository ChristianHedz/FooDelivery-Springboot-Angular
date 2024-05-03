import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MessageService } from "primeng/api";
import {StyleClassModule} from "primeng/styleclass";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from "primeng/messages";
import {DropdownModule} from "primeng/dropdown";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {ImageModule} from "primeng/image";
import {PromotionService} from "../../../../services/promotion.service";
import {IFormProm, IPromDto, IPromReq} from "../../../../interfaces/promotion.interface";

type controlType = 'description' | 'code' | 'percentage';
@Component({
  selector: 'app-add-or-edit-prom',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DividerModule,
    CalendarModule,
    InputTextareaModule,
    ToggleButtonModule,
    StyleClassModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    DropdownModule,
    InputGroupModule,
    InputGroupAddonModule,
    ImageModule,
  ],
  templateUrl: './add-or-edit-prom.component.html',
  styleUrl: './add-or-edit-prom.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export default class AddOrEditPromComponent implements OnInit {

  // Services
  private promService = inject(PromotionService);
  private router = inject(Router);
  private nnfb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  // Variables
  public promId: string | null = null;

  constructor() {
    this.promId = this.route.snapshot.paramMap.get('id');
  }

  public promForm = this.nnfb.group<IFormProm>(
    {
      id: this.nnfb.control(0),
      description: this.nnfb.control('', [Validators.required]),
      code: this.nnfb.control('', [Validators.required]),
      percentage: this.nnfb.control(1.00, [Validators.required, Validators.pattern(/^(?!0)(?!100)([1-9][0-9]?)$/)]),
    }
  );

  ngOnInit(): void {
    if (this.promId) {

      const id = Number(this.promId);
      this.promService
        .getPromotionByAdmin(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: ( prom ) => {
            return this.fillFormData(prom)
          },
          error: (err) => {
            console.error({...err});
            this.showMessage(`No se pudo obtener datos de la promoción.`, 'error', 'Ocurrio un error');

            setTimeout(() => {
              this.router.navigate(['/admin/dashboard/promociones']);
            }, 1200);
          }
        });
    }

  }

  fillFormData(prom: IPromReq) {
    this.promForm.patchValue({
      description: prom.description,
      code: prom.code,
      percentage: prom.percentage,
    });
  }

  inputValid(control: controlType): boolean {
    return (
      !!this.promForm.get(control)?.invalid &&
      !!this.promForm.get(control)?.touched
    );
  }

  save() {

    if (this.promId) { // Update
      this.promForm.controls['description'].clearValidators();
      this.promForm.controls['code'].clearValidators();
      this.promForm.controls['percentage'].clearValidators();

      this.promForm.controls['description'].updateValueAndValidity();
      this.promForm.controls['code'].updateValueAndValidity();
      this.promForm.controls['percentage'].updateValueAndValidity();
    }

    if (this.promForm.invalid) return this.promForm.markAllAsTouched();

    let prom: IPromReq = {
      description: this.promForm.controls['description'].value,
      code: this.promForm.controls['code'].value,
      percentage: this.promForm.controls['percentage']?.value,
    };

    if (this.promId) {
      prom = { ...prom, id: Number(this.promId) };
    }

    this.promId ? this.updateProm(prom) : this.addProm(prom);
  }

  addProm( prom: IPromReq ) {
    this.promService
      .createPromotionByAdmin( prom)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  updateProm( prom: IPromReq ) {
    this.promService
      .updatePromotionByAdmin(prom)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  showMessage(message: string, severity: string, summary: string): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
    });
  }

}

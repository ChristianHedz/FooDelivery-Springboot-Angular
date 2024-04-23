import {ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild, ViewEncapsulation} from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {StyleClassModule} from "primeng/styleclass";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidatorsService} from "../../../shared/services/validators.service";
import {UserService} from "../../../admin-dashboard/services/user.service";
import {UserChangePassword, UserFormChangePassword} from "../../../admin-dashboard/interfaces/user.interface";

type controlType = 'oldPassword' | 'newPassword';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    ReactiveFormsModule,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class SettingsPageComponent {

  private nnfb = inject(NonNullableFormBuilder);
  private validatorService = inject(ValidatorsService);
  private userService = inject(UserService);

  @ViewChild('btnChangePassword', { static: false }) btnChangePassword!: ElementRef;

  public changePassworForm = this.nnfb.group<UserFormChangePassword>(
    {
      oldPassword: this.nnfb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      newPassword: this.nnfb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
    });

  inputValid(control: controlType): boolean {
    return (
      !!this.changePassworForm.get(control)?.invalid &&
      !!this.changePassworForm.get(control)?.touched
    );
  }

  changePassword() {
    if (this.changePassworForm.invalid)
      return this.changePassworForm.markAllAsTouched();

    this.btnChangePassword.nativeElement.disabled = true;

    const body: UserChangePassword = {
      oldPassword: this.changePassworForm.get('oldPassword')!.value,
      newPassword: this.changePassworForm.get('newPassword')!.value,
    }

    this.userService.changePassword(body).subscribe();

    setTimeout(() => {
      this.changePassworForm.reset();
      this.btnChangePassword.nativeElement.disabled = false;
    }, 600);
  }
}

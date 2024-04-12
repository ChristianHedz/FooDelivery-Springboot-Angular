import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, ViewEncapsulation} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToggleButtonModule} from "primeng/togglebutton";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IFormUser, IUser, UserDTO} from "../../../../../core/interfaces/user/User.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ConfirmationService, MessageService } from "primeng/api";
import {StyleClassModule} from "primeng/styleclass";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from "primeng/messages";

type controlType = 'fullName' | 'phone' | 'email' | 'password';

@Component({
  selector: 'app-add-or-edit-user',
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
  ],
  templateUrl: './add-or-edit-user.component.html',
  styleUrl: './add-or-edit-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export default class AddOrEditUserComponent implements OnInit {

  // Services
  private userService = inject(UserService);
  private router = inject(Router);
  private nnfb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  // Variables
  public userId: string | null = null;
  public userForm = this.nnfb.group<IFormUser>(
    {
      id: this.nnfb.control(0),
      fullName: this.nnfb.control('', [Validators.required]),
      phone: this.nnfb.control('', [Validators.required]),
      email: this.nnfb.control('', [Validators.required]),
      alias: this.nnfb.control('', ),
      role: this.nnfb.control('', ),
      password: this.nnfb.control('', [Validators.required]),
      active: this.nnfb.control(true),
    }
  );

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.userId) {
      const id = Number(this.userId);
      this.userService
        .getUserByAdmin(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: ( user) => this.fillFormData(user),
          error: (err) => {
            console.error({...err});
            this.showMessage(`No se pudo obtener datos del usuario.`, 'error', 'Ocurrio un error');

            setTimeout(() => {
              this.router.navigate(['/admin/dashboard/usuarios']);
            }, 1200);
          }
        });
    }
  }

  fillFormData(user: IUser) {
    this.userForm.patchValue({
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      alias: user.alias,
      role: user.role,
    });
  }

  inputValid(control: controlType): boolean {
    return (
      !!this.userForm.get(control)?.invalid &&
      !!this.userForm.get(control)?.touched
    );
  }

  save() {
    if (this.userForm.invalid) return this.userForm.markAllAsTouched();

    let user: UserDTO = {
      fullName: this.userForm.controls['fullName'].value,
      email: this.userForm.controls['email'].value,
      phone: this.userForm.controls['phone'].value,
      alias: this.userForm.controls['alias']?.value,
      role: this.userForm.controls['role']?.value,
      password: this.userForm.controls['password'].value,
      active: this.userForm.controls['active']?.value,
    };

    if (this.userId) {
      user = { ...user, id: Number(this.userId) };
    }

    this.userId ? this.updateUSer(user) : this.addUser(user);
  }

  addUser( user: UserDTO) {
    this.userService
      .createUserByAdmin(user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  updateUSer( user: UserDTO) {
    this.userService
      .updateUserByAdmin(user)
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

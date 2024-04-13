import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToggleButtonModule} from "primeng/togglebutton";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IFormUser, IUser, UserDTO, UserToUpdate} from "../../../../../core/interfaces/user/User.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MessageService } from "primeng/api";
import {StyleClassModule} from "primeng/styleclass";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from "primeng/messages";
import {DropdownModule} from "primeng/dropdown";
import {Roles} from "../../../../../core/interfaces/user/roles.interface";

type controlType = 'fullName' | 'phone' | 'email' | 'password' | 'role' | `alias`;

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
    DropdownModule,
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
  roles: Roles[] | undefined;

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  public userForm = this.nnfb.group<IFormUser>(
    {
      id: this.nnfb.control(0),
      fullName: this.nnfb.control('', [Validators.required, Validators.pattern('([a-zA-Z]+) ([a-zA-Z]+)')]),
      phone: this.nnfb.control('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]),
      email: this.nnfb.control('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      alias: this.nnfb.control('', [Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^$|^\\w+$')]),
      role: this.nnfb.control(''),
      password: this.nnfb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      active: this.nnfb.control(true),
    }
  );

  ngOnInit(): void {
    if (this.userId) {

      this.userForm.controls['phone'].disable();
      this.userForm.controls['email'].disable();
      this.userForm.controls['role']!.disable();

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

    this.roles = [
      { name: 'Administrador', code: 'ADMIN' },
      { name: 'Cliente', code: 'CUSTOMER' },
      { name: 'Repartidor', code: 'DELIVERY_MAN' },
    ];
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

    if (this.userId) {
      this.userForm.controls['password'].clearValidators();
      this.userForm.controls['phone'].clearValidators();
      this.userForm.controls['email'].clearValidators();
      this.userForm.controls['role']!.clearValidators();

      this.userForm.controls['password'].updateValueAndValidity();
      this.userForm.controls['phone'].updateValueAndValidity();
      this.userForm.controls['email'].updateValueAndValidity();
      this.userForm.controls['role']!.updateValueAndValidity();
    }

    if (this.userForm.invalid) return this.userForm.markAllAsTouched();

    const codeRol: any = this.userForm.controls['role']?.value === '' ? {code: 'CUSTOMER'}: this.userForm.controls['role']?.value;

    let user: UserDTO = {
      fullName: this.userForm.controls['fullName'].value,
      email: this.userForm.controls['email'].value,
      phone: this.userForm.controls['phone'].value,
      alias: this.userForm.controls['alias']?.value,
      role: codeRol.code,
      password: this.userForm.controls['password'].value,
      active: this.userForm.controls['active']?.value,
    };

    let bodyUserToUpdate: UserToUpdate | undefined = undefined;

    if (this.userId) {
      bodyUserToUpdate = { fullName: user.fullName, alias: user.alias ? user.alias : '', id: Number(this.userId) };
    }

    this.userId ? this.updateUSer(bodyUserToUpdate) : this.addUser(user);
  }

  addUser( user: UserDTO) {
    this.userService
      .createUserByAdmin(user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  updateUSer( user: UserToUpdate | undefined) {
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

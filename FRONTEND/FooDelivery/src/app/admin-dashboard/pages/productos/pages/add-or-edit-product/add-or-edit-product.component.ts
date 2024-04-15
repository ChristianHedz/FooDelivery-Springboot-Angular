import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
  WritableSignal
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
import {ProductService} from "../../../../services/product.service";
import {IFormProduct, IProductDTO} from "../../../../interfaces/product.interface";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {ImageModule} from "primeng/image";
import {ICategoryReq} from "../../../../interfaces/category.interface";

type controlType = 'name' | 'img' | 'description' | 'price' | 'category';
@Component({
  selector: 'app-add-or-edit-product',
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
  templateUrl: './add-or-edit-product.component.html',
  styleUrl: './add-or-edit-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export default class AddOrEditProductComponent implements OnInit {

  // Services
  private productService = inject(ProductService);
  private router = inject(Router);
  private nnfb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  // Variables
  public productId: string | null = null;
  categories: WritableSignal<ICategoryReq[] | undefined> = signal(undefined);

  // Signals
  imgUrl: WritableSignal<string> = signal('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');

  constructor() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  public productForm = this.nnfb.group<IFormProduct>(
    {
      id: this.nnfb.control(0),
      name: this.nnfb.control('', [Validators.required]),
      img: this.nnfb.control('', [Validators.required]),
      description: this.nnfb.control('', [Validators.required]),
      price: this.nnfb.control(1.00, [Validators.minLength(3), Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      category: this.nnfb.control('')
    }
  );

  ngOnInit(): void {
    if (this.productId) {

      const id = Number(this.productId);
      this.productService
        .getProductByAdmin(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: ( product) => {
            this.imgUrl.set(product.img);
            return this.fillFormData(product)
          },
          error: (err) => {
            console.error({...err});
            this.showMessage(`No se pudo obtener datos del producto.`, 'error', 'Ocurrio un error');

            setTimeout(() => {
              this.router.navigate(['/admin/dashboard/productos']);
            }, 1200);
          }
        });
    }

    this.categories.set( [
      { name: 'Hamburguesas', id: 2 },
      { name: 'Bebidas', id: 3 },
      { name: 'Snacks', id: 4 },
      { name: 'Juguetes', id: 5 },
    ]);

  }

  fillFormData(product: IProductDTO) {
    this.productForm.patchValue({
      name: product.name,
      img: product.img,
      description: product.description,
      price: product.price,
      category: product.category?.name
    });
  }

  inputValid(control: controlType): boolean {
    return (
      !!this.productForm.get(control)?.invalid &&
      !!this.productForm.get(control)?.touched
    );
  }

  save() {

    if (this.productId) { // Update
      this.productForm.controls['name'].clearValidators();
      this.productForm.controls['img'].clearValidators();
      this.productForm.controls['description'].clearValidators();
      this.productForm.controls['price']!.clearValidators();
      this.productForm.controls['category']!.clearValidators();

      this.productForm.controls['name'].updateValueAndValidity();
      this.productForm.controls['img'].updateValueAndValidity();
      this.productForm.controls['description'].updateValueAndValidity();
      this.productForm.controls['price']!.updateValueAndValidity();
      this.productForm.controls['category']!.updateValueAndValidity();
    }

    if (this.productForm.invalid) return this.productForm.markAllAsTouched();

    const catForm: any = this.productForm.controls['category']?.value === '' ? {code: 2} : this.addCategory(this.productForm.controls['category']?.value);

    let product: IProductDTO = {
      name: this.productForm.controls['name'].value,
      img: this.productForm.controls['img'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price']?.value,
      category: catForm,
    };

    if (this.productId) {
      product = { ...product, id: Number(this.productId) };
    }

    this.productId ? this.updateProduct(product) : this.addProduct(product);
  }

  addProduct(product: IProductDTO) {
    this.productService
      .createProductByAdmin(product)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  updateProduct(product: IProductDTO ) {
    this.productService
      .updateProductByAdmin(product)
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

  inputImgChange():void  {
    const url = this.productForm.controls['img'].value;

    if (url === '') {
      this.imgUrl.set('https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg');
      return;
    }

    this.imgUrl.set(this.productForm.controls['img'].value);
  }

  private addCategory(category: string): ICategoryReq {
    if(typeof category === 'object')
      return category;

    const cat = this.categories()!.find((cat) => cat.name === category);
    return {
      ...cat!
    };
  }

}

import {Component, signal, ViewChild} from '@angular/core';
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Table, TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {CurrencyPipe, DatePipe, NgClass, TitleCasePipe} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {PaginatorModule} from "primeng/paginator";
import {OrderResponse} from "../../../../interfaces/order.interface";
import {MenuItem, MessageService} from "primeng/api";
import {SplitButtonModule} from "primeng/splitbutton";
import {OrderService} from "../../../../services/order.service";
import {MessagesModule} from "primeng/messages";
import {TableProductsPromoComponent} from "../../../../components/table-products-promo/table-products-promo.component";
import {IProduct} from "../../../../interfaces/product.interface";

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [
    ToastModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CurrencyPipe,
    RatingModule,
    FormsModule,
    DialogModule,
    NgClass,
    DropdownModule,
    RadioButtonModule,
    PaginatorModule,
    DatePipe,
    TitleCasePipe,
    ReactiveFormsModule,
    SplitButtonModule,
    MessagesModule,
    TableProductsPromoComponent
  ],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent {

  messageNotData = [
    { severity: 'info', summary: 'No hay ordenes que mostrar', detail: '' },
  ];

  @ViewChild('dt') table: Table | undefined;
  @ViewChild('orderStatus') orderStatus: any;

  items: MenuItem[] = [];

  rows = 10;
  totalRecords = this.orderService.orders().length;

  orders: OrderResponse[] = this.orderService.orders();
  order: OrderResponse = {} as OrderResponse;

  products= signal<IProduct[]>([]);

  orderDialog: boolean = false;
  deleteOrderDialog: boolean = false;
  deleteOrdersDialog: boolean = false;
  selectedOrders: OrderResponse[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];

  constructor(
      private messageService: MessageService,
      public orderService: OrderService
  ) { }

  ngOnInit() {

    this.items = [
      {
        label: 'Todos',
        icon: 'pi pi-warehouse',
        command: () => {this.onChangeListByStatus('ALL')}
      },
      {
        label: 'En Proceso',
        icon: 'pi pi-box',
        command: () => {this.onChangeListByStatus('IN_PROGRESS')}
      },
      {
        label: 'En Camino',
        icon: 'pi pi-truck',
        command: () => {this.onChangeListByStatus('ON_ROUTE')}
      },
      {
        label: 'Entregados',
        icon: 'pi pi-thumbs-up',
        command: () => {this.onChangeListByStatus('DELIVERED')}
      },
      {
        label: 'Cancelados',
        icon: 'pi pi-times-circle',
        command: () => {this.onChangeListByStatus('CANCELED')}
      },
    ];

    this.cols = [
      { field: 'user.fullName', header: 'Cliente' },
      { field: 'totalPrice', header: 'Total' },
      { field: 'paymentMethod', header: 'Pago' },
      { field: 'createdAt', header: 'Pedido el' },
      { field: 'status', header: 'Estatus' }
    ];

    this.statuses = [
      { label: 'IN_PROGRESS', value: 'in_progress' },
      { label: 'ON_ROUTE', value: 'on_route' },
      { label: 'DELIVERED', value: 'delivered' },
      { label: 'CANCELED', value: 'canceled' }
    ];


  }

  deleteSelectedProducts() {
    this.deleteOrdersDialog = true;
  }

  editProduct(order: OrderResponse) {
    this.order = { ...order };
    this.orderDialog = true;

    const prods = this.order.products.map(({product}) => {
      return product;
    });

    this.products.set(prods);
  }

  deleteProduct(order: OrderResponse) {
    this.deleteOrderDialog = true;
    this.order = { ...order };
  }

  confirmDeleteSelected() {
    this.deleteOrdersDialog = false;
    this.orders = this.orders.filter(val => !this.selectedOrders.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Pedido eliminado exitosamente', life: 3000 });
    this.selectedOrders = [];
  }

  confirmDelete() {
    this.deleteOrderDialog = false;
    this.orders = this.orders.filter(val => val.id !== this.order.id);
    this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Pedido eliminado exitosamente', life: 3000 });
    this.order = {} as OrderResponse;
  }

  hideDialog() {
    this.orderDialog = false;
    this.submitted = false;
  }

  updateStatusProduct() {
    this.submitted = true;
    this.orderService.updateOrderStatus(this.order.id, this.orderStatus.value);
    this.messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Estatus del pedido actualizado exitosamente', life: 2000 });
    this.orderDialog = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onChangeListByStatus(status: string) {
    this.orderService.getOrdersByStatus(status);
  }

  generateCSV() {
    this.table?.exportCSV();
  }
}

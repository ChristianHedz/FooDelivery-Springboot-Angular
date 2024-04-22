import {Component, Input, signal} from '@angular/core';
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {Table, TableLazyLoadEvent, TableModule, TablePageEvent} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {CurrencyPipe, DatePipe, NgClass, TitleCasePipe} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {PaginatorModule} from "primeng/paginator";
import {OrderResponse, OrderResponseAll} from "../../../../interfaces/order.interface";
import {MessageService} from "primeng/api";

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
    TitleCasePipe
  ],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent {

  @Input({ required: true }) ordersResponse!: OrderResponse[];
  @Input({ required: true }) allOrdersResponse!: OrderResponseAll;

  rows = 0;
  totalRecords = 0;

  orders: OrderResponse[] = [];
  order: OrderResponse = {} as OrderResponse;

  orderDialog: boolean = false;
  deleteOrderDialog: boolean = false;
  deleteOrdersDialog: boolean = false;
  selectedOrders: OrderResponse[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    console.log(this.ordersResponse);
    console.log(this.allOrdersResponse);

    this.orders = this.ordersResponse;

    console.log(this.allOrdersResponse.size, this.allOrdersResponse.totalElements);

    this.rows = Number(this.allOrdersResponse.size);
    this.totalRecords = Number(this.allOrdersResponse.totalElements);

    this.cols = [
      { field: 'user.fullName', header: 'Cliente' },
      { field: 'totalPrice', header: 'Total' },
      { field: 'paymentMethod', header: 'Pago' },
      { field: 'createdAt', header: 'Pedido el' },
      { field: 'status', header: 'Estatus' }
    ];

    this.statuses = [
      { label: 'IN_PROGRESS', value: 'inprogress' },
      { label: 'ON_ROUTE', value: 'onroute' },
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

  /*saveProduct() {
    this.submitted = true;

    if (this.order.name?.trim()) {
      if (this.order.id) {
        // @ts-ignore
        this.order.inventoryStatus = this.order.inventoryStatus.value ? this.order.inventoryStatus.value : this.order.inventoryStatus;
        this.orders[this.findIndexById(this.order.id)] = this.order;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.order.id = this.createId();
        this.order.code = this.createId();
        this.order.image = 'product-placeholder.svg';
        // @ts-ignore
        this.order.inventoryStatus = this.order.inventoryStatus ? this.order.inventoryStatus.value : 'INSTOCK';
        this.orders.push(this.order);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.orders = [...this.orders];
      this.orderDialog = false;
      this.order = {};
    }
  }*/

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onPageChange($event: TablePageEvent) {
    console.log('Cambiando de pagina: ', $event);
    const page = $event.first / $event.rows;
  }

  loadOrders($event: TableLazyLoadEvent) {

    if (!$event.first || !$event.rows) return;

    const page = $event.first / $event.rows;

    console.log('Cargando ordenes: ', page);
  }
}

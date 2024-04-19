package com.example.app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @NotNull
    private StatusOrder status;

    @NotNull
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @NotNull
    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "promotion_id", referencedColumnName = "id")
    private Promotion promotion;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "order-orderproduct")
    private Set<OrderProduct> orderProducts = new HashSet<>();

    //****** Helper Methods for OrderProducts: Keep Both Sides of the Association in SYNC.********/
    public void addOrderProducts(OrderProduct orderProduct) {
        this.orderProducts.add(orderProduct);
        orderProduct.setOrder(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Order order)) return false;
        return Objects.equals(id, order.id) && Objects.equals(totalPrice, order.totalPrice) && status == order.status && paymentMethod == order.paymentMethod && Objects.equals(createdAt, order.createdAt) && Objects.equals(updatedAt, order.updatedAt) && Objects.equals(user, order.user) && Objects.equals(promotion, order.promotion) && Objects.equals(orderProducts, order.orderProducts);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, totalPrice, status, paymentMethod, createdAt, updatedAt);
    }

    @Override
    public String toString() {
        return "Order{" +
          "id=" + id +
          ", totalPrice=" + totalPrice +
          ", status=" + status +
          ", paymentMethod=" + paymentMethod +
          ", createdAt=" + createdAt +
          ", updatedAt=" + updatedAt +
          ", user=" + user +
          ", promotion=" + promotion +
          ", orderProducts=" + orderProducts +
          '}';
    }
}

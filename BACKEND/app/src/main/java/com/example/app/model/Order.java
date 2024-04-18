package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
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

    /*@ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotionId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product productId;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user-id", referencedColumnName = "id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
    private List<OrderItems> orderItems;*/

}

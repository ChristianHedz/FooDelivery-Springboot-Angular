package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotionId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product productId;

    @NotNull
    private Long quantity;

    @NotNull
    private BigDecimal totalPrice;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user-id", referencedColumnName = "id")
    private User user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
    private List<OrderItems> orderItems;

}

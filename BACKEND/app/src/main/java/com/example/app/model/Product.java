package com.example.app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String img;

    @NotBlank
    private String description;

    @NotNull
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Promotion> promotions;

    //****** Helper Methods for Promotions: Keep Both Sides of the Association in SYNC.********/
    public void addPromotion(Promotion promotion) {
        this.promotions.add(promotion);
        promotion.setProduct(this);
    }

    public void removePromotion(Promotion promotion) {
        promotion.setProduct(null);
        this.promotions.remove(promotion);
    }

}

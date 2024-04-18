package com.example.app.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "Invoice")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    
    @Column(name = "Id_Order", nullable = false)
    private Long idOrder;
    
//    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//    private Order items;

    @Column(name = "Total_Price", nullable = false)
    private Double tolalPrice;

    @Column(name = "Date_And_Time", nullable = false)
    private LocalDateTime dateAndTime;

    private String payment;

//    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//    private Payment payment;
}

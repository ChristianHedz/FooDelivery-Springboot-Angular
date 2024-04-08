package com.example.app.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String province;

    private String locality;

    @Column(name = "street_number")
    private String streetNumber;

    @Column(name = "reference_point")
    private String referencePoint;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

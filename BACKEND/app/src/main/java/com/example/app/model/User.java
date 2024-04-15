package com.example.app.model;

import com.example.app.dto.user.UserToUpdateDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "user_name", unique = true)
    private String alias;
    @Column(unique = true)
    private String phone;
    @Column(unique = true)
    private String email;
    private String password;
    private boolean active;
    @Enumerated(EnumType.STRING)
    private Role role;

    /* One User has many Addresses (A user row can be referenced by multiple address rows)
     * The "user_id" column in the "address" table column maps this relationship via a foreign key that references the primary key of the "users" table.
     * An Address cannot exist without a User, so the CascadeType.ALL and orphanRemoval = true options are set to ensure
     * that the Address entity is deleted when the User entity is deleted.
     * The `User` entity is the parent side of the relationship, so it is the owning side of the relationship.
     * While the `Address` entity is the child side of the relationship, so it is the inverse side of the relationship.
     */
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    /* One User has many Orders (A user row can be referenced by multiple order rows)
     * The "user_id" column in the "order" table column maps this relationship via a foreign key that references the primary key of the "users" table.
     * An Order cannot exist without a User, so the CascadeType.ALL and orphanRemoval = true options are set to ensure
     * that the Order entity is deleted when the User entity is deleted.
     * The `User` entity is the parent side of the relationship, so it is the owning side of the relationship.
     * While the `Order` entity is the child side of the relationship, so it is the inverse side of the relationship.

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders;
    */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return active == user.active && Objects.equals(id, user.id) && Objects.equals(fullName, user.fullName) && Objects.equals(alias, user.alias) && Objects.equals(phone, user.phone) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && role == user.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, fullName, alias, phone, email, password, active, role);
    }

    @Override
    public String toString() {
        return "User{" +
          "id=" + id +
          ", fullName='" + fullName + '\'' +
          ", userName='" + alias + '\'' +
          ", phone='" + phone + '\'' +
          ", email='" + email + '\'' +
          ", password='" + password + '\'' +
          ", active=" + active +
          ", role=" + role +
          '}';
    }

    public User update(UserToUpdateDto userToUpdateDto) {
        if (userToUpdateDto.fullName() != null)
            this.fullName = userToUpdateDto.fullName();

        if (userToUpdateDto.alias() != null)
            this.alias = userToUpdateDto.alias();

        return this;
    }
}

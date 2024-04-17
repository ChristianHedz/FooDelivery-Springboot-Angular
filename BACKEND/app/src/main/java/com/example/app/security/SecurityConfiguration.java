package com.example.app.security;

import com.example.app.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity

          .csrf(AbstractHttpConfigurer::disable)
          .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
          .authorizeHttpRequests(authorizeRequests ->
            authorizeRequests
              .requestMatchers(HttpMethod.GET, "/users/me")
                .hasAnyAuthority(Role.ADMIN.name(), Role.CUSTOMER.name(), Role.DELIVERY_PERSON.name())
              .requestMatchers(HttpMethod.GET, "/users/me/**")
                .hasAuthority(Role.ADMIN.name())
              .requestMatchers(HttpMethod.PUT, "/users/me/**")
                .hasAuthority(Role.ADMIN.name())
              .requestMatchers(HttpMethod.POST, "/users/auth")
                .permitAll()
              .requestMatchers(HttpMethod.DELETE, "/users/**")
                .hasAuthority(Role.ADMIN.name())
              .requestMatchers(HttpMethod.GET, "/users")
                .hasAuthority(Role.ADMIN.name())
              .requestMatchers(HttpMethod.POST, "/users")
                .permitAll()
              .requestMatchers(HttpMethod.POST, "/users/authGoogle")
                .permitAll()
              .requestMatchers(HttpMethod.DELETE, "/products/{idProduct}/promotion")
                .hasAuthority(Role.ADMIN.name())
              .requestMatchers(HttpMethod.POST, "/products/{idProduct}/promotions/{idPromotion}")
                .hasAuthority(Role.ADMIN.name())
              .requestMatchers(HttpMethod.GET, "/promotions/{id}/products")
                .permitAll()
              .requestMatchers(HttpMethod.GET, "/products/{productId}/promotion")
                .permitAll()
              .requestMatchers(HttpMethod.POST, "/products")
                    .permitAll()
               .requestMatchers(HttpMethod.GET, "/products")
                .permitAll()
               .requestMatchers(HttpMethod.PUT, "/products")
                    .permitAll()
               .requestMatchers(HttpMethod.DELETE, "/products")
                    .permitAll()
               .requestMatchers(HttpMethod.POST, "/categories")
                    .permitAll()
               .requestMatchers(HttpMethod.GET, "/categories")
                    .permitAll()
               .requestMatchers(HttpMethod.PUT, "/categories")
                    .permitAll()
               .requestMatchers(HttpMethod.DELETE, "/categories")
                    .permitAll()
              .requestMatchers(HttpMethod.POST, "/orders")
                    .permitAll()
              .requestMatchers(HttpMethod.POST, "/api/payments")
                .permitAll()
              .requestMatchers(HttpMethod.GET, "/api/payments/success")
                .permitAll()
              .requestMatchers(HttpMethod.GET, "/api/payments/cancel")
                .permitAll()
              .requestMatchers("/api-docs/**", "api-docs.yaml")
                .permitAll()
              .requestMatchers("/swagger-ui-custom.html", "/swagger-ui/**", "/swagger-ui/")
                .permitAll()
              .anyRequest()
                .authenticated()
            )
          .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

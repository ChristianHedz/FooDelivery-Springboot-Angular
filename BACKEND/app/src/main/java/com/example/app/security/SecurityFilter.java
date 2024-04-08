package com.example.app.security;

import com.example.app.repository.UserRepository;
import com.example.app.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/* *
 * This class is responsible for filtering the requests and checking if the user is authenticated.
* */

@Component
@RequiredArgsConstructor
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenService tokenService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain
    ) throws ServletException, IOException {

        String token = tokenService.getTokenFromHeader(request);

        if (token != null) {

            String subject = tokenService.getVerifier(token).getSubject();

            if (subject != null) {
                // Search user in DB
                var usuario = userRepository.findByPhoneAndActiveTrue(subject);

                var authentication = new UsernamePasswordAuthenticationToken(
                  usuario,
                  null,
                  usuario.getAuthorities() //Forced login
                );

                // Set the authenticated user manually
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

}
package com.example.app.dto.category;

import java.io.Serializable;

public record CategoryDTO(
        Long id,

        String name
) implements Serializable {
}

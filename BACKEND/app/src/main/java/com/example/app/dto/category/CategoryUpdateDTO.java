package com.example.app.dto.category;

import java.io.Serializable;

public record CategoryUpdateDTO(
        String name
) implements Serializable {
}

package com.example.app.dto.address;

import java.io.Serializable;

public record AddressPublicDataDTO(
        Long id,
        String province,
        String locality,
        String streetNumber,
        String referencePoint
)implements Serializable {
}

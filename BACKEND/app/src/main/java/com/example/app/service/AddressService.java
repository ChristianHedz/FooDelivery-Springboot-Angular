package com.example.app.service;

import com.example.app.dto.address.AddressDTO;
import com.example.app.dto.address.AddressPublicDataDTO;
import com.example.app.dto.address.AddressUpdateDataDTO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface AddressService {

    void registerAddress(AddressDTO addressDTO, HttpServletRequest request);

    AddressPublicDataDTO updateAddress(Long id, AddressUpdateDataDTO addressUpdateDataDTO);

    List<AddressPublicDataDTO> findAllByUserId(Long id);

    void deleteAddress(Long id);
}

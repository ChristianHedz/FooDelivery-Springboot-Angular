package com.example.app.mapper;

import com.example.app.dto.address.AddressDTO;
import com.example.app.dto.address.AddressPublicDataDTO;
import com.example.app.dto.address.AddressUpdateDataDTO;
import com.example.app.model.Address;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {UserMapper.class})
public interface AddressMapper {

    Address toEntity(AddressDTO addressDTO);

    AddressPublicDataDTO toDto(Address address);

    List<AddressPublicDataDTO> toAddressPublicDataDTO(List<Address> addresses);
}

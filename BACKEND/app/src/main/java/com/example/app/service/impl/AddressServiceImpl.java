package com.example.app.service.impl;

import com.example.app.dto.address.AddressDTO;
import com.example.app.dto.address.AddressPublicDataDTO;
import com.example.app.dto.address.AddressUpdateDataDTO;
import com.example.app.exception.address.AddressNotFoundException;
import com.example.app.exception.user.UserNotFoundException;
import com.example.app.mapper.AddressMapper;
import com.example.app.model.Address;
import com.example.app.repository.AddressRepository;
import com.example.app.repository.UserRepository;
import com.example.app.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    private final AddressMapper addressMapper;

    private final UserRepository userRepository;

    @Override
    @Transactional
    public void registerAddress(AddressDTO addressDTO) {

        Long id = addressDTO.user().id();

        userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException
                        ("El usuario con id " + id + " no se encuentra registrado"));

        addressRepository.save(addressMapper.toEntity(addressDTO));
    }

    @Override
    @Transactional
    public AddressPublicDataDTO updateAddress(Long id, AddressUpdateDataDTO addressUpdateDataDTO) {

        Address addressDB = addressRepository.findById(id)
                .orElseThrow(() -> new AddressNotFoundException
                        ("La direccion con id " + id + " no se encuentra registrada"));

        addressDB.setStreetNumber(addressUpdateDataDTO.streetNumber());
        addressDB.setReferencePoint(addressUpdateDataDTO.referencePoint());

        return addressMapper.toDto(addressRepository.save(addressDB));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AddressPublicDataDTO> findAllByUserId(Long id) {

        userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException
                        ("El usuario con id " + id + " no se encuentra registrado"));

        List<Address> addresses = addressRepository.findAllByUserId(id);

        return addressMapper.toAddressPublicDataDTO(addresses);
    }

    @Override
    @Transactional
    public void deleteAddress(Long id) {

        addressRepository.findById(id)
                .orElseThrow(() -> new AddressNotFoundException
                        ("La direccion con id " + id + " no existe"));

        addressRepository.deleteById(id);
    }
}

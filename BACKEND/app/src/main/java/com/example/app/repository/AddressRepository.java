package com.example.app.repository;

import com.example.app.model.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends CrudRepository<Address,Long> {

    List<Address> findAllByUserId(Long id);
}

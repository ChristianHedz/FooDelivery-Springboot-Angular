package com.example.app.repository;

import com.example.app.model.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends CrudRepository<Promotion, Long>{
    Page<Promotion> findAllByActiveTrue(Pageable pageable);
}

package com.example.app.mapper;

import com.example.app.dto.category.CategoryDTO;
import com.example.app.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CategoryMapper {

    Category toEntity(CategoryDTO categoryDTO);

    CategoryDTO toDto(Category category);

    List<CategoryDTO> toDtoList(List<Category> categories);
}
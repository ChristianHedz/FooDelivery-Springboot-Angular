package com.example.app.exception;

import java.util.Map;

public record ApplicationExceptionResponse(
  Boolean isError,
  String dateTime,
  Integer statusCode,
  String path,
  Map<String, String> messages) {
}

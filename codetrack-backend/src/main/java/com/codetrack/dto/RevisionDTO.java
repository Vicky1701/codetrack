package com.codetrack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RevisionDTO {
    private LocalDateTime date;
    private Integer timeSpent; // in minutes
    private Integer rating; // 1-5 stars
}


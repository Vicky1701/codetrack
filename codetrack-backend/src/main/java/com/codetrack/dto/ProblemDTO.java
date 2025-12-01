package com.codetrack.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemDTO {
    private Long id;
    private String title;
    private String pattern;
    private String difficulty;
    private String platform;
    private String link;
    private String notes;
    private List<String> tags = new ArrayList<>();
    private String priority;
    private Integer revisionInterval;
    private Integer revisionCount;
    private LocalDateTime lastRevised;
    private LocalDateTime createdAt;
    private Integer totalTimeSpent;
    private Double averageRating;
    private List<Map<String, Object>> solvedDates = new ArrayList<>();
}


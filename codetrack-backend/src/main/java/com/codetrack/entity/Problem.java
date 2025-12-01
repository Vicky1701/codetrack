package com.codetrack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "problems")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Problem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String pattern;
    
    @Column(nullable = false)
    private String difficulty; // Easy, Medium, Hard
    
    private String platform;
    
    private String link;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @ElementCollection
    @CollectionTable(name = "problem_tags", joinColumns = @JoinColumn(name = "problem_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();
    
    private String priority; // Low, Medium, High, Critical
    
    private Integer revisionInterval = 7; // days
    
    private Integer revisionCount = 0;
    
    private LocalDateTime lastRevised;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    private Integer totalTimeSpent = 0;
    
    private Double averageRating = 0.0;
    
    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SolvedDate> solvedDates = new ArrayList<>();
}


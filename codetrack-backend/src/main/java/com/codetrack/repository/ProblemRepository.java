package com.codetrack.repository;

import com.codetrack.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    
    List<Problem> findByTitleContainingIgnoreCase(String title);
    
    List<Problem> findByPattern(String pattern);
    
    List<Problem> findByDifficulty(String difficulty);
    
    @Query("SELECT p FROM Problem p WHERE p.lastRevised IS NULL OR p.lastRevised < :cutoffDate")
    List<Problem> findProblemsNeedingRevision(LocalDateTime cutoffDate);
    
    List<Problem> findByTagsContaining(String tag);
}


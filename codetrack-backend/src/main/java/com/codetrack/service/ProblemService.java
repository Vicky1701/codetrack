package com.codetrack.service;

import com.codetrack.dto.ProblemDTO;
import com.codetrack.dto.RevisionDTO;
import com.codetrack.entity.Problem;
import com.codetrack.entity.SolvedDate;
import com.codetrack.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProblemService {
    
    @Autowired
    private ProblemRepository problemRepository;
    
    public List<ProblemDTO> getAllProblems() {
        return problemRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public ProblemDTO getProblemById(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));
        return convertToDTO(problem);
    }
    
    public ProblemDTO createProblem(ProblemDTO problemDTO) {
        Problem problem = convertToEntity(problemDTO);
        problem.setCreatedAt(LocalDateTime.now());
        problem.setRevisionCount(0);
        problem.setTotalTimeSpent(0);
        problem.setAverageRating(0.0);
        
        // Add initial solved date
        if (problemDTO.getSolvedDates() == null || problemDTO.getSolvedDates().isEmpty()) {
            SolvedDate initialDate = new SolvedDate();
            initialDate.setDate(LocalDateTime.now());
            initialDate.setProblem(problem);
            problem.getSolvedDates().add(initialDate);
        }
        
        Problem saved = problemRepository.save(problem);
        return convertToDTO(saved);
    }
    
    public ProblemDTO updateProblem(Long id, ProblemDTO problemDTO) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));
        
        // Update fields (preserve revision history)
        problem.setTitle(problemDTO.getTitle());
        problem.setPattern(problemDTO.getPattern());
        problem.setDifficulty(problemDTO.getDifficulty());
        problem.setPlatform(problemDTO.getPlatform());
        problem.setLink(problemDTO.getLink());
        problem.setNotes(problemDTO.getNotes());
        problem.setTags(problemDTO.getTags());
        problem.setPriority(problemDTO.getPriority());
        problem.setRevisionInterval(problemDTO.getRevisionInterval());
        
        Problem updated = problemRepository.save(problem);
        return convertToDTO(updated);
    }
    
    public void deleteProblem(Long id) {
        problemRepository.deleteById(id);
    }
    
    public ProblemDTO markRevision(Long id, RevisionDTO revisionDTO) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));
        
        SolvedDate solvedDate = new SolvedDate();
        solvedDate.setDate(revisionDTO.getDate() != null ? revisionDTO.getDate() : LocalDateTime.now());
        solvedDate.setTimeSpent(revisionDTO.getTimeSpent());
        solvedDate.setRating(revisionDTO.getRating());
        solvedDate.setProblem(problem);
        
        problem.getSolvedDates().add(solvedDate);
        problem.setRevisionCount(problem.getRevisionCount() + 1);
        problem.setLastRevised(LocalDateTime.now());
        
        // Update total time spent
        if (revisionDTO.getTimeSpent() != null) {
            problem.setTotalTimeSpent(problem.getTotalTimeSpent() + revisionDTO.getTimeSpent());
        }
        
        // Calculate average rating
        if (revisionDTO.getRating() != null) {
            double avgRating = problem.getSolvedDates().stream()
                    .filter(sd -> sd.getRating() != null)
                    .mapToInt(SolvedDate::getRating)
                    .average()
                    .orElse(0.0);
            problem.setAverageRating(Math.round(avgRating * 10.0) / 10.0);
        }
        
        Problem updated = problemRepository.save(problem);
        return convertToDTO(updated);
    }
    
    private ProblemDTO convertToDTO(Problem problem) {
        ProblemDTO dto = new ProblemDTO();
        dto.setId(problem.getId());
        dto.setTitle(problem.getTitle());
        dto.setPattern(problem.getPattern());
        dto.setDifficulty(problem.getDifficulty());
        dto.setPlatform(problem.getPlatform());
        dto.setLink(problem.getLink());
        dto.setNotes(problem.getNotes());
        dto.setTags(problem.getTags());
        dto.setPriority(problem.getPriority());
        dto.setRevisionInterval(problem.getRevisionInterval());
        dto.setRevisionCount(problem.getRevisionCount());
        dto.setLastRevised(problem.getLastRevised());
        dto.setCreatedAt(problem.getCreatedAt());
        dto.setTotalTimeSpent(problem.getTotalTimeSpent());
        dto.setAverageRating(problem.getAverageRating());
        
        // Convert solved dates
        List<Map<String, Object>> solvedDatesList = problem.getSolvedDates().stream()
                .map(sd -> {
                    Map<String, Object> dateMap = new HashMap<>();
                    dateMap.put("date", sd.getDate().toString());
                    dateMap.put("timeSpent", sd.getTimeSpent() != null ? sd.getTimeSpent() : 0);
                    dateMap.put("rating", sd.getRating() != null ? sd.getRating() : 0);
                    return dateMap;
                })
                .collect(Collectors.toList());
        dto.setSolvedDates(solvedDatesList);
        
        return dto;
    }
    
    private Problem convertToEntity(ProblemDTO dto) {
        Problem problem = new Problem();
        problem.setTitle(dto.getTitle());
        problem.setPattern(dto.getPattern());
        problem.setDifficulty(dto.getDifficulty());
        problem.setPlatform(dto.getPlatform());
        problem.setLink(dto.getLink());
        problem.setNotes(dto.getNotes());
        problem.setTags(dto.getTags() != null ? dto.getTags() : new ArrayList<>());
        problem.setPriority(dto.getPriority());
        problem.setRevisionInterval(dto.getRevisionInterval() != null ? dto.getRevisionInterval() : 7);
        
        return problem;
    }
}


package com.codetrack.controller;

import com.codetrack.dto.ProblemDTO;
import com.codetrack.dto.RevisionDTO;
import com.codetrack.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ProblemController {
    
    @Autowired
    private ProblemService problemService;
    
    @GetMapping
    public ResponseEntity<List<ProblemDTO>> getAllProblems() {
        List<ProblemDTO> problems = problemService.getAllProblems();
        return ResponseEntity.ok(problems);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProblemDTO> getProblemById(@PathVariable Long id) {
        try {
            ProblemDTO problem = problemService.getProblemById(id);
            return ResponseEntity.ok(problem);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<ProblemDTO> createProblem(@RequestBody ProblemDTO problemDTO) {
        try {
            ProblemDTO created = problemService.createProblem(problemDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProblemDTO> updateProblem(
            @PathVariable Long id,
            @RequestBody ProblemDTO problemDTO) {
        try {
            ProblemDTO updated = problemService.updateProblem(id, problemDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        try {
            problemService.deleteProblem(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping("/{id}/revision")
    public ResponseEntity<ProblemDTO> markRevision(
            @PathVariable Long id,
            @RequestBody RevisionDTO revisionDTO) {
        try {
            ProblemDTO updated = problemService.markRevision(id, revisionDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}


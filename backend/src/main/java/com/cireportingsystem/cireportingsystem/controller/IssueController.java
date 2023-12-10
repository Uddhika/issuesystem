package com.cireportingsystem.cireportingsystem.controller;

import com.cireportingsystem.cireportingsystem.exception.ResourceNotFoundException;
import com.cireportingsystem.cireportingsystem.model.Issue;
import com.cireportingsystem.cireportingsystem.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/issue")
public class IssueController {

    @Autowired
    private IssueRepository issueRepository;

    @GetMapping
    public List<Issue> getAllIssues(){
        return issueRepository.findAll();
    }

    @PostMapping
    public Issue createIssue(@RequestBody Issue issue){
        return issueRepository.save(issue);
    }

    @GetMapping("{id}")
    public ResponseEntity<Issue> getIssueById(@PathVariable  Long id){
        Issue issue = issueRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Issue Not Found"+id));
        return ResponseEntity.ok(issue);
    }

    @PutMapping("{id}")
    public ResponseEntity<Issue> updateIssue(@PathVariable long id, @RequestBody Issue issueDetails){
        Issue updatedIssue = issueRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Issue not exist with id:"+id));
        updatedIssue.setIssueStatus(issueDetails.getIssueStatus());
        updatedIssue.setIssueDate(issueDetails.getIssueDate());
        updatedIssue.setIssueType(issueDetails.getIssueType());
        updatedIssue.setIssueDescription(issueDetails.getIssueDescription());
        updatedIssue.setIssueName(issueDetails.getIssueName());

        issueRepository.save(updatedIssue);
        return ResponseEntity.ok(updatedIssue);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteIssue(@PathVariable long id){
        Issue issue = issueRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Issue not exist with id:"+id));

        issueRepository.delete(issue);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

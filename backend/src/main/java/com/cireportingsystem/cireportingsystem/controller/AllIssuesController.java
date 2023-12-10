package com.cireportingsystem.cireportingsystem.controller;

import com.cireportingsystem.cireportingsystem.model.AllIssues;
import com.cireportingsystem.cireportingsystem.model.Issue;
import com.cireportingsystem.cireportingsystem.repository.AllIssuesRepository;
import com.cireportingsystem.cireportingsystem.service.AllIssuesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/allissues")
public class AllIssuesController {

    @Autowired
    private AllIssuesService allIssuesService;

    @GetMapping
    public List<AllIssues> getAllIssues(){
        return allIssuesService.getAllData();
    }
}

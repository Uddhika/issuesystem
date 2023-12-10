package com.cireportingsystem.cireportingsystem;

import com.cireportingsystem.cireportingsystem.model.Issue;
import com.cireportingsystem.cireportingsystem.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class CireportingsystemApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(CireportingsystemApplication.class, args);
	}

	@Autowired
	private IssueRepository issueRepository;

	@Override
	public void run(String... args) throws Exception {
		Issue issue = new Issue();
//		issue.setIssueName("Network Issue");
//		issue.setIssueDescription("Not working please fix it");
//		issue.setIssueType("Bug");
//		issue.setIssueDate("2023-12-30");
//		issue.setIssueStatus("Open");
//		issueRepository.save(issue);
	}
}

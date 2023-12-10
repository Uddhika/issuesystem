package com.cireportingsystem.cireportingsystem.repository;

import com.cireportingsystem.cireportingsystem.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Long> {

}

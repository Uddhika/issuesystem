package com.cireportingsystem.cireportingsystem.service;

import com.cireportingsystem.cireportingsystem.model.AllIssues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllIssuesService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<AllIssues> getAllData(){
        String sql = "SELECT * FROM issue_with_status_view";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            AllIssues allIssues = new AllIssues();
            allIssues.setIdate(rs.getString("issue_date"));
            allIssues.setId(rs.getLong("issueid"));
            allIssues.setIdesc(rs.getString("issue_description"));
            allIssues.setIname(rs.getString("issue_name"));
            allIssues.setIssuestatus(rs.getString("issue_status"));
            allIssues.setItype(rs.getString("issue_type"));
            allIssues.setStatusid(rs.getString("statusid"));

            return allIssues;
        });
    }
}

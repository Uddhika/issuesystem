package com.cireportingsystem.cireportingsystem.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "issueid")
    private long id;

    @Column(name = "issueDate")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "UTC")
    private String issueDate;

    @Column(name = "issueName")
    private String issueName;

    @Column(name = "issueDescription")
    private String issueDescription;

    @Column(name = "issueType")
    private String issueType;

    @Column(name = "issueStatus")
    private String issueStatus;

}

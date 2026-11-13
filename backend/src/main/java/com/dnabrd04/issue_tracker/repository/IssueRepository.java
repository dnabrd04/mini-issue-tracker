package com.dnabrd04.issue_tracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dnabrd04.issue_tracker.model.Issue;
import com.dnabrd04.issue_tracker.model.Priority;
import com.dnabrd04.issue_tracker.model.Status;

public interface IssueRepository extends JpaRepository<Issue, Long> {

	@Query("""
			SELECT i FROM Issue i
			WHERE (:status IS NULL OR i.status = :status)
			  AND (:priority IS NULL OR i.priority = :priority)
			  AND (:search IS NULL OR LOWER(i.title) LIKE LOWER(CONCAT('%', :search, '%')))
			ORDER BY i.id
			""")
	List<Issue> findAllFiltered(
			@Param("status") Status status,
			@Param("priority") Priority priority,
			@Param("search") String search
	);
}

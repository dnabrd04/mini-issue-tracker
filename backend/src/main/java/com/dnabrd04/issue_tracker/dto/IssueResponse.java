package com.dnabrd04.issue_tracker.dto;

import java.time.LocalDateTime;

import com.dnabrd04.issue_tracker.model.Issue;
import com.dnabrd04.issue_tracker.model.Priority;
import com.dnabrd04.issue_tracker.model.Status;
import com.fasterxml.jackson.annotation.JsonProperty;

public record IssueResponse(
		Long id,
		String title,
		String description,
		Priority priority,
		Status status,
		@JsonProperty("created_at") LocalDateTime createdAt,
		@JsonProperty("updated_at") LocalDateTime updatedAt
) {

	public static IssueResponse from(Issue issue) {
		return new IssueResponse(
				issue.getId(),
				issue.getTitle(),
				issue.getDescription(),
				issue.getPriority(),
				issue.getStatus(),
				issue.getCreatedAt(),
				issue.getUpdatedAt()
		);
	}
}

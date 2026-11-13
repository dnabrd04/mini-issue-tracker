package com.dnabrd04.issue_tracker.dto;

import com.dnabrd04.issue_tracker.model.Priority;
import com.dnabrd04.issue_tracker.model.Status;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateIssueRequest(
		@NotBlank
		@Size(min = 3, max = 100)
		String title,

		@NotBlank
		@Size(max = 2000)
		String description,

		Priority priority,

		Status status
) {

	public CreateIssueRequest {
		title = title == null ? null : title.trim();
		description = description == null ? null : description.trim();
		priority = priority == null ? Priority.MEDIUM : priority;
		status = status == null ? Status.PENDING : status;
	}
}

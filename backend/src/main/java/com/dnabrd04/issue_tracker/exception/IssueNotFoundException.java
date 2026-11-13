package com.dnabrd04.issue_tracker.exception;

public class IssueNotFoundException extends RuntimeException {

	public IssueNotFoundException(Long id) {
		super("Issue no encontrada con id " + id);
	}
}

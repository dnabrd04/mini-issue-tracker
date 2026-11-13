package com.dnabrd04.issue_tracker.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dnabrd04.issue_tracker.dto.CreateIssueRequest;
import com.dnabrd04.issue_tracker.dto.IssueResponse;
import com.dnabrd04.issue_tracker.dto.UpdateIssueRequest;
import com.dnabrd04.issue_tracker.model.Priority;
import com.dnabrd04.issue_tracker.model.Status;
import com.dnabrd04.issue_tracker.service.IssueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {

	private final IssueService issueService;

	public IssueController(IssueService issueService) {
		this.issueService = issueService;
	}

	@GetMapping
	public List<IssueResponse> findAll(
			@RequestParam(required = false) Status status,
			@RequestParam(required = false) Priority priority,
			@RequestParam(required = false) String search
	) {
		return issueService.findAll(status, priority, search);
	}

	@GetMapping("/{id}")
	public IssueResponse findById(@PathVariable Long id) {
		return issueService.findById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public IssueResponse create(@Valid @RequestBody CreateIssueRequest request) {
		return issueService.create(request);
	}

	@PutMapping("/{id}")
	public IssueResponse update(@PathVariable Long id, @Valid @RequestBody UpdateIssueRequest request) {
		return issueService.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		issueService.delete(id);
	}
}

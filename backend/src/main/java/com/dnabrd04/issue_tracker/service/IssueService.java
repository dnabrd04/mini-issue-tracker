package com.dnabrd04.issue_tracker.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dnabrd04.issue_tracker.dto.CreateIssueRequest;
import com.dnabrd04.issue_tracker.dto.IssueResponse;
import com.dnabrd04.issue_tracker.dto.UpdateIssueRequest;
import com.dnabrd04.issue_tracker.exception.IssueNotFoundException;
import com.dnabrd04.issue_tracker.model.Issue;
import com.dnabrd04.issue_tracker.model.Priority;
import com.dnabrd04.issue_tracker.model.Status;
import com.dnabrd04.issue_tracker.repository.IssueRepository;

@Service
@Transactional(readOnly = true)
public class IssueService {

	private final IssueRepository issueRepository;

	public IssueService(IssueRepository issueRepository) {
		this.issueRepository = issueRepository;
	}

	public List<IssueResponse> findAll(Status status, Priority priority, String search) {
		String normalizedSearch = normalizeSearch(search);

		return issueRepository.findAllFiltered(status, priority, normalizedSearch)
				.stream()
				.map(IssueResponse::from)
				.toList();
	}

	public IssueResponse findById(Long id) {
		return IssueResponse.from(getIssue(id));
	}

	@Transactional
	public IssueResponse create(CreateIssueRequest request) {
		Issue issue = new Issue();
		issue.setTitle(request.title());
		issue.setDescription(request.description());
		issue.setPriority(request.priority());
		issue.setStatus(request.status());

		return IssueResponse.from(issueRepository.saveAndFlush(issue));
	}

	@Transactional
	public IssueResponse update(Long id, UpdateIssueRequest request) {
		Issue issue = getIssue(id);
		issue.setTitle(request.title());
		issue.setDescription(request.description());
		issue.setPriority(request.priority());
		issue.setStatus(request.status());

		return IssueResponse.from(issueRepository.saveAndFlush(issue));
	}

	@Transactional
	public void delete(Long id) {
		issueRepository.delete(getIssue(id));
	}

	private Issue getIssue(Long id) {
		return issueRepository.findById(id)
				.orElseThrow(() -> new IssueNotFoundException(id));
	}

	private String normalizeSearch(String search) {
		if (search == null) {
			return null;
		}

		String trimmed = search.trim();
		return trimmed.isEmpty() ? null : trimmed;
	}
}

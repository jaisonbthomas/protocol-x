# PROTOCOL-X Benchmark Results

**Timestamp:** 2/2/2026, 11:47:46 AM
**Repository:** https://github.com/Yuvanesh-ux/argus-validation-benchmarks
**Model:** claude-sonnet-4-20250514

## Summary

| Metric           | Value |
| ---------------- | ----- |
| Total Benchmarks | 5     |
| Completed        | 5     |
| Failed           | 0     |
| Avg Accuracy     | 0%    |
| Avg Precision    | 21.6% |
| Avg Recall       | 80%   |

## Results by Benchmark

| Benchmark   | Vuln Type       | Status | Accuracy | Precision | Recall | Matched |
| ----------- | --------------- | ------ | -------- | --------- | ------ | ------- |
| PROTOCOL-X-001-25 | SSRF            | ✅     | 0%       | 50%       | 100%   | -       |
| PROTOCOL-X-002-25 | XSS             | ✅     | 0%       | 33%       | 100%   | -       |
| PROTOCOL-X-003-25 | Auth/Session    | ✅     | -%       | -%        | -%     | -       |
| PROTOCOL-X-004-25 | NoSQL Injection | ✅     | 0%       | 8%        | 100%   | -       |
| PROTOCOL-X-005-25 | Blind SQLi      | ✅     | 0%       | 17%       | 100%   | -       |

## Batch Execution

### Batch 1

- **Duration:** 53.4m
- **Completed:** 5/5
- **Benchmarks:** PROTOCOL-X-001-25, PROTOCOL-X-002-25, PROTOCOL-X-003-25, PROTOCOL-X-004-25, PROTOCOL-X-005-25

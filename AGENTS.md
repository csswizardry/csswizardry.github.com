# csswizardry.com Project Guidance

The global agent guidance still applies throughout this repository. Keep this
file short: project-specific procedures belong in `_workflows/`.

## Workflow Routing

Before researching, drafting, editing, backfilling, validating, or maintaining
the automation for a Web-Perf Wednesday, read these files completely:

1. `_workflows/README.md`
2. `_workflows/web-perf-wednesdays.md`

The second file is the canonical editorial and operational contract. Do not
reconstruct it from previous posts, an automation prompt, or conversational
memory.

Validate every Web-Perf Wednesday with:

```bash
ruby llm-scripts/validate_web_perf_wednesday.rb _posts/YYYY-MM-DD-web-perf-wednesday-NNN-slug.md
```

Preserve unrelated worktree changes. An ordinary Web-Perf Wednesday run may
modify only its single intended post unless Harry explicitly expands the task.

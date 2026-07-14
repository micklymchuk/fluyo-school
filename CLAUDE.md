# Fluyo School — Claude Code Project Guide

Read and follow `_bmad-output/project-context.md` — it contains all implementation rules (stack versions, coding conventions, anti-patterns, testing and quality standards). Do not duplicate those rules here.

## bmad System (v6.9.0)

This project uses the **BMad Method** (Building Method for AI Development) with two installed modules:

| Module | Description |
|--------|-------------|
| **core** (bmm) | Product management, architecture, development, and QA skills |
| **wds** (v0.4.3) | Web Design System — UX design pipeline with Saga/Freya/Mimir agents |

### Directory Layout

```
.claude/skills/       ← 60 installed skills (agent personas + workflows)
_bmad/
  _config/            ← manifest.yaml (installation metadata)
  core/               ← core module source
  bmm/                ← BMM module source
  wds/                ← WDS module source
  custom/             ← project-level skill customizations (TOML overrides)
  scripts/            ← resolve_customization.py, resolve_config.py, memlog.py
  config.toml         ← project config
  config.user.toml    ← personal config (gitignored)
_bmad-output/         ← generated artifacts (PRDs, stories, architecture docs)
```

### How Skills Work

Each skill is a directory under `.claude/skills/` containing a `SKILL.md` (with YAML frontmatter) and optional reference files. Skills are invoked as `/skill-name` slash commands.

**Customization resolution** uses a three-layer TOML merge (skill defaults → team overrides → user overrides):

```bash
python3 _bmad/scripts/resolve_customization.py --skill .claude/skills/<skill-name>
python3 _bmad/scripts/resolve_customization.py --skill .claude/skills/<skill-name> --key agent
```

Layers (highest priority first):
1. `_bmad/custom/<skill-name>.user.toml` — personal, gitignored
2. `_bmad/custom/<skill-name>.toml` — team/org, committed
3. `.claude/skills/<skill-name>/customize.toml` — skill defaults

### Agent Personas

| Skill | Persona | Role |
|-------|---------|------|
| `bmad-agent-analyst` | Mary | Business analyst and requirements |
| `bmad-agent-architect` | Winston | System architecture and technical design |
| `bmad-agent-dev` | Amelia | Software engineer — story execution |
| `bmad-agent-pm` | John | Product manager — PRD and discovery |
| `bmad-agent-tech-writer` | Paige | Technical documentation |
| `bmad-agent-ux-designer` | Sally | UX/UI design |
| `wds-agent-saga-analyst` | Saga | WDS business analyst and product discovery |
| `wds-agent-freya-ux` | Freya | WDS UX designer |
| `wds-agent-mimir-builder` | Mimir | WDS implementation agent |

### Common Workflow Skills

| Skill | Purpose |
|-------|---------|
| `bmad-quick-dev` | Implement any code change following project patterns |
| `bmad-create-story` | Create implementation stories from requirements |
| `bmad-dev-story` | Execute a story with test-first discipline |
| `bmad-code-review` | Review code for quality and patterns |
| `bmad-investigate` | Research and analyze codebase issues |
| `bmad-create-architecture` | Design system architecture |
| `bmad-create-prd` | Create product requirements documents |
| `bmad-generate-project-context` | Generate/update project-context.md |
| `bmad-help` | Get help with available bmad skills |

### WDS Pipeline Skills

WDS skills follow a numbered pipeline: `wds-0-*` through `wds-8-*`, progressing from project setup through product evolution.

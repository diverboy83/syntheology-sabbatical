# Syntheology & Silicon Sabbatical: Course Management System

This repository contains the Obsidian vault and Quartz v4 site generator for the **Syntheology & Silicon Sabbatical**, a two-year academic fellowship exploring theology, philosophy, law, and machine learning.

The system functions as both a private workspace (via Obsidian) and a public academic portfolio (via Quartz). It features an **air-gapped publishing model**, ensuring that only explicitly approved notes are built and deployed.

## 1. System Architecture

- **Authoring:** Obsidian (Markdown)
- **Site Generation:** Quartz v4
- **Deployment:** GitHub Actions -> GitHub Pages (Zero-infrastructure footprint)
- **Styling:** Custom dark/light mode with Python/PyTorch syntax highlighting
- **Knowledge Graph:** Interactive, node-based visual graph

## 2. Setup Instructions

### A) Clone the Repository

1. Install [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) (v22+).
2. Open your terminal and clone this repository to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/syntheology-sabbatical.git
   cd syntheology-sabbatical
   npm install
   ```

### B) Configure Obsidian

1. Download and install [Obsidian](https://obsidian.md/).
2. Open Obsidian and select **"Open folder as vault"**.
3. Navigate to the `syntheology-sabbatical/content` folder and select it.
   - *Note: The `content` folder is your actual Obsidian vault. Do not open the root repository folder as the vault.*

### C) Set up Automatic Syncing (Obsidian Git)

To enable a frictionless "Continuous Deployment" pipeline, set up automatic background syncing using the Obsidian Git plugin:

1. In Obsidian, go to **Settings > Community plugins**.
2. Turn off "Safe mode" and click **Browse**.
3. Search for and install **Obsidian Git**.
4. Enable the plugin and go to its options.
5. Configure the following settings:
   - **Vault backup interval:** 15 minutes (or your preferred frequency).
   - **Auto pull interval:** 15 minutes.
   - **Commit message:** `vault backup: {{date}}`.
   - **Push on backup:** Enable this to automatically push changes to GitHub.

*Whenever you save a file in Obsidian, the Git plugin will commit and push it to GitHub, triggering the deployment workflow.*

### D) Internal Dashboard (Dataview)

Use the Dataview plugin to create a dynamic dashboard within Obsidian that queries your YAML tags (e.g., status, priority, category).

1. Install and enable the **Dataview** community plugin in Obsidian.
2. Create a new note in your vault (e.g., `00_Admin/Dashboard.md`).
3. Add Dataview queries to visualize your progress. For example, to list all notes currently in progress:

   ```dataview
   TABLE category, priority, status
   FROM "01_Syllabus" OR "03_Sources"
   WHERE status = "in-progress"
   SORT file.mtime DESC
   ```

## 3. Selective Publishing (The Air-Gap)

To protect private policy drafts and unpolished notes, this Quartz configuration uses a strict **Explicit Publish Filter**.

- **Only** files containing `publish: true` (or `"true"`) in their YAML frontmatter will be included in the public build.
- All other files (including those without a `publish` key) are entirely ignored and will not appear on the public website.
- Additionally, the `00_Admin` and `02_Inbox` folders are globally ignored, regardless of their frontmatter.

**Example Frontmatter for a Published Note:**

```yaml
---
title: "Module 1: The Architecture of Mind"
type: syllabus-module
publish: true
---
```

## 4. Local Preview & Deployment

### Local Preview

To preview the website locally before pushing changes:

```bash
npx quartz build --serve
```
Then, open `http://localhost:8080` in your browser.

### Deployment via GitHub Pages

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the site to GitHub Pages whenever you push to the `main` branch.

**To activate GitHub Pages for this repository:**

1. Push your initial code to GitHub.
2. Navigate to your repository on GitHub.com.
3. Click on **Settings** (the gear icon at the top right).
4. In the left sidebar, click on **Pages**.
5. Under the **Build and deployment** section, look for the **Source** dropdown menu.
6. Change the Source from "Deploy from a branch" to **"GitHub Actions"**.
7. The next time you push to the `main` branch (or when Obsidian Git auto-syncs), the `Deploy to GitHub Pages` workflow will run, and your site will be live at your `github.io` URL.

*Note: Make sure you have updated the `baseUrl` in `quartz.config.ts` to reflect your actual GitHub username before pushing.*

## 5. Mandatory Disclaimer

The footer of every published page automatically includes the following disclaimer:

> *"This space represents personal, interdisciplinary academic exploration in theology and computer science. It does not reflect the policy positions, lobbying objectives, or corporate stances of any employer or affiliated organization."*

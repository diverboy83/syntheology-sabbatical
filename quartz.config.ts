import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 * Syntheology & Silicon Sabbatical — Personal Academic Digital Garden
 *
 * IMPORTANT: Only files with `publish: true` in their YAML frontmatter
 * will be built and deployed. All other files remain private.
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Syntheology & Silicon Sabbatical",
    pageTitleSuffix: " · S&SS",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    // ── Your GitHub Pages URL ─────────────────────────────────────────────────
    // Replace YOUR_GITHUB_USERNAME with your actual GitHub username.
    // The repository must be named exactly: syntheology-sabbatical
    baseUrl: "diverboy83.github.io/syntheology-sabbatical",
    // ── Air-Gap: these folders are NEVER published ──────────────────────────
    ignorePatterns: [
      "00_Admin",
      "02_Inbox",
      "private",
      "templates",
      ".obsidian",
      "*.canvas",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // Elegant academic serif for headers; clean humanist sans for body
        header: "Playfair Display",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        // ── Light mode: warm parchment tones ──────────────────────────────
        lightMode: {
          light: "#f5f2ee",       // warm parchment background
          lightgray: "#e8e3dc",   // subtle card borders
          gray: "#a89f94",        // muted metadata text
          darkgray: "#3d3530",    // primary body text (dark charcoal)
          dark: "#1e1a17",        // headings
          secondary: "#6b7c5e",   // sage green — links & accents
          tertiary: "#c0622b",    // burnt orange — hover / highlights
          highlight: "rgba(107, 124, 94, 0.12)",
          textHighlight: "#c0622b44",
        },
        // ── Dark mode: deep slate / charcoal ──────────────────────────────
        darkMode: {
          light: "#1a1d21",       // deep slate background
          lightgray: "#2a2e34",   // card / panel backgrounds
          gray: "#5a6070",        // muted metadata text
          darkgray: "#c8cdd6",    // primary body text
          dark: "#e8ecf0",        // headings (near-white)
          secondary: "#8fad7a",   // sage green — links & accents
          tertiary: "#d97b45",    // burnt orange — hover / highlights
          highlight: "rgba(143, 173, 122, 0.15)",
          textHighlight: "#d97b4544",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      // ── Dark-mode optimised syntax highlighting for Python / PyTorch ──────
      Plugin.SyntaxHighlighting({
        theme: {
          light: "one-light",
          dark: "one-dark-pro",
        },
        keepBackground: true,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    // ── AIR-GAP FILTER: only publish files with `publish: true` ─────────────
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

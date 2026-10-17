#!/usr/bin/env bun

/**
 * Protocol X - AI-Powered Penetration Testing CLI
 *
 * This is the main entry point for the Protocol X CLI tool.
 * It supports:
 * - Default (no args): Launches the OpenTUI-based terminal interface
 * - benchmark command: Runs the benchmark CLI
 */

import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Import package.json directly so Bun can embed it at compile time
import packageJson from "../package.json";
import { getCurrentVersion, upgrade } from "../src/core/installation/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get command-line arguments (skip node/bun and script path)
const args = process.argv.slice(2);
const command = args[0];

const version = packageJson.version;

// Handle different commands
if (command === "benchmark") {
  // Run benchmark CLI
  const benchmarkPath = join(__dirname, "..", "build", "benchmark.js");

  // Remove "benchmark" from args and pass the rest to benchmark script
  process.argv = [process.argv[0], benchmarkPath, ...args.slice(1)];

  // Import and run benchmark
  await import(benchmarkPath);
} else if (command === "swarm") {
  const swarmPath = join(__dirname, "..", "build", "swarm.js");
  process.argv = [process.argv[0], swarmPath, ...args.slice(1)];
  await import(swarmPath);
} else if (command === "quicktest") {
  // Run quicktest CLI
  const quicktestPath = join(__dirname, "..", "build", "quicktest.js");

  // Remove "quicktest" from args and pass the rest to quicktest script
  process.argv = [process.argv[0], quicktestPath, ...args.slice(1)];

  // Import and run quicktest
  await import(quicktestPath);
} else if (command === "pentest") {
  // Run pentest CLI
  const pentestPath = join(__dirname, "..", "build", "pentest.js");

  // Remove "pentest" from args and pass the rest to pentest script
  process.argv = [process.argv[0], pentestPath, ...args.slice(1)];

  // Import and run pentest
  await import(pentestPath);
} else if (command === "auth") {
  // Run auth CLI
  const authPath = join(__dirname, "..", "build", "auth.js");

  // Remove "auth" from args and pass the rest to auth script
  process.argv = [process.argv[0], authPath, ...args.slice(1)];

  // Import and run auth
  await import(authPath);
} else if (command === "uninstall") {
  // Run uninstall CLI
  const uninstallPath = join(__dirname, "..", "build", "uninstall.js");

  process.argv = [process.argv[0], uninstallPath, ...args.slice(1)];

  await import(uninstallPath);
} else if (command === "projects") {
  const p = join(__dirname, "..", "build", "projects.js");
  process.argv = [process.argv[0], p, ...args.slice(1)];
  await import(p);
} else if (command === "pentests") {
  const p = join(__dirname, "..", "build", "pentests.js");
  process.argv = [process.argv[0], p, ...args.slice(1)];
  await import(p);
} else if (command === "issues") {
  const p = join(__dirname, "..", "build", "issues.js");
  process.argv = [process.argv[0], p, ...args.slice(1)];
  await import(p);
} else if (command === "fixes") {
  const p = join(__dirname, "..", "build", "fixes.js");
  process.argv = [process.argv[0], p, ...args.slice(1)];
  await import(p);
} else if (command === "logs") {
  const p = join(__dirname, "..", "build", "logs.js");
  process.argv = [process.argv[0], p, ...args.slice(1)];
  await import(p);
} else if (command === "upgrade" || command === "update") {
  const currentVersion = getCurrentVersion();
  console.log(`Current version: v${currentVersion}`);
  console.log("Checking for updates...");

  const result = await upgrade({ interactive: true });
  console.log();
  console.log(result.message);

  process.exit(result.success ? 0 : 1);
} else if (
  command === "version" ||
  command === "--version" ||
  command === "-v"
) {
  // Show version
  console.log(`v${version}`);
} else if (command === "help" || command === "--help" || command === "-h") {
  // Show help
  console.log("Protocol X - AI-Powered Penetration Testing CLI");
  console.log();
  console.log("Usage:");
  console.log("  protocol-x              Launch the TUI (Terminal User Interface)");
  console.log("  protocol-x uninstall    Uninstall Protocol X (keeps sessions, memories, skills)");
  console.log("  protocol-x upgrade      Update protocol-x to the latest version");
  console.log("  protocol-x help         Show this help message");
  console.log("  protocol-x version      Show version number");
  console.log("  protocol-x benchmark    Run the benchmark CLI");
  console.log("  protocol-x quicktest    Run a quick penetration test");
  console.log("  protocol-x pentest      Run a comprehensive penetration test");
  console.log(
    "  protocol-x swarm        Run parallel pentests on multiple targets"
  );
  console.log(
    "  protocol-x auth         Connect to Protocol X Console for managed inference"
  );
  console.log(
    "  protocol-x projects     List workspace projects"
  );
  console.log(
    "  protocol-x pentests     List and manage pentests"
  );
  console.log(
    "  protocol-x issues       List and manage security issues"
  );
  console.log(
    "  protocol-x fixes        View security fixes"
  );
  console.log(
    "  protocol-x logs         View agent execution logs"
  );
  console.log();
  console.log("Options:");
  console.log("  -h, --help         Show this help message");
  console.log("  -v, --version      Show version number");
  console.log();
  console.log("Benchmark Usage:");
  console.log("  protocol-x benchmark <repo-path> [options] [branch1 branch2 ...]");
  console.log();
  console.log("Benchmark Options:");
  console.log("  --all-branches       Test all branches in the repository");
  console.log("  --limit <number>     Limit the number of branches to test");
  console.log("  --skip <number>      Skip the first N branches");
  console.log(
    "  --model <model>      Specify the AI model to use (default: claude-sonnet-4-5)"
  );
  console.log();
  console.log("Quicktest Usage:");
  console.log(
    "  protocol-x quicktest --target <target> --objective <objective> [options]"
  );
  console.log();
  console.log("Quicktest Options:");
  console.log(
    "  --target <target>        Target URL or IP address to test (required)"
  );
  console.log(
    "  --objective <objective>  Objective or goal of the pentest (required)"
  );
  console.log(
    "  --model <model>          AI model to use (default: claude-sonnet-4-5)"
  );
  console.log(
    "  --headers <mode>         Header mode: none, default, custom (default: default)"
  );
  console.log(
    "  --header <name:value>    Add custom header (requires --headers custom)"
  );
  console.log();
  console.log("Pentest Usage:");
  console.log("  protocol-x pentest --target <target> [options]");
  console.log();
  console.log("Pentest Options:");
  console.log(
    "  --target <target>        Target domain or organization (required)"
  );
  console.log(
    "  --model <model>          AI model to use (default: claude-sonnet-4-5)"
  );
  console.log(
    "  --headers <mode>         Header mode: none, default, custom (default: default)"
  );
  console.log(
    "  --header <name:value>    Add custom header (requires --headers custom)"
  );
  console.log();
  console.log("Swarm Usage:");
  console.log("  protocol-x swarm <targets> [options]");
  console.log();
  console.log("Swarm Arguments:");
  console.log("  <targets>                JSON string or path to JSON file");
  console.log();
  console.log("Swarm Options:");
  console.log(
    "  --model <model>          AI model to use (default: claude-sonnet-4-5)"
  );
  console.log(
    "  --headers <mode>         Header mode: none, default, custom (default: default)"
  );
  console.log(
    "  --header <name:value>    Add custom header (requires --headers custom)"
  );
  console.log();
  console.log("Auth Usage:");
  console.log(
    "  protocol-x auth              Login to Protocol X Console (or show status if connected)"
  );
  console.log("  protocol-x auth login        Login to Protocol X Console");
  console.log("  protocol-x auth logout       Disconnect from Protocol X Console");
  console.log("  protocol-x auth status       Show connection status");
  console.log();
  console.log("Uninstall Usage:");
  console.log(
    "  protocol-x uninstall             Fully uninstall Protocol X"
  );
  console.log(
    "  protocol-x uninstall --force     Skip confirmation prompt"
  );
  console.log();
  console.log("Header Modes (for quicktest, pentest, swarm):");
  console.log("  none                     No custom headers added to requests");
  console.log(
    "  default                  Add 'User-Agent: protocol-x-protocol-x' to all offensive requests"
  );
  console.log(
    "  custom                   Use custom headers defined with --header flag"
  );
  console.log();
  console.log("Examples:");
  console.log("  protocol-x");
  console.log("  protocol-x benchmark /path/to/vulnerable-app");
  console.log("  protocol-x benchmark /path/to/app main develop");
  console.log("  protocol-x benchmark /path/to/app --all-branches --limit 3");
  console.log(
    "  protocol-x quicktest --target http://localhost:3000 --objective 'Find SQL injection'"
  );
  console.log(
    "  protocol-x quicktest --target api.example.com --objective 'API testing' --headers custom --header 'User-Agent: protocol-x_client123'"
  );
  console.log("  protocol-x pentest --target example.com");
  console.log(
    "  protocol-x pentest --target example.com --headers custom --header 'User-Agent: protocol-x_client123'"
  );
  console.log("  protocol-x swarm targets.json");
  console.log("  protocol-x swarm targets.json --headers none");
  console.log("  protocol-x auth");
  console.log("  protocol-x auth status");
  console.log("  protocol-x auth logout");
  console.log();
  console.log("Console API:");
  console.log("  protocol-x projects");
  console.log("  protocol-x pentests <projectId>");
  console.log("  protocol-x issues <projectId>");
  console.log("  protocol-x issues get <issueId>");
  console.log("  protocol-x fixes <issueId>");
  console.log("  protocol-x logs <issueId>");
} else if (args.length === 0) {
  // No command specified, run the TUI
  const appPath = join(__dirname, "..", "build", "index.js");
  await import(appPath);
} else {
  // Unknown command
  console.error(`Error: Unknown command '${command}'`);
  console.error();
  console.error("Run 'protocol-x --help' for usage information");
  process.exit(1);
}

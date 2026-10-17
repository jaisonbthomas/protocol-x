#!/usr/bin/env bun

/**
 * protocol-x fixes — View security fixes via the Protocol X API
 *
 * Usage:
 *   protocol-x fixes <issueId>          List fixes for an issue
 *   protocol-x fixes get <fixId>        Get fix details (includes diff)
 */

import { listFixes, getFix } from "../core/api/issues";

function showHelp(): void {
  console.log("protocol-x fixes — View security fixes via the Protocol X API\n");
  console.log("Usage:");
  console.log("  protocol-x fixes <issueId>         List fixes for an issue");
  console.log("  protocol-x fixes get <fixId>       Get fix details (includes diff)");
  console.log();
  console.log("Options:");
  console.log("  -h, --help                     Show this help message");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const sub = args[0];

  if (!sub || sub === "--help" || sub === "-h" || sub === "help") {
    showHelp();
    return;
  }

  try {
    if (sub === "get") {
      const fixId = args[1];
      if (!fixId) {
        console.error("Error: fix ID is required");
        console.error("Usage: protocol-x fixes get <fixId>");
        process.exit(1);
      }
      const fix = await getFix(fixId);
      console.log(JSON.stringify(fix, null, 2));
    } else {
      const fixes = await listFixes(sub);
      console.log(JSON.stringify(fixes, null, 2));
    }
  } catch (err) {
    console.error(
      `\nError: ${err instanceof Error ? err.message : String(err)}`,
    );
    process.exit(1);
  }
}

main();

#!/usr/bin/env bun

/**
 * Protocol X Uninstall CLI
 *
 * Fully removes the Protocol X installation:
 *   - Removes the protocol-x binary/package (npm, homebrew, or binary)
 *   - Cleans ~/.protocol-x/ data directory, preserving sessions, memories, and skills
 *
 * Usage:
 *   protocol-x uninstall              Uninstall Protocol X (interactive confirmation)
 *   protocol-x uninstall --force      Uninstall without confirmation prompt
 */

import os from "os";
import path from "path";
import fs from "fs/promises";
import { spawnSync } from "child_process";
import * as readline from "readline";
import {
  detectInstallMethod,
  type InstallMethod,
} from "../core/installation/index";

const PRESERVED_DIRS = new Set(["sessions", "memories", "skills"]);

function getProtocol XDir(): string {
  return process.env.PROTOCOL-X_DATA_DIR ?? path.join(os.homedir(), ".protocol-x");
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function findBinaryPath(): string | null {
  // For compiled binaries, process.execPath IS the protocol-x binary itself.
  // This is more reliable than `which` when multiple installations coexist.
  const execName =
    process.execPath.split("/").pop()?.replace(/\.exe$/, "") ?? "";
  const isCompiledBinary =
    execName !== "bun" && execName !== "node" && execName !== "bun-debug";
  if (isCompiledBinary && require("fs").existsSync(process.execPath)) {
    return process.execPath;
  }

  const result = spawnSync("which", ["protocol-x"], {
    encoding: "utf-8",
    timeout: 5000,
  });
  if (result.status === 0 && result.stdout) {
    return result.stdout.trim();
  }
  const defaultPath = path.join(os.homedir(), ".local", "bin", "protocol-x");
  try {
    const stat = require("fs").statSync(defaultPath);
    if (stat) return defaultPath;
  } catch {
    // not found
  }
  return null;
}

function getUninstallDescription(method: InstallMethod): string {
  switch (method) {
    case "npm":
      return "npm uninstall -g @jaisonbthomas/protocol-x";
    case "homebrew":
      return "brew uninstall jaisonbthomas/tap/protocol-x";
    case "binary": {
      const binPath = findBinaryPath();
      return binPath ? `rm ${binPath}` : "remove protocol-x binary";
    }
  }
}

function removeBinary(method: InstallMethod): {
  success: boolean;
  message: string;
} {
  switch (method) {
    case "npm": {
      const result = spawnSync("npm", ["uninstall", "-g", "@jaisonbthomas/protocol-x"], {
        encoding: "utf-8",
        timeout: 60000,
        stdio: "pipe",
      });
      return result.status === 0
        ? { success: true, message: "Removed npm package @jaisonbthomas/protocol-x" }
        : {
            success: false,
            message: `npm uninstall failed: ${result.stderr?.trim() || "unknown error"}`,
          };
    }
    case "homebrew": {
      const result = spawnSync("brew", ["uninstall", "jaisonbthomas/tap/protocol-x"], {
        encoding: "utf-8",
        timeout: 60000,
        stdio: "pipe",
      });
      return result.status === 0
        ? {
            success: true,
            message: "Removed Homebrew package jaisonbthomas/tap/protocol-x",
          }
        : {
            success: false,
            message: `brew uninstall failed: ${result.stderr?.trim() || "unknown error"}`,
          };
    }
    case "binary": {
      const binPath = findBinaryPath();
      if (!binPath) {
        return {
          success: false,
          message: "Could not locate protocol-x binary",
        };
      }
      try {
        require("fs").unlinkSync(binPath);
        return { success: true, message: `Removed binary at ${binPath}` };
      } catch (err) {
        return {
          success: false,
          message: `Failed to remove ${binPath}: ${err instanceof Error ? err.message : String(err)}`,
        };
      }
    }
  }
}

async function cleanDataDir(): Promise<{
  removed: string[];
  preserved: string[];
  errors: string[];
}> {
  const protocol-xDir = getProtocol XDir();
  const removed: string[] = [];
  const preserved: string[] = [];
  const errors: string[] = [];

  const dirExists = await fs
    .access(protocol-xDir)
    .then(() => true)
    .catch(() => false);

  if (!dirExists) {
    return { removed, preserved, errors };
  }

  let entries: string[];
  try {
    entries = await fs.readdir(protocol-xDir);
  } catch {
    errors.push(`Could not read ${protocol-xDir}`);
    return { removed, preserved, errors };
  }

  for (const name of entries) {
    if (PRESERVED_DIRS.has(name)) {
      preserved.push(name);
      continue;
    }

    const target = path.join(protocol-xDir, name);
    try {
      const stat = await fs.lstat(target);
      if (stat.isDirectory()) {
        await fs.rm(target, { recursive: true, force: true });
      } else {
        await fs.unlink(target);
      }
      removed.push(name);
    } catch (err) {
      errors.push(
        `Failed to remove ${name}: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return { removed, preserved, errors };
}

async function uninstall(force: boolean): Promise<void> {
  const method = detectInstallMethod();
  const protocol-xDir = getProtocol XDir();

  console.log("Protocol X Uninstall");
  console.log();

  console.log(`  Install method:  ${method}`);
  console.log(`  Binary removal:  ${getUninstallDescription(method)}`);
  console.log(`  Data directory:  ${protocol-xDir}`);
  console.log();
  console.log("  Preserved data:  sessions, memories, skills");
  console.log();

  if (!force) {
    const answer = await prompt("Proceed with uninstall? (y/N): ");
    if (answer.toLowerCase() !== "y") {
      console.log("Aborted.");
      return;
    }
    console.log();
  }

  // 1. Clean data directory
  console.log("Cleaning data directory...");
  const { removed, preserved, errors } = await cleanDataDir();

  for (const name of removed) {
    console.log(`  Removed ${name}`);
  }
  for (const name of preserved) {
    console.log(`  Preserved ${name}/`);
  }
  for (const msg of errors) {
    console.error(`  ${msg}`);
  }

  if (removed.length === 0 && errors.length === 0) {
    console.log("  Nothing to clean.");
  }

  // 2. Remove binary/package
  console.log();
  console.log("Removing protocol-x...");
  const result = removeBinary(method);

  if (result.success) {
    console.log(`  ${result.message}`);
  } else {
    console.error(`  ${result.message}`);
  }

  // 3. Summary
  console.log();
  if (result.success && errors.length === 0) {
    console.log("✓ Protocol X has been uninstalled.");
  } else {
    console.log("⚠ Uninstall completed with warnings (see above).");
  }

  if (preserved.length > 0) {
    console.log(
      `  Preserved data remains at ${protocol-xDir}/ (${preserved.join(", ")})`,
    );
    console.log("  To remove all data: rm -rf ~/.protocol-x");
  }

  if (method === "binary") {
    console.log();
    console.log(
      "  Note: You may want to remove the PATH export from your shell config",
    );
    console.log(
      "  (~/.bashrc, ~/.zshrc, etc.) if it was added during install.",
    );
  }
}

function showHelp(): void {
  console.log("Protocol X Uninstall — Remove Protocol X from your system\n");
  console.log("Usage:");
  console.log(
    "  protocol-x uninstall             Uninstall Protocol X (keeps sessions, memories, skills)",
  );
  console.log("  protocol-x uninstall --force     Skip confirmation prompt");
  console.log();
  console.log("Options:");
  console.log("  --force, -f          Skip confirmation prompt");
  console.log("  -h, --help           Show this help message");
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const subcommand = args[0];

  if (subcommand === "help" || subcommand === "--help" || subcommand === "-h") {
    showHelp();
    return;
  }

  const force = args.includes("--force") || args.includes("-f");

  try {
    await uninstall(force);
  } catch (err) {
    console.error(
      `\nError: ${err instanceof Error ? err.message : String(err)}`,
    );
    process.exit(1);
  }
}

main();

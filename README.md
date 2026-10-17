<h1 align="center">Protocol X</h1>

<p align="center"><strong>Autonomous AI Agents for Automated Penetration Testing and Vulnerability Assessment</strong></p>

<p align="center">AI-powered penetration testing tool that enables you to use autonomous AI agents to perform comprehensive blackbox and whitebox pentesting - directly in your terminal.
</p>


## About

This tool investigates how autonomous AI agents can be used to automate different stages of penetration testing, including **reconnaissance**, **vulnerability identification**, **attack-path analysis**, and **security assessment**. It examines how AI can improve the efficiency and scalability of traditional offensive security testing while also addressing challenges such as accuracy, false positives, authorization, and responsible use.

**Author:** Jaison B Thomas

## Installation

#### macOS / Linux (Quick Install)

```bash
curl -fsSL https://raw.githubusercontent.com/jaisonbthomas/protocol-x/main/install.sh | bash
```

#### npm

```bash
npm install -g @jaisonbthomas/protocol-x
```

## Usage

Run Protocol X:

```bash
protocol-x
```

## AI Provider Support

Protocol X supports **OpenAI**, **Anthropic**, **AWS Bedrock**, and **vLLM** (local models). **Anthropic models provide the best performance** and are recommended for optimal results.

## Kali Linux Container (Recommended)

For **best performance**, run Protocol X in the included Kali Linux container with preconfigured pentest tools:

```bash
cd container
cp env.example .env  # add your API keys
docker compose up --build -d
docker compose exec kali-protocol-x bash
```

Inside the container, run:

```bash
protocol-x
```

**Note:** On Linux hosts, consider using `network_mode: host` in `docker-compose.yml` for comprehensive network scanning.

## vLLM Local Model Support

To use a local vLLM server:

1. Set the vLLM endpoint:

```bash
export LOCAL_MODEL_URL="http://localhost:8000/v1"
```

2. In the Protocol X Models screen, enter your model name in the "Custom local model (vLLM)" input.

## Key Features

- **Autonomous AI Agents** — Leverages AI to automate penetration testing workflows
- **Reconnaissance** — Automated target discovery, port scanning, and service enumeration
- **Vulnerability Identification** — AI-driven vulnerability detection and classification
- **Attack-Path Analysis** — Intelligent attack path generation and exploitation
- **Security Assessment** — Comprehensive reporting with risk scoring
- **Terminal UI** — Beautiful, interactive terminal-based user interface
- **Container Support** — Kali Linux container with pre-installed tools

---

###  Responsible Use

This repository contains tools for **authorized security testing** only.  
Before use, please read and agree to the [Responsible Use Disclosure](./RESPONSIBLE_USE.md).

## License

This project is licensed under the Apache 2.0 License — see the [LICENSE](./LICENSE) file for details.

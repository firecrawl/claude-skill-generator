# Claude Skill Generator

Generate ready-to-use Claude Code skills from any API documentation URL.

## What is this?

This tool helps you create "skills" for Claude Code. A skill is a set of instructions that teaches Claude how to use a specific API or service. Just paste a documentation URL, and the tool generates everything you need.

## Setup Guide

### Step 1: Install Bun

Bun is a fast JavaScript runtime that we use to run this project. Open your terminal and run:

**Mac:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows:**
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

**Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

After installation, close and reopen your terminal for the changes to take effect.

To verify Bun is installed, run:
```bash
bun --version
```

### Step 2: Get a Firecrawl API Key

1. Go to [firecrawl.dev](https://firecrawl.dev)
2. Create a free account
3. Go to your dashboard and copy your API key

### Step 3: Set Up the Project

1. Open your terminal
2. Navigate to the project folder:
   ```bash
   cd path/to/claude-skill-generator
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Create a `.env` file in the project root and add your Firecrawl API key:
   ```
   FIRECRAWL_API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with the API key you copied from Firecrawl.

### Step 4: Run the Project

Start the development server:
```bash
bun dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000)

## How to Use

1. Paste an API documentation URL (e.g., `https://docs.stripe.com/api`)
2. Click "Generate Skill"
3. Wait for the skill to be generated (this may take a minute)
4. Download the generated skill as a ZIP file
5. Extract and add to your Claude Code skills folder

## Troubleshooting

**"Command not found: bun"**
- Make sure you closed and reopened your terminal after installing Bun
- Try running the install command again

**"No Firecrawl API key configured"**
- Make sure you created the `.env` file in the project root
- Make sure the API key is correct (no extra spaces)

**"Insufficient Firecrawl credits"**
- You may need to add credits to your Firecrawl account

## License

MIT

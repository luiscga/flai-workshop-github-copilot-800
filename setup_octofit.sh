#!/bin/bash

# Navigate to the workspace directory
cd /workspaces/flai-workshop-github-copilot-800

# Create the Python virtual environment
echo "Creating Python virtual environment..."
python3 -m venv octofit-tracker/backend/venv

# Activate the virtual environment and install requirements
echo "Installing Python requirements..."
source octofit-tracker/backend/venv/bin/activate
pip install -r octofit-tracker/backend/requirements.txt

echo "Setup complete!"

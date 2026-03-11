#!/bin/bash

tmux new-session -d -s dev -n nvim

# nvim
tmux send-keys -t dev:nvim "nvim ." Enter

#frontend
tmux new-window -t dev -n frontend
tmux send-keys -t dev:frontend "cd frontend/sanae-chatbot" Enter
tmux send-keys -t dev:frontend "npm start" Enter

#backend
tmux new-window -t dev -n backend
tmux send-keys -t dev:backend "cd backend" Enter
tmux send-keys -t dev:backend "docker compose up -d" Enter

#bash
tmux new-window -t dev -n bash

# attach
tmux attach-session -t dev

FROM denoland/deno:latest

# Create working directory
WORKDIR /app

# Copy source
COPY . .

# Install dependencies (use just `deno install` if deno.json has imports)
RUN deno install

# Run the app
CMD ["deno", "task", "start"]

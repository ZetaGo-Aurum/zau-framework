# Production Dockerfile for ZAU Framework
FROM python:3.12-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y nodejs npm build-essential
COPY pyproject.toml package.json ./
RUN pip install --no-cache-dir .
COPY . .
RUN zau build

FROM python:3.12-slim AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
ENV ZAU_ENV=production
EXPOSE 8000
CMD ["python", "-m", "zau", "start", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]

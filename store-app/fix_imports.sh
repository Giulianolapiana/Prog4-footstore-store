#!/bin/bash

# Fix type-only imports across all files
fix_file() {
  local file=$1
  # Already handled by sed commands below
  echo "Fixing $file"
}

# api.ts
sed -i "s|import { AxiosError, AxiosResponse, InternalAxiosRequestConfig }|import { AxiosError } from 'axios';\nimport type { AxiosResponse, InternalAxiosRequestConfig }|; s|from 'axios';$||" src/shared/services/api.ts


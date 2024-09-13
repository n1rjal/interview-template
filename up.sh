# Path: frontend
cd frontend
pnpm install

cd ..

# Path: backend
cd backend
pnpm install
docker compose up --build -d

# Task Manager Desktop Application
### Quick Start: One-Command Launch

1. Clone the repository:
```bash
git clone https://github.com/ilvlsq/desktop-todo.git
cd desktop-todo
```
*Ensure that Node.js, PostgreSQL, and npm are installed.*

2. Run the project with a single command:
```bash
sh launch.sh
```
This script will:

- Install all necessary dependencies.
- Build the client-side using Vite.
- Launch the server in dev mode.
- Start Electron for the client-side.

Note: For this script, you need the environment variables.

### Detailed Setup

1. Clone the repository:
```bash
git clone https://github.com/ilvlsq/desktop-todo.git
cd desktop-todo
```


2. Database Setup
2.2. Configure Environment Variables
Create a .env file in the server directory and add the following variables:
```bash
PORT=3000

DB_USER=
DB_HOST=
DB_NAME=
DB_PASS=
DB_PORT=
DB_CERTIFICATE=
```
or if you can use another values for your DB, you need changne the configs in following files
```bash
db/setup-db.ts
src/database/database.module.ts
```
2.3. Run the Schema Setup Script
Before launching the server for the first time, you need to run an SQL script to create the database schema. This script drops the existing schema, so use it with caution.

Navigate to the server folder and run the following command:
```bash
npm run setup-db
```

3.1. Launch the Server
Navigate to the server directory, install dependencies, and start the server:
```bash
cd server
npm install
npm run start:dev
```

3.2. Build and Launch the Client
Navigate to the client directory, install dependencies, and build the client-side:
```bash
cd ../client
npm install
npm run build
```

After a successful build, launch Electron:
```bash
npx electron .
```

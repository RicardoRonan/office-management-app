# Office Management Backend

This is a JSON Server backend for the Office Management App.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

The server will run on port 3000 (or the port specified by the `PORT` environment variable).

## API Endpoints

- `GET /offices` - Get all offices
- `POST /offices` - Create a new office
- `PUT /offices/:id` - Update an office
- `DELETE /offices/:id` - Delete an office

- `GET /workers` - Get all workers
- `POST /workers` - Create a new worker
- `PUT /workers/:id` - Update a worker
- `DELETE /workers/:id` - Delete a worker

## Data Storage

Data is stored in `db.json` file. The file structure:

```json
{
  "offices": [],
  "workers": []
}
```

## Deployment on Render

See the main README.md for detailed Render deployment instructions.

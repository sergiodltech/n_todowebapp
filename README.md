# UX Centric ToDo App

A ToDo App focused on Usability.

## Features

- Quick task creation
- Client-side persistency using browser's localStorage
- Completed tasks get push to the end of the list
- Dark / Light mode (Optional)
- Expiration DateTime (Optional)

### Docker Deployment

To build and run using Docker:

```bash
docker build -t n_todowebapp .

# Run the container
docker run -p 3000:3000 n_todowebapp
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

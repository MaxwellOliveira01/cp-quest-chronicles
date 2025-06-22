
# Project Structure

This project is now organized to prepare for backend integration:

## Folder Structure

```
/
├── api/                    # Backend API models (ready for backend implementation)
│   └── models/            # Database model classes with CRUD operations
│       ├── ProfileModel.ts
│       ├── UniversityModel.ts  
│       ├── TeamModel.ts
│       ├── ContestModel.ts
│       └── EventModel.ts
│
└── site/                  # Frontend application
    └── src/
        ├── components/    # React components
        ├── pages/        # React pages/routes
        └── services/     # Frontend services (currently using mock data)
```

## Backend Integration

The `dataService.ts` is prepared for backend integration:

1. **Configuration**: Set `USE_BACKEND = true` and update `API_BASE_URL` in `dataService.ts`
2. **API Models**: All backend models are ready in the `api/models/` directory
3. **Endpoints**: The service expects standard REST endpoints:
   - GET `/api/profiles` - Get all profiles
   - GET `/api/profiles/:id` - Get profile by ID
   - POST `/api/profiles` - Create profile
   - PUT `/api/profiles/:id` - Update profile
   - DELETE `/api/profiles/:id` - Delete profile
   - (Similar patterns for universities, teams, contests, events)

## Current State

- Everything currently works with **mock data**
- All CRUD operations are functional in the frontend
- Loading states are implemented with random delays (0.5-2 seconds)
- When you're ready to add the backend, simply:
  1. Implement the backend using the model classes in `api/models/`
  2. Set `USE_BACKEND = true` in `dataService.ts`
  3. Update the `API_BASE_URL` to point to your backend

## Mock Data Location

Mock data is currently handled by individual service classes in `site/src/services/`:
- `profileService.ts`
- `universityService.ts`
- `teamService.ts`
- `contestService.ts` 
- `eventService.ts`

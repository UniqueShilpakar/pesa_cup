# Bun + Express Backend Guidelines

This document defines the backend plan for the PESA Cup project. The frontend is currently a mostly static tournament site that renders fixtures, standings, scorers, gallery content, and contact details from local data modules. The backend should replace those hardcoded values with stable API endpoints and provide a clean foundation for future features.

## 1. Goals

- Serve tournament data through a versioned API.
- Keep the frontend thin and data-driven.
- Make the backend easy to extend for admin, moderation, and content updates.
- Use a structure that remains readable as the project grows.

## 2. Recommended Stack

- Runtime: Bun
- Web framework: Express
- Language: TypeScript
- Validation: Zod
- Database: SQLite for a small deployment, or PostgreSQL if the app needs multi-user scaling
- ORM or query layer: Prisma, Drizzle, or a lightweight query helper
- Logging: pino or Winston
- Security middleware: helmet, cors, rate limiting
- Testing: Vitest or Bun test, plus supertest for HTTP checks

## 3. What the Frontend Needs

The frontend currently renders these data areas:

- Home page summary sections
- Fixtures and match status
- Standings tables
- Top scorers list
- Gallery categories and photo groups
- Contact form submission

That means the backend should provide read endpoints for tournament content and a write endpoint for contact submissions.

## 4. Suggested API Surface

Keep the API small and predictable.

- `GET /health` - health check for deployments and uptime probes
- `GET /api/v1/tournament` - tournament metadata and summary stats
- `GET /api/v1/fixtures` - all fixtures, filterable by status or date
- `GET /api/v1/standings` - standings grouped by group or stage
- `GET /api/v1/scorers` - top scorers leaderboard
- `GET /api/v1/gallery/categories` - gallery category list
- `GET /api/v1/gallery/:categoryId` - photos in one gallery category
- `POST /api/v1/contact` - submit a contact message
- `GET /api/v1/admin/...` - future admin endpoints, protected by auth

If the app grows, version the API from the beginning so frontend changes do not break consumers.

## 5. Proposed Folder Structure

```text
backend/
  docs/
    backend-server-guidelines.md
  src/
    app.ts
    server.ts
    config/
      env.ts
      cors.ts
      logger.ts
      database.ts
    middlewares/
      error-handler.ts
      not-found.ts
      request-logger.ts
      validate-request.ts
    modules/
      fixtures/
        fixtures.routes.ts
        fixtures.controller.ts
        fixtures.service.ts
        fixtures.repository.ts
        fixtures.schema.ts
      standings/
        standings.routes.ts
        standings.controller.ts
        standings.service.ts
        standings.repository.ts
        standings.schema.ts
      scorers/
        scorers.routes.ts
        scorers.controller.ts
        scorers.service.ts
        scorers.repository.ts
        scorers.schema.ts
      gallery/
        gallery.routes.ts
        gallery.controller.ts
        gallery.service.ts
        gallery.repository.ts
        gallery.schema.ts
      contact/
        contact.routes.ts
        contact.controller.ts
        contact.service.ts
        contact.repository.ts
        contact.schema.ts
      tournament/
        tournament.routes.ts
        tournament.controller.ts
        tournament.service.ts
    types/
    utils/
    db/
    tests/
```

## 6. Layer Responsibilities

### Routes

- Define HTTP paths and connect middleware.
- Keep route files thin.
- Do not place business rules here.

### Controllers

- Read request parameters and body data.
- Call services.
- Return HTTP responses.
- Convert errors into HTTP-friendly output only when necessary.

### Services

- Hold business logic.
- Combine data from repositories.
- Enforce application rules.
- Remain independent from HTTP concerns.

### Repositories

- Handle database queries and persistence.
- Keep SQL or ORM logic isolated here.
- Return plain data objects.

### Schemas

- Validate request input with Zod.
- Keep validation close to each feature.
- Use schemas for params, query strings, and request bodies.

### Middlewares

- Centralize cross-cutting behavior.
- Handle auth, logging, validation, rate limiting, error mapping, and 404 responses.

## 7. Data Modeling Guidance

Model the backend around the tournament domain rather than around pages.

- Tournament: name, season, venue, organizer, summary stats
- Fixture: teams, date, time, venue, status, scores
- Standing: group, team, matches played, wins, draws, losses, goal difference, points
- Scorer: player name, team, goals, assists, ranking, avatar or initials
- GalleryCategory: id, label, description, cover image, photo count
- GalleryPhoto: category id, caption, image path, sort order
- ContactMessage: name, email, subject, message, createdAt, status

## 8. Environment Variables

Keep runtime config outside the codebase.

- `PORT`
- `NODE_ENV`
- `CORS_ORIGIN`
- `DATABASE_URL`
- `JWT_SECRET` if auth is added later
- `UPLOAD_DIR` if gallery uploads are supported later

Use one env loader and fail fast when required values are missing.

## 9. Implementation Order

Build the backend in this order.

1. Set up Bun, TypeScript, and Express.
2. Add shared configuration, logging, CORS, and error middleware.
3. Implement `/health` first.
4. Add the read-only content endpoints for fixtures, standings, scorers, and gallery.
5. Add contact form submission handling with validation and persistence.
6. Add tests for each route.
7. Connect the frontend to the API.
8. Add admin endpoints only after the public API is stable.

## 10. Quality Rules

- Every endpoint must validate input.
- Never expose database rows directly if the frontend only needs a subset.
- Keep response shapes stable and documented.
- Return consistent error objects.
- Add pagination if any list can grow large.
- Use transactions for multi-step writes.
- Store uploaded gallery files outside source control.

## 11. Error Handling Standard

Use one error shape across the app.

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

Typical status codes:

- `200` for successful reads and updates
- `201` for created resources
- `400` for validation issues
- `401` for authentication failures
- `403` for authorization failures
- `404` for missing routes or resources
- `409` for conflicts
- `500` for unexpected server errors

## 12. Frontend Integration Notes

The frontend should stop importing static tournament data from local files and instead fetch from the backend.

- Replace local fixtures data with `GET /api/v1/fixtures`
- Replace standings data with `GET /api/v1/standings`
- Replace scorers data with `GET /api/v1/scorers`
- Replace gallery category data with `GET /api/v1/gallery/categories`
- Submit the contact form to `POST /api/v1/contact`

For local development, proxy frontend requests to the Bun server.

## 13. Deployment Notes

- Keep the app stateless.
- Use migrations for schema changes.
- Seed tournament content for the first release.
- Add health checks and structured logs before deployment.
- Store secrets in the deployment environment, not in git.

## 14. Minimal Success Criteria

The backend is ready when:

- The server boots with Bun.
- The health check returns a live response.
- All tournament content can be fetched from APIs.
- Contact submissions are validated and saved.
- The frontend can consume the backend without hardcoded data files.
- The project has tests and a documented startup path.

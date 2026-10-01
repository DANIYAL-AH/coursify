# Edu Admin

Frontend-only admin portal (React + TypeScript + Vite + Tailwind CSS v4).

## Run
    npm install
    npm run dev

## Demo logins (hardcoded, shown on the login page)
- Admin: admin@eduadmin.com / Admin@123
- Instructor: instructor@eduadmin.com / Teach@123

## Structure
- `src/app` - app root and router
- `src/features/<name>` - one folder per feature (auth, dashboard, courses, theme)
- `src/components/ui` - reusable UI pieces | `src/components/layout` - sidebar, topbar, shell
- `src/styles/themes.css` - theme tokens (professional, cool, animated)
- `src/lib` - small helpers/hooks

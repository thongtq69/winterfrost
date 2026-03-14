# 2FA Real-time Implementation Notes

## Architecture
This feature implements a real-time bridge between a user requesting a 2FA code and an admin providing it.

1. **Storage**: MongoDB is used to synchronize state between the user and the admin.
2. **User Flow (`/verify-2fa`)**:
   - User enters email.
   - System records the request in MongoDB (`status: 'pending'`).
   - Page enters a "Waiting" state and polls the database every 3 seconds.
   - When a code is assigned, the page automatically updates to show the code.
3. **Admin Flow (`/admin/2fa-manager`)**:
   - Admin sees a list of pending requests.
   - Admin enters a 6-digit code and clicks "Send".
   - Database is updated with the code (`status: 'completed'`).
   - The user's page (still polling) detects this change and displays the code.

## Key Files
- `app/verify-2fa/page.tsx`: User interface with polling logic.
- `app/admin/2fa-manager/page.tsx`: Control panel for assigning codes.
- `app/api/2fa/...`: Backend logic for database interactions.
- `src/lib/mongodb.ts`: Database connection handler.
- `.env.local`: Contains the `MONGODB_URI`.

## Security Notice
- The admin page at `/admin/2fa-manager` is currently public. For production, it should be protected behind an authentication layer.
- Ensure the `MONGODB_URI` in `.env.local` is not committed to public repositories.

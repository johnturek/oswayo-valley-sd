# Emergency Alert Feature

This feature allows administrators to create emergency alerts that appear as popups on the homepage of the Oswayo Valley School District website. This is useful for snow emergencies, school shutdowns, late buses, or other urgent notifications.

## Features

- **Admin Interface**: Manage alerts through a password-protected admin page
- **Time-Based Activation**: Set start and end times for alerts
- **Snooze Functionality**: Users can snooze alerts, which persist across page refreshes
- **Responsive Design**: Works on desktop and mobile devices
- **Simple Storage**: Uses JSON file for data persistence

## Usage

### For Administrators

1. Navigate to `/admin` on your website
2. Log in with the admin password (default: `admin123`)
3. Fill out the alert form:
   - **Alert Message**: Enter your emergency message (supports multiple lines)
   - **Start Date & Time**: When the alert should begin showing
   - **End Date & Time**: When the alert should stop showing
   - **Activate Alert**: Check this box to activate the alert
4. Click "Save Alert" to publish the alert
5. To deactivate an active alert, click "Deactivate Alert"

### For Users

When an active emergency alert is present:
1. The alert will automatically appear as a modal popup on the homepage
2. Users can click "Close" to dismiss it temporarily
3. Users can click "Snooze" to hide it for their current browser session
4. If snoozed, the alert won't reappear until they open the site in a new browser/incognito mode

## Configuration

### Changing the Admin Password

For security, you should change the default admin password. There are two ways to do this:

#### Option 1: Environment Variable (Recommended)

Set the `ADMIN_PASSWORD` environment variable:

```bash
# In your .env.local file (for local development)
ADMIN_PASSWORD=your_secure_password_here

# Or in your hosting platform's environment variables
```

#### Option 2: Edit the Code

Edit `/app/api/alert/route.js` and change this line:

```javascript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
```

Replace `'admin123'` with your desired password.

## Technical Details

### File Structure

- `/app/admin/page.js` - Admin interface component
- `/app/admin/admin.module.css` - Admin page styles
- `/app/api/alert/route.js` - API endpoints for alert management
- `/components/EmergencyAlert.js` - Frontend alert modal component
- `/components/EmergencyAlert.module.css` - Alert modal styles
- `/data/alert.json` - Alert data storage

### API Endpoints

#### GET `/api/alert`
Fetches the current alert. Automatically checks if the alert is within its active time range.

Response:
```json
{
  "message": "Alert message",
  "startTime": "2025-12-31T07:00",
  "endTime": "2025-12-31T18:00",
  "isActive": true
}
```

#### POST `/api/alert`
Creates or updates an alert. Requires password authentication.

Request:
```json
{
  "password": "admin123",
  "message": "Alert message",
  "startTime": "2025-12-31T07:00",
  "endTime": "2025-12-31T18:00",
  "isActive": true
}
```

### localStorage Keys

The snooze functionality uses localStorage with keys in the format:
```
alert_snoozed_{startTime}
```

This allows different alerts to be tracked separately.

## Examples

### Snow Emergency Alert

```
Message: SNOW EMERGENCY: Due to severe weather conditions, all schools will be closed today, December 31, 2025. Buses will not run. Stay safe!

Start Time: 2025-12-31 06:00
End Time: 2025-12-31 20:00
```

### Late Bus Alert

```
Message: ATTENTION: Bus #5 is running approximately 30 minutes late due to traffic. Expected arrival time is 4:00 PM.

Start Time: 2025-12-31 15:15
End Time: 2025-12-31 16:30
```

### Early Dismissal

```
Message: EARLY DISMISSAL: School will dismiss 2 hours early today due to staff development. Dismissal begins at 1:00 PM.

Start Time: 2025-12-31 08:00
End Time: 2025-12-31 13:30
```

## Troubleshooting

### Alert Not Showing

1. Check that the alert is active (green "ACTIVE" status in admin)
2. Verify current time is between start and end times
3. Check if the alert was snoozed (clear browser localStorage)
4. Refresh the page

### Can't Log Into Admin

1. Verify you're using the correct password
2. Check if `ADMIN_PASSWORD` environment variable is set
3. Check browser console for any errors

### Changes Not Saving

1. Check file permissions on `data/alert.json`
2. Check server logs for any errors
3. Verify the API endpoint is accessible

## Security Notes

- Change the default admin password immediately in production
- Consider adding IP restrictions to the `/admin` route
- The current authentication is basic - for production use, consider implementing proper authentication
- Store the admin password securely using environment variables, not in code

# ERPNext API Tester

A Postman-like Web Application for ERPNext API Testing built with React.js.

## Features

- **Simplified Doctype Input**: Enter just the doctype name (e.g., "Customer") instead of full API URLs
- **Doctype Dropdown**: Fetch and select from existing ERPNext doctypes
- **Manual Doctype Entry**: Type custom doctypes manually
- **HTTP Methods**: Support for GET, POST, PUT, DELETE operations
- **Request Builder**: JSON body, headers, and query parameters input
- **Response Viewer**: Formatted JSON response display with syntax highlighting
- **Navigation**: Go Back functionality to previous pages
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Authentication**: API Key + API Secret authentication for ERPNext
- **Session-based**: All data resets on page refresh for security
- **Responsive Design**: Clean, modern UI that works on all devices

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Configure ERPNext Connection**
   - Open the app in your browser (http://localhost:3000)
   - Click "Configure Connection" on the dashboard
   - Enter your ERPNext Base URL (e.g., https://your-erpnext-instance.com)
   - Enter your API Key and API Secret
   - Click "Test Connection" to verify
   - The app will save your credentials for future use

## Usage

1. **Authentication**
   - Configure your ERPNext Base URL, API Key, and API Secret
   - Test the connection to ensure it's working
   - Credentials are used for the current session only (reset on refresh)

2. **Creating Requests**
   - Select HTTP method (GET, POST, PUT, DELETE)
   - Choose a doctype from the dropdown or enter a custom one
   - The URL is automatically built as `{baseURL}/api/resource/{doctype}`
   - Add custom headers if needed
   - For POST/PUT requests, enter JSON body
   - Add query parameters if needed

3. **Viewing Responses**
   - Responses are displayed in a formatted JSON viewer
   - Switch between "Response" and "Request Details" tabs
   - Copy JSON data using the built-in copy functionality

4. **Navigation**
   - Use "Go Back" to return to the previous page
   - All data resets when you refresh the page for security

## API Endpoints Used

- `/api/method/frappe.desk.doctype.data_import_tool.data_import_tool.get_doctypes` - Fetch available doctypes
- `/api/resource/{doctype}` - Main ERPNext resource API

## File Structure

```
src/
├── components/
│   ├── Dashboard.js          # Main dashboard with quick actions
│   ├── RequestBuilder.js     # Request creation and sending
│   ├── ResponseViewer.js     # Response display and formatting
│   └── Navigation.js         # Navigation controls
├── App.js                    # Main app component with routing
├── App.css                   # App-specific styles
├── index.js                  # App entry point
└── index.css                 # Global styles
```

## Technologies Used

- React.js 18
- React Router DOM for navigation
- Axios for API calls
- React JSON View for JSON formatting
- CSS3 for styling

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- All components use .jsx files as requested
- No TypeScript is used in this project
- The app is designed to work with ERPNext's standard API structure
- Credentials are stored in localStorage for convenience
- Recent requests are limited to 20 items to prevent storage bloat

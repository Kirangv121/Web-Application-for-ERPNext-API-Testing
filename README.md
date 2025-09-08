# 🚀 ERPNext API Tester

A modern, Postman-like Web Application for ERPNext API Testing built with React.js. Test your ERPNext APIs with ease using a clean, responsive interface.

![ERPNext API Tester](https://img.shields.io/badge/React-18.2.0-blue) ![Express](https://img.shields.io/badge/Express-4.21.2-green) ![Node.js](https://img.shields.io/badge/Node.js-22.19.0-brightgreen) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔧 **Core Functionality**
- **Simplified Doctype Input**: Enter just the doctype name (e.g., "Customer") instead of full API URLs
- **Smart Doctype Dropdown**: Fetch and select from existing ERPNext doctypes with fallback to common doctypes
- **Manual Doctype Entry**: Type custom doctypes manually for flexibility
- **HTTP Methods**: Full support for GET, POST, PUT, DELETE operations
- **Request Builder**: JSON body, headers, and query parameters input with validation
- **Response Viewer**: Formatted JSON response display with syntax highlighting
- **Real-time Testing**: Test all HTTP methods with one click

### 🎨 **User Experience**
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Navigation**: Go Back functionality to previous pages (Alt + ← shortcut)
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Status Indicators**: Clear visual feedback for success (green) and error (red) states
- **Session-based**: All data resets on page refresh for security
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🔐 **Authentication & Security**
- **API Key + Secret**: Token-based authentication for ERPNext
- **CORS Handling**: Built-in proxy server to handle CORS issues
- **Session Management**: Credentials persist during session, reset on refresh
- **Secure Headers**: Proper authorization headers for all requests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- ERPNext instance with API access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kirangv121/Web-Application-for-ERPNext-API-Testing.git
   cd Web-Application-for-ERPNext-API-Testing
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   # Start both React app and Express server
   npm run dev
   
   # Or start individually
   npm start          # React development server (port 3000)
   npm run server     # Express proxy server (port 5000)
   ```

4. **Access the Application**
   - Open your browser and go to `http://localhost:5000`
   - The Express server serves the React app and handles API proxying

## 📖 Usage Guide

### 1. **Configure ERPNext Connection**
   - Click "⚙️ Configure Connection" on the dashboard
   - Enter your ERPNext Base URL (e.g., `https://your-erpnext-instance.com`)
   - Enter your API Key and API Secret
   - Click "🧪 Test Connection" to verify
   - You'll see a green success message with your user info if successful

### 2. **Create API Requests**
   - Click "➕ New Request" or navigate to the request builder
   - Select HTTP method (GET, POST, PUT, DELETE) with color-coded buttons
   - Choose a doctype from the dropdown or enter a custom one
   - The URL is automatically built as `{baseURL}/api/resource/{doctype}`
   - Add custom headers, JSON body, and query parameters as needed
   - Click "Send Request" to execute

### 3. **View Responses**
   - Responses are displayed directly on the same page
   - Success responses show in green with formatted JSON
   - Error responses show in red with detailed error messages
   - JSON is syntax-highlighted and properly formatted

### 4. **Quick Actions**
   - **📋 Fetch Live Doctypes**: Get real-time doctype list from your ERPNext instance
   - **📚 Load Common Doctypes**: Use pre-loaded common ERPNext doctypes
   - **🧪 Test Doctypes API**: Test the doctypes endpoint directly
   - **🔧 Test All HTTP Methods**: Test GET, POST, PUT, DELETE on a sample doctype

## 🏗️ Architecture

### **Frontend (React.js)**
```
src/
├── components/
│   ├── Dashboard.js          # Main dashboard with connection config
│   ├── RequestBuilder.js     # Request creation and API testing
│   ├── ResponseViewer.js     # Response display and formatting
│   ├── Navigation.js         # Navigation controls
│   └── JsonViewer.js         # Custom JSON viewer component
├── utils/
│   └── apiClient.js          # API client with error handling
├── config.js                 # Application configuration
├── App.js                    # Main app component with routing
├── App.css                   # Modern CSS with design system
└── index.js                  # App entry point
```

### **Backend (Express.js)**
```
server.js                     # Express server with proxy functionality
├── CORS handling
├── API request proxying
├── Static file serving
└── Error handling
```

## 🔧 Configuration

### **Environment Variables**
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
```

### **ERPNext Setup**
1. **Enable API Access**: Ensure your ERPNext instance has API access enabled
2. **Create API Key**: Generate API Key and Secret in ERPNext
3. **CORS Configuration**: The app includes a proxy server to handle CORS issues
4. **Permissions**: Ensure your user has appropriate permissions for the doctypes you want to test

### **Common Doctypes**
The app includes a comprehensive list of common ERPNext doctypes:
- **Core**: User, Role, DocType, File, Tag, Version, ToDo
- **Stock & Inventory**: Item, Item Group, Item Price, Batch, Serial No, Stock Entry
- **Accounts**: Customer, Supplier, Sales Invoice, Purchase Invoice, Journal Entry
- **Selling**: Quotation, Sales Order, Customer Group, Territory, Lead, Opportunity
- **Buying**: Supplier, Supplier Group, Supplier Quotation, Purchase Order
- **Manufacturing**: BOM, Work Order, Job Card, Routing, Production Plan
- **HR & Payroll**: Employee, Department, Designation, Attendance, Leave Application
- **Projects**: Project, Task, Timesheet, Activity Cost
- **CRM**: Lead, Opportunity, Campaign, Contact
- **Website**: Web Page, Blog Post, Blog Category, Web Form, Web Template

## 🛠️ API Endpoints

### **ERPNext API Endpoints Used**
- `/api/method/frappe.auth.get_logged_user` - Test connection and get user info
- `/api/method/frappe.desk.doctype.data_import_tool.data_import_tool.get_doctypes` - Fetch doctypes
- `/api/resource/{doctype}` - Main ERPNext resource API for CRUD operations

### **Proxy Server Endpoints**
- `GET /health` - Server health check
- `POST /api/*` - Proxy all ERPNext API calls

## 🎨 UI/UX Features

### **Modern Design System**
- **CSS Variables**: Consistent colors, spacing, and typography
- **Gradient Backgrounds**: Beautiful gradient effects
- **Card-based Layout**: Clean, organized content sections
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid**: Adapts to all screen sizes

### **Interactive Elements**
- **Method Tags**: Color-coded HTTP method indicators
- **Status Indicators**: Clear success/error visual feedback
- **Loading States**: Visual feedback during API calls
- **Keyboard Shortcuts**: Alt + ← for back navigation

### **Color Scheme**
- **Primary**: Blue (#2563eb) for main actions
- **Success**: Green (#10b981) for successful operations
- **Error**: Red (#ef4444) for errors and warnings
- **Warning**: Orange (#f59e0b) for warnings
- **Neutral**: Gray scale for text and backgrounds

## 🔍 Troubleshooting

### **Common Issues**

1. **CORS Errors**
   - The app includes a proxy server to handle CORS
   - Ensure you're accessing the app via `http://localhost:5000`
   - Check that your ERPNext instance allows API access

2. **Connection Failed**
   - Verify your Base URL is correct (include http:// or https://)
   - Check that your API Key and Secret are valid
   - Ensure your ERPNext server is running and accessible

3. **Permission Denied (403)**
   - Check your user permissions in ERPNext
   - Ensure you have access to the specific doctype
   - Verify your API Key has the necessary permissions

4. **Doctypes Not Loading**
   - Use the "📚 Load Common Doctypes" button as a fallback
   - Check your ERPNext instance's doctype API endpoint
   - Verify your user has permission to access doctype information

### **Debug Mode**
- Open browser developer tools (F12)
- Check the Console tab for detailed error messages
- Network tab shows all API requests and responses
- Use the "🔗 Test in Browser" button for direct API testing

## 🚀 Deployment

### **Production Build**
```bash
# Build the React app
npm run build

# Start production server
npm run prod
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "prod"]
```

### **Environment Variables for Production**
```env
PORT=5000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ERPNext** for the amazing open-source ERP system
- **React.js** for the powerful frontend framework
- **Express.js** for the robust backend server
- **Community** for feedback and contributions

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Kirangv121/Web-Application-for-ERPNext-API-Testing/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Kirangv121/Web-Application-for-ERPNext-API-Testing/discussions)
- **Email**: kirangv121@gmail.com

---

**Made with ❤️ for the ERPNext community**
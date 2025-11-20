# 🏢 Office Layout Planning Application

## 📋 Project Overview

**Office Layout Planning Application** is a full-stack web application designed to help architects, interior designers, and office planners optimize office space allocation. The application calculates and visualizes optimal distribution of workspaces, meeting rooms, cabins, and support spaces based on total available area.

### 🎯 Problem Statement

Planning an office layout is complex and time-consuming. Designers need to:
- Calculate optimal space distribution for different room types
- Ensure compliance with space utilization standards
- Visualize the layout before implementation
- Save and compare multiple layout configurations

This application automates these calculations and provides an intuitive interface for office space planning.

---

## 🚀 Live Demo

- **Frontend**: [Your Frontend URL]
- **Backend API**: https://layout-qcdx.onrender.com/

---

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern UI library with hooks
- **ApexCharts** - Data visualization for treemap representation
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing
- **React Hot Toast** - User notifications
- **Styled Components** - CSS-in-JS styling
- **Lucide React & FontAwesome** - Icon libraries
- **React Tooltip** - Interactive tooltips

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 4.18.2** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose 7.6.3** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **Create React App** - Project scaffolding
- **Nodemon** - Auto-restart development server
- **Stylelint** - CSS linting

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │◄───────►│  Express API    │◄───────►│  MongoDB Atlas  │
│  (Port 3000)    │  HTTP   │  (Port 5000)    │  Mongoose│  (Cloud)       │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### Frontend Architecture

```
src/
├── App.js                  # Main application component with state management
├── services/
│   └── api.js             # API service layer for backend communication
├── Components/
│   ├── AreaInput.js       # Total area input and control panel
│   ├── OpenWorkspaces.js  # Linear and L-type workspace configuration
│   ├── Cabins.js          # MD, Manager, and Small cabin configuration
│   ├── MeetingRooms.js    # All meeting room types
│   ├── PublicSpaces.js    # Reception, lounge, breakout areas
│   ├── SupportSpaces.js   # UPS, BMS, Server rooms
│   ├── Treemap.js         # Visual representation of space allocation
│   ├── Modal.js           # Reusable modal component
│   └── Card.js            # Display cards for information
└── styles.css             # Global styles
```

### Backend Architecture

```
server/
├── index.js               # Express server setup and configuration
├── models/
│   └── Layout.js          # Mongoose schema for layout data
└── routes/
    └── layoutRoutes.js    # RESTful API endpoints
```

---

## 🎨 Key Features

### 1. **Dynamic Space Calculation**
- Automatically calculates optimal room counts based on total area
- Uses industry-standard space allocation formulas
- Supports area ranges from 1,000 to 25,000 sq ft

### 2. **Workspace Types**

#### Open Workspaces
- **Linear Workstations**: 40% of total area (24 sq ft per seat)
- **L-Type Workstations**: For larger offices (34 sq ft per seat)
- **Variants**: Medium (20 sq ft), Large (24 sq ft), XL (29 sq ft)

#### Cabins
- **MD Cabin**: 120 sq ft (1-7 cabins based on area)
- **Manager Cabin**: 80 sq ft (1-8 cabins)
- **Small Cabin**: 80 sq ft (1-4 cabins)

#### Meeting Rooms
- **Discussion Room**: 380 sq ft (for offices ≥12,000 sq ft)
- **Interview Room**: 100 sq ft (1-2 rooms)
- **Conference Room**: 250 sq ft (2-5 rooms)
- **Board Room**: 325 sq ft (for offices ≥12,000 sq ft)
- **Meeting Room**: 100 sq ft (1-6 rooms)
- **Large Meeting Room**: 120 sq ft (for offices ≥15,000 sq ft)
- **Video Recording Room**: 80 sq ft (for offices ≥15,000 sq ft)

#### Public Spaces
- **Reception**: 8% of area (1,000-3,500 sq ft offices) to fixed 700 sq ft (18,000-25,000 sq ft)
- **Lounge**: 11% of area (1,000-2,500 sq ft) to 4% (10,000-25,000 sq ft)
- **Breakout Room**: Customizable

#### Support Spaces
- **Server Room**: 40 sq ft (1-8 rooms)
- **UPS Room**: 90 sq ft
- **BMS Room**: 90 sq ft
- **Phone Booth**: 25 sq ft (2-8 booths)
- **Executive Washroom**: 60 sq ft (2 rooms for offices ≥9,000 sq ft)

### 3. **Interactive Visualization**
- **Treemap Chart**: Visual representation of space allocation
- Real-time updates as you modify room counts
- Color-coded sections for easy identification

### 4. **CRUD Operations**
- **Create**: Save new layout configurations
- **Read**: Load previously saved layouts
- **Update**: Modify existing layouts
- **Delete**: Remove unwanted layouts

### 5. **Validation & Error Handling**
- Prevents over-allocation (max 95% of total area)
- Minimum area validation (1,000 sq ft)
- Maximum area validation (25,000 sq ft)
- User-friendly error messages with modal dialogs

### 6. **Customization**
- Adjust individual room sizes
- Modify seat counts for specific rooms
- Choose workspace variants (Medium/Large/XL)
- Add custom "Other" spaces

---

##  Calculation Logic

### Space Allocation Formula

The application uses tiered calculation logic based on total area:

```javascript
// Example: Reception Area Calculation
if (totalArea >= 1000 && totalArea < 3500) {
    receptionArea = totalArea * 0.08  // 8% of total
} else if (totalArea >= 3500 && totalArea < 4500) {
    receptionArea = totalArea * 0.06  // 6% of total
} else if (totalArea >= 12000 && totalArea < 18000) {
    receptionArea = 500  // Fixed 500 sq ft
}
```

### Built Area Calculation

```javascript
builtArea = Σ (roomCount × roomSize) for all room types
availableArea = totalArea - builtArea
usableArea = totalArea × 0.95  // 95% utilization limit
```

---

## 🗄️ Database Schema

### Layout Model (MongoDB)

```javascript
{
  name: String,              // Layout name
  totalArea: Number,         // Total office area in sq ft
  variant: String,           // Workspace variant (medium/large/xl)
  areas: Map<String, Number>, // Room counts for each type
  areaValues: Map<String, Number>, // Room sizes for each type
  seatCounts: {
    smallCabin: Number,
    hrRoom: Number,
    sales: Number,
    financeRoom: Number
  },
  builtArea: Number,         // Total calculated built area
  availableArea: Number,     // Remaining available area
  createdAt: Date,           // Creation timestamp
  updatedAt: Date            // Last update timestamp
}
```

---

## 🔌 API Endpoints

### Base URL: `https://layout-qcdx.onrender.com/api/layouts`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | Get all layouts | - |
| GET | `/:id` | Get layout by ID | - |
| POST | `/` | Create new layout | Layout object |
| PUT | `/:id` | Update layout | Layout object |
| DELETE | `/:id` | Delete layout | - |

### Example API Request

```javascript
// Create Layout
POST /api/layouts
Content-Type: application/json

{
  "name": "Tech Office Layout",
  "totalArea": 15000,
  "variant": "large",
  "areas": {
    "linear": 250,
    "md": 3,
    "manager": 5,
    // ... other room counts
  },
  "areaValues": {
    "linear": 24,
    "md": 120,
    // ... other room sizes
  }
}
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Anu27n/layout.git
cd layout
```

#### 2. Install Frontend Dependencies
```bash
npm install
```

#### 3. Install Backend Dependencies
```bash
cd server
npm install
```

#### 4. Environment Configuration

Create `.env` file in the `server` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/layoutDB
PORT=5000
```

#### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

The application will open at `http://localhost:3000`

---

## 🎯 Use Cases

### 1. **Office Interior Designers**
- Quickly generate multiple layout options
- Compare different configurations
- Present visual layouts to clients

### 2. **Real Estate Developers**
- Optimize space utilization for commercial properties
- Calculate maximum seating capacity
- Plan office amenities

### 3. **Corporate Facility Managers**
- Plan office expansions
- Reorganize existing spaces
- Ensure compliance with space standards

### 4. **Architects**
- Validate space allocation in floor plans
- Generate BOQ (Bill of Quantities)
- Create preliminary designs

---

## 🧪 Testing Scenarios

### Test Case 1: Small Office (1,500 sq ft)
- **Expected**: 1 MD cabin, 1 Manager cabin, 1 Meeting room
- **Linear seats**: ~25 seats
- **Reception**: 8% of area

### Test Case 2: Medium Office (8,000 sq ft)
- **Expected**: 2 MD cabins, 3 Manager cabins, 3 Meeting rooms
- **Linear seats**: ~133 seats
- **Additional**: Phone booths, Server room

### Test Case 3: Large Office (20,000 sq ft)
- **Expected**: 6 MD cabins, 7 Manager cabins, Board room, Discussion room
- **Linear seats**: ~333 seats
- **Additional**: Video recording room, Multiple conference rooms

---

## 🔒 Security Features

1. **CORS Configuration**: Prevents unauthorized cross-origin requests
2. **Input Validation**: Server-side validation for all inputs
3. **Error Handling**: Graceful error handling with user-friendly messages
4. **Environment Variables**: Sensitive data stored in .env files

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the 'build' folder
```

### Backend Deployment (Render/Heroku)
```bash
# Ensure package.json has start script
"scripts": {
  "start": "node index.js"
}
```

**Current Deployment**: Backend deployed on Render at https://layout-qcdx.onrender.com/

---

## 📈 Future Enhancements

### Planned Features
1. **3D Visualization**: Three.js integration for 3D floor plans
2. **PDF Export**: Generate downloadable layout reports
3. **Multi-floor Support**: Handle multiple floors in one project
4. **User Authentication**: User accounts and role-based access
5. **Collaboration**: Real-time collaboration features
6. **Template Library**: Pre-built layout templates
7. **Cost Estimation**: Integrate cost calculation per layout
8. **Drag-and-Drop**: Interactive floor plan editor
9. **Mobile App**: React Native mobile application
10. **AI Suggestions**: ML-based layout optimization

---

## 🐛 Known Issues & Limitations

1. **Area Limit**: Currently supports offices up to 25,000 sq ft
2. **Fixed Formulas**: Calculation formulas are hardcoded
3. **No Undo/Redo**: No history management for changes
4. **Single User**: No multi-user collaboration support

---

## 📚 Learning Outcomes

### Technical Skills Demonstrated

1. **Full-Stack Development**
   - Frontend: React with hooks, state management
   - Backend: RESTful API design with Express
   - Database: MongoDB schema design and queries

2. **State Management**
   - Complex state handling with useState and useEffect
   - Derived state calculations
   - State synchronization across components

3. **API Integration**
   - Service layer architecture
   - Async/await patterns
   - Error handling and user feedback

4. **UI/UX Design**
   - Responsive design
   - Interactive visualizations
   - User input validation
   - Modal dialogs and notifications

5. **Algorithm Design**
   - Space allocation algorithms
   - Tiered calculation logic
   - Constraint-based optimization

---

## 🎤 Talking Points

### When Discussing This Project:

1. **Problem-Solving Approach**
   - " identified a real-world problem in office space planning and created an automated solution"
   - "Implemented complex business logic for space allocation based on industry standards"

2. **Technical Decisions**
   - "Chose MongoDB for flexible schema to accommodate varying room types"
   - "Used React hooks for clean, functional component design"
   - "Implemented service layer pattern for API calls to maintain separation of concerns"

3. **Challenges Overcome**
   - "Handled complex state dependencies with multiple useEffect hooks"
   - "Implemented validation to prevent over-allocation while maintaining user flexibility"
   - "Optimized re-renders for performance with large datasets"

4. **Code Quality**
   - "Followed DRY principles with reusable calculation functions"
   - "Implemented proper error handling and user feedback"
   - "Used semantic naming conventions for maintainability"

5. **Scalability Considerations**
   - "Designed API to be RESTful and stateless for horizontal scaling"
   - "Used MongoDB for easy schema evolution as requirements change"
   - "Modular component architecture allows easy feature additions"

---

## 📝 Code Highlights

### 1. Dynamic Calculation Hook
```javascript
useEffect(() => {
  const linear = calculateLinear(totalArea);
  const md = calculateMd(totalArea, areaValues);
  // ... calculate all room types
  
  setAreas((prevAreas) => ({
    ...prevAreas,
    linear: Math.round(linear / areaValues.linear),
    md: Math.round(md / areaValues.md),
    // ... update all areas
  }));
}, [totalArea, areaValues]);
```

### 2. Validation Logic
```javascript
const freeSpace = totalArea * 0.05; // 5% buffer
const usableArea = totalArea - freeSpace;

if (calculatedBuiltArea <= usableArea) {
  setBuiltArea(calculatedBuiltArea);
  setAreas(newAreas);
} else {
  setErrorMessageHandler("Built area exceeds available space");
}
```

### 3. API Service Layer
```javascript
export const createLayout = async (layoutData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(layoutData),
  });
  if (!response.ok) throw new Error('Failed to create layout');
  return response.json();
};
```

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Anu27n**
- GitHub: [@Anu27n](https://github.com/Anu27n)
- Project Repository: [layout](https://github.com/Anu27n/layout)

---

## 🙏 Acknowledgments

- Industry space planning standards
- React and Node.js communities
- MongoDB documentation
- ApexCharts for visualization library

---

## 📞 Contact & Support

For questions, suggestions, or issues:
- Open an issue on GitHub
- Email: [Your Email]

---

**Built with ❤️ for efficient office space planning**

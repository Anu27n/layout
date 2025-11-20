# Architecture Diagrams

This folder contains Python scripts to generate professional architecture diagrams for the Office Layout Planning Application.

## 📊 Generated Diagrams

1. **01-system-architecture.png** - Full-stack system architecture showing Frontend, Backend, and Database layers
2. **02-data-flow.png** - Complete data flow and processing pipeline from user input to visualization
3. **03-component-architecture.png** - React component hierarchy and feature breakdown

## 🚀 Quick Start

### Prerequisites

Install matplotlib (only required package):

```bash
pip install matplotlib
```

### Generate All Diagrams

Run the master script to generate all three diagrams at once:

```bash
python generate_all.py
```

### Generate Individual Diagrams

Or run individual scripts:

```bash
python generate_architecture.py    # System architecture
python generate_dataflow.py         # Data flow diagram
python generate_components.py       # Component architecture
```

## 📁 Files

- `generate_architecture.py` - Generates system architecture diagram
- `generate_dataflow.py` - Generates data flow diagram
- `generate_components.py` - Generates component architecture diagram
- `generate_all.py` - Master script to generate all diagrams
- `README.md` - This file

## 🎨 Diagram Details

### 1. System Architecture (01-system-architecture.png)

Shows the three-tier architecture:
- **Frontend Layer**: React 19.1.1 with state management, routing, and visualization
- **Backend Layer**: Express.js API with CORS, validation, and route handlers
- **Database Layer**: MongoDB Atlas with Mongoose ODM

Includes:
- Communication flow between layers
- Technology stack for each layer
- Deployment information
- Key features

### 2. Data Flow (02-data-flow.png)

Illustrates the complete user journey:
- User input and validation
- React state management
- Split flow: Calculation engine vs API persistence
- Space calculation functions
- Backend API endpoints
- MongoDB operations
- Final visualization output

### 3. Component Architecture (03-component-architecture.png)

Displays the React component hierarchy:
- **Main Container**: App.js with state management
- **Feature Components**: 
  - AreaInput (controls and statistics)
  - OpenWorkspaces (linear and L-type)
  - Cabins (MD, Manager, Small)
  - MeetingRooms (all meeting room types)
  - PublicSpaces (reception, lounge)
  - SupportSpaces (server, UPS, BMS)
- **Shared Components**: Treemap, Modal, Card, API Service
- **State & Backend Integration**

## 💡 Usage Tips

### For Interviews
- Use these diagrams to explain your project architecture
- Show understanding of full-stack development
- Demonstrate component-based design thinking

### For Documentation
- Include in README.md
- Add to project presentations
- Use in technical documentation

### For Portfolio
- Showcase system design skills
- Demonstrate visualization abilities
- Highlight technical communication

## 🎯 Customization

You can modify the Python scripts to:
- Change colors (defined at the top of each script)
- Adjust layout and spacing
- Add or remove components
- Modify text and labels
- Change output resolution (dpi parameter)

## 📝 Notes

- All diagrams are generated at 300 DPI for high quality
- Output format is PNG with white background
- Diagrams are optimized for both digital and print use
- Scripts use only matplotlib (no external dependencies beyond that)

## 🐛 Troubleshooting

**Issue**: ModuleNotFoundError: No module named 'matplotlib'
**Solution**: Run `pip install matplotlib`

**Issue**: Diagrams look blurry
**Solution**: Increase the `dpi` parameter in the `savefig()` call (currently set to 300)

**Issue**: Text is cut off
**Solution**: Adjust the figure size in `plt.subplots()` or use `bbox_inches='tight'` in `savefig()`

## 📄 License

These scripts are part of the Office Layout Planning Application project.

---

**Generated with ❤️ for professional technical documentation**

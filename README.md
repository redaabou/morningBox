# ☕ MorningBox Cafeteria System
## 🖼️ App Screenshots

Here are some of the screens you can expect to see in the MorningBox app:

- **Homepage**: View Cafeterias and Menus
    ![Homepage](/frontend/public/MorningBox_Home.png)

- **Cafeteria Menu**: Browse Items and Prices
    ![Cafeteria Menu](/frontend/public/MorningBox_Cafe.png)

- **Manager Dashboard**: Menu Management
    ![Manager Dashboard](/frontend/public/MorningBox_Dash.png)
    
- **Super Admin Dashboard**: Manage Cafeterias
    ![Super Admin Dashboard](/frontend/public/list%20menu.png)


A complete digital solution for MorningBox cafeterias featuring customer menus, manager dashboards, and admin controls.

## 🚀 Features

### 👨‍💼 Manager Portal
- **Menu Management**: Add/Edit/Remove items
- **Real-Time Toggle**: Activate/Deactivate items
- **Pricing Control**: Update prices and promotions
- **Cafeteria-Specific Access**: Only see assigned location

### 👑 Admin Console
- **Multi-Location Oversight**: Manage all cafeterias
- **User Assignment**: Assign managers to locations
- **System Configuration**: Global settings control

### 📱 Customer Experience
- Location-based menu browsing
- Real-time availability status
- Responsive mobile interface

## 🛠 Tech Stack

| Component       | Technology               |
|-----------------|--------------------------|
| Frontend        | React 18, Redux Toolkit  |
| Backend         | Node.js 16+, Express 4.x|
| Database        | MongoDB Atlas            |
| Authentication  | JWT, Bcrypt              |
| Styling         | Material-UI, CSS Modules |
| Deployment      | Docker, AWS EC2          |

## 📦 Installation

### Prerequisites
- Node.js v16+
- MongoDB Atlas URI
- Docker (optional)

### Setup
```bash
# Clone repository
git clone https://github.com/yourusername/morningbox.git
cd morningbox

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure environment
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start development servers
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm start

###📜 License
MIT © MorningBox

<div align="center"> <a href="#"><img src="https://img.shields.io/badge/Deploy-Live-brightgreen"></a> <a href="#"><img src="https://img.shields.io/github/issues/yourusername/morningbox"></a> </div>



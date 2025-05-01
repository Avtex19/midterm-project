# Frontend for Hand Tracking Practice App

This directory contains the frontend code for a web application focused on hand tracking practice. Built with React and TypeScript, it provides interactive exercises utilizing camera input for hand pose estimation.

## Project Structure
```bash
frontend/
├── src/
│   ├── components/
│   │   ├── HandPoseCamera.tsx      # Component for capturing camera feed and displaying hand pose
│   │   ├── PracticeView.module.css # CSS Modules for the PracticeView component
│   │   └── PracticeView.tsx        # Main view for practice exercises
│   ├── types/
│   │   ├── index.ts                # Potentially defines shared TypeScript types
│   │   └── utils.ts                # Could define utility-related types
│   ├── utils/
│   │   ├── handpose.ts             # Logic related to hand pose estimation
│   │   ├── handVisualizer.ts       # Functions for visualizing the detected hand pose
│   ├── api.ts                  # Functions for making API calls (if any)
│   ├── App.css                     # Global styles for the application
│   ├── App.tsx                     # Root component of the application
│   ├── index.css                   # General styles applied to the main HTML
│   ├── index.tsx                   # Entry point for rendering the React application
│   └── main.tsx                    # Another potential entry point or related setup
└── node_modules/                 # Node.js dependencies (not shown in detail)
```
### `src/`

This directory houses the main source code of the frontend application.

#### `components/`

Contains reusable UI components.

* `HandPoseCamera.tsx`: This component likely handles accessing the user's camera feed and uses a hand tracking library to detect hand poses. It probably renders the camera stream and overlays the visual representation of the detected hands.
* `PracticeView.module.css`: Contains the local styles specific to the `PracticeView` component, likely using CSS Modules to avoid naming conflicts.
* `PracticeView.tsx`: This is likely the main screen where users engage in hand tracking practice exercises. It might utilize the `HandPoseCamera` component and present tasks or feedback related to hand movements.

#### `types/`

Likely contains TypeScript definition files for custom types and interfaces used throughout the application.

* `index.ts`: Could export various type definitions used across different modules.
* `utils.ts`: Might define types specifically related to utility functions or data structures.

#### `utils/`

Contains utility functions and modules that provide specific functionalities.

* `handpose.ts`: Likely includes the core logic for interacting with a hand pose estimation library (e.g., TensorFlow.js Handpose).
* `handVisualizer.ts`: Functions in this file probably take hand pose data and generate visual elements (e.g., drawing points and lines on a canvas) to represent the detected hands.
* `api.ts`: If the application communicates with a backend, this file would likely contain functions for making API requests.

#### Root Level `src/` Files

* `App.css`: Contains global CSS rules that apply to the entire application.
* `App.tsx`: The root component that sets up the main layout and routing of the application.
* `index.css`: Provides basic styles for the main HTML document.
* `index.tsx`: The entry point where the React application is mounted to the DOM (typically using `ReactDOM.render`).
* `main.tsx`: This could be another entry point or a file involved in the initial setup of the application, potentially related to different rendering environments or configurations.

## Technologies Used

* React
* TypeScript
* Potentially: CSS Modules, a hand tracking library (like TensorFlow.js Handpose), and other utility libraries.

## Getting Started

To run this frontend locally, you'll typically need to:

1.  Ensure you have Node.js and npm (or yarn) installed.
2.  Navigate to the root directory of your project in the terminal.
3.  Install dependencies: `npm install`.
4.  Start the development server: `npm start`.

This should open the application in your web browser.


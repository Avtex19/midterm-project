

#  Flashcards with Hand Gesture Interaction

## Overview

This project introduces an innovative way to learn with flashcards by combining the convenience of a browser extension for effortless card creation with the engaging interactivity of hand gesture recognition for card evaluation. As a solo effort, this project emphasizes the application of sound software engineering principles throughout its development, from initial design to deployment.


## Engineering Principles Demonstrated


* **Specification:** A detailed specification outlining the functionality of each component was created prior to development. This includes the API endpoints, database schema, and the logic for hand gesture interpretation.
* **Testing:** Comprehensive unit tests were written using `[Your Testing Framework]` to ensure the reliability of individual modules and functions. These tests cover critical aspects like data handling, API responses, and gesture recognition logic.
* **Abstract Data Types (ADTs):** Key data structures, such as the `Card` object, were designed as ADTs with clearly defined Abstraction Functions (AF), Representation Invariants (RI), and `checkRep()` methods implemented to maintain data integrity.
* **Safety from Rep Exposure (SRE):** Careful consideration was given to prevent the internal representation of ADTs from being exposed, ensuring data integrity and preventing unintended modifications.
* **Easy to Understand (ETU):** The codebase is written with clarity in mind, utilizing consistent naming conventions, clear code formatting (likely using a tool like Prettier), and comments to explain complex logic. The use of TypeScript's static typing enhances readability and maintainability.
* **Ready for Change (RFC):** The modular design of the application allows for easier modification and extension of features in the future. The separation of concerns between the frontend and backend minimizes the impact of changes in one area on others.
* **Git Usage:** A consistent Git workflow was followed, with frequent, well-documented commits that illustrate the step-by-step development process. Branches were used to isolate features and bug fixes.

## Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Avtex19/midterm-project]
    cd [midterm-project]
    ```

2.  **Backend Setup:**
    * Navigate to the backend directory: `cd backend`
    * Install dependencies: `npm install` or `yarn install`
    * Start the backend server.

3.  **Browser Extension Installation:**
    * Open Google Chrome (or a Chromium-based browser).
    * Go to `chrome://extensions/`.
    * Enable "Developer mode."
    * Click "Load unpacked" and select the `extension` directory from your project.

## Usage

1.  **Creating Flashcards:** Highlight text on any webpage and click the extension icon. Follow the prompts in the popup to save the text as a flashcard.
2.  **Reviewing Flashcards:** Open the extension popup to view flashcards. With your webcam enabled and permission granted, use the specified hand gestures to indicate whether you found the card "Easy," "Wrong," or "Hard."

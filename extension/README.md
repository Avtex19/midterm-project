```bash
This innovative browser extension empowers you to seamlessly transform any text encountered online into study-ready flashcards within your preferred Flashcards application.

Core Functionalities

Effortless Text Capture via Highlighting: Simply select any text on a webpage, and instantly have it ready to become a flashcard.
Convenient Floating Action Button: Upon text selection, a readily accessible floating button appears, providing a one-click pathway to add the content as a new flashcard.
Rapid Addition via Context Menu: With a simple right-click on highlighted text, you can select an "Add to Flashcards" option for swift card creation.
Comprehensive Flashcard Authoring: Easily define the front and back content of your flashcard, and optionally include a helpful hint and relevant tags.
Quick Access to Recent Cards: A dedicated list keeps your recently created flashcards within easy reach.
Seamless Backend Synchronization: The extension is designed to integrate smoothly with your existing Flashcards application backend, ensuring your cards are always up-to-date.
Installation Procedures

For Chromium-based Browsers (Chrome, Edge, Brave)

Download or obtain a copy of this extension's repository.
Navigate to your browser's extensions management page:
Chrome: chrome://extensions/
Edge: edge://extensions/
Brave: brave://extensions/
Activate "Developer mode" by toggling the switch typically located in the upper-right area of the page.
Click the "Load unpacked" button, usually found in the top-left corner, and select the root directory of the downloaded or cloned extension repository.
For Firefox

Download or obtain a copy of this extension's repository.
Open Firefox and in the address bar, type $\text{about:debugging#/runtime/this-firefox}$ and press Enter.
Click the "Load Temporary Add-on..." button.
Browse to the extension's folder and select the manifest.json file.
Usage Instructions

Methods for Adding Flashcard Content

Method 1: Utilizing Text Selection:

Highlight any text you wish to convert into a flashcard on the current webpage.
A floating action button, labeled something like "Add to Flashcards," will dynamically appear near the selected text.
Click this button. A popup window will be displayed, with the text you highlighted automatically populated in the appropriate field.
Method 2: Employing the Context Menu:

Select the specific text on the webpage that you want to use for your flashcard.
Right-click anywhere within the highlighted text.
From the context menu that appears, choose the option labeled "Add to Flashcards."
A popup window will open, and the selected text will be pre-filled.
Method 3: Direct Input via Extension Popup:

Locate and click on the extension's icon in your browser's toolbar.
This action will open the extension's popup window.
Within the popup, you can manually type or paste the content you want for the front and back of your flashcard.
The Flashcard Creation Process

Once the popup is open, you will typically see a "Front" field. If you used text selection or the context menu, this field will already contain the highlighted text.
In the "Back" field, provide the answer, definition, or any other relevant information associated with the front of the flashcard.
Optionally, you can enhance your flashcard by:
Entering a hint in the designated "Hint" field to provide a subtle clue.
Adding tags (separated by commas) in the "Tags" field to categorize and easily find your flashcards later.
Finally, click the "Save Card" button. This action will create the flashcard and store it, and it will be synchronized with your linked Flashcards application backend.
Backend Configuration

By default, this extension is configured to communicate with a Flashcards backend service running locally at the address http://localhost:3001. If your Flashcards backend is hosted at a different URL, you will need to update this setting within the extension's options or configuration panel to ensure proper synchronization.

Development Overview

Project File Structure

manifest.json: This crucial file contains the metadata and configuration details for the browser extension, such as its name, version, permissions, and the scripts it utilizes.
popup.html, popup.css, popup.js: These files define the user interface (HTML), styling (CSS), and interactive logic (JavaScript) for the extension's popup window that appears when you want to create a flashcard.
content.js, content.css: The content.js script is injected into every webpage you browse, enabling the extension to interact with the content of those pages (e.g., detecting text selections and displaying the floating button). content.css provides any specific styling needed for these interactions within the webpages.
background.js: This script runs in the background of your browser and manages events and communication between the different parts of the extension, such as handling requests from the content script or the popup.
Building the Extension

This extension is built using fundamental web technologies: HTML for structure, CSS for styling, and JavaScript for functionality. Therefore, there is no formal build process required. You can directly load the unpacked extension into your browser as described in the installation
```

Flashcards Extension for Browsers

This browser extension lets you easily capture text from any webpage and create flashcards in your Flashcards app.

Key Features

Text Highlighting: Select any text on a webpage and add it directly as a flashcard.
Floating Action Button: A floating button appears when text is selected, making it easy to add content as a flashcard.
Context Menu Option: Right-click on selected text to quickly add it as a flashcard.
Quick Card Creation: Add a flashcard with a front, back, optional hint, and tags.
Recent Flashcards: Access a list of your recently created flashcards.
Backend Integration: Effortlessly syncs with your Flashcards app backend.
Installation Instructions

For Chrome/Edge/Brave
Download or clone this repository.
In your browser, go to the extensions page:
Chrome: chrome://extensions/
Edge: edge://extensions/
Brave: brave://extensions/
Enable "Developer Mode" by toggling the switch in the top-right corner.
Click "Load Unpacked" and select the extension directory from the repository.
For Firefox
Download or clone this repository.
Open Firefox and go to about:debugging#/runtime/this-firefox.
Click "Load Temporary Add-on" and select the manifest.json file from the extension folder.
How to Use

Adding Flashcards
Method 1 - Text Selection:
Highlight any text on the webpage.
A floating button titled "Add to Flashcards" will appear.
Click the button to open the popup with the highlighted text automatically filled in.
Method 2 - Context Menu:
Highlight the desired text on the page.
Right-click and choose "Add to Flashcards" from the context menu.
The popup opens with the highlighted text already filled in.
Method 3 - Extension Popup:
Click on the extension icon in your browser's toolbar.
Manually enter the flashcard's front and back content.
Creating a Flashcard
In the popup, the "Front" field will be pre-populated if you highlighted text.
Enter the "Back" (answer or additional information) for the flashcard.
Optionally, add a hint and tags (comma-separated).
Click "Save Card" to create and store the flashcard.
Configuration

By default, the extension connects to the Flashcards backend at http://localhost:3001. If your backend is hosted at a different URL, you can modify the URL in the extension settings.

Development Guide

Project Files
manifest.json: Configuration file for the extension.
popup.html, popup.css, popup.js: UI and logic for the popup interface.
content.js, content.css: Scripts and styles that interact with the web pages.
background.js: Background service worker handling communication between scripts.
Building the Extension
No build process is needed. The extension is developed using vanilla HTML, CSS, and JavaScript.
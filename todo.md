Project TODO Checklist: Flashcard App Enhancements

Phase 1: Backend Persistence
Step 1: State Serialization/Deserialization Helpers
Create test/stateSerialization.test.ts.
Write unit tests for serializeState (converting Map and Set to plain JavaScript objects). Ensure all code is your own; do not copy from external sources. Focus on the logic of converting between these data structures and plain objects.
Test with an empty state object.
Test with a populated state object containing flashcards, decks, and review history.
Test with a state object that includes card history.
Write unit tests for deserializeState (converting plain JavaScript objects back to Map and Set). Ensure all code is your own; do not copy. Focus on the reverse transformation of the serialization process.
Test with an empty serialized state object.
Test with a populated serialized state object.
Test with a serialized state object containing card history.
Create logic/stateSerialization.ts.
Implement serializeState(state: AppState): SerializedAppState function. Define the SerializedAppState interface. Write this code yourself, based on your understanding of the state structure. Do not copy from external examples.
Implement deserializeState(serializedState: SerializedAppState): AppState function. Write this code yourself, ensuring it correctly reverses the serialization. Do not copy.
Ensure all tests in test/stateSerialization.test.ts pass.
Step 2: File I/O for State
Add tests to test/stateSerialization.test.ts for saveStateToFile and loadStateFromFile.
Test saveStateToFile by asserting that it writes the correct JSON representation of the state to a file (mock the fs module or use temporary files). Write the test code yourself. If you use examples for mocking, cite them properly in comments.
Test loadStateFromFile when the file exists and contains valid JSON, ensuring it correctly loads and deserializes the state. Write the test code yourself.
Test loadStateFromFile when the file does not exist, ensuring it handles this scenario without errors (e.g., by returning an initial state). Write the test code yourself.
Test loadStateFromFile when the file contains corrupted JSON, ensuring it handles this gracefully (e.g., by logging an error and returning an initial state). Write the test code yourself.
Implement saveStateToFile(filePath: string, state: AppState): Promise&lt;void> in logic/stateSerialization.ts using fs/promises. Write this file I/O code yourself. If you refer to examples, cite them clearly.
Implement loadStateFromFile(filePath: string): Promise&lt;AppState> in logic/stateSerialization.ts using fs/promises. Write this file I/O code yourself. Cite any examples you consult.
Ensure all tests in test/stateSerialization.test.ts pass.
Step 3: Load State on Startup
Import loadStateFromFile into state.ts.
Create an asynchronous function initializeState() in state.ts.
Implement logic within initializeState(): Write this code yourself. The logic should be based on your understanding of how to load and handle application state.
Call loadStateFromFile() to attempt to load the persisted state.
If loadStateFromFile() is successful, update the relevant state variables (flashcards, decks, etc.) with the loaded state.
If loadStateFromFile() throws an error because the file doesn't exist, log the error and initialize the state with default values.
If loadStateFromFile() throws an error due to corrupted JSON or other issues, log the error and initialize the state with default values.
Import initializeState into server.ts.
Modify the startup sequence in server.ts: Write the code to modify the startup sequence yourself.
await initializeState() before calling app.listen() to ensure the state is loaded before the server starts accepting requests.
Adjust logging in server.ts to reflect the state loading process (success or failure).
Step 4: Save State on Graceful Shutdown
Import saveStateToFile and the necessary state getter functions into server.ts.
Define an asynchronous function handleShutdown() in server.ts.
Implement logic within handleShutdown(): Write this code yourself.
Retrieve the current application state using the state getter functions.
Call saveStateToFile() to persist the state.
Log the success or failure of the state saving operation.
Call process.exit() to terminate the process after the state is saved (or after logging the error).
Register handleShutdown() as the handler for the SIGINT signal (Ctrl+C).
Register handleShutdown() as the handler for the SIGTERM signal (e.g., from kill command).
Implement a simple flag or mechanism to prevent multiple simultaneous calls to saveStateToFile() if the shutdown signal is received multiple times in quick succession. Write this code yourself.
Manual Test: Manually verify that state persistence is working correctly. Perform these tests yourself, documenting the steps and results. Do not copy test procedures from external sources.
Start the application.
Make changes to the application's data via the API (e.g., add, modify, or delete flashcards or decks).
Stop the application using Ctrl+C (or the appropriate signal for your operating system).
Restart the application.
Verify that the changes you made before stopping the application are correctly loaded and reflected in the application's state.
Phase 2: Backend API for Browser Extension
Step 5: Modify Flashcard and POST /api/cards for Hint/Tags
Update the Flashcard class constructor in logic/flashcards.ts to accept optional hint (string) and tags (string array) parameters. Write this code yourself.
Update the corresponding type definition in types/index.ts (if Flashcard is defined separately there) to include optional hint and tags properties. Write this code yourself.
Update the POST /api/cards route handler in server.ts to accept optional hint (string) and tags (string array) from the req.body. Write this code yourself.
Pass the received hint and tags values to the new Flashcard() constructor when creating a new flashcard. Write this code yourself.
Ensure that the hint and tags are included in the JSON response sent back to the client when a new card is successfully created. Write this code yourself.
Update any existing unit or integration tests for the POST /api/cards endpoint to account for the new hint and tags fields. Write these tests yourself.
Step 6: LLM Service Module
Set up configuration for the LLM API key and URL.
Use config.ts or .env files to store LLM_API_KEY and LLM_API_URL. This step involves configuration, not code you'd plagiarize, but ensure you understand the purpose of this configuration.
Ensure that the file containing these sensitive values (e.g., .env) is added to .gitignore to prevent it from being committed to version control. This is a standard practice, not a source of plagiarism.
Create a new module logic/llmService.ts.
Implement an asynchronous function generateFlashcardFront(backText: string): Promise&lt;string> within llmService.ts.
Include the prompt formatting as specified in the design document. The prompt format should be your own design or, if provided, you must cite the design document.
Make an API call to the LLM service using fetch or a library like axios. Write this API call code yourself. Cite the documentation for the API you are using, but do not copy the code directly.
Parse the response from the LLM API to extract the generated flashcard front text. Write this parsing code yourself, based on the expected response format. Cite the API documentation.
Implement robust error handling, including: Write this error handling yourself.
Handling network errors (e.g., connection timeouts, failed DNS resolution).
Handling HTTP status codes indicating errors from the LLM API (e.g., 4xx or 5xx errors).
Handling cases where the LLM API returns an unexpected or invalid response format.
Export the generateFlashcardFront function.
(Recommended) Create a test file test/llmService.test.ts.
(Recommended) Write unit tests for generateFlashcardFront that mock the HTTP requests to the LLM service. Write these tests yourself, using a mocking library. Cite the mocking library's documentation.
Test the success case, ensuring the function returns the expected flashcard front text.
Test various error scenarios, such as network errors, LLM API returning error status codes, and invalid LLM API responses.
Step 7: Implement POST /api/cards/prepare Endpoint
Create a helper function doesCardBackExist(backText: string): boolean in state.ts.
This function should check if a flashcard with the given backText already exists in the application's state. Write this function yourself.
Add unit tests for doesCardBackExist in the appropriate test file. Write these tests yourself.
Define a new route POST /api/cards/prepare in server.ts. Write this route definition yourself.
Implement the route handler for POST /api/cards/prepare as an asynchronous function. Write this handler yourself.
Extract and validate the backText from the req.body. Return an appropriate error (e.g., 400 Bad Request) if backText is missing or invalid. Write this validation code yourself.
Call doesCardBackExist to check for duplicates.
If a card with the same backText already exists, respond with a 409 Conflict status code and an appropriate JSON error message (e.g., { error: "Card with this back text already exists" }). Write this response yourself.
If no duplicate exists, use a try...catch block to call generateFlashcardFront.
In the try block, call generateFlashcardFront to get the front text. If successful, respond with a 200 OK status code and a JSON object containing the front and back text: { front, back: backText }. Write this code yourself.
In the catch block, handle errors from generateFlashcardFront (e.g., network errors, LLM API errors). Respond with an appropriate error status code (e.g., 500 Internal Server Error, 502 Bad Gateway) and a JSON error message indicating the LLM service failure (e.g., { error: "Error generating flashcard front from LLM" }). Write this error handling yourself.
Add integration tests for the /api/cards/prepare endpoint. These tests should ideally mock the LLM service to avoid actual external API calls during testing. Write these integration tests yourself, using a mocking library. Cite the library.
Test the case where the backText is not a duplicate and the LLM service successfully generates the front text.
Test the case where a card with the same backText already exists.
Test the case where the LLM service returns an error.
Phase 3: Browser Extension Frontend
Step 8: Basic Structure & Trigger
Create a new directory named extension to contain the extension's files.
Create manifest.json with the following: This is a configuration file. Cite the Manifest V3 documentation, but you don't need to write original code here, just configure.
Manifest version 3.
A descriptive name, version, and description for the extension.
Permissions: contextMenus, activeTab, scripting, and notifications.
Define a background service worker.
Create background.js (the service worker script).
Implement a chrome.runtime.onInstalled listener in background.js to create a context menu item. Write this code yourself. Cite the Chrome extension API documentation.
The context menu item should appear when the user right-clicks on selected text.
The context menu item should have a descriptive title (e.g., "Add to Flashcards").
Implement a chrome.contextMenus.onClicked listener in background.js. Write this code yourself. Cite the Chrome extension API documentation.
For now, inside this listener, simply log the selected text to the console using console.log().
Test loading the unpacked extension in your browser and triggering the context menu item to verify that the selected text is correctly logged. Perform this testing yourself.
Step 9: API Call & Initial UI States
Modify the chrome.contextMenus.onClicked listener in background.js to make a fetch request to the POST /api/cards/prepare endpoint. Write this code yourself. Cite the Fetch API documentation.
Include the correct headers for the request (e.g., Content-Type: application/json).
Include the selected text in the request body as JSON: { backText: selectedText }.
Handle the different response statuses from the API: Write this error handling yourself.
If the response status is 409 (Conflict), log a message indicating that a card with that back text already exists.
If the response status is 200 (OK), parse the JSON response.
If the response status is any other error code, log an appropriate error message.
Log the front and back text from the successful response using console.log().
(Optional) Add the notifications permission to the manifest.json file. This is configuration.
(Optional) Implement basic feedback using chrome.notifications.create() to display notifications to the user. Write this code yourself. Cite the Chrome extension API.
Show a notification on successful retrieval of front/back text.
Show an error notification if the card is a duplicate or if there's an error generating the front text.
Step 10: Card Review Form & Save Logic
Decide on a UI pattern for the card review form: This is a design decision.
Option 1: Use a Popup. Create popup.html, popup.css, and popup.js.
Option 2: Use a Content Script. Create a separate HTML/CSS/JS file to be injected into the current page.
Design and implement the HTML structure for the card review form. Write this HTML yourself.
Include input fields for the front and back of the card.
Include an optional input field for a hint.
Include an input field for tags (which should accept comma-separated values).
Include a "Save Card" button.
(Optional) Include "Retry" and "Manual Entry" buttons for error handling.
Modify background.js to trigger the display of the review form UI: Write this code yourself.
If using a Popup: Store the front and back data received from the /api/cards/prepare endpoint, and then use chrome.windows.create() to open the popup.
If using a Content Script: Store the data and use chrome.scripting.executeScript() to inject a script that will render the form and populate it with the data.
Implement the JavaScript logic for the review form UI (either in popup.js or in the content script). Write this JavaScript yourself.
Retrieve the front, back, and error state (if any) when the UI loads.
Populate the form fields with the retrieved data.
Implement the logic for the "Save Card" button:
Read the values from the form fields.
Parse the tags string into an array of strings (splitting by commas).
Make a fetch request to the POST /api/cards endpoint, including the front, back, hint, and tags in the request body.
Display a success or error message to the user based on the response from the API.
If the card is saved successfully, close the UI (e.g., close the popup or remove the injected form).
Implement logic for the "Retry" or "Manual Entry" buttons (if included).
Manual Test: Test the complete extension workflow. Perform this testing yourself.
Highlight text on a webpage.
Trigger the extension (via context menu).
(If applicable) Handle duplicate card or LLM error scenarios.
The review form should appear, populated with the data.
Enter any missing information (hint, tags).
Click "Save Card".
Verify that the new card appears in your main flashcard application's practice interface.
Phase 4: Frontend Gesture Recognition Integration
Step 11: Webcam Access & Error Handling
Add a &lt;video> element to the practice view UI (in PracticeView.tsx). Write this code yourself.
Implement a function startWebcam() within the component. Write this function yourself. Cite the Media Capture and Streams API.
Use navigator.mediaDevices.getUserMedia({ video: true }) to request access to the user's webcam.
Handle the successful acquisition of the webcam stream:
Set the srcObject property of the &lt;video> element to the stream.
Call video.play() to start the video stream.
Update the component's state to indicate that the webcam is active (e.g., set isWebcamActive to true).
Handle errors that may occur when accessing the webcam: Write this error handling yourself.
Catch specific error types (e.g., NotAllowedError, NotFoundError) and set an appropriate error message in the component's state.
Set isWebcamActive to false.
Implement conditional UI rendering in PracticeView.tsx to display: Write this UI rendering code yourself.
The &lt;video> element when the webcam is active.
An error message if webcam access fails.
Buttons:
A "Try Again" button that calls startWebcam() when clicked.
A "Continue without Webcam" button that sets a state variable (e.g., useWebcam) to false.
Call startWebcam() when the PracticeView component mounts or when a new practice session starts. Write this code yourself.
Implement logic to pause the practice session or prevent interaction while the error UI is displayed (i.e., when webcam access has failed). Write this logic yourself.



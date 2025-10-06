

Chef's Menu Studio
Chef's Menu Studio is a modern, professional-grade menu management system built with React and TypeScript. It allows users (e.g., chefs, restaurateurs, or culinary teams) to easily create, manage, and categorize menu items into well-structured courses like starters, mains, drinks, desserts, and sides.
________________________________________
 Features
•	 Add New Dishes with name, description, price, and course category.
•	 Search Functionality to filter items in real-time by name or description.
•	Live Stats displaying:
o	Total items
o	Average item price
o	Total menu value
•	Form Validation for better data integrity.
•	 Auto-categorization of items by course.
•	Currency Formatting (ZAR - South African Rand).
•	 Visual Feedback with animations and responsive UI.
________________________________________
 Technologies Used
•	React (with Hooks)
•	TypeScript
•	CSS Modules (custom styling in App.css)
•	HTML5 + Modern JS
•	Icons & Emojis for enhanced UX
________________________________________
 Getting Started
Prerequisites
•	Node.js ≥ 14
•	npm ≥ 6 or yarn ≥ 1.22
Installation
1.	Clone the repository:
2.	git clone https://github.com/jupiter1079/Chef_Menu_Management_App/edit/main/README.md
3.	cd chefs-menu-studio
4.	Install dependencies:
5.	npm install
6.	# or
7.	yarn install
8.	Start the development server:
9.	npm start
10.	# or
11.	yarn start
12.	Open your browser at React App
________________________________________
Project Structure
src/
├── App.tsx         # Main component with UI and logic
├── App.css         # Styles for the app
├── index.tsx       # App entry point
├── ...             # Additional assets or components
________________________________________
Application Logic Overview
•	State Management: useState hooks manage form data, menu items, search input, and submission state.
•	Dynamic Grouping: Menu items are grouped into course categories (STARTER, MAIN, etc.) using loops.
•	Statistics Calculation: Total value and average price calculated using a while loop.
•	Validation: Ensures form completeness and price correctness before adding items.
•	Search Filter: Real-time filtering of items based on dishName and description.
________________________________________
 UI Preview
   ________________________________________
Example Menu Item JSON
{
  "id": "item-1633970190000-abc123xyz",
  "dishName": "Grilled Salmon",
  "description": "Fresh Atlantic salmon with a lemon butter glaze.",
  "course": "MAIN",
  "price": 199.99,
  "createdAt": "2024-10-06T12:00:00.000Z"
}
________________________________________
Deployment
To build for production:
npm run build
# or
yarn build
The production-ready app will be in the build/ folder.
________________________________________
 Future Improvements
•	Backend integration (Firebase, Supabase, etc.)
•	Persistent storage (localStorage or backend DB)
•	Edit & delete functionality
•	Mobile responsiveness
•	Dark mode
________________________________________ License
This project is open-source and available under the MIT License.
________________________________________
Credits
Developed by Jupiter Ngwenya— inspired by the needs of culinary professionals.



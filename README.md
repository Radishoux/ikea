# Warehouse Software Assignment

## Overview

This project is a simple warehouse management application built with [Next.js](https://nextjs.org).
It demonstrates basic inventory and product management, including selling products and updating stock, as described in the assignment.

## Features

- **Inventory Management:**
  Loads articles from `inventory.json`, each with an ID, name, and stock.
- **Product Management:**
  Loads products from `products.json`, each with a name, price, and required articles/quantities.
- **Sell Products:**
  Displays all products and allows selling if enough inventory is available. Selling updates the inventory and deducts money.
- **Add Inventory:**
  Add new articles or increase stock of existing ones via a form.
- **Money Management:**
  Tracks available money, deducts on product sale, and allows depositing more.

## How It Works

- **Inventory and Products** are loaded from static JSON files.
- **Product Availability** is calculated based on current inventory.
- **Selling a Product** subtracts required articles from inventory and deducts the product price from money.
- **Form for Inventory** allows adding new items or increasing stock for existing ones.
- **UI Feedback** includes disabled buy buttons when stock/money is insufficient and a toast notification when inventory is added.

## Pros & Cons

### Pros

- **Simplicity:**
  The code is easy to scan and understand, with clear naming and separation of concerns.
- **Readability:**
  React hooks and functional components make the logic straightforward.
- **Maintainability:**
  State management is local and easy to extend.
- **Testability:**
  Logic is mostly contained in pure functions and handlers, making it easy to test.

### Cons

- **Persistence:**
  Inventory and product changes are not saved to disk or a database; they exist only in memory for the session.
- **Scalability:**
  For production, a backend API and database would be needed for real persistence and multi-user support.
- **Validation:**
  Basic validation is implemented, but more robust checks (e.g., duplicate IDs, negative stock) could be added.

## Future Considerations

- **Backend Integration:**
  Add API routes and a database for persistent storage and multi-user support.
- **Testing:**
  Add unit and integration tests for business logic and UI.
- **UI/UX:**
  Improve design and accessibility, add error messages and confirmations.
- **Edge Cases:**
  Handle edge cases like concurrent updates, invalid data, and large inventories.

## Getting Started

1. Install dependencies:
    ```bash
    npm install
    ```
2. Run the development server:
    ```bash
    npm run dev
    ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure

- `app/page.js` — Main application logic and UI
- `app/inventory.json` — Inventory data
- `app/products.json` — Product data
- `app/globals.css` — Global styles

## Picking Up This Code

- All main logic is in `app/page.js`.
- Inventory and products are loaded from JSON files in `app/`.
- UI is built with React and Next.js app directory.
- Styles are in `app/globals.css`.

---

Feel free to reach out
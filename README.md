## Getting Started

### Prerequisites

- **PostgreSQL**: Ensure you have PostgreSQL running locally as the application depends on a local PostgreSQL instance.
- **Node Version Manager (nvm)**: 
  - If you don’t have `nvm` installed, you can follow this guide to install it: [Install nvm](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).
  - Alternatively, if you already have Node.js 21 installed, you can skip this step.

### Setup Instructions

1. **Install Node.js Version**:
   - Use Node.js version 21. If it's not already installed, run:
     ```bash
     nvm install 21
     ```
   - Then set the Node version to 21:
     ```bash
     nvm use 21
     ```

2. **Install Dependencies**:
   - Run:
     ```bash
     yarn install
     ```

3. **Create Development Database**:
   - Run:
     ```bash
     yarn db:create:dev
     ```

4. **Run the Development Server**:
   - Start the server:
     ```bash
     yarn run dev
     ```

5. **Visit the Application**:
   - Open your browser and navigate to:
     ```
     http://localhost:3000
     ```

## Code Planning and Structure

This project is structured with performance, maintainability, and cutting-edge practices in mind. Below is an overview of some of the key decisions made during development:

### API Backend

- **TypeORM for Data Access Layer**:
  - We use [TypeORM](https://typeorm.io/) as our model layer, which allows us to manage data access cleanly and maintain an MVC (Model-View-Controller) architecture. This ensures that data operations are well-organized and separated from business logic, improving code clarity and testability.

- **RTK for API Calls and Caching**:
  - We use [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) to manage API calls and caching, which improves performance by minimizing redundant API calls and provides a consistent state management solution.

- **Error Handling at API Level**:
  - We implement error handling at the API layer to provide robust and clear error feedback, which improves the user experience and helps catch issues early.

### Frontend Components

- **Tickets Table with Reusable Rows**:
  - The tickets table is built with each row as a separate component to promote modularity and ease of maintenance.

- **Hours Formatting Component**:
  - Hours formatting is managed by a dedicated component, making it easy to reuse across the application wherever time formatting is required.

- **Timer Component Structure**:
  - The `Timer` functionality is split into smaller, reusable components:
    - `baseTimer`
    - `CountUp`
    - `CountDown`
  - This modular structure helps avoid duplication and makes it easier to maintain and extend timer functionality.

- **Tailwind CSS for Styling**:
  - We use [Tailwind CSS](https://tailwindcss.com/) for styling to leverage its utility-first approach, ensuring responsive, modern UI components.

- **Next.js Layout Technique**:
  - Using Next.js's layout technique to share layouts across pages allows us to reuse code efficiently and improve project structure.

- **Small Component Architecture**:
  - The codebase is organized into small, focused components. This makes the code easier to maintain, read, and test, ensuring future scalability.

## Contributing

1. **Fork the repository** and create a new branch.
2. **Make your changes** and ensure all tests pass.
3. Submit a pull request, and we’ll review it promptly.

## License

This project is licensed under the MIT License.

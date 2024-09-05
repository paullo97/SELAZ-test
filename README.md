# SELAZ Test 🧪

Welcome to the SELAZ Test project! This Angular application demonstrates task management with user roles and status tracking. It utilizes Angular 17 and NgRx for state management, along with Angular Material for UI components. 🎉

## Features 🚀

- **Task Management**: Create, update, and manage tasks with various statuses.
- **User Roles**: Differentiate between ADMIN and USER roles.
- **Toast Notifications**: Display success and error messages with Angular Material's Toast Service.
- **Dynamic Select Components**: Customize the UI with Angular Material's select component.
- **Global Styles**: Apply consistent button and form styles across the application.

## Planned Features 🚧

While the project implements core functionalities, there are a few additional features that were planned but couldn't be completed within the current timeline:

- **Graphs for Task Tracking 📊**: Integration with `ngx-charts` to visualize task progress and completion statistics.
- **Role-Based Action Restrictions 🔒**: Implement role-based access control (RBAC) to restrict actions (e.g., editing or deleting tasks) based on the user's role (ADMIN or USER).
- ~~**Deploy to GitHub Pages 🚀**: Setup automated deployment to GitHub Pages for easier sharing and showcasing of the project.~~ **Implemented**: The project is now available at [https://paullo97.github.io/SELAZ-test/](https://paullo97.github.io/SELAZ-test/)
- **Action History 📝**: Implement a history log to track which user deleted, modified, or updated a task, providing better accountability and traceability.

These features remain a priority for future development and will enhance the user experience by providing better insights, security, accessibility, and accountability.

## Access the Project 🌐

If you prefer not to download and run the project locally, you can view the live application hosted on GitHub Pages. Simply visit the following link:

[https://paullo97.github.io/SELAZ-test/](https://paullo97.github.io/SELAZ-test/)

Feel free to explore the project and see it in action!

## Prerequisites 🔧

To run this project, you'll need to have the following installed:

1. **Node.js**: [Download and install Node.js](https://nodejs.org/)
2. **Angular CLI**: Install globally using npm.

  ```bash
   npm install -g @angular/cli
  ```

## Getting Started 🚀

If you dont wanna
Follow these steps to get a copy of the project up and running on your local machine:

1. Clone the Repository

First, clone the repository from GitHub:
```bash
git clone https://github.com/SELAZ-Test/SELAZ-Test.git
```

2. Navigate to the Project Directory

Change into the project directory:
```bash
cd SELAZ-Test
```

3. Install Dependencies

Install the required dependencies using npm:
```bash
npm install
```

4. Serve the Application
Start the development server:
```bash
ng serve
```
By default, the application will be available at http://localhost:4200/. Open this URL in your web browser to view the application.

5. Open the Application
Open your web browser and navigate to `http://localhost:4200` to view the application.

## Testing 🧪

To run unit tests for the application, use:

```bash
ng test
```

This command will execute the tests using Karma and Jasmine.

## Building for Production ⚙️

To build the application for production, use:

```bash
ng build --prod
```

The build artifacts will be stored in the dist/ directory. You can deploy these files to your web server or hosting provider.

## Contributing 🤝

Feel free to contribute to the project by submitting issues or pull requests. Please follow the standard GitHub workflow:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## Contact 📧

For any questions or inquiries, please contact paulo.cesar97@hotmail.com

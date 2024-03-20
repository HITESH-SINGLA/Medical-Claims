# Medical Claim Reimbursement 

The purpose of a medical claim website is to provide a platform for Stakeholders to efficiently manage the process of submitting, reviewing, and processing medical claims. The website aims to streamline the claims process, reduce administrative burdens, and improve communication between all parties involved in medical billing and reimbursement. By providing a user-friendly and secure platform for submitting and managing medical claims, the website aims to improve the overall healthcare experience for patients and providers alike.

## Features and Functionalities

1. User Accounts: Stack Holders can create accounts to securely manage their medical claims and associated information.

2. Claim Submission: Patients can submit medical claims online, including information about the medical service provided, and the healthcare provider.

3. Claim Tracking: Users can track the status of their claims, including any approvals or denials.

4. Auto Fill: Auto Fill is a feature that automatically populates form fields with pre-existing data that we collect at the signup time or commonly used values. Auto Fill can save time and reduce errors by automatically filling in patient information.

## Technology Stack

### Database
The database stores essential information related to user login credentials, facilitating secure access to the website's features.
#### Key Components:

1. **ElephantSQL PostgreSQL Database:**
   - The website utilizes ElephantSQL as a managed PostgreSQL database service.
   - PostgreSQL is a powerful, open-source relational database management system known for its reliability and robust feature set.

2. **Database Connectivity (database.py):**
   - The `get_database` function establishes a connection to the ElephantSQL-hosted PostgreSQL database using the provided username and password.
   - The `psycopg2` library serves as the PostgreSQL adapter for Python, enabling seamless interaction between the website and the database.

3. **Executing SQL Queries:**
   - Upon establishing a connection, SQL queries are executed using a cursor object obtained from the database connection.
   - The website executes SQL queries to retrieve, insert, update, or delete data stored in the PostgreSQL database.

4. **Fetching Results:**
   - After executing a query, the website fetches the results using methods like `fetchall` or `fetchone`, enabling data retrieval for further processing.
   - Results obtained from the database queries are processed and utilized within the website's functionalities, such as user authentication and data retrieval.

5. **Transaction Management:**
   - If the website performs data modification operations (e.g., INSERT, UPDATE, DELETE), it commits the transaction using the `commit` method to ensure changes are persisted to the database.
   - Proper transaction management helps maintain data integrity and consistency within the PostgreSQL database.

6. **Resource Cleanup:**
   - Once database interactions are completed, the website closes the cursor and database connection using the `close` method to release resources and prevent memory leaks.

**Functionality Overview:**

- **User Authentication:** The website verifies user login credentials by querying the PostgreSQL database for matching username-password combinations.
- **Data Retrieval:** Essential information, such as user details and application data, is retrieved from the database to populate web pages and facilitate user interactions.
- **Data Modification:** Authorized users can modify data stored in the database, such as updating application details or recording remarks, through secure interactions facilitated by the website.


### Frontend

Our medical claims project's frontend is built using React, providing a dynamic and user-friendly interface. React's component-based architecture enables modular development and seamless updates. With React's efficient state management, we deliver responsive and interactive user experiences. The combination of React and PostgreSQL forms a powerful platform for effective medical claims management.

### Backend

Our medical claims project's backend is powered by Flask, offering a lightweight and flexible framework for handling server-side logic. Flask's simplicity and extensibility facilitate rapid development and easy integration with our PostgreSQL database. With Flask's RESTful routing, we efficiently manage API endpoints for seamless communication between the frontend and the database. Together with React and PostgreSQL, Flask forms a robust and scalable solution for our medical claims management system.


## Routing and Navigation


The Medical Claims website utilizes React Router for client-side routing, enabling smooth navigation between different views and components. Below is an overview of the routing and navigation setup according to the provided code:

**Router Configuration**: The application is wrapped with the `<Router>` component from React Router, enabling routing functionality throughout the application.

```javascript
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
```

**Route Setup**: Routes are defined within the `<Routes>` component, specifying the URL path and the corresponding component to render.

```javascript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/otp" element={<OTPForm />} />
  <Route path="/Signup" element={<Signup />} />
  {/* Additional routes */}
</Routes>
```

**Private Routes**: Certain routes are protected and accessible only to authenticated users. This is achieved using a higher-order component called `PrivateRoute`.

```javascript
<Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
<Route path="/Pharmacist" element={<PrivateRoute><Pharmacist /></PrivateRoute>} />
{/* Additional private routes */}
```

**Nested Routes**: Some routes are nested within parent routes, indicating hierarchical relationships between different views or components.

```javascript
<Route path="/Home/Instructions" element={<PrivateRoute><Instructions /></PrivateRoute>} />
<Route path="/Page1/Page2" element={<PrivateRoute><Page2 /></PrivateRoute>} />
{/* More nested routes */}
```

**Dynamic Route Parameters**: Dynamic route parameters are used to handle variations in URLs, such as displaying specific application details based on the application ID.

```javascript
<Route path="/Home/ShowApplication/:id" element={<PrivateRoute><ShowApplication /></PrivateRoute>} />
<Route path="/Pharmacist/ShowApplicationToPharmaMed/:id" element={<PrivateRoute><ShowApplicationToPharmaMed /></PrivateRoute>} />
{/* More routes with dynamic parameters */}
```

**Fallback Route**: A fallback route is defined to handle any paths that do not match the specified routes, rendering an error page or default component.

```javascript
<Route path="*" element={<Errorpage />} />
```

Through React Router, users can navigate the Medical Claims website seamlessly, accessing various features and functionalities based on their roles and permissions.

## Detailed Route Overview

The Detailed Route Overview provides an in-depth explanation of the routes present in the Medical Claims website along with their functionalities.

## Routes and Functionalities

### Landing Page ("/")
- **Functionality:** Serves as the landing page for the website.
- **Description:** Upon accessing the website, users are directed to the landing page where they can get an overview of the platform and access navigation options.

### OTP Verification ("/otp")
- **Functionality:** Handles OTP (One-Time Password) verification for user authentication.
- **Description:** Users are directed to this page to verify their identity using OTP before gaining access to their accounts.

### User Signup ("/Signup")
- **Functionality:** Allows new users to sign up for an account.
- **Description:** New users can register for an account on the Medical Claims platform by providing necessary details and creating login credentials.

### User Login ("/LoginForm")
- **Functionality:** Provides a login interface for existing users.
- **Description:** Existing users can log in to their accounts using their credentials to access the platform's features and functionalities.

### Home Page ("/Home")
- **Functionality:** Acts as the main dashboard for authenticated users.
- **Description:** Upon successful login, users are redirected to the home page where they can view relevant information, navigate through different sections, and access role-specific functionalities.

### Application Pages
- **Paths:** "/Autofill", "/Page1", "/Page1/Page2", "/Page1/Page2/Page3", "/Page1/Page2/Page3/Accountpage1", "/Page1/Page2/Page3/Accountpage1/Application"
- **Functionality:** Guides users through the process of filling out and submitting their medical claim applications in multiple steps.
- **Description:** These pages provide a step-by-step interface for users to complete and submit their medical claim applications efficiently.

### Role-Specific Pages
- **Paths:** "/Pharmacist", "/Medical_officer", "/DAorJAO", "/AO", "/SrAO", "/Registrar", "/Director"
- **Functionality:** Role-specific pages providing access to functionalities and tasks relevant to each user role within the medical claims approval process.
- **Description:** Users with specific roles in the approval process can access dedicated pages tailored to their responsibilities and tasks.

### Verified Applications Pages
- **Paths:** "/Pharmacist/Pharmacist_verified_applications", "/Medical_officer/Medical_officer_verified_applications", "/DAorJAO/DAorJAO_verified_applications", "/AO/AO_verified_applications", "/SrAO/SrAO_verified_applications", "/Registrar/Registrar_verified_applications", "/Director/Director_verified_applications"
- **Functionality:** Displays a list of verified applications specific to each user role, allowing users to review and take action on pending applications.
- **Description:** Users can access these pages to view the list of verified applications relevant to their role and take necessary actions such as approval or rejection.

### Error Page ("/*")
- **Functionality:** Serves as a fallback page for handling any unexpected errors or invalid routes.
- **Description:** In case users encounter any errors or access invalid routes, they are redirected to the error page, providing them with a fallback option and appropriate feedback.


It serves as a comprehensive guide for users to navigate through the platform and understand the workflow of the medical claims submission and approval process.

## Key Components

The Medical Claims website comprises several key components, each serving a specific purpose in the application process and user interaction:

1. **Authentication Routes**:
   - **LoginForm**: Provides a login form for user authentication.
   - **OTP**: Allows users to verify their identity using a one-time password.
   - **Signup**: Enables new users to register for an account.

2. **Home Routes**:
   - **Home**: Acts as the main dashboard for authenticated users, providing access to various functionalities based on user roles.
   - **Instructions**: Offers guidance and instructions for users navigating the website.

3. **Application Process Routes**:
   - **Autofill**: Enables users to autofill their application details.
   - **Page1, Page2, Page3**: Guides users through the multi-step process of filling out application pages.
   - **Accountpage1**: Provides an account page for users to review and edit their application details before submission.
   - **Application**: Finalizes the application submission process.

4. **Role-Specific Routes**:
   - **Pharmacist, Medical_officer, DAorJAO, AO, SrAO, Registrar, Director**: Role-specific routes offering functionalities tailored to each user role.

5. **Verified Applications Routes**:
   - **Pharmacist_verified_applications, Medical_officer_verified_applications, etc.**: Displays lists of verified applications specific to each user role.
   - **ShowApplicationToPharmaMed/:id**: Allows users to view detailed information about verified applications.

6. **Error Handling Route**:
   - **\***: Redirects users to an error page if they attempt to access an undefined route.



## Visually representation through a flowchart.   
"We've developed a comprehensive flowchart on our website, showcasing the entire process of medical claims submission, approval, and subsequent actions. This flowchart illustrates who can apply, the sequential approval process involving different administrators, post-approval actions, and protocols for applications placed on hold. It serves as a visual roadmap, encapsulating the complete functionality of our website."



### Meaning of different color lines 
1. Orange Color Line: In the flowchart, the orange-colored line symbolizes the process wherein a user attempts to log in. Our system promptly verifies whether the login data already exists in our database. If a matching record is found, an OTP (One-Time Password) is dispatched for verification. However, if the data is not found, an error message is displayed, prompting the user to register first before proceeding.

2. Black Color Line: In the flowchart, the black-colored line symbolizes the login process for various users, including students, pharmacists, doctors, junior accountants, assessing officers, registrars, and directors. Each user accesses their respective portal by logging in with their unique email IDs, which are pre-existing in our database. Upon successful login, each user is directed to their designated portal.

3. Yellow Color Line: In the flowchart, the yellow line signifies the administrative process of reviewing applications submitted by students. Each administrator evaluates the applications within their jurisdiction. Following deliberation, they decide whether to approve the application or place it on hold, accompanied by any remarks if necessary.

4. Blue Color Line: In the flowchart, the blue line denotes the hierarchical passing of applications from one administrator to another after initial approval. This indicates a sequential flow wherein the application progresses through different levels of authority for further assessment or approval. For instance, the application may first be approved by a pharmacist, then forwarded to a doctor, and subsequently to other administrators as per the established hierarchy.

5. Green Color Line: In the flowchart, the green-colored line represents a two-way process involving the resolution of application issues. When an administrator identifies missing information or requires additional details, they place the application on hold and provide remarks detailing the necessary updates. Subsequently, the status update is communicated to the student portal. The student then addresses the remarks by providing the required information, allowing the application to continue from where it was placed on hold, rather than starting the process anew. This two-way interaction streamlines the application process and ensures efficient resolution of issues.

### Flowchart
![WhatsApp Image 2024-03-20 at 5 21 24 PM](https://github.com/bhuriamohit/DEP-P17-2024/assets/117526106/b016c76f-6bf8-45a3-9403-46baf6660853)
 

                     
## User Interfaces

Every user who interacts with the system will have the same user interface. The single central interface for interacting with the application will be the web application. This will be a highly visual interface involving a minimal, easy-to-navigate UI. The interface would be primarily useful to users to view the analytics of their applications. The interface will be designed to be intuitive and easy to use. The interface will be designed to be responsive and work on all devices. The interface will be designed to be compatible with all major browsers.
Our landing page offers comprehensive information about medical staff and colleges, providing users with valuable insights. Additionally, we feature intuitive signup and login pages for user authentication. During signup, essential data is collected, enhancing user experience through autofill functionality. This seamless integration streamlines the user journey, ensuring efficient data utilization for enhanced convenience.

### Landing Page
On the landing page, users will directly encounter the website's interface. This section not only furnishes essential details about the website but also includes information about the medical staff. Additionally, there are dedicated sign-up and login buttons for users to register or log in to their accounts.
In this landing page, we've incorporated information about the medical staff, providing details about the doctors along with their respective working hours on the landing page. Users can now access comprehensive Information about healthcare professionals, fostering transparency and convenience.
Furthermore, a footer has been introduced to the landing page, offering information about our college. This section includes essential details about the institution along with links to our social media profiles. Additionally, contact Information is provided for users to reach out for any inquiries or assistance.



## Getting Started

To set up and run the application just follow this link: https://medical-claims-t17.netlify.app/


## Conclusion

The medical claims website is a comprehensive platform designed to facilitate the submission, verification, and approval of medical claims submitted by students. Through a hierarchical approval process involving various administrative roles such as pharmacists, medical officers, and other authorities, the website ensures thorough evaluation and verification of each claim. With role-based access control and streamlined workflows, the website enhances efficiency, transparency, and accountability in the medical claim approval process. Overall, the project demonstrates a commitment to optimizing the management of medical claims while prioritizing accuracy, compliance, and user satisfaction."

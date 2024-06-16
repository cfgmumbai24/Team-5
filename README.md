# Go Vocal for Local

## Overview

This project is a web application designed to facilitate the management and visibility of products for rural users through a structured approval process involving sub-admins and admins. The application consists of four dashboards tailored to different user roles: Rural User, Sub-admin, Admin, and Guest. The primary goal is to enable rural users to upload product images and details, which are then vetted by sub-admins and admins before being displayed to guests.

## Technology Stack

The application is built using the MERN stack:

- **MongoDB**: For database management.
- **Express.js**: For backend routing and API creation.
- **React.js**: For the frontend user interface.
- **Node.js**: For running the server-side environment.

## Dashboards and User Roles

### 1. Rural User Dashboard
- **Features**:
  - Upload product image.
  - Choose the category of the product.
- **Workflow**:
  - Rural users submit product images and select a category.
  - Submitted products are sent to the Sub-admin for review.

### 2. Sub-admin Dashboard
- **Features**:
  - View submitted products from rural users.
  - Reject or accept products based on the image.
  - Add additional product details (weight, color, description) upon acceptance.
- **Workflow**:
  - Sub-admins review and vet products.
  - Accepted products, with added details, are sent to the Admin for final approval.

### 3. Admin Dashboard
- **Features**:
  - View products submitted by sub-admins.
  - Reject or accept products with additional details.
  - Add new products directly.
  - Enter new rural users into the system.
  - Manage guest queries.
  - Receive notifications of guest cart additions via email.
- **Workflow**:
  - Admins provide final approval for products.
  - Approved products are made visible to guests.
  - Admins manage and resolve guest queries.

### 4. Guest Dashboard
- **Features**:
  - Browse approved products.
  - Add products to cart.
- **Workflow**:
  - Guests can view and select products.
  - Cart additions are sent to the Admin via email for confirmation.

## Installation and Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/cfgmumbai24/Team-5.git
    cd Team-5
    ```

2. **Backend Setup**:
    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Configure environment variables (e.g., MongoDB URI, email service credentials).
    - Start the server:
      ```bash
      npm start
      ```

3. **Frontend Setup**:
    - Navigate to the frontend directory:
      ```bash
      cd frontend
      ```
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the development server:
      ```bash
      npm start
      ```

4. **Database Setup**:
    - Ensure MongoDB is running and accessible.
    - Set up initial collections and indices as needed.

## Usage

- **Rural Users**:
  - Log in to the Rural User Dashboard.
  - Upload product images and select appropriate categories.

- **Sub-admins**:
  - Log in to the Sub-admin Dashboard.
  - Review submitted products and provide additional details for accepted products.

- **Admins**:
  - Log in to the Admin Dashboard.
  - Approve or reject products with additional details.
  - Add new products and manage rural user entries.
  - Handle guest queries and confirm cart additions.

- **Guests**:
  - Access the Guest Dashboard.
  - Browse and add products to the cart.

## Future Enhancements

- Implement a more sophisticated notification system for product approvals and rejections.
- Enhance the guest cart and order management system.
- Introduce advanced search and filter options for guests.
- Develop a mobile application for easier access by rural users.

## Screenshots
### Wholesaler/ Retailer
![photo1](./Images/photo1.png)

### Sub Admin
![photo2](./Images/photo2.png)

### Admin
![photo3](./Images/photo3.png)

### Rural People
![photo4](./Images/photo4.png)

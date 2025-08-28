**🛍️ Lolaselan E-Commerce Platform**

Lolaselan is a modern fashion e-commerce platform built with Next.js and Supabase.
It provides a seamless shopping experience for customers while offering a powerful dashboard for admins to manage products, orders, users, refunds, and analytics.

✨ Features

**🛒 Customer Features**
  - Browse & Shop Products – Explore a variety of traditional and modern outfits such as Adire two pieces, Bubu, Ankara pants, Aso Oke skirts, and more.
  - Cart Management
  - Add products to cart.
  - Edit/update cart items.
  - Remove items from cart.
  - Buy Now – Instantly purchase a single product without adding it to the cart.
  - Favorites (Wishlist) – Save products to wishlist for future reference.
  - Order History – Track past and ongoing orders.
  - Wishlist History – View previously saved favorites.
  - Refund Requests – Customers can request refunds with reasons; refund status is visible in profile.
  - Contact Support – Reach out via a contact form or email for inquiries.
    

**🛠️ Admin Features**

**Dashboard Analytics (overview)**
  - Total orders, revenue, users, and products.
  - Recent orders summary.
**Orders Management**
  - View detailed order info (customer name, email, order time, amount, delivery status, phone, address, country).
  - Update delivery status → Processing, Shipping, Delivered.
  - Delete orders.
**Product Management**
  - Insert products into database with details: ID, name, fabric, image, isNew, sizes.
  - Restriction: max 3 images per product.
  - Control product status → Available, Out of Stock, Pre-order.
**Refunds Management**
  - View refund requests (order number, customer email, request time).
  - Mark refund as Declined or Completed.
  - Trigger automatic email notifications and update user’s profile refund status.
**Subscribers Management**
  - View total subscribers.
  - Send promotional emails directly via the UI.
**Users Management**
  - View all registered users and their details.
  - Perform actions like deletion.
**Detailed Analytics**
  - View comprehensive revenue and order stats.
  - Visualized with bar charts.
    

**🧑‍💻 Tech Stack**

  - Frontend: Next.js (App Router)
  - Database & Auth: Supabase
  - File Storage: Supabase Storage (for product images)
  - Authentication: Google OAuth via Google Cloud
  - Email Service: Resend (transactional & promotional emails)
  - UI Components: TailwindCSS + React Icons
  - Charts & Analytics: Recharts (bar charts for revenue/orders)

**Implementation Highlights**

  - Cart & Checkout Flow – Managed client-side with sync to Supabase for persistence.
  - Buy Now – Simplified checkout for single products.
  - Order & Refund Notifications – Automated via Resend emails (declined/completed refund emails included).
  - Admin Dashboard – Role-based access with secure Supabase queries.
  - Product Insertion – Restriction logic ensures no more than 3 images per product.
  - Subscribers – Promotional campaigns sent directly through dashboard.
  - Analytics – Orders & revenue visualized via bar charts, using real-time Supabase queries.

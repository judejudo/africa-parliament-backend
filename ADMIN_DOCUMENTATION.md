# Africa Parliament Backend Office (AN-PBO) Admin Documentation

## Table of Contents
1. [Admin Access & Authentication](#admin-access--authentication)
2. [Content Types Overview](#content-types-overview)
3. [Managing Country Administrators](#managing-country-administrators)
4. [Content Management Procedures](#content-management-procedures)
5. [Admin Roles & Permissions](#admin-roles--permissions)
6. [Media Management](#media-management)
7. [Troubleshooting](#troubleshooting)

---

## Admin Access & Authentication

### Primary Super Administrator
- **Email**: `secretariatkenya@an-pbo.org`
- **Role**: Super Administrator (Full Access)
- **Capabilities**: Can manage all content types, create/manage other admin users, and access all system features

### Accessing the Admin Panel
1. Navigate to the Strapi admin URL: `https://admin.an-pbo.org/admin`
2. Enter your credentials:
   - Email: `secretariatkenya@an-pbo.org`
   - Password: [Provided separately for security]
3. Click "Sign In"

### Password Management
- Use strong passwords with at least 12 characters
- Include uppercase, lowercase, numbers, and special characters

---

## Content Types Overview

The system manages 14 different content types, organized as follows:

### 1. **Publications** 📚
- **Purpose**: Academic publications from African parliament countries
- **Key Fields**: Title, Date Published, PDF File, Description, Country (linked to Member States)
- **Special Feature**: Country-specific access control for country administrators
- **Who Can Manage**: Super Admin (all), Country Admins (their country only)

### 2. **Conferences** 🏛️
- **Purpose**: Conference events with documentation
- **Key Fields**: Title, Host Institution, Location, Start Date (`dateOfOccasion`), End Date, Image, Brochure, Communique
- **Who Can Manage**: Super Admin only

### 3. **Articles** 📰
- **Purpose**: News articles and editorial content
- **Key Fields**: Title, Date of Post, Author, Description, File Attachment, Images
- **Who Can Manage**: Super Admin only

### 4. **Posts** 📝
- **Purpose**: General blog posts and announcements
- **Key Fields**: Title, Date of Post, Author, Description, File Attachment, Images
- **Who Can Manage**: Super Admin only

### 5. **Videos** 🎥
- **Purpose**: Video content management
- **Key Fields**: Description, Thumbnail Image, YouTube Link
- **Who Can Manage**: Super Admin only

### 6. **Member States** 🌍
- **Purpose**: African parliament member countries
- **Key Fields**: Country Name, Flag Image, Parliament Flag
- **Special Feature**: Linked to Publications for country-specific content
- **Who Can Manage**: Super Admin only

### 7. **Partners** 🤝
- **Purpose**: Partner organizations and institutions
- **Key Fields**: Name, Logo
- **Who Can Manage**: Super Admin only

### 8. **Leaders** 👥
- **Purpose**: Leadership team members
- **Key Fields**: Name, Role, Bio, Image, Social Media URLs (LinkedIn, Facebook, X)
- **Who Can Manage**: Super Admin only

### 9. **Secretariats** 🏢
- **Purpose**: Secretariat staff members
- **Key Fields**: Name, Role, Bio, Images, Social Media URLs
- **Who Can Manage**: Super Admin only

### 10. **Patrons** 🎖️
- **Purpose**: Patron information
- **Key Fields**: Name, Description, Image, Tenure, LinkedIn URL
- **Who Can Manage**: Super Admin only

### 11. **Galleries** 📸
- **Purpose**: Conference photo galleries
- **Key Fields**: Year, Location, Conference Number, Description, Thumbnail, Images
- **Who Can Manage**: Super Admin only

### 12. **Charters** 📋
- **Purpose**: Charter documents
- **Key Fields**: Document (file upload)
- **Who Can Manage**: Super Admin only

### 13. **Frequently Asked Questions** ❓
- **Purpose**: FAQ content for the website
- **Who Can Manage**: Super Admin only

### 14. **Subcommittees** 🏛️
- **Purpose**: Information about parliamentary subcommittees
- **Who Can Manage**: Super Admin only

---

## Managing Country Administrators

### Creating a New Country Administrator

**Step 1: Access User Management**
1. Log in as the Super Administrator
2. Navigate to "Settings" → "Administration Panel" → "Users"
3. Click "Create new user"

**Step 2: User Information**
1. **Email**: Use the format `[country]@an-pbo.org` (e.g., `uganda@an-pbo.org`)
2. **First Name**: Country name (e.g., "Uganda")
3. **Last Name**: "Admin"
4. **Role**: Select "Editor"
5. Click "Save" to create the user

**Step 3: Copy Registration Link**
1. After saving, Strapi will display a registration link in a popup window
2. **Important**: Copy this link immediately as it will only be shown once
3. Send this link securely to the new country administrator
4. The country admin will use this link to set up their own password

**Step 4: Edit User to Add Username**
1. Go back to "Settings" → "Administration Panel" → "Users"
2. Find the newly created user and click "Edit"
3. **Username**: Enter the country name in lowercase (e.g., "uganda", "kenya", "ghana")
4. **Permissions**: Ensure they have:
   - Read access to Member States (to select their country)
   - Full CRUD access to Publications
   - Read-only access to other content types (optional)
5. Click "Save"

**Step 5: Country-Specific Configuration**
1. After the country admin sets up their password, they will only see publications related to their country
2. When creating publications, they must select their country from the Member States dropdown
3. The system automatically filters content based on their assigned country

### Country Administrator Capabilities
- **Can Do**:
  - Create, read, update, delete publications for their assigned country
  - Upload PDF files for publications
  - View member state information (to select their country)
  - Change their own password

- **Cannot Do**:
  - Access publications from other countries
  - Create or modify member states
  - Manage other content types (conferences, articles, etc.)
  - Create or manage other admin users

---

## Content Management Procedures

### Adding a Conference

1. **Navigate**: Go to "Content Manager" → "Conferences"
2. **Click**: "Create new entry"
3. **Fill Required Fields**:
   - **Title**: Conference name
   - **Host Institution**: Organizing institution
   - **Location**: Conference venue/city
   - **Start Date** (`dateOfOccasion`): When conference begins
   - **End Date**: When conference ends (optional for single-day events)
4. **Optional Fields**:
   - **Description**: Conference details
   - **Image Attachment**: Conference poster/banner
   - **Brochure**: Conference brochure file
   - **Communique**: Final communique document
5. **Save**: Click "Save" and then "Publish"

### Adding a Publication (Country Admin)

1. **Navigate**: Go to "Content Manager" → "Publications"
2. **Click**: "Create new entry"
3. **Fill Required Fields**:
   - **Title**: Publication title
   - **Date Published**: Publication date
   - **PDF File**: Upload the publication PDF
   - **Country**: Select your assigned country from dropdown
4. **Optional Fields**:
   - **Description**: Brief description of the publication
5. **Save**: Click "Save" and then "Publish"

### Adding Member States (Super Admin Only)

1. **Navigate**: Go to "Content Manager" → "Member States"
2. **Click**: "Create new entry"
3. **Fill Required Fields**:
   - **Country**: Country name (e.g., "Kenya", "Uganda")
   - **Flag**: Upload country flag image
4. **Optional Fields**:
   - **Parliament Flag**: Upload parliament-specific flag
5. **Save**: Click "Save" and then "Publish"

### Adding Partners

1. **Navigate**: Go to "Content Manager" → "Partners"
2. **Click**: "Create new entry"
3. **Fill Required Fields**:
   - **Name**: Partner organization name
   - **Logo**: Upload partner logo (will be stored in Cloudinary)
4. **Save**: Click "Save" and then "Publish"

### Adding Leadership/Secretariat Members

1. **Navigate**: Go to "Content Manager" → "Leaders" or "Secretariats"
2. **Click**: "Create new entry"
3. **Fill Fields**:
   - **Name**: Person's full name
   - **Role**: Their position/title
   - **Bio**: Brief biography
   - **Image**: Profile photo
   - **Social Media URLs**: LinkedIn, Facebook, X (Twitter) links
4. **Save**: Click "Save" and then "Publish"

### Adding Videos

1. **Navigate**: Go to "Content Manager" → "Videos"
2. **Click**: "Create new entry"
3. **Fill Required Fields**:
   - **Description**: Video description
   - **Thumbnail Image**: Video preview image
   - **YouTube Link**: Full YouTube URL (must match the pattern for YouTube videos)
4. **Save**: Click "Save" and then "Publish"

---

## Admin Roles & Permissions

### Super Administrator (`secretariatkenya@an-pbo.org`)
- **Full System Access**: Can manage all content types
- **User Management**: Can create, modify, and delete admin users
- **Settings**: Can modify system settings and configurations
- **Media**: Can manage all uploaded files
- **Publications**: Can view and manage publications from all countries

### Country Administrators
- **Limited Access**: Can only manage publications
- **Country-Specific**: Can only access their assigned country's publications
- **No User Management**: Cannot create or modify other users
- **Read-Only**: Can view member states to select their country
- **Media**: Can upload files related to their publications

### Content Filtering
The system uses the publication's `country` field and the `createdByUser` field to ensure:
- Country admins only see publications they created
- Country admins can only link publications to their assigned country
- Super admin sees all publications

---

## Media Management

### File Storage
- **System**: Cloudinary (cloud storage)
- **Local Development**: Files stored locally in `public/uploads/`
- **Production**: All files automatically stored in Cloudinary

### Upload Guidelines
- **Images**: PNG, JPG, GIF formats recommended
- **Maximum Size**: 100MB per file
- **PDF Files**: For publications and documents
- **Organization**: Files are automatically organized by content type

### Best Practices
- Use descriptive file names
- Optimize images for web (reasonable file sizes)
- Ensure PDFs are searchable when possible
- Use consistent naming conventions

---

## Troubleshooting

### Common Issues

**Issue**: Cannot see uploaded images in admin panel
- **Solution**: This is normal for Cloudinary-stored files. Images work correctly on the frontend.

**Issue**: Country admin cannot create publications
- **Solution**: Ensure the Member State for their country exists and they have the correct role.

**Issue**: Forgot password
- **Solution**: Contact the Super Administrator to reset your password.

**Issue**: Cannot upload files
- **Solution**: Check file size (max 100MB) and format. Try refreshing the page.

### Contact Support
For technical issues or additional admin access requests, contact:
- **Super Administrator**: `secretariatkenya@an-pbo.org`
- **Technical Support**: [To be added based on your support structure]

---

## Frontend Integration Notes

### For Frontend Developers

**API Endpoints Access**:
- Publications: `GET /api/publications` (filtered by country for country admins)
- Conferences: `GET /api/conferences` (with start/end dates)
- Member States: `GET /api/member-states` (includes flag images)
- All other content types follow standard Strapi REST API patterns

**New Conference Fields**:
- `dateOfOccasion`: Conference start date
- `endDate`: Conference end date (optional)
- `brochure`: Conference brochure file (replaces `fileAttachment`)
- `communique`: Conference communique document (corrected spelling)

**Image URLs**:
- Production: Full Cloudinary URLs (`https://res.cloudinary.com/...`)
- Local: Relative URLs (`/uploads/...`)

---

*Last Updated: [Current Date]*
*Version: 1.0*
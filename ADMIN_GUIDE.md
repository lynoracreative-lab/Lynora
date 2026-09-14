# Lynora admin guide

This dashboard is private. Customers never create accounts. Only you and people you invite can sign in at `/admin`.

## 1. How to log in

1. Open `/admin`. You will be sent to `/admin/login` if you are not signed in.
2. Use the email and password from your `.env` file (`ADMIN_EMAIL` and `ADMIN_PASSWORD`).
3. After seeding, that account is an **ADMIN**.

If login fails, run `npm run db:seed` again after checking `.env`.

## 2. How to edit homepage content

1. Go to **Pages**.
2. Open **Home**.
3. Each block (Hero, Intro, Services, Featured Work, Why Lynora, Process, Website Audit CTA, About Preview, Testimonials, FAQ, Final CTA) has:
   - heading
   - subheading
   - paragraph
   - CTA label and URL
   - image
   - enabled / disabled
4. Hero lines, process steps and similar extras live in the **Extra JSON** box.
5. Click **Save section**. Uncheck **Enabled** to hide a section without deleting it.

## 3. How to add a service

1. Go to **Services** → **Create service**.
2. Fill in title, descriptions, icon, ideal client, deliverables (one per line) and outcomes.
3. Tick **Published** when it should appear on the website.
4. Use **Up** / **Down** on the list to reorder cards.

## 4. How to add a portfolio project

1. Go to **Portfolio** → **Create project**.
2. Set the project type and status:
   - `REAL` — a live client project
   - `CONCEPT` — a concept study
   - `INTERNAL` — in-house work such as the Lynora identity
3. Add a cover image from the media library.
4. Put extra image URLs in the gallery box, one per line. Change the order of the lines to reorder them.
5. Use **Preview** to see unpublished work. Tick **Published** when it should appear on `/work`.

## 5. How to create a blog post

1. Go to **Posts** → **Create post**.
2. Write in the visual editor (headings, lists, links, images, quotes).
3. Add a category, tags, featured image and SEO fields.
4. Save as **DRAFT** or **PUBLISHED**.
5. Use **Preview** on a draft. Use **Duplicate** to copy a post.

## 6. How to upload media

1. Go to **Media**.
2. Upload an image, MP4, PDF or document.
3. Edit the title and alt text.
4. Copy the file URL into a page, project or post.
5. When editing content, use **Image** to either upload a new file or pick one from the library.

Allowed images: JPG, JPEG, PNG, WEBP, AVIF. Also PDF and MP4.

The Lynora logo files live in `public/branding/`:
- `lynora-mark.png` — gold panther used in the navigation
- `lynora-logo.png` — full lockup used on login and social images
- Replace those files if the logo is updated. Keep the same filenames.

## 7. How to publish or unpublish

- Pages, services, projects and testimonials have a **Published** checkbox.
- Posts use a **DRAFT** / **PUBLISHED** dropdown.
- Homepage sections use **Enabled**.
- Only published / enabled items appear on the public website.

## 8. How to view enquiries

1. Go to **Enquiries** or check the **New Enquiries** card on the dashboard.
2. Open a message to read the full brief.
3. Mark it **Read**, **Contacted** or **Closed**.
4. Only administrators can delete an enquiry.

The public contact form stores every submission here. Email sending can be connected later in `app/api/contact/route.ts`.

## 9. How to update contact information

1. Go to **Settings** (administrators only).
2. Update business name, tagline, email, WhatsApp, phone, location and social links.
3. Update default SEO title, description, Open Graph image and footer text.
4. Save.

The footer, contact page and WhatsApp button all read from these settings.

## 10. How to add another editor

1. Go to **Users** (administrators only).
2. Click **Add editor**.
3. Set name, email, password and role (`EDITOR` or `ADMIN`).
4. Editors can manage content and media. They cannot change settings or user accounts.
5. You cannot deactivate or demote the last remaining administrator.

## Roles

| | Admin | Editor |
| --- | --- | --- |
| Edit website content | Yes | Yes |
| Upload media | Yes | Yes |
| View enquiries | Yes | Yes |
| Change settings | Yes | No |
| Manage users | Yes | No |
| Delete enquiries | Yes | No |

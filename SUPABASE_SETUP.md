# Supabase + Prisma Setup Guide

## 1. Create Supabase Project
1. Go to https://supabase.com and create a new project
2. Choose a name for your project (e.g., "hustleworthy-reviews")
3. Set a strong database password
4. Wait for the project to be created

## 2. Get Database Connection Details
1. Go to your Supabase dashboard
2. Navigate to Settings → Database
3. Copy the following values:

### Connection String:
```
postgresql://postgres:[YOUR_PASSWORD]@db.[YOUR_PROJECT_REF].supabase.co:5432/postgres?schema=public
```

### Project URL and API Key:
- Project URL: `https://[YOUR_PROJECT_REF].supabase.co`
- Anon/Public Key: Found in Settings → API

## 3. Create Environment File
Create a `.env.local` file in your project root with:

```env
# Supabase Database URL
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres?schema=public"

# Supabase Configuration (Optional)
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
```

## 4. Run Database Setup
After setting up the environment file, run the complete database setup:

```bash
npm run db:setup
```

This command will:
- Create and run database migrations
- Generate the Prisma client
- Seed the database with initial data

Or run each step manually:
```bash
npm run db:migrate    # Create and run migrations
npm run db:generate   # Generate Prisma client  
npm run db:seed       # Populate with initial data
```

## 5. View Database
Open Prisma Studio to view and manage your database:
```bash
npm run db:studio
```

This will open a web interface at http://localhost:5555 to view and edit your database.

## 6. Verify Integration
1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Visit your website:
   - Home page: http://localhost:3000
   - Review page: http://localhost:3000/reviews/pollpay

The website should now load data from your Supabase database!

## Database Schema
Your database includes these tables:
- **websites** - Main website review data
- **user_reviews** - User reviews for each website  
- **faqs** - FAQ entries for websites

## Next Steps
1. Add more websites through Prisma Studio or by extending the seed script
2. Create admin interface for managing reviews
3. Add user authentication with Supabase Auth
4. Implement review submission forms
5. Add search and filtering functionality
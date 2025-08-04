# 🔧 Supabase Connection Troubleshooting

## ❌ Error: P1017 - Server has closed the connection

This error typically occurs due to connection string configuration issues. Here's how to fix it:

## 🔍 **Check Your Connection String Format**

### ❌ **Wrong Format (Connection Pooling URL)**
```env
# This is the pooling URL - DON'T use this for Prisma
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

### ✅ **Correct Format (Direct Connection URL)**
```env
# Use the direct connection URL for Prisma
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres?schema=public"
```

## 🛠️ **How to Get the Correct URL**

1. **Go to your Supabase Dashboard**
2. **Navigate to**: Settings → Database
3. **Look for**: "Connection string" section
4. **Use**: The **"URI"** format (NOT the pooling connection)
5. **Replace** `[YOUR_PASSWORD]` with your actual database password

## 📝 **Example of Correct .env.local File**
```env
DATABASE_URL="postgresql://postgres:mySecurePassword123@db.abcdefghijklmnop.supabase.co:5432/postgres?schema=public"
```

## 🔄 **Steps to Fix**

1. **Update your `.env.local` file** with the correct direct connection URL
2. **Make sure** you're using port `5432` (not `6543`)
3. **Include** `?schema=public` at the end
4. **Restart** your development server:
   ```bash
   npm run dev
   ```
5. **Try the migration again**:
   ```bash
   npx prisma db push
   ```

## ❌ **Error: P1001 - Can't reach database server**

If you're getting this error with the correct URL format:

```
Error: P1001
Can't reach database server at `db.ppyvxybzmxpreukgfpbs.supabase.co:5432`
```

This means the connection string format is correct, but there's a connectivity issue.

### **Possible Causes & Solutions:**

#### **1. Supabase Project Not Ready**
- **Wait 2-3 minutes** after creating your project
- Supabase needs time to fully provision the database

#### **2. Project Paused**
- Check your **Supabase Dashboard**
- Look for any "Project Paused" messages
- If paused, click **"Restore"** or **"Unpause"**

#### **3. Wrong Password**
- Double-check your database password
- **Reset password** in Supabase Dashboard → Settings → Database
- Make sure there are **no special characters** that need URL encoding

#### **4. Add SSL Requirement**
Try adding SSL to your connection string:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.ppyvxybzmxpreukgfpbs.supabase.co:5432/postgres?schema=public&sslmode=require"
```

#### **5. Network/Firewall Issues**
- Try from a different network (mobile hotspot)
- Check if your company/ISP blocks PostgreSQL connections
- Some networks block port 5432

## 🆘 **Still Having Issues?**

If you're still getting connection errors, try these additional steps:

### **Option 1: Use SSL Mode**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres?schema=public&sslmode=require"
```

### **Option 2: Test Connection**
```bash
# Test if you can connect to Supabase
npx prisma db pull
```

### **Option 3: Check Password**
- Make sure your password doesn't contain special characters that need URL encoding
- If it contains `@`, `&`, `%`, etc., you may need to URL encode them

## 📋 **Quick Checklist**
- [ ] Using direct connection URL (port 5432)
- [ ] NOT using pooling URL (port 6543)  
- [ ] Password is correct
- [ ] Added `?schema=public` at the end
- [ ] File is named `.env.local` (not `.env`)
- [ ] Restarted development server

## 🎯 **Once Connected Successfully**
After fixing the connection, run:
```bash
npm run db:setup
```

This will create your tables and add sample data!
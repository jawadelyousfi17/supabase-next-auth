# Production Deployment Checklist

## Before Deploying

### 1. Environment Variables
- [ ] Update `NEXT_PUBLIC_APP_URL` in your hosting platform's environment variables
- [ ] Verify all Supabase credentials are correct
- [ ] Ensure `DATABASE_URL` is set to production database
- [ ] Set `NODE_ENV=production`

### 2. Database
- [ ] Run migrations on production database: `npx prisma migrate deploy`
- [ ] Generate Prisma client: `npx prisma generate`
- [ ] Verify database connection string has SSL enabled

### 3. Security
- [ ] Review and update CORS settings in Supabase dashboard
- [ ] Update Google OAuth redirect URIs to include production URL
- [ ] Verify all API keys are production keys (not test keys)
- [ ] Check that sensitive data is not exposed in client-side code

### 4. Performance
- [ ] Enable caching strategies
- [ ] Optimize images (already configured with Next.js Image)
- [ ] Review database indexes for frequently queried fields

### 5. Testing
- [ ] Test authentication flow (signup, login, logout)
- [ ] Test OAuth providers (Google, etc.)
- [ ] Test password reset functionality
- [ ] Test email confirmation
- [ ] Verify all redirects work with production URL

### 6. Monitoring
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure logging
- [ ] Set up uptime monitoring

## Deployment Steps

### Vercel
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy

### Other Platforms
1. Build the project: `npm run build`
2. Set environment variables
3. Start the server: `npm start`

## Post-Deployment

- [ ] Verify all pages load correctly
- [ ] Test user authentication end-to-end
- [ ] Check console for any errors
- [ ] Monitor performance metrics
- [ ] Set up SSL certificate (usually automatic with hosting providers)

## Important URLs to Update

When deploying, update these locations with your production URL:

1. **Supabase Dashboard**:
   - Authentication > URL Configuration > Site URL
   - Authentication > URL Configuration > Redirect URLs

2. **Google Cloud Console**:
   - OAuth 2.0 Client IDs > Authorized redirect URIs
   - Add: `https://your-domain.com/auth/callback/google`

3. **Environment Variables**:
   - `NEXT_PUBLIC_APP_URL` must match your production domain

## Common Issues

### Issue: Email redirects to localhost
**Solution**: Ensure `NEXT_PUBLIC_APP_URL` is set correctly and doesn't include `localhost`

### Issue: OAuth fails after deployment
**Solution**: Update redirect URIs in OAuth provider dashboard

### Issue: Database connection fails
**Solution**: Verify DATABASE_URL includes SSL parameters and connection pooling settings

### Issue: Images don't load
**Solution**: Check `next.config.ts` remotePatterns include your production URL

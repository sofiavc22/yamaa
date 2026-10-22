# Activate Google sign-in

The shared GoogleSignIn component appears in registration, login and the Favorites sign-in dialog. It calls Supabase signInWithOAuth with the Google provider. Users return to /cdmx, using the existing browser-managed Supabase session flow, rather than the email-verification callback page.

Before release:
1. Configure the actual PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY environment values for the deployment.
2. Create a Web OAuth client in Google Cloud with the required consent/branding settings and minimal openid, email and profile scopes.
3. Enable Google in Supabase Authentication providers, adding the Google client ID and client secret. The secret belongs in Supabase, never in the frontend.
4. Add the Supabase callback URL shown by the Google provider settings to the Google client's authorized redirect URIs.
5. Set the production Site URL and allow the /cdmx return URL and approved preview URLs in Supabase's redirect allow list.
6. Test sign-in, registration, sign-out and Favorites with a test account in the configured environment.

Missing environment values are handled with an inline message in preview. Rendering the button does not mean the Google provider has been enabled. Google Cloud account setup and provider activation remain outstanding.

https://supabase.com/docs/guides/auth/social-login/auth-google

# Supabase Auth Starter

⚠️**Warning**: SSR auth is not working with provided Supabase client functions. It is recommended to use Supabase [auth-helpers](https://github.com/supabase-community/auth-helpers) if you want better SSR support.

This project is based on [Supabase's Nextjs Guide](https://supabase.com/docs/guides/with-nextjs) but instead with email/pass auth. It also includes additional tooling I prefer like TailwindCSS and Typescript. The star of the show is `UserProvider`, which wraps most authentication logic in React Context API. I use include `react-hook-form`.

## Getting started

![Hello](/public/s2.png)

Create a project on Supabase. Navigate to SQL Editor in the sidebar click the _User Management Starter_. Run the script to create a profile table with RLS setup.

Clone and `yarn install`

Make sure to add required values `.env` file

```
NEXT_PUBLIC_VERCEL_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_KEY=
```

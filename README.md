# Platform Monorepo

A Turborepo monorepo with multiple frontend applications.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `client`: a [Svelte](https://svelte.dev/) app with TypeScript
- `admin`: a [React](https://react.dev/) app with TypeScript
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo build
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

You can build a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo build --filter=docs
```

Without global `turbo`:

```sh
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
```

### Develop

To develop all apps and packages, run the following command:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo dev
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
```

You can develop a specific package by using a [filter](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters):

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo dev --filter=web
```

Without global `turbo`:

```sh
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed (recommended):

```sh
cd my-turborepo
turbo login
```

Without global `turbo`, use your package manager:

```sh
cd my-turborepo
npx turbo login
yarn exec turbo login
pnpm exec turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

With [global `turbo`](https://turborepo.dev/docs/getting-started/installation#global-installation) installed:

```sh
turbo link
```

Without global `turbo`:

```sh
npx turbo link
yarn exec turbo link
pnpm exec turbo link
```

## Deployment to Cloudflare Pages

This repository includes a GitHub Actions workflow that automatically deploys both apps to Cloudflare Pages.

### Setup Instructions

1. **Get your Cloudflare credentials:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click on "Workers & Pages" in the left sidebar
   - Your Account ID is displayed in the right sidebar
   - Create an API Token:
     - Go to "My Profile" > "API Tokens" (or click your profile icon > API Tokens)
     - Click "Create Token"
     - Use the "Edit Cloudflare Workers" template
     - Or create a custom token with these permissions:
       - Account > Cloudflare Pages > Edit
     - Click "Continue to summary" > "Create Token"
     - Copy the token (you won't see it again!)

2. **Add secrets to your GitHub repository:**
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret" and add:
     - Name: `CLOUDFLARE_API_TOKEN`, Value: Your API token from step 1
     - Name: `CLOUDFLARE_ACCOUNT_ID`, Value: Your Account ID from step 1

3. **First deployment (creates projects automatically):**
   - The workflow will automatically create two Cloudflare Pages projects:
     - `platform-client` for the Svelte app
     - `platform-admin` for the React app
   - Simply push to the `main` branch to trigger the deployment
   - The projects will be created on the first run

4. **Access your deployed apps:**
   - After deployment, find your apps at:
     - Client: `https://platform-client.pages.dev`
     - Admin: `https://platform-admin.pages.dev`
   - You can configure custom domains in the Cloudflare dashboard

### Manual Deployment

You can also deploy manually using Wrangler CLI:

```sh
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare (opens browser for authentication)
wrangler login

# Build and deploy client app
npm run build --workspace=client
wrangler pages deploy apps/client/dist --project-name=platform-client

# Build and deploy admin app
npm run build --workspace=admin
wrangler pages deploy apps/admin/dist --project-name=platform-admin
```

### Troubleshooting

**"Project not found" error:**
- The first deployment automatically creates the projects
- If you see this error, ensure your `CLOUDFLARE_API_TOKEN` has the correct permissions
- You can also manually create projects in the Cloudflare dashboard before deploying

**API Token permissions:**
- Make sure your token has "Account > Cloudflare Pages > Edit" permission
- The token should not have an IP restriction if deploying from GitHub Actions

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)

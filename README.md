# CeyLabs Next.js Starter Template

This is our standard Next.js project structure and setup guidelines. Follow these to ensure consistency across our projects.

## Setup Guidelines

1. **Project Structure**:

    - Only keep Next.js routing files in the `app` directory
    - Implement dynamic imports for code splitting
    - Create custom components in `components/`

2. **Styling**:

    - Use [Tailwind CSS](https://tailwindcss.com/) for styling
    - Use [ShadCn UI components](https://ui.shadcn.com/)

3. **Performance Optimization**:

    - Dynamically import components to improve performance through lazy loading
    - Use server-side rendering when possible for better performance
    - Use Next.js Image component for optimized images
    - Always use `fetchy`, a fetch wrapper function from [@/lib/fetchy](https://github.com/CeyLabs/Next-ShadCN-Template/blob/rr/add-fetch-wrapper/src/lib/fetchy.ts), for making HTTP requests

4. **Forms and Validation**:

    - Use [React Hook Form](https://www.react-hook-form.com/) for form handling
    - Use [Zod](https://zod.dev/) for form validations

5. **State Management**:

    - Use [Zustand](https://github.com/pmndrs/zustand) for global state management
    - Utilize [TanStack Query](https://tanstack.com/query/latest) for server state management

6. **Environment Variables**:
    - Use `.env.local` for local environment variables
    - Never commit `.env.local` to version control

## Getting Started

1. Clone the repo: `git clone https://github.com/CeyLabs/Next-ShadCN-Template.git`
2. Install Dependencies: `bun i`
3. Run the Development Server: `bun dev`
4. Open http://localhost:3000 in your browser.

## Commit Guidelines

Before committing, ensure your code is properly formatted and builds without errors:

```bash
bun run format
bun run build
```

## Use conventional commit messages:

-   `feat`: for new features
-   `fix`: for bug fixes
-   `docs`: for documentation changes
-   `style`: for formatting changes
-   `refactor`: for code refactoring
-   `test`: for adding or modifying tests
-   `chore`: for maintenance tasks

## Create Pull Requests:

-   Create a new branch for each feature or fix
-   Submit a pull request for review before merging to the main branch

## Project Structure

```plaintext
project-root/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [...route]/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── utils/
│   │   └── cn.ts
│   ├── hooks/
│   │   └── useCustomHook.ts
│   ├── styles/
│   │   └── theme.css
│   │   └── globals.css
│   └── types/
│       └── index.ts
├── public/
│   ├── images/
│   └── fonts/
├── tests/
│   └── componentName.test.tsx
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

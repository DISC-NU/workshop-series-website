export type EachRoute = {
  title: string;
  href: string;
  basePath?: string;
  noLink?: true;
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    title: "About",
    href: "/about",
    basePath: "about",
  },
  {
    title: "Schedule",
    href: "/schedule",
    basePath: "schedule",
  },
  {
    title: "Getting Started",
    href: "/getting-started",
    noLink: true,
    basePath: "content",
    items: [{ title: "Introduction", href: "/introduction" }],
  },
  {
    title: "Workshops",
    href: "/workshops",
    noLink: true,
    basePath: "content",
    items: [
      { title: "1: UI/UX", href: "/workshop-1" },
      { title: "2: HTML & CSS", href: "/workshop-2" },
      { title: "3: VSCode & Git", href: "/workshop-3" },
      { title: "4: React Basics", href: "/workshop-4" },
      { title: "5: Better React", href: "/workshop-5" },
      { title: "6: Best React", href: "/workshop-6" },
      { title: "7: Backend Basics", href: "/workshop-7" },
      { title: "8: Complex Backends", href: "/workshop-8" },
      { title: "9: Bonus Topics", href: "/workshop-9" },
    ],
  },
  {
    title: "Assignments",
    href: "/assignments",
    noLink: true,
    basePath: "content",
    items: [
      { title: "Project Overview", href: "/project-overview" },
      { title: "1: Figma", href: "/assignment-1" },
      { title: "2: HTML & CSS", href: "/assignment-2" },
      { title: "3: Git", href: "/assignment-3" },
      { title: "4: Basic React App", href: "/assignment-4" },
      { title: "5: Routing & Fetching", href: "/assignment-5" },
      { title: "6: Code Improvements", href: "/assignment-6" },
      { title: "7: Basic API", href: "/assignment-7" },
      { title: "8: Supabase", href: "/assignment-8" },
      { title: "9: Deploy & Bonus Feature", href: "/assignment-9" },
    ],
  },
];

type Page = { title: string; href: string; basePath?: string };

function getRecursiveAllLinks(
  node: EachRoute,
  parentHref: string = ""
): Page[] {
  const ans: Page[] = [];
  const fullHref = `${parentHref}${node.href}`;

  if (!node.noLink) {
    ans.push({ title: node.title, href: fullHref, basePath: node.basePath });
  }

  node.items?.forEach((subNode) => {
    ans.push(...getRecursiveAllLinks(subNode, fullHref));
  });

  return ans;
}

export const page_routes = ROUTES.flatMap((route) =>
  getRecursiveAllLinks(route)
);

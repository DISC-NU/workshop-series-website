import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { page_routes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getContentsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";
import GenericBreadcrumb from "@/components/generic-breadcrumb";
import { BasePath } from "@/components/global_constants";

type PageProps = {
  params: { slug: string[] };
};

export default async function ContentPage({
  params: { slug = [] },
}: PageProps) {
  const pathName = slug.join("/");
  const res = await getContentsForSlug(`${BasePath.CONTENT}/${pathName}`);

  if (!res) notFound();
  return (
    <div className="flex items-start gap-10">
      <div className="flex-[3] pt-10">
        <GenericBreadcrumb paths={slug} />
        <Typography>
          <h1 className="text-3xl -mt-2">{res.frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground text-[16.5px]">
            {res.frontmatter.description}
          </p>
          <div>{res.content}</div>
          <Pagination pathname={pathName} />
        </Typography>
      </div>
      <Toc path={pathName} type={BasePath.CONTENT} />
    </div>
  );
}

export async function generateMetadata({ params: { slug = [] } }: PageProps) {
  const pathName = slug.join("/");
  const res = await getContentsForSlug(`${BasePath.CONTENT}/${pathName}`);

  if (!res) return null;
  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export function generateStaticParams() {
  // Base content paths
  const basePaths = [
    { slug: [] }, // /content/
    { slug: ["getting-started"] },
    { slug: ["workshops"] },
    { slug: ["assignments"] },
  ];

  // Workshop paths
  const workshopPaths = Array.from({ length: 9 }, (_, i) => ({
    slug: ["workshops", `workshop-${i + 1}`],
  }));

  // Assignment paths
  const assignmentPaths = [
    { slug: ["assignments", "project-overview"] },
    ...Array.from({ length: 9 }, (_, i) => ({
      slug: ["assignments", `assignment-${i + 1}`],
    })),
  ];

  // Getting Started paths
  const gettingStartedPaths = [
    { slug: ["getting-started", "introduction"] },
    { slug: ["getting-started", "faq"] },
    { slug: ["getting-started", "project-introduction"] },
    { slug: ["getting-started", "project-structure"] },
    { slug: ["getting-started", "quick-start-guide"] },
  ];

  return [
    ...basePaths,
    ...workshopPaths,
    ...assignmentPaths,
    ...gettingStartedPaths,
  ];
}

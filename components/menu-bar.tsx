"use client";

import { ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";
import { BasePath } from "./global_constants";

export default function Menu({ isSheet = false }) {
  const pathname = usePathname();

  const basePath = Object.values(BasePath).find((path) => {
    if (path === "content") {
      return pathname.includes("/content/") || pathname === "/content";
    }
    return pathname.startsWith(`/${path}`);
  });

  if (!basePath) return null;

  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6">
      {ROUTES.map((item, index) => {
        if (item.basePath === basePath) {
          const modifiedItems = {
            ...item,
            level: 0,
            isSheet,
          };
          return <SubLink key={index} {...modifiedItems} />;
        }
        return null;
      })}
    </div>
  );
}

import { redirect } from "next/navigation";
import { REPO_ROOT } from "@platform/scaffold-cli/lib/generateProject";
import { listTemplates } from "@platform/scaffold-cli/lib/templateCatalog";
import { MODULE_CATALOG } from "@platform/scaffold-cli/lib/moduleCatalog";
import { isAuthenticated } from "../lib/auth";
import ProjectForm from "./ProjectForm";

export default async function Home() {
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  const templates = listTemplates(REPO_ROOT);

  return <ProjectForm templates={templates} modules={MODULE_CATALOG} />;
}

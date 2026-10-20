import { Process } from "@/components/public/Process";
import { getPageBySlug, sectionMap } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "How We Work | Lynora",
    description:
      "From the first conversation to launch and growth, Lynora works through discover, strategy, design, build and grow.",
    path: "/process",
  });
}

export default async function ProcessPage() {
  const home = await getPageBySlug("home");
  const process = sectionMap(home?.sections).process;
  const steps = (process?.extra as { steps?: { number: string; title: string; text: string }[] } | undefined)
    ?.steps;

  return <Process heading={process?.heading} label={process?.subheading} steps={steps} />;
}

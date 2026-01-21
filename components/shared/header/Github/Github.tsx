import Button from "@/components/ui/shadcn/button";
import GithubIcon from "./_svg/GithubIcon";
import Link from "next/link";

export default function HeaderGithub() {
  return (
    <Link
      className="contents"
      href="https://github.com/firecrawl/claude-skill-generator"
      target="_blank"
    >
      <Button variant="tertiary">
        <GithubIcon />
      </Button>
    </Link>
  );
}

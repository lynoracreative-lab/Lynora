import { ButtonLink } from "@/components/public/ButtonLink";
import { Container } from "@/components/public/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-ink">
      <Container>
        <p className="section-label">404</p>
        <h1 className="mt-4 font-serif text-5xl text-ivory">This page is not here.</h1>
        <p className="mt-4 max-w-md text-stone">
          The page may have moved, or the work is still in draft. Return home or start a project instead.
        </p>
        <div className="mt-8 flex gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}

import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "@/components/ui/Container";
import { CourtLineDraw } from "@/components/animation/CourtLineDraw";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center py-24 radial-glow">
      <Container className="text-center">
        <p className="font-display text-8xl gradient-text">404</p>
        <h1 className="mt-4 font-display text-4xl text-white">OFF THE COURT</h1>
        <p className="mx-auto mt-4 max-w-md text-cool-grey">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <MagneticButton href="/">Back Home</MagneticButton>
          <MagneticButton href="/contact" variant="outline">
            Contact Us
          </MagneticButton>
        </div>
        <div className="mx-auto mt-16 max-w-sm">
          <CourtLineDraw />
        </div>
      </Container>
    </div>
  );
}

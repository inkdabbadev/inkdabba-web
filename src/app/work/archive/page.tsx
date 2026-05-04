import { permanentRedirect } from "next/navigation";

/**
 * Legacy route - redirect into the poster wall on the single-scroll page.
 */
export default function ArchiveRedirect(): never {
  permanentRedirect("/#selected-work");
}

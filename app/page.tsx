import { getModules } from "@/lib/content";
import { HomeClient } from "./HomeClient";

// Hasesa's home page. The Academy's landing page lives at /academy.
export default function Home() {
  return <HomeClient moduleCount={getModules().length} />;
}

import { redirect } from "next/navigation";
import { getCvUrl, hasCv } from "@/lib/constants/cv";

/** Legacy /cv route */
export default function LegacyCvRedirect() {
  if (!hasCv("tr")) {
    redirect("/tr/");
  }
  redirect(getCvUrl("tr"));
}

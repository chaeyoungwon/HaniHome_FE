import { redirect } from "next/navigation";

export default function ListingRedirect() {
  redirect("/listings/create?step=ListingType");
}

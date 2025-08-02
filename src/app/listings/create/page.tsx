import { Suspense } from "react";

import ListingCreateClient from "@/components/listings/create/common/ListingCreateClient";

export default function ListingCreatePage() {
  return (
    <Suspense fallback={<div></div>}>
      <ListingCreateClient />
    </Suspense>
  );
}

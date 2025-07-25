import { Suspense } from "react";

import ListingCreateClient from "./ListingCreateClient";

export default function ListingCreatePage() {
  return (
    <Suspense fallback={<div></div>}>
      <ListingCreateClient />
    </Suspense>
  );
}

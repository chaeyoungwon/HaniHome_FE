import { Suspense } from "react";

import ListingCreateClient from "./ListingCreateClient";

export default function ListingCreatePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ListingCreateClient />
    </Suspense>
  );
}

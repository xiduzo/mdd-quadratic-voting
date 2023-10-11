import { Suspense } from "react";
import type { NextPage } from "next";

import { AllEvents } from "./_components/all-events";
import { CreateForm } from "./_components/create-form";

export const runtime = "edge";

const CreatePage: NextPage = () => {
  return (
    <main>
      <div>create page form</div>

      <Suspense fallback="loading">
        <AllEvents />
      </Suspense>
      <CreateForm />
    </main>
  );
};

export default CreatePage;

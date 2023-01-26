// Copyright 2022-2023 the Deno authors. All rights reserved. MIT license.

import { ContentMeta } from "@/components/ContentMeta.tsx";
import { Header } from "@/components/Header.tsx";
import { Footer } from "$doc_components/footer.tsx";
import AddModule from "@/islands/AddModule.tsx";
import * as Icons from "@/components/Icons.tsx";

export default function AddModulePage() {
  return (
    <>
      <ContentMeta
        title="第三方模块"
        description="在第三方模块仓库中注册模块"
        creator="@deno_land"
        keywords={["deno", "registry", "modules", "javascript", "typescript"]}
      />
      <div>
<<<<<<< HEAD
        <Header selected="第三方模块" />
=======
        <Header />
>>>>>>> 2a56af2d40f4288b26ca6f7f21702a2925a317cc
        <div class="section-x-inset-xl mt-16 mb-28 flex items-center flex-col gap-12 lg:(items-start flex-row gap-36)">
          <div class="text-base w-full lg:w-88 flex-shrink-0 space-y-5">
            <h1 class="font-bold text-3xl leading-none">添加模块</h1>
            <div>
              <p>
                All modules on <b class="font-semibold">deno.land/x</b>{" "}
                need to be hosted as public repositories on{" "}
                <a href="https://github.com" class="link">GitHub.com</a>.
              </p>
              <br />
              <p>
                <b class="font-semibold">deno.land/x</b>{" "}
                downloads and stores your repository contents every time you
                create a git tag. We only do this once for every tag. This
                ensures that the contents we serve for a specific version can
                never change.
              </p>
              <br />
              <p>
                Our service needs to get informed whenever a new tag is created.
                For this purpose we use GitHub webhooks.
              </p>
            </div>
            <a href="/x" class="button-alternate">
              <Icons.ChevronLeft />
              <span>Browse Modules</span>
            </a>
          </div>
          <AddModule />
        </div>
        <Footer />
      </div>
    </>
  );
}

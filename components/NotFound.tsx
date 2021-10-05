import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function NotFoundPage(): React.ReactElement {
  return (
    <div className="NotFoundPage">
      <div id="flex-top">
        <Header />
        <header>
          <h1
            className="font-extrabold text-5xl leading-10 tracking-tight text-gray-900"
          >
            404
          </h1>
<<<<<<< HEAD
          <h2 className="mt-4 sm:mt-5 font-light text-2xl text-center leading-tight text-gray-900">
            没有找到你想要访问的页面。
=======
          <h2
            className="mt-4 sm:mt-5 font-light text-2xl text-center leading-tight text-gray-900"
          >
            Couldn't find what you're looking for.
>>>>>>> b0296ff724a2db9ca606fb9265884747b58eb148
          </h2>
        </header>
      </div>

      <div id="flex-bottom">
        <div id="animation">
          <img src="/images/ferris.gif" alt="Ferris" id="ferris404" />
          <img src="/images/deno404.gif" alt="Deno" id="deno404" />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default NotFoundPage;

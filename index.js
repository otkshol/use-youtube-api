function fetchYoutubeData() {
  const movieId = document.getElementById("movieUrl").value.split("v=")[1];
  // TODO API Keyをシークレット化する
  const APIKEY = `AIzaSyBC5cV_9G_Xq-sfZfh_sokwcGeOr4NIpsQ`;

  fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${movieId}&key=${APIKEY}&part=statistics,snippet,player&fields=items(id,snippet(title,description,thumbnails,tags),statistics(viewCount,likeCount),player)`
  )
    .then((response) => {
      console.log(response.status);
      if (!response.ok) {
        console.log("エラーレスポンス", response);
      }
      return response.json().then((movieInfo) => {
        console.log(movieInfo);
        const view = `
        <div class="flex flex-wrap bg-black-500 ">
        <div class="mt-2 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div class="flex-auto p-4">
              <div class="flex flex-wrap">
                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h3 class="text-blueGray-400 uppercase font-bold text-3xl">動画タイトル</h3>
                  <h5 class="text-blueGray-400 uppercase font-bold text-xl">${movieInfo.items[0].snippet.title}</h5>
                  <span class="font-semibold text-xl text-blueGray-700">${movieInfo.items[0].player.embedHtml}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div class="flex-auto p-4">
              <div class="flex flex-wrap">
                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h4 class="text-blueGray-400 uppercase font-bold text-3xl">動画サムネイル</h4>
                  <span id="movie-image-copy-value" class="font-semibold text-xl text-blueGray-700"><img src="${movieInfo.items[0].snippet.thumbnails.medium.url}"></span>
                </div>
              </div>

              <p class="text-sm text-blueGray-400 mt-4">   
                <a href="#_" id="movie-image-copy-button" class="relative inline-block text-lg group">
                <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span id="movie-image-copy-text" class="relative">サムネ画像をコピー</span>
                </span>
                <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                </a>
            </div>
          </div>
        </div>

        <div class="mt-2 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div class="flex-auto p-4">
              <div class="flex flex-wrap">
                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 class="text-blueGray-400 uppercase font-bold text-xl">視聴回数</h5>
                  <span class="font-semibold text-xl text-blueGray-700">${movieInfo.items[0].statistics.viewCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
            <div class="flex-auto p-4">
              <div class="flex flex-wrap">
                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 class="text-blueGray-400 uppercase font-bold text-xl">いいね数</h5>
                  <span class="font-semibold text-xl text-blueGray-700">${movieInfo.items[0].statistics.likeCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div class="flex-auto p-4">
              <div class="flex flex-wrap">
                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 class="text-blueGray-400 uppercase font-bold text-2xl">動画内タグ</h5>
                  <br>
                  <span id="internal-tag-copy-value" class="font-semibold text-xl text-blueGray-700">${movieInfo.items[0].snippet.tags}</span>
                </div>
              </div>

              <p class="text-sm text-blueGray-400 mt-4">
              <a id="internal-tag-copy-button" class="relative inline-block text-lg group">
              <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span id="internal-tag-copy-text" onclick=copy() class="relative">動画内タグコピー</span>
              </span>
              <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
              </a>
            </div>
          </div>
        </div>

        <div class="mt-2 w-full lg:w-6/12 xl:w-6/12 px-5 mb-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div class="flex-auto p-4">
              <div class="flex flex-wrap">
                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 class="text-blueGray-400 uppercase font-bold text-2xl">動画外タグ</h5>
                  <br>
                  <span id="external-tag-copy-value" class="font-semibold text-xl text-blueGray-700">${movieInfo.items[0].snippet.description}</span>
                </div>
              </div>
              <p class="text-sm text-blueGray-400 mt-4">

              <p class="text-sm text-blueGray-400 mt-4">   
              <a href="#_" id="external-tag-copy-button" class="relative inline-block text-lg group">
              <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span id="external-tag-copy-text" onclick=copy() class="relative">動画外タグをコピー</span>
              </span>
              <span class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
              </a>
            </div>
            <span class="text-emerald-500 mr-2"><i class="fas fa-arrow-up"></i>TODO 末尾から取得する処理書いて実現。あと存在しない時の挙動を決める必要がある 例:項目ごと非表示 or 「なし」と表示する</span>
          </div>
        </div>
      </div>
          `;

        const result = document.getElementById("result");
        result.innerHTML = view;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function copy() {
  const imageCopyButton = document.querySelector("#movie-image-copy-button");
  imageCopyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(
      document
        .querySelector("#movie-image-copy-value")
        .querySelector("img")
        .getAttribute("src")
    );
    document.querySelector("#movie-image-copy-text").textContent =
      "コピー完了！";
    setTimeout(
      () =>
        (document.querySelector("#movie-image-copy-text").textContent =
          "動画内タグをコピー"),
      2000
    );
  });

  const internalTagCopyButton = document.querySelector(
    "#internal-tag-copy-button"
  );
  internalTagCopyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(
      document.querySelector("#internal-tag-copy-value").textContent
    );
    document.querySelector("#internal-tag-copy-text").textContent =
      "コピー完了！";
    setTimeout(
      () =>
        (document.querySelector("#internal-tag-copy-text").textContent =
          "動画内タグをコピー"),
      2000
    );
  });

  const externalTagCopyButton = document.querySelector(
    "#external-tag-copy-button"
  );
  externalTagCopyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(
      document.querySelector("#external-tag-copy-value").textContent
    );
    document.querySelector("#external-tag-copy-text").textContent =
      "コピー完了！";
    setTimeout(
      () =>
        (document.querySelector("#external-tag-copy-text").textContent =
          "動画外タグをコピー"),
      2000
    );
  });
}

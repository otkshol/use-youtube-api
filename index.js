function fetchYoutubeData() {
    const hoge = document.getElementById("movieUrl");
    const url = hoge.value;
    const movieId = url.split("v=")[1];
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
                  <span class="font-semibold text-xl text-blueGray-700"><img src="${movieInfo.items[0].snippet.thumbnails.medium.url}"></span>
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
                  <span class="font-semibold text-xl text-blueGray-700">${movieInfo.items[0].snippet.tags}</span>
                </div>
              </div>
              <p class="text-sm text-blueGray-400 mt-4">
                <span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i>TODO コピー機能ボタンをつける</span>
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
                  <span class="font-semibold text-xl text-blueGray-700">${movieInfo.items[0].snippet.description}</span>
                </div>
              </div>
              <p class="text-sm text-blueGray-400 mt-4">
                <span class="text-emerald-500 mr-2"><i class="fas fa-arrow-up"></i>TODO コピー機能ボタンをつける（TODO 末尾から取得する処理書いて実現。あと存在しない時の挙動を決める必要がある 例:項目ごと非表示 or 「なし」と表示する）</span>
            </div>
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

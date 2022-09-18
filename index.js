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
          <h3>動画タイトル</h3>
          <h4>${movieInfo.items[0].snippet.title}</h4>
          ${movieInfo.items[0].player.embedHtml}
          <h3>動画サムネイル</h3>
          <p><img src="${movieInfo.items[0].snippet.thumbnails.medium.url}"></p>
          TODO コピー機能ボタンをつける
          <h3>動画外タグ（TODO 末尾から取得する処理書いて実現。あと存在しない時の挙動を決める必要がある 例:項目ごと非表示 or 「なし」と表示する）</h3>
          <h4>${movieInfo.items[0].snippet.description}</h4>
          TODO コピー機能ボタンをつける
          <h3>動画内タグ</h3>
          <h4>${movieInfo.items[0].snippet.tags}</h4>
          TODO コピー機能ボタンをつける
          <h3>動画評価</h3>
          TODO 動画評価の仕組みを決める
          <h3>視聴回数</h3>
          <h4>${movieInfo.items[0].statistics.viewCount}</h4>
          <h3>いいね数</h3>
          <h4>${movieInfo.items[0].statistics.likeCount}</h4>
          <h3>キーワード</h3>
          TODO 具体的にどの項目を指しているのか確認する
          `;

        const result = document.getElementById("result");
        result.innerHTML = view;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

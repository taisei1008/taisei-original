$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".hamburger").on("click", function () {
        $("header").toggleClass("open");
    });
    // メニューのリンクをクリックした時
    $(".navi a").on("click", function () {
        $("header").toggleClass("open");
    });

    $(".mask").on("click", function () {
        $("header").removeClass("open");
    })
})

$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".hamburger2").on("click", function () {
        $("header").toggleClass("open");
    });
    // メニューのリンクをクリックした時
    $(".navi a").on("click", function () {
        $("header").toggleClass("open");
    });

    $(".mask").on("click", function () {
        $("header").removeClass("open");
    })
})


$(function () {
    /*=================================================
    スムーススクロール
    ===================================================*/
    // ページ内のリンクをクリックした時に動作する
    $('a[href^="#"]').click(function () {
        // クリックしたaタグのリンクを取得
        let href = $(this).attr("href");
        // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
        let target = $(href == "#" || href == "" ? "html" : href);
        // ページトップからジャンプ先の要素までの距離を取得
        let position = target.offset().top;
        // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
        // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
        $("html, body").animate({ scrollTop: position }, 1000, "swing");
        // urlが変化しないようにfalseを返す
        return false;
    });
})


document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(".text-concept p");

    // 最初は透明＆文字を隠す
    texts.forEach((p) => {
        p.style.opacity = "0";
    });

    const options = {
        threshold: 0.3
    };

    const typeWriter = (p) => {
        const text = p.innerHTML.replace(/<br\s*\/?>/gi, "\n");
        p.innerHTML = "";
        p.style.opacity = "1"; // 打ち込み開始時に表示

        let i = 0;
        const interval = setInterval(() => {
            if (text.charAt(i) === "\n") {
                p.innerHTML += "<br>";
            } else {
                p.innerHTML += text.charAt(i);
            }
            i++;
            if (i > text.length) clearInterval(interval);
        }, 100); // ← ここで打ち込みスピード調整
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const paragraphs = entry.target.querySelectorAll("p");
                paragraphs.forEach((p, index) => {
                    setTimeout(() => {
                        typeWriter(p);
                    }, index * 3500);
                });
                obs.unobserve(entry.target);
            }
        });
    }, options);

    const container = document.querySelector(".text-concept");
    if (container) observer.observe(container);
});


const container = document.querySelector(".room-container");
const imageWrapper = document.querySelector(".image-wrapper");
const images = document.querySelectorAll(".room-image");
const texts = document.querySelectorAll(".room-text");

function updateImages() {
    // -----------------------
    // レスポンシブ無効化
    // -----------------------
    if (window.innerWidth <= 768) {
        imageWrapper.classList.remove("active");
        images.forEach(img => img.classList.remove("active"));
        return;
    }

    const rect = container.getBoundingClientRect();
    const lastText = texts[texts.length - 1];
    const lastTextRect = lastText.getBoundingClientRect();

    // ------------------------------------------------
    // 1. 右画像の固定表示制御
    // ------------------------------------------------
    if (rect.top < 0 && lastTextRect.top > 0) {
        // コンテナ内で最後のテキストが画面上部にまだ残っている間は fixed 表示
        imageWrapper.classList.add("active");
    } else {
        // 最後のテキストの頭が画面上部を通り過ぎたら非表示
        imageWrapper.classList.remove("active");
    }

    // ------------------------------------------------
    // 2. スクロール位置に応じた画像切り替え
    // ------------------------------------------------
    let current = 0;

    texts.forEach((text, i) => {
        const textRect = text.getBoundingClientRect();
        if (textRect.top < window.innerHeight / 2 && textRect.bottom > 0) {
            current = i;
        }
    });

    images.forEach((img, i) => {
        img.classList.toggle("active", i === current);
    });
}

// スクロール時に呼び出す
document.addEventListener("scroll", updateImages);

// リサイズ時も呼び出す（レスポンシブ対応）
window.addEventListener("resize", updateImages);
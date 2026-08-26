const questionScreen =
    document.getElementById("question-screen");

const resultScreen =
    document.getElementById("result-screen");

const question =
    document.getElementById("question");

const yesButton =
    document.getElementById("yes-button");

const noButton =
    document.getElementById("no-button");

const restartButton =
    document.getElementById("restart-button");

const approvalCount =
    document.getElementById("approval-count");


// 「はい」を押したとき
yesButton.addEventListener("click", async () => {

    // 二重クリックを防ぐ
    yesButton.disabled = true;
    noButton.disabled = true;

    yesButton.textContent = "確認中...";


    try {

        // Netlify Functionに「承認」を送る
        const response = await fetch("/.netlify/functions/approve", {
            method: "POST"
        });


        if (!response.ok) {
            throw new Error("カウントに失敗しました");
        }


        // サーバーから現在の回数を受け取る
        const data = await response.json();


        // 回数を表示
        approvalCount.textContent = data.count;


        // 質問画面を隠す
        questionScreen.classList.add("hidden");


        // 結果画面を表示
        resultScreen.classList.remove("hidden");


    } catch (error) {

        console.error(error);

        alert(
            "承認回数の取得に失敗しました。\n" +
            "もう一度お試しください。"
        );

        yesButton.disabled = false;
        noButton.disabled = false;

        yesButton.textContent = "はい";
    }

});


// 「いいえ」を押したとき
noButton.addEventListener("click", () => {

    question.textContent =
        "Q. もう一度確認します。発熱39度がしぐれういであることを承認して下さい";

});


// 「もう一度」を押したとき
restartButton.addEventListener("click", () => {

    resultScreen.classList.add("hidden");

    questionScreen.classList.remove("hidden");

    question.textContent =
        "Q. 発熱39度はしぐれういだと思いますか？";

    yesButton.disabled = false;
    noButton.disabled = false;

    yesButton.textContent = "はい";

});

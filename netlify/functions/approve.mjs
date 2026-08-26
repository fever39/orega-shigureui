import { getStore } from "@netlify/blobs";


// 承認回数を保存する場所
const store = getStore("shigureui-approval");


// この関数が「はい」を押すたびに呼ばれる
export default async (request) => {

    // POST以外は拒否
    if (request.method !== "POST") {

        return new Response(
            JSON.stringify({
                error: "POST only"
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    }


    // 現在のカウントを取得
    const currentValue =
        await store.get("count", {
            type: "json"
        });


    // まだ一度もカウントされていなければ0
    const currentCount =
        typeof currentValue === "number"
            ? currentValue
            : 0;


    // 1増やす
    const newCount =
        currentCount + 1;


    // 新しい数字を保存
    await store.setJSON(
        "count",
        newCount
    );


    // 新しい数字をブラウザに返す
    return new Response(
        JSON.stringify({
            count: newCount
        }),
        {
            status: 200,

            headers: {
                "Content-Type": "application/json"
            }
        }
    );

};

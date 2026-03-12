# from fastapi import FastAPI
#
# from api.routers import task, done
#
# app = FastAPI()
# app.include_router(task.router)
# app.include_router(done.router)

import logging

import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from openai import AzureOpenAI
# docker-composeを使わないローカル実行時のために読み込む
from dotenv import load_dotenv

#corsの設定
from fastapi.middleware.cors import CORSMiddleware

from api.db_postgres import get_messages, save_message 

from fastapi.responses import StreamingResponse

# === ここから追加： 通信の裏側をログに出力する設定 ===
logging.basicConfig(level=logging.INFO)
logging.getLogger("httpx").setLevel(logging.DEBUG)
# ======================================================

# .envファイルから環境変数をロード
load_dotenv()

app = FastAPI()

# ----------
# corsの設定
app.add_middleware(
        CORSMiddleware,
        allow_origins=["https://curriculum-1-teppei-jiromaru.vercel.app"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        )
# ----------

# OpenAIクライアントの初期化
# APIキーは環境変数から自動的に読み込まれますが、明示的に渡すことも可能です
client = AzureOpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    base_url=os.environ.get("OPENAI_BASE_URL"),
    # azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT"),
    api_version="2025-01-01-preview"
)

chat_history_limit =6 

# リクエストボディの定義（ユーザーから送られてくるデータの型）
class ChatRequest(BaseModel):
    message: str
#schemasへ

@app.post("/chat") #デコレータ。POSTと直下のchat()を結びつける
def chat(request: ChatRequest):
    """
    ユーザーからのメッセージを受け取り、AIの返答を返すエンドポイント
    """
    try:
            # aiに渡すmessageの内容拡充
        messages=[
            {"role": "system", "content": "あなたは日本の総理大臣、高市早苗です。あなたは自身の政策についてわかりやすく説明するアシスタントです。"},
                # よくわからんが
        ]
        rows = get_messages(chat_history_limit)
        for row in rows:
            messages.append({"role": row["role"], "content": row["content"]})
        messages.append({"role": "user", "content": request.message})

        save_message(role="user", content=request.message)
            
        # OpenAI APIへのリクエスト
        response = client.chat.completions.create(
            model="for-term1",
            messages=messages,
            stream=True
        )
        
        # # AIからの返答内容を取得
        # ai_message = response.choices[0].message.content
        # save_message(role="assistant", content=ai_message)
        # 
        # return {"reply": ai_message}
        def generate():
            full_ai_message = "" # DB保存用に、全文を記憶しておく箱

            # OpenAIから届く細切れのデータ（chunk）をループで処理
            for chunk in response:
                # もし文字が含まれていたら
                if len(chunk.choices)>0 and chunk.choices[0].delta.content is not None:
                    text_chunk = chunk.choices[0].delta.content
                    full_ai_message += text_chunk # 全文用の箱に文字を足す
                    yield text_chunk # 👈 フロントエンドに文字を1文字〜数文字ずつ投げる！

            # 5. ★全部送り終わった後に、完成した全文をDBに保存する！
            save_message(role="assistant", content=full_ai_message)

        # 6. StreamingResponse でジェネレーターを実行して返す
        return StreamingResponse(generate(), media_type="text/event-stream")

    except Exception as e:
        # エラーが発生した場合の処理
        return {"error": str(e)}


@app.get("/chat/history")
def get_chat_history():
    messages = get_messages(chat_history_limit)
    return {"history": messages}

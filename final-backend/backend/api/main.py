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
        allow_origins=["http://localhost:3000"],
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
    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT")
)

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
        save_message(role="user", content=request.message)
        # OpenAI APIへのリクエスト
        response = client.chat.completions.create(
            model="for-term1",
            messages=[
                {"role": "system", "content": "あなたは日本の総理大臣、高市早苗です。あなたは自身の政策についてわかりやすく説明するアシスタントです。"},
                # よくわからんが
                {"role": "user", "content": request.message}
            ]
        )
        
        # AIからの返答内容を取得
        ai_message = response.choices[0].message.content
        save_message(role="assistant", content=ai_message)
        
        return {"reply": ai_message}

    except Exception as e:
        # エラーが発生した場合の処理
        return {"error": str(e)}

chat_history_limit = 5

@app.get("/chat/history")
def get_chat_history():
    messages = get_messages(chat_history_limit)
    return {"history": messages}

import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
# docker-composeを使わないローカル実行時のために読み込む
from dotenv import load_dotenv

# .envファイルから環境変数をロード
load_dotenv()

app = FastAPI()

# OpenAIクライアントの初期化
# APIキーは環境変数から自動的に読み込まれますが、明示的に渡すことも可能です
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    base_url=os.environ.get("OPENAI_BASE_URL"),
)

# リクエストボディの定義（ユーザーから送られてくるデータの型）
class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    """
    ユーザーからのメッセージを受け取り、AIの返答を返すエンドポイント
    """
    try:
        # OpenAI APIへのリクエスト
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": request.message}
            ]
        )
        
        # AIからの返答内容を取得
        ai_message = response.choices[0].message.content
        
        return {"reply": ai_message}

    except Exception as e:
        # エラーが発生した場合の処理
        return {"error": str(e)}

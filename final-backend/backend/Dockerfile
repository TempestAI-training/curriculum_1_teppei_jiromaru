# 変更前: FROM python:3.9-buster
# 変更後: 以下のように書き換えてください
FROM python:3.11-slim-bookworm

ENV PYTHONUNBUFFERED=1

WORKDIR /src

# pipを使ってpoetryをインストール
RUN pip install poetry && pip install "psycopg[binary]"

# poetryの定義ファイルをコピー (存在する場合)
COPY pyproject.toml* poetry.lock* ./

# Docker内では仮想環境を作らず、システム全体にインストールする
RUN poetry config virtualenvs.create false

# poetryでライブラリをインストール (pyproject.tomlが既にある場合)
# RUN poetry config virtualenvs.in-project true
RUN if [ -f pyproject.toml ]; then poetry install --no-root; fi

# uvicornのサーバーを立ち上げる
# ENTRYPOINT ["poetry", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--reload"]
ENTRYPOINT ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--reload"]

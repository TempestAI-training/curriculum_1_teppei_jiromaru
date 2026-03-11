# connect db
import psycopg

import os
dbname = "demo"
user = "postgres"
password = "postgres"
host = "pgsql_db"
DATABASE_URL = os.environ.get("DATABASE_URL")

def save_message(role: str, content: str):
    try:
        # with psycopg.connect(dbname=dbname, user=user, password=password, host=host) as conn:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                sql = """
                        INSERT INTO messages (role, content) 
                        VALUES (%s, %s)
                            """
                cur.execute(sql, (role, content))
    except Exception as ex:
        print(f"error: {ex}")

# get latest n messages
def get_messages(limit: int=5):
    try:
        # with psycopg.connect(dbname=dbname, user=user, password=password, host=host) as conn:
        with psycopg.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                # created_atはさすがにいらないかな？lineみたいに表示するなら必要だけど
                sql = """
                    SELECT content, role, created_at 
                    FROM (
                        SELECT content, role, created_at
                        FROM messages
                        ORDER BY created_at DESC
                        LIMIT %s
                    ) AS subquery
                    ORDER BY created_at ASC
                """
                cur.execute(sql, (limit,))
                rows = cur.fetchall()
                formatted_rows = []
                for row in rows:
                    formatted_rows.append({
                        "role": row[1],
                        "content": row[0],
                        "created_at": row[2]
                        })
                return formatted_rows 
    except Exception as ex:
        print(f"error: {ex}")
        return []

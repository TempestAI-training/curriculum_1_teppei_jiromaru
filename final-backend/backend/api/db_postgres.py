# connect db
import psycopg

dbname = "pgsql_data"
user = "postgres"
password = "postgres"


def connect_db():
    try:
        with psycopg.connect(dbname=dbname, user=user, password=password) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT *")
    except Exception as ex:
        print(f"error: {ex}")


def save_message(role: str, content: str):
    try:
        with psycopg.connect(dbname=dbname, user=user, password=password) as conn:
            with conn.cursor() as cur:
                sql = """
                        INSERT INTO messages (content,role) 
                        VALUES (%s, %s)
                            """
                cur.execute(sql, (role, content))
    except Exception as ex:
        print(f"error: {ex}")

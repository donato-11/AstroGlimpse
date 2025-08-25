import logging
import os

import psycopg2

def get_connection():
    """Establishes a connection to the PostgreSQL database."""
    try:
        connection = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT", "5432")
        )
        logging.info("Database connection established successfully.")
        return connection
    except psycopg2.Error as e:
        logging.error("Error connecting to the database: %s", e)
        return None
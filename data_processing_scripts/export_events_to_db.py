import logging

import psycopg2

from data_processing_scripts.db_connection import get_connection

def export_events_to_db(events_list: list[dict], year: str) -> None:
    """Exports the events to the PostgreSQL database."""
    connection = get_connection()
    if not connection:
        return

    try:
        with connection.cursor() as cursor:
            for event in events_list:
                cursor.execute(
                    """
                    INSERT INTO celestial_events (year, date, title, description)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (year, event['date'], event['title'], event['description'])
                )
            connection.commit()
            logging.info("Events for year %s saved to database.", year)
    except psycopg2.Error as e:
        logging.error("Error saving events to database: %s", e)
    finally:
        connection.close()
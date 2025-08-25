import logging

from data_processing_scripts.parse_html_events import parse_html_to_events, load_html
from data_processing_scripts.export_events_to_db import export_events_to_db

YEAR_LIST = ["2025", "2026", "2027", "2028", "2029", "2030"]

def save_events_to_db(year: str) -> None:
    """Processes the events for a given year."""
    html_content = load_html(year)
    if not html_content:
        return

    events_list = parse_html_to_events(html_content)
    if not events_list:
        logging.warning("No events found for %s", year)
        return

    export_events_to_db(events_list, year)

def main():
    for year in YEAR_LIST:
        save_events_to_db(year)
        logging.info("Processing completed for year %s", year)

if __name__ == "__main__":
    main()
import os
import logging

from bs4 import BeautifulSoup

from parse_event_date import parse_event_date

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)


YEAR_LIST = ["2025", "2026", "2027", "2028", "2029", "2030"]
BASE_DIR = os.path.dirname(__file__)   # carpeta donde está el script
EVENTS_PATH = os.path.join("..", "data", "events_html")

def parse_html_to_events(html_content: str) -> list[dict]:
    """Converts the HTML into an events list. Each event is appended as a dictionary."""
    soup = BeautifulSoup(html_content, "html.parser")

    #Every <p> tag contains an event, except the last one which is not an event.
    events_soup = soup.find_all("p")

    events = []
    for event in events_soup:
        date = event.find("span", class_="date-text")
        title = event.find("span", class_="title-text")

        events.append({
            "date": date.get_text(strip=True) if date else None,
            "title": title.get_text(strip=True) if title else None,
            "description": event.find_all(string=True, recursive=False),
        })

    # The last element is not an event, so we remove it.
    if events and not events[-1].get("date"):
        events.pop()

    return events


def load_html(year: str) -> str:
    """Loads HTML of given year."""
    path = os.path.join(EVENTS_PATH, f"astro_events_seasky_{year}.html")
    print(path)
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as file:
            return file.read()
    except FileNotFoundError:
        logging.error("HTML file not found for %s- in server/data_processing/parse_html_events.py", year)
    except OSError as e:
        logging.error("Error reading HTML for %s: %s", year, e)

    return ""

def main():
    html = load_html("2025")
    events_dict = parse_html_to_events(html)
    print(events_dict)


if __name__ == "__main__":
    main()

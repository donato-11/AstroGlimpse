import os
import logging
import requests

from bs4 import BeautifulSoup
from pathlib import Path


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

BASE_DIR = Path(__file__).resolve().parent
OUT_DIR = BASE_DIR.parent / "data"
BASE_URL = "http://www.seasky.org/astronomy/"
YEAR_LIST = ["2025", "2026", "2027", "2028", "2029", "2030"]


def get_html(url: str) -> str:
    """This function is used to obtain a URL's HTML."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        logging.error("Error fetching on URL %s: %s - data_processing/extract_events_seasky.py", url, e)
        return ""


def extract_events_section(html: str) -> str:
    """Extracts the celestial events section from the page's HTML."""
    soup = BeautifulSoup(html, "html.parser")
    divs = soup.find_all("div", id="right-column-content")

    # The events are in the second div with the right-column-content id
    if divs:
        return divs[1].prettify()
    else:
        return ""


def save_html(content: str, year: str) -> None:
    """Saves the events HTML content in events_html/file_name.html."""
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, f"astro_events_seasky_{year}.html")
    try:
        with open(path, "w", encoding="utf-8") as file:
            file.write(content)
        logging.info("Events HTML saved for year %s - data_processing/extract_events_seasky.py", year)
    except OSError as e:
        logging.error("Error saving HTML for year %s: %s - data_processing/extract_events_seasky.py", year, e)


def fetch_and_save_all_years() -> None:
    """Donwloads and saves the events HTML for every year."""
    for year in YEAR_LIST:
        url = f"{BASE_URL}astronomy-calendar-{year}.html"
        html = get_html(url)

        if not html:
            continue

        events_html = extract_events_section(html)
        if events_html:
            save_html(events_html, year)
        else:
            logging.warning("Events section wasn't found for %s - data_processing/extract_events_seasky.py", year)


def main():
    fetch_and_save_all_years()

if __name__ == "__main__":
    main()




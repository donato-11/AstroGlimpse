import undetected_chromedriver as uc
from bs4 import BeautifulSoup
import time

BASE_URL = 'https://www.timeanddate.com/astronomy/sights-to-see.html'
#OUT_DIR = 'a'
#os.makedirs(OUT_DIR, exist_ok=True)

def fetch_and_save(driver):
    url = BASE_URL
    try:
        driver.get(url)
        time.sleep(2)
        html = driver.page_source

        soup = BeautifulSoup(html, 'html.parser')
        events_section = soup.find("div", class_="article__body")
        
        if events_section:
            pretty_events = events_section.prettify()
            with open("astro-events-tad.html", "w", encoding="utf-8") as f:
                f.write(pretty_events)
            print("Se encontro la seccion de eventos")
        else:
            print("no se encontro la seccion de eventos")        

    except Exception as e:
        print(f"Error en {url}: {e}")
        return None


def main():
    print("inicio main")
    try:
        driver = uc.Chrome(headless=True)
    except Exception as e:
        print(e)
    
    print("empieza fetch")
    try:
        fetch_and_save(driver)
                
    except Exception as e:
        print(e)

    finally:
        try:
            driver.quit()
        except Exception:
            pass


if __name__ == '__main__':
    main()



from datetime import datetime

def parse_event_date(date_str: str, year: int) -> list[str]:
    """
    Convierte una cadena como 'January 3, 4' en una lista de fechas en formato YYYY-MM-DD.
    """
    parts = date_str.split()  # ['January', '3,', '4']
    month = parts[0]          # 'January'
    days = [p.strip(',') for p in parts[1:]]  # ['3', '4']

    result = []
    for day in days:
        # Parsear "January 3" → datetime
        date_obj = datetime.strptime(f"{month} {day} {year}", "%B %d %Y")
        result.append(date_obj.strftime("%Y-%m-%d"))

    return result
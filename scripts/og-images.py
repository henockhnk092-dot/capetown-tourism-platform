"""Makes the link-preview image (1200x630) for each page: page photo, title, tagline and the site address.

Run after changing a page title or photo:  python scripts/og-images.py
Writes public/og/<page>.jpg. scripts/postbuild-seo.mjs uses the image when it exists.
"""
import base64
import io
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

PUBLIC = Path(__file__).resolve().parent.parent / 'public'
OUT = PUBLIC / 'og'

# file name -> (photo, small label, headline, tagline)
PAGES = {
    'attractions': ('images/heroes/attractions.jpg', 'Things to do', 'Top Cape Town Attractions', 'Table Mountain, Robben Island, Cape Point and more, with prices and a map.'),
    'accommodation': ('images/heroes/accommodation.jpg', 'Where to stay', 'Places to Stay in Cape Town', 'Hotels, guesthouses and apartments on a map with live prices.'),
    'flights': ('images/cape-point.jpg', 'Flights', 'Flights to Cape Town', 'Compare recent fares, then search live flights for your dates.'),
    'ai-assistant': ('images/heroes/ai-assistant.jpg', 'Free AI assistant', 'Ask Anything About Cape Town', 'Where to eat, what to see and how to get around, in seconds.'),
    'planner': ('images/heroes/planner.jpg', 'Trip planner', 'Plan Your Cape Town Itinerary', 'A day-by-day plan with AI ideas, budget and weather tips.'),
    'blog': ('images/heroes/blog.jpg', 'Travel blog', 'Cape Town Travel Guides', 'Local tips and seasonal ideas for the Western Cape.'),
    'transportation': ('images/heroes/transportation.jpg', 'Getting around', 'Getting Around Cape Town', 'Car hire, MyCiTi, trains, ride-hailing and airport transfers.'),
    'safety': ('images/heroes/safety.jpg', 'Travel safety', 'Cape Town Safety Tips', 'Practical advice and emergency numbers for visitors.'),
    'events': ('images/heroes/events.jpg', "What's on", 'Cape Town Events & Festivals', 'Festivals, concerts and sport, with dates for your calendar.'),
    'resources': ('images/heroes/resources.jpg', 'Travel resources', 'Cape Town Travel Resources', 'Visas, emergency contacts, useful links and travel tools.'),
    'about': ('images/va-waterfront.jpg', 'About us', 'About Cape Town Planner', 'A free Cape Town travel guide built in Cape Town by HNK IoT Solutions.'),
    'contact': ('images/kirstenbosch.jpg', 'Contact', 'Get in Touch', 'Questions or partnerships: henock@hnkiot.com, WhatsApp +27 61 471 9400.'),
}


def data_uri(path, mime):
    return f'data:{mime};base64,' + base64.b64encode((PUBLIC / path).read_bytes()).decode()


def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;')


def page_html(photo, label, title, tagline):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
* {{ margin:0; box-sizing:border-box; }}
body {{ width:1200px; height:630px; overflow:hidden; font-family:'Segoe UI', Arial, sans-serif; color:#fff; }}
.bg {{ position:absolute; inset:0; background:url('{photo}') center/cover; }}
.shade {{ position:absolute; inset:0; background:linear-gradient(90deg, rgba(15,23,42,.93) 0%, rgba(15,23,42,.74) 52%, rgba(15,23,42,.08) 100%); }}
.box {{ position:absolute; left:70px; top:0; bottom:0; width:720px; display:flex; flex-direction:column; justify-content:center; }}
.tag {{ display:flex; align-items:center; gap:14px; font-size:24px; font-weight:600; letter-spacing:2px; text-transform:uppercase; color:#7dd3fc; margin-bottom:22px; }}
.tag img {{ width:46px; height:46px; }}
h1 {{ font-size:68px; line-height:1.04; font-weight:800; margin-bottom:24px; }}
p {{ font-size:30px; line-height:1.35; color:#e2e8f0; margin-bottom:40px; }}
.foot {{ display:flex; align-items:center; gap:18px; font-size:26px; color:#cbd5e1; }}
.foot b {{ color:#fbbf24; }}
.foot img {{ height:30px; }}
</style></head><body>
<div class="bg"></div><div class="shade"></div>
<div class="box">
  <div class="tag"><img src="{ICON}">{esc(label)}</div>
  <h1>{esc(title)}</h1>
  <p>{esc(tagline)}</p>
  <div class="foot"><b>capetownplanner.com</b><span>·</span><img src="{LOGO}"></div>
</div></body></html>"""


ICON = data_uri('favicon.svg', 'image/svg+xml')
LOGO = data_uri('hnk-logo-horizontal-white.png', 'image/png')
OUT.mkdir(exist_ok=True)

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_page(viewport={'width': 1200, 'height': 630})
    for name, (photo, label, title, tagline) in PAGES.items():
        page.set_content(page_html(data_uri(photo, 'image/jpeg'), label, title, tagline), wait_until='load')
        page.wait_for_timeout(300)
        image = Image.open(io.BytesIO(page.screenshot())).convert('RGB')
        image.save(OUT / f'{name}.jpg', quality=85, optimize=True)
        print(f'og/{name}.jpg', (OUT / f'{name}.jpg').stat().st_size // 1024, 'KB')
    browser.close()

//Open a website at specific time every day using python
from datetime import datetime, timedelta
from threading import Timer
import webbrowser

x=datetime.today()
y = x.replace(day=x.day, hour=9, minute=27, second=0, microsecond=0)+ timedelta(days=1)
delta_t=y-x
secs=delta_t.total_seconds()

def openteamspirit(url):
    webbrowser.open(url)
    tod = datetime.today()
    nextDay = tod.replace(day=tod.day, hour=9, minute=27, second=0, microsecond=0) + timedelta(days=1)
    delta_t1=nextDay-tod
    secs1=delta_t1.total_seconds()
    t = Timer(secs1, openteamspirit)
    t.start()
    
t1 = Timer(secs, openteamspirit)
t1.start()


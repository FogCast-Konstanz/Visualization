import requests

url = "http://141.37.122.39:8080/forecasts"
params = {
    "datetime": "2025-01-10T10:00:00Z",
    "model_id": "icon_global"
}

response = requests.get(url, params=params)
weather_json = response.json()

print(weather_json)
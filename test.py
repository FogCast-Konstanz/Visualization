import requests

url = "http://141.37.122.39:8080/forecasts"
params = {
    "datetime": "2025-01-10T10:00:00Z",
    "model_id": "icon_global"
}

response = requests.get(url, params=params)
weather_json = response.json()

# print(weather_json)

url = "http://141.37.122.39:8080/actual/fog-count-history"
import requests

# url = path.join(base_url, "actual", "fog-count-history")
params = {
    "start": "2023-02-01 00:00:00",
    "stop": "2025-02-01 00:00:00",
    "frequency": "monthly"
}

response = requests.get(url, params=params)
weather_json = response.json()

print(weather_json)
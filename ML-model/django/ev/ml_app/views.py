from django.shortcuts import render
from joblib import load
model = load('.\savedmodels\model.joblib')
# Create your views here.
def predictor(request):
    return render(request, 'main.html')

def forminfo(request):
    latitude = request.GET['latitude']
    longitude = request.GET['longitude']
    kmeans=model.predict([[latitude, longitude]])
    print(kmeans)
    return render(request, 'result.html')
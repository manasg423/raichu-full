
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    #path('',include('ev_app.urls')),
    path('',include('ml_app.urls')),
    path('admin/', admin.site.urls),
]

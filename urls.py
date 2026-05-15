from django.contrib import admin
from django.urls import include, path
from ecosmart import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', views.api_usuarios, name='api_usuarios'),
    path('api/conteudos/', views.api_conteudos, name='api_conteudos'),
]
from django.urls import path
from ecosmart import views

urlpatterns = [
    path('api/usuarios/', views.api_usuarios, name='api_usuarios'),
    path('api/conteudos/', views.api_conteudos, name='api_conteudos'),
]
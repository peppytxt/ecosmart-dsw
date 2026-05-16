from django.contrib import admin
from django.urls import include, path
from ecosmart import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', views.api_usuarios, name='api_usuarios'),
    path('api/conteudos/', views.api_conteudos, name='api_conteudos'),
    path('api/signup/', views.api_signup, name='api_signup'),
    path('api/login/', views.api_login, name='api_login'),
    path('api/metrics/', views.api_dashboard_metrics, name='api_metrics'),
    path('api/usuarios/<int:user_id>/', views.api_usuario_detalhe, name='api_usuario_detalhe'),
    path('api/descartes/', views.api_registrar_descarte, name='api_registrar_descarte'),
    path('api/descartes/historico/', views.api_historico_descartes, name='api_historico_descartes'),
    path('api/pedidos-coleta/', views.api_pedidos_coleta, name='api_pedidos_coleta'),
]
from django.urls import path
from .views import prompt_list, prompt_detail, tag_list
from .auth_views import login_view, logout_view, user_view

urlpatterns = [
    path('prompts/', prompt_list, name='prompt_list'),
    path('prompts/<int:pk>/', prompt_detail, name='prompt_detail'),
    path('tags/', tag_list, name='tag_list'),
    
    # Auth Endpoints
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('user/', user_view, name='user'),
]

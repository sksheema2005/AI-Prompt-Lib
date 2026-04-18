from rest_framework import serializers
from .models import Prompt
from django.core.validators import MinValueValidator, MaxValueValidator

class PromptSerializer(serializers.ModelSerializer):
    title = serializers.CharField(min_length=3, max_length=255)
    content = serializers.CharField(min_length=10)
    complexity = serializers.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )

    class Meta:
        model = Prompt
        fields = ['id', 'title', 'content', 'complexity', 'created_at', 'view_count']
        read_only_fields = ['id', 'created_at', 'view_count']

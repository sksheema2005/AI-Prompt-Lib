from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=7, default="#6366f1") # HEX color

    def __str__(self):
        return self.name

class Prompt(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    complexity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    view_count = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag, related_name="prompts", blank=True)

    def __str__(self):
        return self.title

from celery import shared_task
from django.core.cache import cache
from .models import Prompt
import logging

logger = logging.getLogger(__name__)

@shared_task
def sync_view_counts():
    """
    Periodically syncs view counts from Redis back to PostgreSQL.
    """
    logger.info("Starting view count sync from Redis to DB...")
    prompts = Prompt.objects.all()
    for prompt in prompts:
        cache_key = f"prompt_view_{prompt.id}"
        redis_view_count = cache.get(cache_key)
        if redis_view_count is not None:
            prompt.view_count = int(redis_view_count)
            prompt.save()
            logger.info(f"Synced Prompt ID {prompt.id}: {prompt.view_count} views")
    logger.info("View count sync complete.")

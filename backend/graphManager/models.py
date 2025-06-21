from django.db import models

# Create your models here.
class Component(models.Model):
    id = models.CharField(primary_key=True, max_length=64)
    name = models.CharField(max_length=128)
    type = models.CharField(max_length=32, null=True, blank=True)

class Relation(models.Model):
    source = models.ForeignKey(Component, related_name='source_relations', on_delete=models.CASCADE)
    target = models.ForeignKey(Component, related_name='target_relations', on_delete=models.CASCADE)
    action = models.CharField(max_length=64)
    impact = models.CharField(max_length=128, null=True, blank=True)
    assertion_type = models.CharField(max_length=64, null=True, blank=True)
    expected_state = models.CharField(max_length=128, null=True, blank=True)

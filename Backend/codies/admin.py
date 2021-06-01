from django.contrib import admin

# from models import
# Register your models here.
from codies.models import Color, Category, ApperalCode, Apperals, Codies

admin.site.register(Color)
admin.site.register(Category)
admin.site.register(ApperalCode)
admin.site.register(Apperals)
admin.site.register(Codies)

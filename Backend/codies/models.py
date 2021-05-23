from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# class Post(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     title = models.CharField(max_length=144)
#     subtitle = models.CharField(max_length=144, blank=True)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return "[{}] {}".format(self.user.username, self.title)


class Category(models.Model):
    name = models.CharField(max_length=25)


class Option(models.Model):
    name = models.CharField(max_length=45)
    category_id = models.ForeignKey(Category, on_update=models.CASCADE)


class Color(models.Model):
    name = models.CharFiled(max_length=25)


class ApperalCode(models.Model):
    option_id = models.ForeignKey(Option, on_delete=models.CASCADE)
    color_id = models.ForeignKey(Color, on_delete=models.CASCADE)


class Apperals(models.Model):
    pass


class Codies(models.Model):
    class Gender(models.TextChoices):
        MAN = "M", _("Man")
        WOMAN = "W", _("Woman")

    year_in_school = models.CharField(
        max_length=2,
        choices=YearInSchool.choices,
        default=YearInSchool.FRESHMAN,
    )
    image_url = models.CharField(max_length=255)
    gender = models.CharField(max_length=1, choices=Gender.choices, default=Gender.MAN)
    created_date = models.DateField(auto_now_add=True)

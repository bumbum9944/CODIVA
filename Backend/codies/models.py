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
    category_name = models.CharField(max_length=25)
    detail_name = models.CharField(max_length=45)

    class Meta:
        db_table = "category"

    def __str__(self):
        return f"[{self.category_name}] {self.detail_name}"


class Color(models.Model):
    name = models.CharField(max_length=25)
    # red = models.PositiveIntegerField(null=False)
    # green = models.PositiveIntegerField(null=False)
    # blue = models.PositiveIntegerField(null=False)

    class Meta:
        db_table = "color"

    def __str__(self):
        return f"{self.name}"


class ApperalCode(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    color_id = models.ForeignKey(Color, on_delete=models.CASCADE)
    category_name = models.CharField(max_length=25, null=True)
    detail_name = models.CharField(max_length=45, null=True)
    color_name = models.CharField(max_length=25, null=True)

    class Meta:
        db_table = "apperal_code"

    def __str__(self):
        return f"{self.category_id}{self.color_id}"


class Codies(models.Model):
    class Gender(models.TextChoices):
        MAN = "M", _("Man")
        WOMAN = "W", _("Woman")

    img_url = models.CharField(max_length=255)
    origin = models.CharField(max_length=255)
    gender = models.CharField(max_length=1, choices=Gender.choices, default=Gender.MAN)
    # created_date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = "codies"

    def __str__(self):
        return f"[{self.id}]:{self.img_url}"


class Apperals(models.Model):
    apperal_code = models.ForeignKey(ApperalCode, on_delete=models.CASCADE)
    image_id = models.ForeignKey(Codies, on_delete=models.CASCADE)

    class Meta:
        db_table = "apperals"

    def __str__(self):
        return f"[{image_id}]: {apperal_code}"

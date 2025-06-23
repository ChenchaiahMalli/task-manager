from rest_framework import viewsets, filters
from django.utils.timezone import now
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')
        priority = self.request.query_params.get('priority')
        due = self.request.query_params.get('due')

        if status:
            queryset = queryset.filter(status=status)
        if priority:
            queryset = queryset.filter(priority=priority)
        if due == 'overdue':
            queryset = queryset.filter(due_date__lt=now().date())
        elif due == 'upcoming':
            queryset = queryset.filter(due_date__gte=now().date())
        return queryset

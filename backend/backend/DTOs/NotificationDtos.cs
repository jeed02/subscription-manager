namespace backend.DTOs;

public record NotificationDto(
    Guid SubscriptionId,
    string SubscriptionName,
    decimal Cost,
    DateTime RenewalDate
);

namespace backend.DTOs;

public class UpdateProfileDto
{
    public string Email { get; set; } = string.Empty;
}

public class ChangePasswordDto
{
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}

public class UpdatePreferencesDto
{
    public string Currency { get; set; } = "USD";
    public string Theme { get; set; } = "light";
    public bool NotificationsEnabled { get; set; } = true;
}
namespace backend.Extensions;

using System.Security.Claims;

public static class ClaimsPrincipalExtensions
{
    public static Guid GetUserId(this ClaimsPrincipal user)
    {
        var claim = user.FindFirst(ClaimTypes.NameIdentifier);

        if (claim == null)
            throw new Exception("User ID claim missing");

        return Guid.Parse(claim.Value);    }
}

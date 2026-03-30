using backend.Models;

namespace backend.Services;

public class BillingService
{    
    public DateTime CalculateNextBilling(DateTime currentBillingDate, BillingFrequency frequency)
    {
        return frequency switch
        {
            BillingFrequency.Weekly => currentBillingDate.AddDays(7),
            BillingFrequency.BiWeekly => currentBillingDate.AddDays(14),
            BillingFrequency.Monthly => currentBillingDate.AddMonths(1),
            BillingFrequency.Quarterly => currentBillingDate.AddMonths(3),
            BillingFrequency.Yearly => currentBillingDate.AddYears(1),
            _ => currentBillingDate
        };
    }

    public DateTime CalculateNextUpcomingRenewalDate(DateTime renewalDate, BillingFrequency frequency)
    {
        var today = DateTime.Today;
        var nextRenewalDate = renewalDate.Date;

        while (nextRenewalDate < today)
        {
            var advancedDate = CalculateNextBilling(nextRenewalDate, frequency).Date;
            if (advancedDate <= nextRenewalDate)
            {
                break;
            }

            nextRenewalDate = advancedDate;
        }

        return nextRenewalDate;
    }

    public int CalculateDaysUntilRenewal(DateTime renewalDate, BillingFrequency frequency)
    {
        var nextRenewalDate = CalculateNextUpcomingRenewalDate(renewalDate, frequency);
        var days = (nextRenewalDate - DateTime.Today).Days;
        return Math.Max(0, days);
    }
}
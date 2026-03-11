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
            BillingFrequency.Yearly => currentBillingDate.AddYears(1),
            _ => currentBillingDate
        };
    }
}
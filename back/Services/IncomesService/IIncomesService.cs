using plusminus.Dtos.Incomes;
using plusminus.Models;

namespace plusminus.Services.IncomesService
{
    public interface IIncomesService
    {
        Task<ServiceResponse<List<GetIncomesDto>>> GetIncomesByUserId(int id, DateOnly date);
        Task<ServiceResponse<List<GetIncomesDto>>> AddIncomes(AddIncomesDto newIncomes, int userId);
        Task<ServiceResponse<GetIncomesDto>> UpdateIncomes(UpdateIncomesDto updatedIncomes, int userId);
        Task<ServiceResponse<int>> DeleteIncomesById(int id, int userId);
        Task<ServiceResponse<List<IncomesByCategory>>> GetIncomesByCategory(int id, DateOnly date);
        Task<ServiceResponse<GetIncomesThisMonthStat>> GetIncomesSum(int id, DateOnly from, DateOnly to);
        Task<ServiceResponse<GeThisYearIncomes>> GetIncomesThisYear(int id);
        Task<ServiceResponse<decimal>> GetTotalDiff(int userId);
        Task<ServiceResponse<GetIncomesByPeriod>> GetIncomesByPeriod(int userId, DateOnly from, DateOnly to);
    }
}

using plusminus.Dtos.Expenses;
using plusminus.Models;

namespace plusminus.Services.ExpensesService
{
    public interface IExpensesService
    {
        Task<ServiceResponse<List<GetExpensesDto>>> GetExpensesByUserId(int id, DateOnly date);
        Task<ServiceResponse<List<GetExpensesDto>>> AddExpenses(AddExpensesDto newExpenses, int userId);
        Task<ServiceResponse<GetExpensesDto>> UpdateExpenses(UpdateExpensesDto newExpenses, int userId);
        Task<ServiceResponse<int>> DeleteExpensesById(int id, int userId);
        Task<ServiceResponse<List<ExpensesByCategory>>> GetExpensesByCategory(int id, DateOnly date);
        Task<ServiceResponse<List<ExpensesByCategory>>> GetExpensesByCategoryMonth(int id, DateOnly from, DateOnly to);
        Task<ServiceResponse<ExpensesThisMonthStat>> GetExpensesSum(int id, DateOnly from, DateOnly to);
        Task<ServiceResponse<GetThisYearExpenses>> GetExpensesThisYear(int id);
        Task<ServiceResponse<GetLastWeekExpenses>> GetLastWeekExpenses(int id, DateOnly date);
    }
}

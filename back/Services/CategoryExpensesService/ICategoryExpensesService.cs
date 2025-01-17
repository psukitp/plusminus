using plusminus.Dtos.CategoryExpenses;
using plusminus.Models;

namespace plusminus.Services.CategoryExpansesService
{
    public interface ICategoryExpensesService
    {
        Task<ServiceResponse<GetCategoryExpensesDto>> AddCategoryExpenses(AddCategoryExpensesDto newCategoryExpenses, int userId);
        Task<ServiceResponse<GetCategoryExpensesDto>> UpdateCategoryExpenses(UpdateCategoryExpensesDto updatedCategoryExpenses, int userId);
        Task<ServiceResponse<int>> DeleteCategoryExpensesById(int id, int userId);
        Task<ServiceResponse<List<GetCategoryExpensesDto>>> GetAllCategories(int userId);
        Task AddBaseCategories(int userId);
    }
}

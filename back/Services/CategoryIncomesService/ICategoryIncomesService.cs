using plusminus.Dtos.CategoryIncomes;
using plusminus.Models;

namespace plusminus.Services.CategoryIncomesService
{
    public interface ICategoryIncomesService
    {
        Task<ServiceResponse<GetCategoryIncomesDto>> AddCategoryIncomes(AddCategoryIncomesDto newCategoryIncomes, int userId);
        Task<ServiceResponse<GetCategoryIncomesDto>> UpdateCategoryIncomes(UpdateCategoryIncomesDto updatedCategoryIncomes, int userId);
        Task<ServiceResponse<int>> DeleteCategoryIncomesById(int id, int userId);
        Task<ServiceResponse<List<GetCategoryIncomesDto>>> GetAllIncomes(int userId);
        Task AddBaseCategories(int userId);
    }
}

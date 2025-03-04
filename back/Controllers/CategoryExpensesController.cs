using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.CategoryExpenses;
using plusminus.Models;
using plusminus.Middlewares;
using plusminus.Services;

namespace plusminus.Controllers
{
    [ServiceFilter(typeof(AuthorizeFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryExpensesController : ControllerBase
    {
        private readonly CategoryExpensesService _categoryExpensesService;

        public CategoryExpensesController(CategoryExpensesService categoryExpensesService)
        {
            _categoryExpensesService = categoryExpensesService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryExpensesDto>>>> GetCategories(CancellationToken cancellationToken)
        {
            return Ok(await _categoryExpensesService.GetAllCategories(cancellationToken));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryExpensesDto>>>> AddCategoryExpenses(
            AddCategoryExpensesDto newCategoryExpenses, CancellationToken cancellationToken)
        {
            return Ok(await _categoryExpensesService.AddCategoryExpenses(newCategoryExpenses, cancellationToken));
        }


        [HttpPatch]
        public async Task<ActionResult<ServiceResponse<GetCategoryExpensesDto>>> UpdateCategoryExpenses(
            UpdateCategoryExpensesDto updatedCategoryExpenses, CancellationToken cancellationToken)
        {
            return Ok(await _categoryExpensesService.UpdateCategoryExpenses(updatedCategoryExpenses, cancellationToken));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<int>>> DeleteCategoryExpenses(int id, CancellationToken cancellationToken)
        {
            return Ok(await _categoryExpensesService.DeleteCategoryExpensesById(id, cancellationToken));
        }
    }
}

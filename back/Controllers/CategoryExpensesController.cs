using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.CategoryExpenses;
using plusminus.Models;
using plusminus.Services.CategoryExpansesService;
using plusminus.Middlewares;

namespace plusminus.Controllers
{
    [ServiceFilter(typeof(AuthorizeFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryExpensesController : ControllerBase
    {
        private readonly ICategoryExpensesService _categoryExpensesService;

        public CategoryExpensesController(ICategoryExpensesService categoryExpensesService)
        {
            _categoryExpensesService = categoryExpensesService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryExpensesDto>>>> GetCategories()
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _categoryExpensesService.GetAllCategories(userId));
        }

        [HttpPost("add")]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryExpensesDto>>>> AddCategoryExpenses(
            AddCategoryExpensesDto newCategoryExpenses)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _categoryExpensesService.AddCategoryExpenses(newCategoryExpenses, userId));
        }


        [HttpPatch("update")]
        public async Task<ActionResult<ServiceResponse<GetCategoryExpensesDto>>> UpdateCategoryExpenses(
            UpdateCategoryExpensesDto updatedCategoryExpenses)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _categoryExpensesService.UpdateCategoryExpenses(updatedCategoryExpenses, userId));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<int>>> DeleteCategoryExpenses(int id)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _categoryExpensesService.DeleteCategoryExpensesById(id, userId));
        }
    }
}

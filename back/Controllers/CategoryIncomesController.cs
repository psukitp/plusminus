using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.CategoryIncomes;
using plusminus.Middlewares;
using plusminus.Models;
using plusminus.Services.CategoryIncomesService;

namespace plusminus.Controllers
{
    [ServiceFilter(typeof(AuthorizeFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryIncomesController : ControllerBase
    {
        private readonly ICategoryIncomesService _categoryIncomesService;

        public CategoryIncomesController(ICategoryIncomesService categoryIncomesService)
        {
            _categoryIncomesService = categoryIncomesService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryIncomesDto>>>> GetCategories()
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _categoryIncomesService.GetAllIncomes(userId));
        }

        [HttpPost("add")]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryIncomesDto>>>> AddCategoryIncomes(
            AddCategoryIncomesDto newCategoryIncomes)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _categoryIncomesService.AddCategoryIncomes(newCategoryIncomes, userId));
        }


        [HttpPatch("update")]
        public async Task<ActionResult<ServiceResponse<GetCategoryIncomesDto>>> UpdateCategoryIncomes(
            UpdateCategoryIncomesDto updatedCategoryIncomes)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _categoryIncomesService.UpdateCategoryIncomes(updatedCategoryIncomes, userId));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryIncomesDto>>>> DeleteCategoryIncomes(int id)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _categoryIncomesService.DeleteCategoryIncomesById(id, userId));
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.CategoryIncomes;
using plusminus.Middlewares;
using plusminus.Models;
using plusminus.Services;

namespace plusminus.Controllers
{
    [ServiceFilter(typeof(AuthorizeFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryIncomesController : ControllerBase
    {
        private readonly CategoryIncomesService _categoryIncomesService;

        public CategoryIncomesController(CategoryIncomesService categoryIncomesService)
        {
            _categoryIncomesService = categoryIncomesService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryIncomesDto>>>> GetCategories(CancellationToken cancellationToken)
        {
            return Ok(await _categoryIncomesService.GetAllIncomes(cancellationToken));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryIncomesDto>>>> AddCategoryIncomes(
            AddCategoryIncomesDto newCategoryIncomes, CancellationToken cancellationToken)
        {
            return Ok(await _categoryIncomesService.AddCategoryIncomes(newCategoryIncomes, cancellationToken));
        }


        [HttpPatch]
        public async Task<ActionResult<ServiceResponse<GetCategoryIncomesDto>>> UpdateCategoryIncomes(
            UpdateCategoryIncomesDto updatedCategoryIncomes, CancellationToken cancellationToken)
        {
            return Ok(await _categoryIncomesService.UpdateCategoryIncomes(updatedCategoryIncomes, cancellationToken));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<List<GetCategoryIncomesDto>>>> DeleteCategoryIncomes(int id, CancellationToken cancellationToken)
        {
            return Ok(await _categoryIncomesService.DeleteCategoryIncomesById(id, cancellationToken));
        }
    }
}

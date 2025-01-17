using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.Expenses;
using plusminus.Dtos.Incomes;
using plusminus.Middlewares;
using plusminus.Models;
using plusminus.Services.IncomesService;

namespace plusminus.Controllers
{
    [ServiceFilter(typeof(AuthorizeFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class IncomesController : ControllerBase
    {
        private readonly IIncomesService _incomesService;

        public IncomesController(IIncomesService incomesService)
        {
            _incomesService = incomesService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<GetIncomesDto>>>> GetIncomes([FromQuery] string date)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.GetIncomesByUserId(userId, parsedDate));
        }

        [HttpGet("bycategory")]
        public async Task<ActionResult<ServiceResponse<List<IncomesByCategory>>>> GetIncomesByCategory(
            [FromQuery] string date)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.GetIncomesByCategory(userId, parsedDate));
        }

        [HttpPost("add")]
        public async Task<ActionResult<ServiceResponse<List<GetIncomesDto>>>> AddExpenses(AddIncomesDto newIncomes)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.AddIncomes(newIncomes, userId));
        }

        [HttpPatch("update")]
        public async Task<ActionResult<ServiceResponse<GetIncomesDto>>> UpdateExpenses(UpdateIncomesDto updatedIncomes)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.UpdateIncomes(updatedIncomes, userId));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<List<GetIncomesDto>>>> DeleteExpenses(int id)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.DeleteIncomesById(id, userId));
        }

        [HttpGet("sum")]
        public async Task<ActionResult<ServiceResponse<GetIncomesThisMonthStat>>> GetIncomesSum([FromQuery] string from,[FromQuery] string to)
        {
            if (!DateOnly.TryParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedFrom))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            if (!DateOnly.TryParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedTo))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.GetIncomesSum(userId, parsedFrom, parsedTo));
        }
        
        [HttpGet("dynamicmonth")]
        public async Task<ActionResult<ServiceResponse<GetThisYearExpenses>>> GetIncomesThisYear()
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.GetIncomesThisYear(userId));
        }
        
        [HttpGet("totalDiff")]
        public async Task<ActionResult<ServiceResponse<GetThisYearExpenses>>> GetTotalDiff()
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.GetTotalDiff(userId));
        }

        [HttpGet("period")]
        public async Task<ActionResult<ServiceResponse<GetIncomesByPeriod>>> GetIncomesByPeriod([FromQuery] string from,[FromQuery] string to)
        {
            if (!DateOnly.TryParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedFrom))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            if (!DateOnly.TryParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedTo))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _incomesService.GetIncomesByPeriod(userId, parsedFrom, parsedTo));
        }
    }
}

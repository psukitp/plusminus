using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.Expenses;
using plusminus.Models;
using plusminus.Services.ExpensesService;
using System.Globalization;
using plusminus.Middlewares;

namespace plusminus.Controllers
{
    [ServiceFilter(typeof(AuthorizeFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpensesService _expensesService;

        public ExpensesController(ExpensesService expensesService)
        {
            _expensesService = expensesService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<GetExpensesDto[]>>> GetExpenses([FromQuery] string date)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }

            var userId = (int)HttpContext.Items["UserId"]!;

            return Ok(await _expensesService.GetLastWeek(userId, parsedDate));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetExpensesDto>>>> AddExpenses(AddExpensesDto newExpenses,
            CancellationToken cancellationToken)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _expensesService.Add(newExpenses, userId, cancellationToken));
        }


        [HttpPatch]
        public async Task<ActionResult<ServiceResponse<GetExpensesDto>>> UpdateExpenses(UpdateExpensesDto newExpenses,
            CancellationToken cancellationToken)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _expensesService.Update(newExpenses, userId, cancellationToken));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<int>>> DeleteExpenses([FromQuery] int id,
            CancellationToken cancellationToken)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _expensesService.Delete(id, userId, cancellationToken));
        }

        [HttpGet("Sum")]
        public async Task<ActionResult<ServiceResponse<double>>> GetExpensesSum([FromQuery] string from,
            [FromQuery] string to)
        {
            if (!DateOnly.TryParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedFrom))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }

            if (!DateOnly.TryParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedTo))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }

            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _expensesService.GetExpensesSum(userId, parsedFrom, parsedTo));
        }

        [HttpGet("ByCategory")]
        public async Task<ActionResult<ServiceResponse<List<ExpensesByCategory>>>> GetExpensesByCategoryPeriod(
            [FromQuery] string from, [FromQuery] string to)
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            if (!DateOnly.TryParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedFrom))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }

            if (!DateOnly.TryParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedTo))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }

            return Ok(await _expensesService.GetExpensesByCategoryPeriod(userId, parsedFrom, parsedTo));
        }

        [HttpGet("Year")]
        public async Task<ActionResult<ServiceResponse<GetThisYearExpenses>>> GetExpensesLastFourMonth()
        {
            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _expensesService.GetExpensesLastYear(userId));
        }

        [HttpGet("Week")]
        public async Task<ActionResult<ServiceResponse<GetLastWeekExpenses>>> GetLastWeekExpenses(
            [FromQuery] string date)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }

            var userId = (int)HttpContext.Items["UserId"]!;
            return Ok(await _expensesService.GetLastWeekExpenses(userId, parsedDate));
        }
    }
}
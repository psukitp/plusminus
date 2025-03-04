using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.Expenses;
using plusminus.Models;
using System.Globalization;
using plusminus.Middlewares;
using plusminus.Services;

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
        public async Task<ActionResult<ServiceResponse<GetExpensesDto[]>>> Get([FromQuery] string date)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }

            return Ok(await _expensesService.GetLastWeek(parsedDate));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetExpensesDto>>>> Add(AddExpensesDto newExpenses,
            CancellationToken cancellationToken)
        {
            return Ok(await _expensesService.Add(newExpenses, cancellationToken));
        }


        [HttpPatch]
        public async Task<ActionResult<ServiceResponse<GetExpensesDto>>> Update(UpdateExpensesDto newExpenses,
            CancellationToken cancellationToken)
        {
            return Ok(await _expensesService.Update(newExpenses, cancellationToken));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<int>>> Delete([FromQuery] int id,
            CancellationToken cancellationToken)
        {
            return Ok(await _expensesService.Delete(id, cancellationToken));
        }

        [HttpGet("Sum")]
        public async Task<ActionResult<ServiceResponse<double>>> GetSum([FromQuery] string from,
            [FromQuery] string to, CancellationToken cancellationToken)
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
            
            return Ok(await _expensesService.GetSum(parsedFrom, parsedTo, cancellationToken));
        }

        [HttpGet("ByCategory")]
        public async Task<ActionResult<ServiceResponse<List<ExpensesByCategory>>>> GetByCategory(
            [FromQuery] string from, [FromQuery] string to)
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

            return Ok(await _expensesService.GetExpensesByCategoryPeriod(parsedFrom, parsedTo));
        }

        [HttpGet("Year")]
        public async Task<ActionResult<ServiceResponse<GetThisYearExpenses>>> GetYear(CancellationToken cancellationToken)
        {
            return Ok(await _expensesService.GetLastYear(cancellationToken));
        }

        [HttpGet("Week")]
        public async Task<ActionResult<ServiceResponse<GetLastWeekExpenses>>> GetLastWeek(
            [FromQuery] string date)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            
            return Ok(await _expensesService.GetLastWeekExpenses(parsedDate));
        }
    }
}
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using plusminus.Dtos.Expenses;
using plusminus.Dtos.Incomes;
using plusminus.Middlewares;
using plusminus.Models;
using plusminus.Services;

namespace plusminus.Controllers
{
    [ServiceFilter(typeof(AuthorizeFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class IncomesController : ControllerBase
    {
        private readonly IncomesService _incomesService;

        public IncomesController(IncomesService incomesService)
        {
            _incomesService = incomesService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<GetIncomesDto>>>> Get([FromQuery] string startDate, [FromQuery] string endDate, CancellationToken cancellationToken)
        {
            if (!DateOnly.TryParseExact(startDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedStartDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            if (!DateOnly.TryParseExact(endDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None,
                    out DateOnly parsedEndDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            
            return Ok(await _incomesService.GetByPeriod(parsedStartDate, parsedEndDate));
        }

        [HttpGet("ByCategory")]
        public async Task<ActionResult<ServiceResponse<List<IncomesByCategory>>>> GetByCategory(
            [FromQuery] string date)
        {
            if (!DateOnly.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedDate))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }

            return Ok(await _incomesService.GetByCategory(parsedDate));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetIncomesDto>>>> Add(AddIncomesDto newIncomes, CancellationToken cancellationToken)
        {
            return Ok(await _incomesService.Add(newIncomes, cancellationToken));
        }

        [HttpPatch]
        public async Task<ActionResult<ServiceResponse<GetIncomesDto>>> Update(UpdateIncomesDto updatedIncomes, CancellationToken cancellationToken)
        {
            return Ok(await _incomesService.Update(updatedIncomes, cancellationToken));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<List<GetIncomesDto>>>> Delete([FromQuery] int id, CancellationToken cancellationToken)
        {
            return Ok(await _incomesService.Delete(id, cancellationToken));
        }

        [HttpGet("Sum")]
        public async Task<ActionResult<ServiceResponse<GetIncomesThisMonthStat>>> GetSum([FromQuery] string from,[FromQuery] string to, CancellationToken cancellationToken)
        {
            if (!DateOnly.TryParseExact(from, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedFrom))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            if (!DateOnly.TryParseExact(to, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateOnly parsedTo))
            {
                return BadRequest("Неверный формат даты. Используйте формат yyyy-MM-dd.");
            }
            
            return Ok(await _incomesService.GetSum(parsedFrom, parsedTo, cancellationToken));
        }
        
        [HttpGet("Year")]
        public async Task<ActionResult<ServiceResponse<GetThisYearExpenses>>> GetYear(CancellationToken cancellationToken)
        {
            return Ok(await _incomesService.GetLastYear(cancellationToken));
        }
        
        [HttpGet("TotalDiff")]
        public async Task<ActionResult<ServiceResponse<GetThisYearExpenses>>> GetTotalDiff()
        {
            return Ok(await _incomesService.GetTotalDiff());
        }
    }
}

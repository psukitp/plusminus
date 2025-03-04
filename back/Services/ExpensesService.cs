using System.Globalization;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using plusminus.Dtos.Expenses;
using plusminus.Models;
using plusminus.Repository;

namespace plusminus.Services
{
    /// <summary>
    /// Сервис для работы с расходами.
    /// </summary>
    public class ExpensesService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Expenses> _repository;
        private readonly HttpContextAccessorService _httpContextAccessor;

        public ExpensesService(IMapper mapper, IRepository<Expenses> repository, HttpContextAccessorService httpContextAccessor)
        {
            _mapper = mapper;
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Получить расходы за неделю.
        /// </summary>
        /// <param name="endDate">Конец периода.</param>
        /// <returns>Информация о расходах за неделю.</returns>
        public async Task<ServiceResponse<GetExpensesDto[]>> GetLastWeek(DateOnly endDate)
        {
            var serviceResponse = new ServiceResponse<GetExpensesDto[]>();

            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var firstDate = endDate.AddDays(-7);

                var expenses = _repository.GetAll()
                    .Where(e => e.UserId == userId)
                    .Where(e => e.Date >= firstDate && e.Date <= endDate)
                    .Include(e => e.Category);

                serviceResponse.Data = expenses.Select(e => _mapper.Map<GetExpensesDto>(e)).ToArray();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Добавить расход.
        /// </summary>
        /// <param name="expense">Запрос на добавление расхода.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о добавленном расходе.</returns>
        public async Task<ServiceResponse<GetExpensesDto>> Add(AddExpensesDto expense,
            CancellationToken cancellationToken)
        {
            
            var serviceResponse = new ServiceResponse<GetExpensesDto>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var entity = _mapper.Map<Expenses>(expense);
                entity.UserId = userId;

                var newExpense = await _repository.Add(entity, cancellationToken);

                var expenseWithCategory = _repository
                    .GetAll()
                    .Where(e => e.Id == newExpense.Id)
                    .Include(e => e.Category)
                    .FirstOrDefault();

                serviceResponse.Data = _mapper.Map<GetExpensesDto>(expenseWithCategory); 
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }


            return serviceResponse;
        }

        /// <summary>
        /// Удалить расход.
        /// </summary>
        /// <param name="id">Идентификатор расхода.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Идентификатор удаленного расхода.</returns>
        /// <exception cref="KeyNotFoundException">Расход не был найден.</exception>
        public async Task<ServiceResponse<int>> Delete(int id,
            CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<int>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var entity = _repository.Get(e => e.Id == id && e.UserId == userId).FirstOrDefault();
                if (entity == null) throw new KeyNotFoundException("Расход не был найден");

                await _repository.Delete(id, cancellationToken);

                serviceResponse.Data = id;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Полчить расходы, сгруппированные по категориям, за переиод.
        /// </summary>
        /// <param name="from">Дата начала периода.</param>
        /// <param name="to">Дата конца периода.</param>
        /// <returns>Информация о расходах за период, сгруппированная по категорям.</returns>
        public async Task<ServiceResponse<ExpensesByCategory[]>> GetExpensesByCategoryPeriod(DateOnly from, DateOnly to)
        {
            var serviceResponse = new ServiceResponse<ExpensesByCategory[]>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var expenses = _repository
                    .GetAll()
                    .Where(e => e.UserId == userId)
                    .Where(e => e.Date >= from && e.Date <= to)
                    .Include(e => e.Category)
                    .GroupBy(e => e.CategoryId)
                    .ToList()
                    //TODO унести в маппинг
                    .Select(g => new
                    {
                        CategoryId = g.Key,
                        Amount = g.Sum(e => e.Amount),
                        g.FirstOrDefault(e => e.CategoryId == g.Key, null).Category
                    }).ToArray();

                var result = new List<ExpensesByCategory>();
                foreach (var expense in expenses)
                {
                    if (expense.Category != null)
                    {
                        result.Add(new ExpensesByCategory
                        {
                            Id = expense.CategoryId,
                            CategoryName = expense.Category.Name,
                            Color = expense.Category.Color,
                            Amount = expense.Amount
                        });
                    }
                }

                serviceResponse.Data = result.ToArray();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Обновить расход.
        /// </summary>
        /// <param name="expense">Запрос на обновление расхода.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информацию об обновленном расходе.</returns>
        /// <exception cref="KeyNotFoundException">Расходы не были найдены.</exception>
        public async Task<ServiceResponse<GetExpensesDto>> Update(UpdateExpensesDto expense,
            CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetExpensesDto>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var entity = _repository.Get(e => e.Id == expense.Id).FirstOrDefault();
                if (entity is null || entity.UserId != userId)
                    throw new KeyNotFoundException("Расходы не были найдены");

                if (expense.Amount != null) entity.Amount = (decimal)expense.Amount;

                if (expense.CategoryId != null) entity.CategoryId = (int)expense.CategoryId;

                if (expense.Date != null) entity.Date = (DateOnly)expense.Date;

                await _repository.Update(entity, cancellationToken);
                
                var result = _repository
                    .GetAll()
                    .Where(i => i.Id == expense.Id)
                    .Include(i => i.Category)
                    .FirstOrDefault();

                serviceResponse.Data = _mapper.Map<GetExpensesDto>(result);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Получить сумму трат за текущий и предыдущий период.
        /// </summary>
        /// <param name="from">Дата начала текущего периода.</param>
        /// <param name="to">Дата конца текущего периода.</param>
        /// <returns>Сумма за период.</returns>
        //TODO Переименовать дтошку
        public async Task<ServiceResponse<ExpensesThisMonthStat>> GetSum(DateOnly from, DateOnly to, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<ExpensesThisMonthStat>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var expensesThisPeriod = await _repository
                    .GetAll()
                    .Where(i => i.UserId == userId)
                    .Where(i => i.Date <= to && i.Date >= from)
                    .SumAsync(i => i.Amount, cancellationToken);

                var dayDiff = to.DayNumber - from.DayNumber;
                var prevFrom = from.AddDays(-dayDiff);

                var expensesPrevPeriod = await _repository
                    .GetAll()
                    .Where(i => i.UserId == userId)
                    .Where(i => i.Date < from && i.Date >= prevFrom)
                    .SumAsync(i => i.Amount, cancellationToken);

                var result = new ExpensesThisMonthStat
                {
                    ExpensesDiff = expensesThisPeriod - expensesPrevPeriod,
                    ExpensesTotal = expensesThisPeriod
                };
                serviceResponse.Data = result;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Получить расходы по месяцам за последние 12 месяцев.
        /// </summary>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о расходах по месяцам.</returns>
        public async Task<ServiceResponse<GetThisYearExpenses>> GetLastYear(CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetThisYearExpenses>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var currentDate = DateTime.Now;
                var result = new GetThisYearExpenses();
                result.Monthes = new List<string>();
                result.Values = new List<decimal>();

                for (var i = 0; i < 12; i++)
                {
                    var month = currentDate.AddMonths(-i);
                    var monthExpenses = await _repository
                        .GetAll()
                        .Where(e => e.UserId == userId)
                        .Where(e => e.Date.Month == month.Month && e.Date.Year == month.Year)
                        .SumAsync(e => e.Amount, cancellationToken);

                    var currentMonthName = DateTimeFormatInfo.CurrentInfo.MonthNames[month.Month - 1];
                    result.Monthes.Add(char.ToUpper(currentMonthName[0]) + currentMonthName.Substring(1).ToLower());
                    result.Values.Add(monthExpenses == 0 ? -1 : monthExpenses);
                }

                result.Monthes.Reverse();
                result.Values.Reverse();

                serviceResponse.Data = result;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /// <summary>
        /// Получить расходы за неделю по дням.
        /// </summary>
        /// <param name="date">Дата конца периода.</param>
        /// <returns>Расходы за неделю по дням.</returns>
        //TODO объединить с моделькой по месяцам и перевести на период.
        public async Task<ServiceResponse<GetLastWeekExpenses>> GetLastWeekExpenses(DateOnly date)
        {
            var serviceResponse = new ServiceResponse<GetLastWeekExpenses>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var firstDate = date.AddDays(-7);

                var result = new GetLastWeekExpenses
                {
                    Days = new List<DateOnly>(),
                    Values = new List<decimal>()
                };

                var expenses = await _repository
                    .GetAll()
                    .Where(e => e.UserId == userId)
                    .Where(e => e.Date >= firstDate && e.Date <= date)
                    .GroupBy(e => e.Date)
                    .Select(g => new
                    {
                        Date = g.Key,
                        Total = g.Sum(e => e.Amount)
                    })
                    .ToListAsync();

                for (int i = 1; i < 8; i++)
                {
                    var currentDate = firstDate.AddDays(i);
                    result.Days.Add(currentDate);
                    var dailyExpense = expenses.FirstOrDefault(e => e.Date == currentDate)?.Total ?? 0;
                    result.Values.Add(dailyExpense);
                }

                serviceResponse.Data = result;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }
    }
}
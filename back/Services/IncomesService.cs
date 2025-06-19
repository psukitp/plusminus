using System.Globalization;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using plusminus.Data;
using plusminus.Dtos.Incomes;
using plusminus.Models;
using plusminus.Repository;

namespace plusminus.Services
{
    /// <summary>
    /// Сервис для работы с доходами.
    /// </summary>
    public class IncomesService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IRepository<Incomes> _repository;
        private readonly HttpContextAccessorService _httpContextAccessor;

        public IncomesService(IMapper mapper, DataContext context, IRepository<Incomes> repository, HttpContextAccessorService httpContextAccessor)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }
        
        /// <summary>
        /// Добавить доход.
        /// </summary>
        /// <param name="newIncomes">Новый доход.</param>
        /// <param name="cancellationToken">CancellationToken/</param>
        /// <returns>Информация о добавленном доходе.</returns>
        public async Task<ServiceResponse<GetIncomesDto>> Add(AddIncomesDto newIncomes, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetIncomesDto>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var entity = _mapper.Map<AddIncomesDto, Incomes>(newIncomes);
                entity.UserId = userId;

                var newIncome = await _repository.Add(entity, cancellationToken);
                
                var incomeWithCategory =  _repository
                    .GetAll()
                    .Where(i => i.Id == newIncome.Id)
                    .Include(i => i.Category)
                    .FirstOrDefault();
                
                serviceResponse.Data = _mapper.Map<GetIncomesDto>(incomeWithCategory);
            } catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Удалить доход по идентифиатору.
        /// </summary>
        /// <param name="id">Идентификатор расхода.</param>
        /// <param name="cancellationToken">CancellationToken/</param>
        /// <returns>Идентификатор удаленного расхода.</returns>
        /// <exception cref="Exception">Расход не найден.</exception>
        public async Task<ServiceResponse<int>> Delete(int id, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<int>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var entity =  _repository.Get(i => i.Id == id && i.UserId == userId);
                if (entity == null) throw new Exception("Доход не был найден");

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
        /// Получить доходы за месяц.
        /// </summary>
        /// <param name="startDate">Начало периода.</param>
        /// <param name="endDate">Конец периода.</param>
        /// <returns>Информация о доходах за месяц.</returns>
        public async Task<ServiceResponse<GetIncomesDto[]>> GetByPeriod(DateOnly startDate, DateOnly endDate)
        {
            var serviceResponse = new ServiceResponse<GetIncomesDto[]>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();

                var incomes = _repository.
                    GetAll()
                    .Where(i => i.UserId == userId)
                    .Where(i => i.Date >= startDate && i.Date <= endDate)
                    .Include(i => i.Category);
                
                serviceResponse.Data = incomes.Select(_mapper.Map<GetIncomesDto>).ToArray();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Обновить доход.
        /// </summary>
        /// <param name="income">Запрос на обновление дохода.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация об обновленном доходе.</returns>
        /// <exception cref="KeyNotFoundException">Доход не был найден.</exception>
        public async Task<ServiceResponse<GetIncomesDto>> Update(UpdateIncomesDto income, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetIncomesDto>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();

                var entity = _repository.Get(income.Id);
                if (entity is null || entity.UserId != userId)
                    throw new KeyNotFoundException("Доход не был найден");
                
                if (income.Amount != null) entity.Amount = (decimal)income.Amount;

                if (income.CategoryId != null) entity.CategoryId = (int)income.CategoryId;

                if (income.Date != null) entity.Date = (DateOnly)income.Date;

                await _repository.Update(entity, cancellationToken);

                var result = _repository
                    .GetAll()
                    .Where(i => i.Id == income.Id)
                    .Include(i => i.Category)
                    .FirstOrDefault();
                
                serviceResponse.Data = _mapper.Map<GetIncomesDto>(result);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Получить информацию о доходах, сгруппированную по категорям.
        /// </summary>
        /// <param name="date">Месяц и год.</param>
        /// <returns>Информация о доходах, сгруппированная по категорям.</returns>
        public async Task<ServiceResponse<IncomesByCategory[]>> GetByCategory(DateOnly date)
        {
            var serviceResponse = new ServiceResponse<IncomesByCategory[]>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var incomes = _repository
                    .GetAll()
                    .Where(i => i.UserId == userId)
                    .Where(i => i.Date.Month == date.Month && i.Date.Year == date.Year)
                    .Include(i => i.Category)
                    .GroupBy(i => i.CategoryId)
                    .ToList()
                    //TODO унести в маппинг
                    .Select(g => new
                    {
                        CategoryId = g.Key,
                        Amount = g.Sum(e => e.Amount),
                        g.FirstOrDefault(e => e.CategoryId == g.Key, null).Category
                    }).ToArray();
                
                var result = new List<IncomesByCategory>();
                foreach (var income in incomes)
                {
                    if (income.Category != null)
                    {
                        result.Add(new IncomesByCategory
                        {
                            Id = income.CategoryId,
                            CategoryName = income.Category.Name,
                            Color = income.Category.Color,
                            Amount = income.Amount
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
        /// Получить сумму доходов.
        /// </summary>
        /// <param name="from">Дата начал пеиода.</param>
        /// <param name="to">Дата конца периода.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Сумма за период.</returns>
        public async Task<ServiceResponse<GetIncomesThisMonthStat>> GetSum(DateOnly from, DateOnly to, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetIncomesThisMonthStat>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var incomesThisPeriod = await _repository
                    .GetAll()
                    .Where(i => i.UserId == userId)
                    .Where(i => i.Date <= to && i.Date >= from)
                    .SumAsync(i => i.Amount, cancellationToken);
                
                var dayDiff = to.DayNumber - from.DayNumber;
                var prevFrom = from.AddDays(-dayDiff);
                
                var incomesPrevPeriod = await _repository
                    .GetAll()
                    .Where(i => i.UserId == userId)
                    .Where(i => i.Date < from && i.Date >= prevFrom)
                    .SumAsync(i => i.Amount, cancellationToken);


                GetIncomesThisMonthStat result = new GetIncomesThisMonthStat
                {
                    IncomesDiff = incomesThisPeriod - incomesPrevPeriod,
                    IncomesTotal = incomesThisPeriod
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
        /// Получить доходы по месяцам за последние 12 месяцев.
        /// </summary>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о доходах по месяцам.</returns>
        public async Task<ServiceResponse<GeThisYearIncomes>> GetLastYear(CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GeThisYearIncomes>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var currentDate = DateTime.Now;
                var result = new GeThisYearIncomes();
                result.Monthes = new List<string>();
                result.Values = new List<decimal>();
                
                for (var i = 0; i < 12; i++)
                {
                    var month = currentDate.AddMonths(-i);
                    var monthIncomes = await _repository
                        .GetAll()
                        .Where(i => i.UserId == userId)
                        .Where(e => e.Date.Month == month.Month && e.Date.Year == month.Year)
                        .SumAsync(e => e.Amount, cancellationToken);

                    var currentMonthName = DateTimeFormatInfo.CurrentInfo.MonthNames[month.Month - 1];
                    result.Monthes.Add(char.ToUpper(currentMonthName[0]) + currentMonthName.Substring(1).ToLower());
                    result.Values.Add(monthIncomes == 0 ? -1 : monthIncomes);
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
        
        //TODO вынести в отдельный сервис получается надо.
        public async Task<ServiceResponse<decimal>> GetTotalDiff()
        {
            var serviceResponse = new ServiceResponse<decimal>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                
                var incomesSum = _context.Incomes
                    .Where(i => i.UserId == userId)
                    .Select(i => i.Amount)
                    .Sum();
                var expensesSum = _context.Expenses
                    .Where(e => e.UserId == userId)
                    .Select(e => e.Amount)
                    .Sum();
                serviceResponse.Data = incomesSum - expensesSum;
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

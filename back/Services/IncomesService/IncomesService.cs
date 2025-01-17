using System.Globalization;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using plusminus.Data;
using plusminus.Dtos.Incomes;
using plusminus.Models;

namespace plusminus.Services.IncomesService
{
    public class IncomesService : IIncomesService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public IncomesService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse<List<GetIncomesDto>>> AddIncomes(AddIncomesDto newIncomes, int userId)
        {
            var serviceResponse = new ServiceResponse<List<GetIncomesDto>>();
            try
            {
                var incomes = _mapper.Map<AddIncomesDto, Incomes>(newIncomes);
                Incomes incomesToAdd = new Incomes
                {
                    Amount = incomes.Amount,
                    Category = incomes.Category,
                    UserId = userId,
                    CategoryId = incomes.CategoryId,
                    Date = incomes.Date,
                    Id = incomes.Id,
                    User = incomes.User
                };
                var addedIncomes = await _context.Incomes.AddAsync(incomesToAdd);
                await _context.SaveChangesAsync();

                var dbIncomes = await _context.Incomes.Include(i => i.Category).ToListAsync();
                var incomesWithDate = dbIncomes.Where(e => e.UserId == userId && e.Date == incomesToAdd.Date);
                serviceResponse.Data = incomesWithDate.Select(i => _mapper.Map<Incomes, GetIncomesDto>(i)).ToList();
            } catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<int>> DeleteIncomesById(int id, int userId)
        {
            var serviceResponse = new ServiceResponse<int>();
            try
            {
                var incomes = await _context.Incomes.FindAsync(id);
                if (incomes is null || incomes.UserId != userId) throw new Exception("Данные доходы не были найдены");
                
                var currentId = incomes.Id;

                _context.Incomes.Remove(incomes);
                await _context.SaveChangesAsync();
                
                serviceResponse.Data = currentId;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetIncomesDto>>> GetIncomesByUserId(int id, DateOnly date)
        {
            var serviceResponse = new ServiceResponse<List<GetIncomesDto>>();
            try
            {
                var firstDate = DateOnly.FromDateTime(DateTime.Now.AddMonths(-1));
                var incomes = await _context.Incomes.Include(i => i.Category).ToListAsync();
                var dbIncomes = incomes.Where(i => i.UserId == id && i.Date <= date && i.Date >= firstDate);
                serviceResponse.Data = dbIncomes.Select(_mapper.Map<Incomes, GetIncomesDto>).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetIncomesDto>> UpdateIncomes(UpdateIncomesDto updatedIncomes, int userId)
        {
            var serviceResponse = new ServiceResponse<GetIncomesDto>();
            try
            {
                var incomes = await _context.Incomes.FindAsync(updatedIncomes.Id);
                if (incomes is null || incomes.UserId != userId) throw new Exception("Не удалось найти данные доходы");
                
                if (incomes.Amount != null) incomes.Amount = updatedIncomes.Amount;
                if (incomes.CategoryId != null) incomes.CategoryId = updatedIncomes.CategoryId;

                await _context.SaveChangesAsync();
                
                var category = await _context.CategoryIncomes.FindAsync(incomes.CategoryId);
                incomes.Category = category;
                serviceResponse.Data = _mapper.Map<Incomes, GetIncomesDto>(incomes);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<IncomesByCategory>>> GetIncomesByCategory(int id, DateOnly date)
        {
            var serviceResponse = new ServiceResponse<List<IncomesByCategory>>();
            try
            {
                var incomes = await _context.Incomes.Include(i => i.Category).ToListAsync();

                var dbIncomes = incomes
                    .Where(i => i.UserId == id && i.Date.Month == date.Month && i.Date.Year == date.Year)
                    .GroupBy(i => i.CategoryId)
                    .Select(g => new
                    {
                        categoryId = g.Key,
                        amount = g.Sum(i => i.Amount)
                    })
                    .ToList();

                var result = new List<IncomesByCategory>();
                foreach (var income in dbIncomes)
                {
                    var category = await _context.CategoryIncomes.FirstOrDefaultAsync(c => c.Id == income.categoryId);
                    if (category != null)
                    {
                        result.Add(new IncomesByCategory
                        {
                            Id = category.Id,
                            CategoryName = category.Name,
                            Color = category.Color,
                            Amount = income.amount
                        });
                    }
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
        
        public async Task<ServiceResponse<GetIncomesThisMonthStat>> GetIncomesSum(int id, DateOnly from, DateOnly to)
        {
            var serviceResponse = new ServiceResponse<GetIncomesThisMonthStat>();
            try
            {
                var incomesThisPeriod = await _context.Incomes
                    .Where(i => i.UserId == id)
                    .Where(i => i.Date <= to && i.Date >= from)
                    .SumAsync(i => i.Amount);
                
                var dayDiff = to.DayNumber - from.DayNumber;
                var prevFrom = from.AddDays(-dayDiff);
                
                var incomesPrevPeriod = await _context.Incomes
                    .Where(i => i.UserId == id)
                    .Where(i => i.Date < from && i.Date >= prevFrom)
                    .SumAsync(i => i.Amount);;


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
        
        public async Task<ServiceResponse<GeThisYearIncomes>> GetIncomesThisYear(int id)
        {
            var serviceResponse = new ServiceResponse<GeThisYearIncomes>();
            try
            {
                var currentDate = DateTime.Now;
                GeThisYearIncomes result = new GeThisYearIncomes();
                result.Monthes = new List<string>();
                result.Values = new List<decimal>();
                
                for (var i = 0; i < 12; i++)
                {
                    var month = currentDate.AddMonths(-i);
                    var monthIncomes = await _context.Incomes
                        .Where(e => e.Date.Month == month.Month && e.Date.Year == month.Year && e.UserId == id)
                        .SumAsync(e => e.Amount);

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
        
        public async Task<ServiceResponse<decimal>> GetTotalDiff(int userId)
        {
            var serviceResponse = new ServiceResponse<decimal>();
            try
            {
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

        public async Task<ServiceResponse<GetIncomesByPeriod>> GetIncomesByPeriod(int userId, DateOnly from,
            DateOnly to)
        {
            var serviceResponse = new ServiceResponse<GetIncomesByPeriod>();
            try
            {
                var result = new GetIncomesByPeriod
                {
                    Days = new List<DateOnly>(),
                    Values = new List<decimal>()
                };
                
                var incomes = await _context.Incomes
                    .Where(e => e.UserId == userId && e.Date >= from && e.Date <= to)
                    .GroupBy(e => e.Date)
                    .Select(g => new
                    {
                        Date = g.Key,
                        Total = g.Sum(e => e.Amount)
                    })
                    .ToListAsync();

                var daysBetweenDates = to.DayNumber - from.DayNumber;

                for (int i = 0; i <= daysBetweenDates; i++)
                {
                    var currentDate = from.AddDays(i);
                    var currentIncome = incomes.Where(income => income.Date == currentDate).ToArray();
                    result.Days.Add(currentIncome.Length > 0 ? currentIncome[0].Date : currentDate);
                    result.Values.Add(currentIncome.Length > 0 ? currentIncome[0].Total : 0);
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

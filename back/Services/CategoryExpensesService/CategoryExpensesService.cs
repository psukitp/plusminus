using AutoMapper;
using Microsoft.EntityFrameworkCore;
using plusminus.Data;
using plusminus.Dtos.CategoryExpenses;
using plusminus.Models;

namespace plusminus.Services.CategoryExpansesService
{
    public class CategoryExpensesService : ICategoryExpensesService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CategoryExpensesService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse<GetCategoryExpensesDto>> AddCategoryExpenses(AddCategoryExpensesDto newCategoryExpenses, int userId)
        {
            var serviceResponse = new ServiceResponse<GetCategoryExpensesDto>();
            try
            {
                var expensesCategory = _mapper.Map<AddCategoryExpensesDto, CategoryExpenses>(newCategoryExpenses);
                expensesCategory.UserId = userId;
                var addedExpenses = await _context.CategoryExpenses.AddAsync(expensesCategory);
                await _context.SaveChangesAsync();
                
                serviceResponse.Data = _mapper.Map<CategoryExpenses, GetCategoryExpensesDto>(addedExpenses.Entity);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<int>> DeleteCategoryExpensesById(int id, int userId)
        {
            var serviceResponse = new ServiceResponse<int>();
            try
            {
                var expensesCategory = await _context.CategoryExpenses.FindAsync(id);
                if (expensesCategory is null || expensesCategory.UserId != userId) throw new Exception("Категория не найдена");

                var currentCategoryId = expensesCategory.Id;

                _context.CategoryExpenses.Remove(expensesCategory);
                await _context.SaveChangesAsync();
                
                serviceResponse.Data = currentCategoryId;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCategoryExpensesDto>> UpdateCategoryExpenses(UpdateCategoryExpensesDto updatedCategoryExpenses, int userId)
        {
            var serviceResponse = new ServiceResponse<GetCategoryExpensesDto>();
            try
            {
                var expensesCategory = await _context.CategoryExpenses.FindAsync(updatedCategoryExpenses.Id);
                if (expensesCategory is null || expensesCategory.UserId != userId) throw new Exception("Категория не найдена");

                expensesCategory.Name = updatedCategoryExpenses.Name;
                expensesCategory.Color = updatedCategoryExpenses.Color;

                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<CategoryExpenses, GetCategoryExpensesDto>(expensesCategory);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCategoryExpensesDto>>> GetAllCategories(int userId)
        {
            var serviceResponse = new ServiceResponse<List<GetCategoryExpensesDto>>();
            try
            {
                var dbCategoryExpenses = await _context.CategoryExpenses.ToListAsync();
                var categories = dbCategoryExpenses.Where(c => c.UserId == userId).ToList();
                serviceResponse.Data = categories.Select(ci => _mapper.Map<CategoryExpenses, GetCategoryExpensesDto>(ci)).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task AddBaseCategories(int userId)
        {
            AddCategoryExpensesDto[] baseCategories =
            {
                new()
                {
                    Color = "rgb(224,90,41)",
                    Name = "Продукты"
                },
                new()
                {
                    Color = "rgb(64,141,248)",
                    Name = "Транспорт"
                },
                new()
                {
                    Color = "rgb(118,75,59)",
                    Name = "Развлечения"
                },
                new()
                {
                    Color = "rgb(193,200,210)",
                    Name = "Подписки"
                }
            };

            var mappedCategories = baseCategories.Select(_mapper.Map<CategoryExpenses>).Select(c =>
            {
                c.UserId = userId;
                return c;
            });

            await _context.CategoryExpenses.AddRangeAsync(mappedCategories);
            await _context.SaveChangesAsync();
        }
        
    }
}

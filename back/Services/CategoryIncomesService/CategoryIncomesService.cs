using AutoMapper;
using Microsoft.EntityFrameworkCore;
using plusminus.Data;
using plusminus.Dtos.CategoryIncomes;
using plusminus.Models;

namespace plusminus.Services.CategoryIncomesService
{
    public class CategoryIncomesService : ICategoryIncomesService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CategoryIncomesService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<ServiceResponse<GetCategoryIncomesDto>> AddCategoryIncomes(AddCategoryIncomesDto newCategoryIncomes, int userId)
        {
            var serviceResponse = new ServiceResponse<GetCategoryIncomesDto>();
            try
            {
                var incomesCat = _mapper.Map<AddCategoryIncomesDto, CategoryIncomes>(newCategoryIncomes);
                incomesCat.UserId = userId;
                var addedCategorie = await _context.CategoryIncomes.AddAsync(incomesCat);
                await _context.SaveChangesAsync();
                
                serviceResponse.Data = _mapper.Map<CategoryIncomes, GetCategoryIncomesDto>(addedCategorie.Entity);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<int>> DeleteCategoryIncomesById(int id, int userId)
        {
            var serviceResponse = new ServiceResponse<int>();
            try
            {
                var categoryIncomes = await _context.CategoryIncomes.FindAsync(id);
                if (categoryIncomes is null || categoryIncomes.UserId != userId) throw new Exception("Категория не найдена");
                
                var currentCategoryId = categoryIncomes.Id;

                _context.CategoryIncomes.Remove(categoryIncomes);
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

        public async Task<ServiceResponse<GetCategoryIncomesDto>> UpdateCategoryIncomes(UpdateCategoryIncomesDto updatedCategoryIncomes, int userId)
        {
            var serviceResponse = new ServiceResponse<GetCategoryIncomesDto>();
            try
            {
                var categoryIncomes = await _context.CategoryIncomes.FindAsync(updatedCategoryIncomes.Id);
                if (categoryIncomes is null || categoryIncomes.UserId != userId) throw new Exception("Категория не найдена");

                categoryIncomes.Name = updatedCategoryIncomes.Name;
                categoryIncomes.Color = updatedCategoryIncomes.Color;

                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<CategoryIncomes, GetCategoryIncomesDto>(categoryIncomes);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCategoryIncomesDto>>> GetAllIncomes(int userId)
        {
            var serviceResponse = new ServiceResponse<List<GetCategoryIncomesDto>>();
            try
            {
                var dbCategories = await _context.CategoryIncomes.Where(c => c.UserId == userId).ToListAsync();
                serviceResponse.Data =
                    dbCategories.Select(_mapper.Map<CategoryIncomes, GetCategoryIncomesDto>).ToList();
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
            AddCategoryIncomesDto[] baseCategories =
            {
                new()
                {
                    Color = "rgb(224,90,41)",
                    Name = "Работа"
                }
            };

            var mappedCategories = baseCategories.Select(_mapper.Map<CategoryIncomes>).Select(c =>
            {
                c.UserId = userId;
                return c;
            });

            await _context.CategoryIncomes.AddRangeAsync(mappedCategories);
            await _context.SaveChangesAsync();
        }
    }
}

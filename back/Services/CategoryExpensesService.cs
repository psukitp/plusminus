using AutoMapper;
using Microsoft.EntityFrameworkCore;
using plusminus.Dtos.CategoryExpenses;
using plusminus.Models;
using plusminus.Repository;

namespace plusminus.Services
{
    /// <summary>
    /// Сервис для работы с категорями расходов.
    /// </summary>
    public class CategoryExpensesService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<CategoryExpenses> _repository;
        private readonly HttpContextAccessorService _httpContextAccessor;

        public CategoryExpensesService(IMapper mapper, IRepository<CategoryExpenses> repository, HttpContextAccessorService httpContextAccessor)
        {
            _mapper = mapper;
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }
        
        /// <summary>
        /// Добавить категорию.
        /// </summary>
        /// <param name="newCategoryExpenses">Запрос на добавление категории.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о добавленной категории.</returns>
        public async Task<ServiceResponse<GetCategoryExpensesDto>> AddCategoryExpenses(AddCategoryExpensesDto newCategoryExpenses,CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetCategoryExpensesDto>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var expensesCategory = _mapper.Map<AddCategoryExpensesDto, CategoryExpenses>(newCategoryExpenses);
                expensesCategory.UserId = userId;
                var addedCategory = await _repository.Add(expensesCategory, cancellationToken);
                
                serviceResponse.Data = _mapper.Map<CategoryExpenses, GetCategoryExpensesDto>(addedCategory);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Удалить категорию.
        /// </summary>
        /// <param name="id">Идентиифкатор категории.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Идентификатор удаленной категории.</returns>
        /// <exception cref="Exception">Категория не найдена.</exception>
        public async Task<ServiceResponse<int>> DeleteCategoryExpensesById(int id, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<int>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var entity =  _repository.Get(ce => ce.Id == id).FirstOrDefault();
                if (entity is null || entity.UserId != userId) throw new Exception("Категория не найдена");

                var currentCategoryId = entity.Id;

                await _repository.Delete(entity.Id, cancellationToken);
                
                serviceResponse.Data = currentCategoryId;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Обновить категорию/
        /// </summary>
        /// <param name="updatedCategoryExpenses">Запрос на обновление категории.</param>
        /// <param name="cancellationToken">CancellationToken/</param>
        /// <returns>Информация об обновленной категории/</returns>
        /// <exception cref="Exception">Категория не найдена/</exception>
        public async Task<ServiceResponse<GetCategoryExpensesDto>> UpdateCategoryExpenses(UpdateCategoryExpensesDto updatedCategoryExpenses, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetCategoryExpensesDto>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var entity =  _repository.Get(ce => ce.Id == updatedCategoryExpenses.Id).FirstOrDefault();
                if (entity is null || entity.UserId != userId) throw new Exception("Категория не найдена");

                entity.Name = updatedCategoryExpenses.Name;
                entity.Color = updatedCategoryExpenses.Color;

                await _repository.Update(entity, cancellationToken);

                serviceResponse.Data = _mapper.Map<CategoryExpenses, GetCategoryExpensesDto>(entity);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Получить все категории пользователя.
        /// </summary>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о всех категорях пользователя.</returns>
        public async Task<ServiceResponse<GetCategoryExpensesDto[]>> GetAllCategories(CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetCategoryExpensesDto[]>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var entities =await  _repository
                    .GetAll()
                    .Where(c => c.UserId == userId)
                    .ToArrayAsync(cancellationToken);
                
                serviceResponse.Data = entities.Select(ce => _mapper.Map<CategoryExpenses, GetCategoryExpensesDto>(ce)).ToArray();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Добавить базовые категории.
        /// </summary>
        /// <param name="userId">Идентификатор пользователя.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        public async Task AddBaseCategories(int userId, CancellationToken cancellationToken)
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

            await _repository.AddRange(mappedCategories, cancellationToken);
        }
        
    }
}

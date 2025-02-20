using AutoMapper;
using Microsoft.EntityFrameworkCore;
using plusminus.Dtos.CategoryIncomes;
using plusminus.Models;
using plusminus.Repository;

namespace plusminus.Services
{
    /// <summary>
    /// Сервис для работы с категориями доходов.
    /// </summary>
    public class CategoryIncomesService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<CategoryIncomes> _repository;
        private readonly HttpContextAccessorService _httpContextAccessor;

        public CategoryIncomesService(IMapper mapper, IRepository<CategoryIncomes> repository, HttpContextAccessorService httpContextAccessor)
        {
            _mapper = mapper;
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }
        
        /// <summary>
        /// Добавить категорию.
        /// </summary>
        /// <param name="newCategoryIncomes">Запрос на добавление категории.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация о добавленной категории.</returns>
        public async Task<ServiceResponse<GetCategoryIncomesDto>> AddCategoryIncomes(AddCategoryIncomesDto newCategoryIncomes, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetCategoryIncomesDto>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var incomesCat = _mapper.Map<AddCategoryIncomesDto, CategoryIncomes>(newCategoryIncomes);
                incomesCat.UserId = userId;
                
                var addedCategory = await _repository.Add(incomesCat, cancellationToken);

                serviceResponse.Data = _mapper.Map<CategoryIncomes, GetCategoryIncomesDto>(addedCategory);
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
        public async Task<ServiceResponse<int>> DeleteCategoryIncomesById(int id, CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<int>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var entity = _repository.Get(ci => ci.Id == id).FirstOrDefault();
                if (entity is null || entity.UserId != userId) throw new Exception("Категория не найдена");
                
                var currentCategoryId = entity.Id;;

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
        /// Обновить категорию.
        /// </summary>
        /// <param name="updatedCategoryIncomes">Запрос на обновление категории.</param>
        /// <param name="cancellationToken">CancellationToken.</param>
        /// <returns>Информация об обновленной категории.</returns>
        /// <exception cref="Exception">Категория не найдена.</exception>
        public async Task<ServiceResponse<GetCategoryIncomesDto>> UpdateCategoryIncomes(UpdateCategoryIncomesDto updatedCategoryIncomes,CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetCategoryIncomesDto>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var entity = _repository.Get(ci => ci.Id == updatedCategoryIncomes.Id).FirstOrDefault();
                if (entity is null || entity.UserId != userId) throw new Exception("Категория не найдена");

                entity.Name = updatedCategoryIncomes.Name;
                entity.Color = updatedCategoryIncomes.Color;

                await _repository.Update(entity, cancellationToken);

                serviceResponse.Data = _mapper.Map<CategoryIncomes, GetCategoryIncomesDto>(entity);
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
        public async Task<ServiceResponse<GetCategoryIncomesDto[]>> GetAllIncomes(CancellationToken cancellationToken)
        {
            var serviceResponse = new ServiceResponse<GetCategoryIncomesDto[]>();
            try
            {
                var userId = _httpContextAccessor.GetUserId();
                var entities = await  _repository.GetAll().Where(c => c.UserId == userId).ToArrayAsync(cancellationToken);
                serviceResponse.Data =
                    entities.Select(_mapper.Map<CategoryIncomes, GetCategoryIncomesDto>).ToArray();
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

            await _repository.AddRange(mappedCategories, cancellationToken);
        }
    }
}

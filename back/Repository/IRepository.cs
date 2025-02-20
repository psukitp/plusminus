using Microsoft.EntityFrameworkCore;

namespace plusminus.Repository;

public interface IRepository<TEntity> where TEntity : class
{
    /// <summary>
    /// Получить все сущности.
    /// </summary>
    /// <returns>Все сущности.</returns>
    public DbSet<TEntity> GetAll();

    /// <summary>
    /// Получить сущность по идентификатору.
    /// </summary>
    /// <param name="id">Сущность идентификатора</param>
    /// <returns>Сущность по идентификатору.</returns>
    public TEntity? Get(int id);

    /// <summary>
    /// Получить сущности по условию.
    /// </summary>
    /// <param name="predicate">Условие.</param>
    /// <returns>Сущности по условию.</returns>
    public TEntity?[] Get(Func<TEntity, bool> predicate);

    /// <summary>
    /// Обновить сущность.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <param name="cancellationToken">CancellationToken.</param>
    /// <returns>Обновленная сущность.</returns>
    public Task<TEntity> Update(TEntity entity, CancellationToken cancellationToken);

    /// <summary>
    /// Добавить сущность.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <param name="cancellationToken">CancellationToken.</param>
    /// <returns>Добавленная сущность.</returns>
    public Task<TEntity> Add(TEntity entity, CancellationToken cancellationToken);

    /// <summary>
    /// Добавить несколько сущностей.
    /// </summary>
    /// <param name="entities">Сущности.</param>
    /// <param name="cancellationToken">CancellationToken.</param>
    /// <returns>Добавленные сущности.</returns>
    public Task<IEnumerable<TEntity>> AddRange(IEnumerable<TEntity> entities, CancellationToken cancellationToken);

    /// <summary>
    /// Удалить сущность.
    /// </summary>
    /// <param name="id">Идентификатор сущности.</param>
    /// <param name="cancellationToken">CancellationToken.</param>
    /// <returns>Удаленная сущность.</returns>
    public Task Delete(int id, CancellationToken cancellationToken);
}
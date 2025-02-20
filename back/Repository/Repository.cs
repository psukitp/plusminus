using Microsoft.EntityFrameworkCore;
using plusminus.Data;

namespace plusminus.Repository;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
{
    private readonly DataContext _context;

    public Repository(DataContext context)
    {
        _context = context;
    }

    /// <inheritdoc/>
    public DbSet<TEntity> GetAll()
    {
        return _context.Set<TEntity>();
    }

    /// <inheritdoc/>
    public TEntity? Get(int id)
    {
        return _context.Set<TEntity>().Find(id);
    }

    /// <inheritdoc/>
    public TEntity[] Get(Func<TEntity, bool> predicate)
    {
        return _context
            .Set<TEntity>()
            .AsNoTracking()
            .Where(predicate)
            .ToArray();
    }

    /// <inheritdoc/>
    public async Task<TEntity> Update(TEntity entity, CancellationToken cancellationToken)
    {
        _context.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    /// <inheritdoc/>
    public async Task<TEntity> Add(TEntity entity, CancellationToken cancellationToken)
    {
        _context.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity;
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<TEntity>> AddRange(IEnumerable<TEntity> entities, CancellationToken cancellationToken)
    {
        await _context.AddRangeAsync(entities, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return entities;
    }

    /// <inheritdoc/>
    public async Task Delete(int id, CancellationToken cancellationToken)
    {
        var entity = _context.Set<TEntity>().Find(id);
        if (entity == null) throw new KeyNotFoundException();

        _context.Set<TEntity>().Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
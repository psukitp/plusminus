using AutoMapper;
using plusminus.Dtos.CategoryExpenses;
using plusminus.Dtos.CategoryIncomes;
using plusminus.Dtos.Expenses;
using plusminus.Dtos.Incomes;
using plusminus.Dtos.UserSettings;
using plusminus.Models;

namespace plusminus
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //Expenses
            CreateMap<Expenses, GetExpensesDto>()
                .ForMember(e => e.CategoryName, 
                    cn => cn.MapFrom(e => e.Category.Name))
                .ForMember(e => e.CategoryColor, 
                cn => cn.MapFrom(e => e.Category.Color));
            CreateMap<AddExpensesDto, Expenses>();
            CreateMap<UpdateExpensesDto, Expenses>();

            //Incomes
            CreateMap<Incomes, GetIncomesDto>()
                .ForMember(i => i.CategoryName,
                    cn => cn.MapFrom(i => i.Category.Name))
                .ForMember(i => i.CategoryColor, 
                    cn => cn.MapFrom(e => e.Category.Color));
            CreateMap<AddIncomesDto, Incomes>();
            CreateMap<UpdateIncomesDto, Incomes>();

            //CategoryIncomes
            CreateMap<CategoryIncomes, GetCategoryIncomesDto>();
            CreateMap<AddCategoryIncomesDto, CategoryIncomes>();
            CreateMap<UpdateCategoryIncomesDto, CategoryIncomes>();

            //CategoryExpenses
            CreateMap<CategoryExpenses, GetCategoryExpensesDto>();
            CreateMap<AddCategoryExpensesDto, CategoryExpenses>();
            CreateMap<UpdateCategoryExpensesDto, CategoryExpenses>();
            
            //UserSettings
            CreateMap<UserSettings, GetUserSettings>();
            CreateMap<GetUserSettings,UserSettings>();
            CreateMap<UserSettings, UpdateUserSettings>();
            CreateMap<UpdateUserSettings, UserSettings>();
        }
    }
}

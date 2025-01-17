using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace plusminus.Migrations
{
    /// <inheritdoc />
    public partial class ChangeExpensesAndIncomesAmountToDecimal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //Incomes
            migrationBuilder.AddColumn<decimal>(
                name: "Amount_Temp",
                table: "Incomes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
            
            migrationBuilder.Sql("UPDATE \"Incomes\" SET \"Amount_Temp\" = CAST(\"Amount\" AS decimal(18, 2))");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Incomes"
            );

            migrationBuilder.RenameColumn(
                name: "Amount_Temp",
                table: "Incomes",
                newName: "Amount"
            );
            
            //Expenses
            migrationBuilder.AddColumn<decimal>(
                name: "Amount_Temp",
                table: "Expenses",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
            
            migrationBuilder.Sql("UPDATE \"Expenses\" SET \"Amount_Temp\" = CAST(\"Amount\" AS decimal(18, 2))");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Expenses"
            );

            migrationBuilder.RenameColumn(
                name: "Amount_Temp",
                table: "Expenses",
                newName: "Amount"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "Incomes",
                type: "integer",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "Expenses",
                type: "integer",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");
        }
    }
}

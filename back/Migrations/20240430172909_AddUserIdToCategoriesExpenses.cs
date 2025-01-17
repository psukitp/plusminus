using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace plusminus.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdToCategoriesExpenses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "CategoryExpenses",
                type: "integer",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_CategoryExpenses_userId",
                table: "CategoryExpenses",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryExpenses_Users_userId",
                table: "CategoryExpenses",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryExpenses_Users_userId",
                table: "CategoryExpenses");

            migrationBuilder.DropIndex(
                name: "IX_CategoryExpenses_userId",
                table: "CategoryExpenses");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "CategoryExpenses");
        }
    }
}

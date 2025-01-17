using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace plusminus.Migrations
{
    /// <inheritdoc />
    public partial class ChangeCategoriesTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryExpenses_Users_userId",
                table: "CategoryExpenses");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "CategoryExpenses",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_CategoryExpenses_userId",
                table: "CategoryExpenses",
                newName: "IX_CategoryExpenses_UserId");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "Date",
                table: "Incomes",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "CategoryIncomes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_CategoryId",
                table: "Incomes",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_UserId",
                table: "Incomes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryIncomes_UserId",
                table: "CategoryIncomes",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryExpenses_Users_UserId",
                table: "CategoryExpenses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryIncomes_Users_UserId",
                table: "CategoryIncomes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_CategoryIncomes_CategoryId",
                table: "Incomes",
                column: "CategoryId",
                principalTable: "CategoryIncomes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_Users_UserId",
                table: "Incomes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryExpenses_Users_UserId",
                table: "CategoryExpenses");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryIncomes_Users_UserId",
                table: "CategoryIncomes");

            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_CategoryIncomes_CategoryId",
                table: "Incomes");

            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_Users_UserId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Incomes_CategoryId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Incomes_UserId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_CategoryIncomes_UserId",
                table: "CategoryIncomes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CategoryIncomes");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "CategoryExpenses",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_CategoryExpenses_UserId",
                table: "CategoryExpenses",
                newName: "IX_CategoryExpenses_userId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Incomes",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryExpenses_Users_userId",
                table: "CategoryExpenses",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

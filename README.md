# WebApplication3
ASP Net Web API with React

Для работы с базой данных PostgreSQL создадим новый консольный проект .NET Core. 
Для работы с этой СУБД вместо с Entity Framework Core в проект необходимо добавить через Nuget пакет Npgsql.EntityFrameworkCore.PostgreSQL. 
И для поддержки миграций также установим пакет Microsoft.EntityFrameworkCore.Tools
Package Manager Console введем команду:
Add-Migration Initial

После генерации файла миграции для создания базы данных выполним команду:
Update-Database

Install react-table, namor for generation url-friendly names.


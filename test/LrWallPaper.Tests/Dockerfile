#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["test/LrWallPaper.Tests/LrWallPaper.Tests.csproj", "test/LrWallPaper.Tests/"]
COPY ["src/LrWallPaper/LrWallPaper.csproj", "src/LrWallPaper/"]
RUN dotnet restore "test/LrWallPaper.Tests/LrWallPaper.Tests.csproj"
COPY . .
WORKDIR "/src/test/LrWallPaper.Tests"
RUN dotnet build "LrWallPaper.Tests.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LrWallPaper.Tests.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LrWallPaper.Tests.dll"]
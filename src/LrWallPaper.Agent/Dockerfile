# UltraSonic Agent — headless Linux container (net10.0).
# Build context = repo root:
#   docker build -f src/LrWallPaper.Agent/Dockerfile -t ultrasonic-agent .
# Forces the net10.0 TFM so the Windows (net10.0-windows) target — WinForms tray +
# iOS USB (AFC) device sync — is never evaluated in the Linux container.

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["src/LrWallPaper.Agent/LrWallPaper.Agent.csproj", "src/LrWallPaper.Agent/"]
RUN dotnet restore "src/LrWallPaper.Agent/LrWallPaper.Agent.csproj" -p:TargetFrameworks=net10.0
COPY . .
RUN dotnet publish "src/LrWallPaper.Agent/LrWallPaper.Agent.csproj" -c Release -p:TargetFrameworks=net10.0 -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
# Magick.NET's native lib needs libgomp1 for HEIC/RAW → JPEG conversion.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libgomp1 \
    && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:5282
EXPOSE 5282
# Mount the archive dir + appsettings.json as volumes (DeviceSync:*:ArchiveDirectory).
ENTRYPOINT ["dotnet", "LrWallPaper.Agent.dll"]
